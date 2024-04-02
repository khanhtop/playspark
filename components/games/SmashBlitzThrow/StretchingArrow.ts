import { GAME_STATES } from "./Consts";
import { Global } from "./Global";
import { Observer } from "./Observer";

export class StretchingArrow {
  scene: Phaser.Scene;
  canDrawArrow = false;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
  }
  update() {}
  init(startPoint: Phaser.GameObjects.Image) {
    let arrowHead = this.scene.add
      .image(startPoint.x, startPoint.y, "arrow_head")
      .setDepth(1);
    arrowHead.setScale(0.15, 0.15);
    arrowHead.setOrigin(0.5, 0.5);
    arrowHead.visible = false;

    const graphics = this.scene.add.graphics({
      lineStyle: { width: 30, color: 0xffffff, alpha: 0.5 },
    });
    const line = new Phaser.Geom.Line();
    let _angle: number = 0;
    this.canDrawArrow = false;

    this.scene.events.on("Input:pointerdown", (pointer: any) => {
      if(Global.gameState != GAME_STATES.PLAYING) return;
      this.canDrawArrow = true;
      arrowHead.visible = true;
    });

    this.scene.events.on("Input:pointermove", (pointer: any) => {
      if(Global.gameState != GAME_STATES.PLAYING) return;
      if (!this.canDrawArrow) return;
      const dist = Phaser.Math.Distance.Between(
        startPoint.x,
        startPoint.y,
        pointer.position.x,
        pointer.position.y
      );
      //console.log(pointer);


      _angle = Phaser.Math.Angle.BetweenPoints(startPoint, pointer);
      //cannonHead.rotation = angle;
      Phaser.Geom.Line.SetToAngle(
        line,
        startPoint.x,
        startPoint.y,
        _angle,
        dist - 37.3
      );

      arrowHead.rotation = _angle + 90 * 0.0174533;
      arrowHead.setPosition(pointer.position.x, pointer.position.y);
      
      graphics.clear().strokeLineShape(line);
    });

    this.scene.events.on("Input:pointerup", (pointer: any) => {
      
      this.canDrawArrow = false;
      arrowHead.visible = false;
      graphics.clear();//.strokeLineShape(line);
    });
  }
}
