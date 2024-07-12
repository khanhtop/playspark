import { Observable } from "@babylonjs/core";

export class Events {
  static input = new Observable();
  static instance = new Observable();
  static hits = new Observable();
  static ui = new Observable();
  static gamePlay = new Observable();
  static powerup = new Observable();
  static sound = new Observable();
}
export interface EventData {
  name: string;
  data: any;
}
export const enum EventTypes {
  REMAINING_TARGET_UI,
  LEVEL_COMPLETE,
  TIMER_COMPLETE,
  RESET_TIMER,
  CONTINUE_BTN_CLICKED,
  POWERUP_CREDIT_CHANGE,
  SHIELD_POWERUP_BTN_CLICKED,
  BIGBALL_POWERUP_BTN_CLICKED,
  SET_DECREASELIVE_STATE,
  POWERUP_TIMER_COMPLETE,
  ON_BALL_TARGET_SET,
  SHOW_TEXT_POPUP,
  RESET_BALL_POS,
  ON_BALL_SHOOT,
  SET_SCORE_MULTIPLE_FACTOR,
  SHOW_COMBO_TEXT,
  ON_HIT_COUNT_CHANGE,
  ON_CREDIT_COUNT_CHANGE,
  GAME_OVER,
  SAVE_BTN_CLICKED,
  ON_PAUSE_BTN_CLICKED,
  ON_PAUSE_POPUP_CLOSED,
  ON_MUSIC_BTN_STATE_CHANGED,
  ON_SFX_BTN_STATE_CHANGED,
  ON_LIVE_DECREAASED,
  CHANGE_SCORE,
  ON_LEVEL_COMPLETE_UI_CLOSE_BTN_CLICKED,
  ON_LIVE_LOSE,
  TUTORIAL_CLOSE_BTN_CLICKED,
}
