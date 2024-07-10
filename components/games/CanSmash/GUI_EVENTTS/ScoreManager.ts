import { EACH_CAN_SCORE } from "../Consts";
import { EventData, EventTypes, Events } from "../Events";
import { GameData } from "../GameData";

export class ScoreManager {
  private score: number = 0;
  private canCount: number = 0;
  private factor: number = 1;
  private levelScore: number = 0;
  constructor(score: number) {
    this.score = score;
    this.notify();


    Events.ui.add((data: any) => {
      switch (data.type) {
        case EventTypes.TIMER_COMPLETE:
          this.onTimerComplete();
          return;
      }
    });


    Events.hits.add((data: EventData) => {
      switch (data.name) {
        case "can":
          this.onCanHit(data);
          break;

        default:
          return;
      }
    });

    Events.gamePlay.add((data: any) => {
      switch (data.type) {
        case EventTypes.SET_SCORE_MULTIPLE_FACTOR:
          //console.log(`SET_SCORE_MULTIPLE_FACTOR ${data.factor}`);
          this.factor = data.factor;
          break;
      }
    });
  }

  onTimerComplete() {
  
    this.levelScore = 0;

  }



  onCanHit(data: EventData) {
    let score = EACH_CAN_SCORE;

    if (data.data.sender.row == 3 || data.data.sender.row == 4) {
      score = EACH_CAN_SCORE * 2;
    }

    this.score += score * this.factor;

    this.levelScore += score * this.factor;


    GameData.instance.setTotalScore(this.score);
    //console.log(`Total score ${this.score}`)
    GameData.instance.setScore(this.levelScore);

    this.notify();
    this.notifyTextPOpup(
      data.data.sender.canContainer.position,
      `+ ${score * this.factor}`
    );
    this.canCount++;
    this.factor++;
  }
  notify() {
    Events.ui.notifyObservers({ type: EventTypes.CHANGE_SCORE, count: this.score });
  }
  notifyTextPOpup(_pos, _text) {
    Events.ui.notifyObservers({
      type: EventTypes.SHOW_TEXT_POPUP,
      text: _text,
      pos: _pos,
    });
  }
}
