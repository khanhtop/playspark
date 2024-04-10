export enum BALLS {
  "powerup",
  "gold_ball",
  "purple_ball",
  "bomb",
  "blue_ball",
  "super_gold",
}
export const BOMB_INDEX = 3;
export const TOTAL_TARGET_COUNT = 5;
export enum GAME_STATES {
  "TUTURIAL",
  "PLAYING",
  "PAUSE",
  "WIN_POPOP",
  "LOSE",
  "POEWR_UP_MODAL"
}
export enum PLAYER_STATES {
  "ARM_BACK",
  "IDLE",
  "SHOOT",
}
export const LIFE_COUNT = 3;
export const TUTORIAL_DURATION: number = 5; // sec

export const FLAME_BOOST_COST = 3;
export const FLAME_BOOST_TRY_COUNT = 3;
export const FLAME_BOOST_TEXTURE = "fire";

export const ROKET_BOOST_MULTIPLIER = 5;
export const ROKET_BOOST_COST = 2;
export const ROKET_BOOST_TRY_COUNT = 3;
export const ROKET_BOOST_TEXTURE = "rocket";