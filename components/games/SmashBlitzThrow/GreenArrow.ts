import { GAME_STATES } from "./Consts";
import { Global } from "./Global";
import { Observer } from "./Observer";

export class GreenArrow {
  scene: Phaser.Scene;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
  }
  init(startPoint: Phaser.GameObjects.Image) {

    let _angle: number = 0;
    let arrow_green = this.scene.add.image(startPoint.x, startPoint.y, "arrow_green").setDepth(1);
    arrow_green.setScale(0.5, 0.5);
    arrow_green.setOrigin(0, 0.5);

    arrow_green.active = false;
    arrow_green.visible = false;
    
    this.scene.events.on("Input:pointerdown", (pointer: any) => {
      if(Global.gameState != GAME_STATES.PLAYING) return;
      arrow_green.visible = true;
    });


    this.scene.events.on("Input:pointermove", (pointer: any) => {
      if(Global.gameState != GAME_STATES.PLAYING) return;
        _angle = Phaser.Math.Angle.BetweenPoints( pointer,startPoint);
      arrow_green.rotation = _angle;
    });

    this.scene.events.on("Input:pointerup", (pointer: any) => {
      
      arrow_green.visible = false;
    });
  }
}
