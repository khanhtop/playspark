export class Audios {
  scene: Phaser.Scene;
  canPlay: boolean = true;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    this.canPlay = true;

  this.scene.events.on("AudioBtn:onClick",()=>{
      this.canPlay =  !this.canPlay;
      if (!this.canPlay) background.stop();
      else background.play();
    });


    this.scene.events.on("Audios:canPlay", (canPlay: boolean) => {
      this.canPlay = canPlay;
      if (!canPlay) background.stop();
      else background.play();
    });

    let background = _scene.sound.add("background");
    let wrong = _scene.sound.add("wrong");
    let point = _scene.sound.add("point");
    let powerup = _scene.sound.add("powerup");
    let victory = _scene.sound.add("victory");

    background.setLoop(true).play();

    this.scene.events.on("LoseManager:onLose", () => {
      _scene.tweens.addCounter({
        from: 1,
        to: 0,
        duration: 3000,
     
        onUpdate: (tween) => {
          const v = tween.getValue();
          background.setVolume(v)
        },
        onComplete: () => {
        },
      });

     
    });

    this.scene.events.on("TargetHitCounter:onTargetHit", () => {
      if (!this.canPlay) return;
      point.play();
    });
    this.scene.events.on("TargetHitCounter:onBombHit", () => {
      if (!this.canPlay) return;
      wrong.play();
    });
    this.scene.events.on("TargetHitCounter:onPowerupHit", () => {
      if (!this.canPlay) return;
      powerup.play();
    });
    this.scene.events.on("WinManager:onWin", () => {
      if (!this.canPlay) return;
      victory.play();
    });
  }
}
