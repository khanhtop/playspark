export const pregenWordles = {
  Baseball: [
    "PITCH",
    "CATCH",
    "GLOVE",
    "FIELD",
    "BATON",
    "HOMER",
    "CURVE",
    "STEAL",
    "RALLY",
    "BASER",
    "CRACK",
    "SLIDE",
    "SCORE",
    "FENCE",
    "COACH",
    "SWING",
    "BASES",
    "DODGE",
    "BLITZ",
  ],
  Sports: [
    "MATCH",
    "SCORE",
    "BALLS",
    "GOALS",
    "RACES",
    "BIKES",
    "CLIMB",
    "TRAIL",
    "CHASE",
    "CHESS",
    "SQUAT",
    "JUMPS",
    "GLOVE",
    "RIDER",
    "CURLS",
    "RINKS",
    "CYCLE",
    "SWING",
    "SPEED",
    "POWER",
    "TRAIN",
    "RINGS",
    "FIGHT",
    "DARTS",
    "PUNCH",
    "GLIDE",
    "LUNGE",
    "KICKS",
    "HURRY",
    "PLANK",
    "KAYAK",
    "WAVES",
    "LEAPS",
    "SURFS",
    "TRACK",
    "FIELD",
    "TREAD",
    "DRIFT",
    "DRIVE",
    "COURT",
    "BLITZ",
  ],
  Basketball: [
    "DUNKS",
    "COURT",
    "SLAMS",
    "HOOPS",
    "SHOOT",
    "GUARD",
    "SCORE",
    "BLOCK",
    "CROSS",
    "JUMPS",
    "SPEED",
    "DRILL",
    "COACH",
    "POWER",
    "LACES",
  ],
  AFL: ["KICKS", "GOALS", "BALLS", "MATCH", "GRASS", "MARKS", "SQUAD"],
  IceHockey: [
    "PUCKS",
    "GOALS",
    "SHOTS",
    "SKATE",
    "RINKS",
    "CHECK",
    "SCORE",
    "GLOVE",
    "POWER",
    "SNOWY",
    "CURLS",
    "FORCE",
    "CRISP",
    "STICK",
    "BLADE",
    "SLIDE",
    "BLOCK",
  ],
  Soccer: [
    "GOALS",
    "KICKS",
    "BALLS",
    "SPORT",
    "SCORE",
    "MATCH",
    "FLAIR",
    "SKILL",
  ],
  NFL: ["TOUCH", "QUICK", "SCORE", "FIELD", "SPORT"],
  Cricket: ["BOWLS", "CATCH", "STUMP", "MATCH", "SPORT", "SWEEP", "SILLY"],
};

export function getRandomWordsByTheme(key) {
  if (key === "other") key = "Sports";
  const completeArray = pregenWordles[key];

  // Remove duplicates using a Set
  const uniqueSet = new Set(completeArray);
  const uniqueArray = [...uniqueSet];

  // Shuffle the array using the Fisher-Yates algorithm
  const shuffledArray = [...uniqueArray];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Take a slice of the first 10 words
  const randomSlice = shuffledArray.slice(0, 16);

  return randomSlice;
}
