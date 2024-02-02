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
          (a) => a.rewardTypeId === elem.rewardTypeId && e.isRedeemed === true
        )?.length,
      });
    }
  }
  return out;
}

export function getAvailableReward(rewards) {
  const out = [];
  for (let elem of rewards.filter((a) => !a.isPurchased)) {
    if (out.findIndex((a) => a.rewardTypeId === elem.rewardTypeId) === -1) {
      out.push(elem);
    }
  }
  return out;
}
