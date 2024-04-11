import { GAME_STATES } from "../Consts";
import { Global } from "../Global";

export class PausePopup {
  scene: Phaser.Scene;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    let centerX = _scene.renderer.width / 2;
    let centerY = _scene.renderer.height / 2;

    let group = _scene.add.container();

    let font = {
      fontFamily: "titan_one_regular",
      fontSize: "20px",
      fill: "#FF561E",
    };

    let blach_bg = _scene.add
      .graphics()
      .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
      .fillRect(
        -centerX,
        -centerY,
        _scene.renderer.width,
        _scene.renderer.height
      )
      .setInteractive();

      let gamePausedTitle = _scene.add
      .text(-145, -60, `GAME PAUSED`, font)
      .setOrigin(0, 0.5)
      .setSize(200, 500)
      .setFontSize(40)
      .setAlign("left")
      .setColor("#000050")
      .setPadding(0, 0, 5, 0)
    //  .setFontStyle("bold");

    let popupbg = _scene.add
      .sprite(0, 0, "popup_bg")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(500, 500)
      .setInteractive();

    let quit = _scene.add
      .sprite(80, 70, "quit")
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDisplaySize(150, 60);

    let resume = _scene.add
      .sprite(-80,70, "resume")
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDisplaySize(150, 60);

    resume.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.scene.events.emit("PauseBtn:onClick");
      this.scene.events.emit("PAUSE_PLAY");

      
    });

    group.add(blach_bg);
    group.add(popupbg);
    group.add(gamePausedTitle);
    

    group.add(quit);
    group.add(resume);
    group.setPosition(centerX, centerY);
    group.visible = false;

    this.scene.events.on("PauseBtn:onClick", () => {
      if (group.visible) {
        group.visible = false;
      } else {
        group.visible = true;
      }
    });
  }
}
