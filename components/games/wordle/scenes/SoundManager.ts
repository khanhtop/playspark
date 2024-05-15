import { Scene } from "phaser";
import { Observer } from "./Observer";

export class SoundManager {
  private submit: any;
  private win: any;
  private final: any;
  private btn: any;
  private power_up: any;
  private sound: any;

  public loadAudios(app: Scene, gameType: string) {
    console.log("000000 load soubds");
    app.load.audio("bg", app.params.backgroundMusic ?? ("/pong/" + gameType + "/sfx/bgNoise.mp3"));
    app.load.audio("whistle", "/pong/" + gameType + "/sfx/startWhistle.mp3");
    app.load.audio("ballHit", "/pong/" + gameType + "/sfx/ballHit.mp3");
    app.load.audio("goal", "/pong/" + gameType + "/sfx/goalScored.mp3");
    app.load.audio("lost", "/pong/" + gameType + "/sfx/goalConceded.mp3");
    app.load.audio("final", "/pong/" + gameType + "/sfx/finalWhistle.mp3");
    app.load.audio("win", "/pong/" + gameType + "/sfx/win.mp3");
    app.load.audio("btn", "/pong/" + gameType + "/sfx/btn.wav");
    app.load.audio("power_up", "/pong/" + gameType + "/sfx/power_up.wav");
    app.load.audio("submit", "/pong/" + gameType + "/sfx/submit.wav");
  }
  public init(app: Scene) {
    console.log("000000 init soubds");

    //reza this.sound.add("bg").setLoop(true).play();
    app.sound.add("bg").play();

    this.submit = app.sound.add("submit");
    this.win = app.sound.add("win");
    this.final = app.sound.add("final");
    this.btn = app.sound.add("btn");
    this.power_up = app.sound.add("power_up");

    let eventsSounds = [
      ["win", this.win],
      ["btn_click", this.btn],
      //["onLoseGame", this.final],
      ["onWinGame", this.win],
      ["onSubmit", this.submit],
      ["onPowerUp", this.power_up],
    ];

    eventsSounds.forEach((item) => {
      Observer.emitter.on(
        item[0],
        () => {
               try {
            item[1].play();
          } catch (e) {
            console.log(e);
          } finally {
          }
        },
        this
      );
    });
  }
}
