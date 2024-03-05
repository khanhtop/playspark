export function getRank(xp) {
  let currentTier, nextTier, xpToNextTier;

  if (xp < 1000) {
    currentTier = "Novice";
    nextTier = "Amateur";
    xpToNextTier = 1000 - xp;
  } else if (xp < 5000) {
    currentTier = "Amateur";
    nextTier = "Intermediate";
    xpToNextTier = 5000 - xp;
  } else if (xp < 15000) {
    currentTier = "Intermediate";
    nextTier = "Advanced Beginner";
    xpToNextTier = 15000 - xp;
  } else if (xp < 30000) {
    currentTier = "Advanced Beginner";
    nextTier = "Competent";
    xpToNextTier = 30000 - xp;
  } else if (xp < 50000) {
    currentTier = "Competent";
    nextTier = "Proficient";
    xpToNextTier = 50000 - xp;
  } else if (xp < 100000) {
    currentTier = "Proficient";
    nextTier = "Expert";
    xpToNextTier = 100000 - xp;
  } else if (xp < 200000) {
    currentTier = "Expert";
    nextTier = "Master";
    xpToNextTier = 200000 - xp;
  } else if (xp < 300000) {
    currentTier = "Master";
    nextTier = "Elite";
    xpToNextTier = 300000 - xp;
  } else if (xp < 400000) {
    currentTier = "Elite";
    nextTier = "Legendary";
    xpToNextTier = 400000 - xp;
  } else {
    currentTier = "Legendary";
    nextTier = null; // No higher tier
    xpToNextTier = 0; // You've reached the highest tier
  }

  return {
    currentTier,
    nextTier,
    xpToNextTier,
  };
}

export function xpAsPercentage(xp, next) {
  return (xp / next) * 100;
}

export function calculateLevel(xp) {
  if (xp < 1000) {
    return 1;
  }

  let level = 1;
  let base = 1000;
  let step = 100;
  for (let i = 1; i < 100; i++) {
    if (xp <= i * base + step) {
      return i;
    } else {
      step *= 1.1;
    }
  }
  return level;
}
