export class LoseManager {
  scene: Phaser.Scene;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    let group = _scene.add.container();

    let centerX = _scene.renderer.width / 2;
    let centerY = _scene.renderer.height / 2;

    let font = {
      fontFamily: "budget_font",
      fontSize: "20px",
      fill: "#FF561E",
    };

    let blach_bg = _scene.add
      .graphics()
      .clear()
      .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
      .fillRect(
        -centerX,
        -centerY,
        _scene.renderer.width,
        _scene.renderer.height
      )
      .setInteractive();

    let title = _scene.add
      .text(0, 0, `Temorary Game over screen`, font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 500)
      .setPadding(0, 0, 10, 0)
      .setAlign("center")
      .setStroke("#000000", 10)
  

    let restart = _scene.add
      .text(-100, 100, `Restart`, font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 500)
      .setPadding(0, 0, 10, 0)
      .setAlign("center")
      .setStroke("#000000", 10)
      .setInteractive();

    restart.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.scene.events.emit("LoseManager:onRestartClick");
      group.visible = false;
    });

    let revive = _scene.add
      .text(100, 100, `Revive`, font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 500)
      .setPadding(0, 0, 10, 0)
      .setAlign("center")
      .setStroke("#000000", 10)
     
      .setInteractive();

    revive.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.scene.events.emit("LoseManager:onReviveClick");
      group.visible = false;
    });

    group.add(blach_bg);
    group.add(title);
    group.add(restart);
    group.add(revive);
    group.setPosition(_scene.renderer.width / 2, _scene.renderer.height / 2);
    group.visible = false;

    _scene.events.on("LivesHandler:onChange", (currentLifes: number) => {
      if (currentLifes <= 0) {
       // group.visible = true;
        _scene.events.emit("LoseManager:onLose");
      }
      // console.log("---- you lose, lifes copmleted");
    });
    let remainingGoal = 1;
    _scene.events.on(
      "TargetHitCounter:onGoalCountChange",(_remainingGoal:number)=>{
        remainingGoal = _remainingGoal;
      }
    );

    _scene.events.on("CountDownTimer:onComplete", () => {
      if(remainingGoal > 0){
        _scene.events.emit("LoseManager:onLose");
      }
      //console.log("CountDownTimer:onComplete");
      //console.log("---- you lose timer completed")
    });
  }
}
