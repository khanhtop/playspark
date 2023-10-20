export const gameMap = [
  {
    bundle: "baseball-throw", // Baseball Throw
    name: "The Baseball Tournament",
    id: 0,
  },
];

export const tryGetGame = (id) => {
  const intId = parseInt(id);
  if (!isNaN(intId) && gameMap[intId]) {
    return gameMap[intId];
  } else return null;
};
