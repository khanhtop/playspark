export const achievements = [
  {
    factor: "xp",
    target: 500,
    image: "/badges/xp1.png",
    text: "Earn 500XP",
  },
  {
    factor: "xp",
    target: 2500,
    image: "/badges/xp2.png",
    text: "Earn 2500XP",
  },
  {
    factor: "xp",
    target: 10000,
    image: "/badges/xp3.png",
    text: "Earn 10,000XP",
  },
  {
    factor: "xp",
    target: 50000,
    image: "/badges/xp4.png",
    text: "Earn 50,000XP",
  },
  {
    factor: "xp",
    target: 100000,
    image: "/badges/xp5.png",
    text: "Earn 100,000XP",
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
