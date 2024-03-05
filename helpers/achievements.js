export const achievements = [
  {
    factor: "xp",
    target: 500,
    image: "/badges/xp1.png",
    text: "Earn 500XP",
    blurb:
      "Earn 500XP through playing games and participating in various activities to unlock this achievement.",
  },
  {
    factor: "xp",
    target: 2500,
    image: "/badges/xp2.png",
    text: "Earn 2500XP",
    blurb:
      "Earn 2500XP through playing games and participating in various activities to unlock this achievement.",
  },
  {
    factor: "xp",
    target: 10000,
    image: "/badges/xp3.png",
    text: "Earn 10,000XP",
    blurb:
      "Earn 10,000XP through playing games and participating in various activities to unlock this achievement.",
  },
  {
    factor: "xp",
    target: 50000,
    image: "/badges/xp4.png",
    text: "Earn 50,000XP",
    blurb:
      "Earn 50,000XP through playing games and participating in various activities to unlock this achievement.",
  },
  {
    factor: "xp",
    target: 100000,
    image: "/badges/xp5.png",
    text: "Earn 100,000XP",
    blurb:
      "Earn 100,000XP through playing games and participating in various activities to unlock this achievement.",
  },
  {
    factor: "nPlays",
    target: 10,
    image: "/badges/gamer1.png",
    text: "Play 10 Times",
    blurb: "Play a total of ten times to unlock this achievement.",
  },
  {
    factor: "nPlays",
    target: 25,
    image: "/badges/gamer2.png",
    text: "Play 25 Times",
    blurb: "Play a total of 25 times to unlock this achievement.",
  },
  {
    factor: "nPlays",
    target: 80,
    image: "/badges/gamer3.png",
    text: "Play 80 Times",
    blurb: "Play a total of 80 times to unlock this achievement.",
  },
  {
    factor: "nPlays",
    target: 200,
    image: "/badges/gamer4.png",
    text: "Play 200 Times",
    blurb: "Play a total of 200 times to unlock this achievement.",
  },
  {
    factor: "nPlays",
    target: 500,
    image: "/badges/gamer5.png",
    text: "Play 500 Times",
    blurb: "Play a total of 500 times to unlock this achievement.",
  },
];

export function getChallenge(factor, value) {
  const filtered = [...achievements.filter((a) => a.factor === factor)];
  let index = 0;
  for (let item of filtered) {
    index++;
    if (item.target > value) {
      return {
        item: item,
        index: index - 1,
        length: filtered.length,
      };
    }
  }
}
