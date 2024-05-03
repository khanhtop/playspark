import e from "cors";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./firebase";
import { rewardWithCoins, rewardWithXP } from "./events";

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
  console.log(reward);
  if (reward.outputAction === "xp")
    rewardWithXP(reward.outputValue, context, data);
  if (reward.outputAction === "coins")
    rewardWithCoins(reward.outputValue, context, data);
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
