import e from "cors";

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
