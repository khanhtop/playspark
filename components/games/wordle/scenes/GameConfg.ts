import { CONSTS } from "./Consts";

export let GAME = {
    STATUS: CONSTS.GAME_TYPE.CLASSIC,
    WORDS: [],
    TYPING: "",
    LINE: 0,
    SCORE: 0,
    STREAK: 0,
    COIN: 0,
    CUR_COIN: 0,
    PAUSE: false,
    POWER_UPS: {
      TARGET: 1,
      DISPLAY: 1,
      NEXT: 3,
    },
  };