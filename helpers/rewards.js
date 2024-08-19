import e from "cors";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./firebase";
import { rewardWithCoins, rewardWithXP } from "./events";
import { fireHook } from "./webhooks";
import { sendSupabaseEvent } from "./analytics";

export function groupRewards(rewards) {
  if (!rewards) return [];
  let out = [];
  for (let elem of rewards) {
    const ix = out.findIndex((a) => a.rewardTypeId === elem.rewardTypeId);
    if (ix === -1) {
      out.push({
        ...elem,
        totalIssued: rewards.filter((a) => a.rewardTypeId === elem.rewardTypeId)
          ?.length,
        totalRedeemed: rewards.filter(
          (a) => a.rewardTypeId === elem.rewardTypeId && a.isRedeemed === true
        )?.length,
        totalPurchased: rewards.filter(
          (a) => a.rewardTypeId === elem.rewardTypeId && a.isPurchased === true
        )?.length,
      });
    }
  }
  return out;
}

export function groupPrizes(rewards) {
  if (!rewards) return [];
  let out = [];
  for (let elem of rewards) {
    const ix = out.findIndex((a) => a.prizeTypeId === elem.prizeTypeId);
    if (ix === -1) {
      out.push({
        ...elem,
        totalIssued: rewards.filter((a) => a.prizeTypeId === elem.prizeTypeId)
          ?.length,
        totalRedeemed: rewards.filter(
          (a) => a.prizeTypeId === elem.prizeTypeId && a.isRedeemed === true
        )?.length,
        totalPurchased: rewards.filter(
          (a) => a.prizeTypeId === elem.prizeTypeId && a.isPurchased === true
        )?.length,
      });
    }
  }
  return out;
}

export function getAvailableReward(rewards) {
  if (!rewards) return [];
  const out = [];
  for (let elem of rewards.filter((a) => !a.isPurchased)) {
    if (out.findIndex((a) => a.rewardTypeId === elem.rewardTypeId) === -1) {
      out.push({
        ...elem,
        totalIssued: rewards.filter((a) => a.rewardTypeId === elem.rewardTypeId)
          ?.length,
        totalRedeemed: rewards.filter(
          (a) => a.rewardTypeId === elem.rewardTypeId && a.isPurchased === true
        )?.length,
      });
    }
  }
  return out;
}

// In Game Rewards

export const claimReward = async (reward, data, context) => {
  if (reward.outputAction === "xp")
    rewardWithXP(reward.outputValue, context, data);
  if (reward.outputAction === "coins")
    rewardWithCoins(reward.outputValue, context, data);
  if (reward.outputAction === "webhook") {
    sendSupabaseEvent(
      context?.loggedIn?.uid,
      data.ownerId,
      data.tournamentId,
      "reward_claimed_webhook",
      data.ownerCompanyName,
      reward.id
    );
    fireHook(reward.outputValue, {
      hookType: "REWARD CLAIMED",
      rewardName: reward.name,
      rewardInput: reward.input,
      rewardValue: reward.inputValue,
      rewardId: reward.id,
      userName: context?.profile?.companyName || null,
      userEmail: context?.profile?.email || null,
    });
  }
  if (reward.outputAction === "physical") {
    sendSupabaseEvent(
      context?.loggedIn?.uid,
      data.ownerId,
      data.tournamentId,
      "reward_claimed_physical",
      data.ownerCompanyName,
      reward.id
    );
  }
  if (reward.outputAction === "promocode") {
    sendSupabaseEvent(
      context?.loggedIn?.uid,
      data.ownerId,
      data.tournamentId,
      "reward_claimed_promocode",
      data.ownerCompanyName,
      reward.id
    );
  }
  await addDoc(
    collection(firestore, "users", context.loggedIn.uid, "rewards"),
    {
      ...reward,
      tournamentId: data.tournamentId,
      ownerId: data.ownerId,
    }
  );
  return;
};
