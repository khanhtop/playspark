import { GAME_STATES } from "../Consts";
import { Global } from "../Global";

export class CountDownTimer {
  scene: Phaser.Scene;
  counter: number = 0;
  prevCounter: number = 0;
  target: number = 0;
  public static instance: CountDownTimer;
  isFinished: boolean = true;
  canCount: boolean = false;
  firstCounter: number = 0;
  constructor(_scene: Phaser.Scene) {
    CountDownTimer.instance = this;
    this.scene = _scene;

    setInterval(() => {
      if (this.counter > 0) {
        if(Global.gameState != GAME_STATES.PLAYING) return;
        if (!this.canCount) return;
        //console.log(this.canCount, this.counter)
        this.counter--;
          this.scene.events.emit("CountDownTimer:getUpdate", this.counter);
      } else if (!this.isFinished) {
        this.isFinished = true;
        this.scene.events.emit("CountDownTimer:onComplete");
      }
    }, 1000);
  }
  public set(num: number) {
    this.counter = num;
    this.isFinished = false;
    this.scene.events.emit("CountDownTimer:getUpdate", num);
  }
  public stop() {
    this.canCount = false;
  }
  public start() {
    this.scene.events.emit("CountDownTimer:getUpdate", this.counter);
    this.canCount = true;
  }
 
}
