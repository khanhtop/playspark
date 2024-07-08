import * as GUI from "@babylonjs/gui";
import * as TWEEN from "@tweenjs/tween.js";
import { EventTypes, Events } from "../Events";
import { PowerupCube } from "../Powerups/PowerupCube";
import {
  Engine,
  ICanvas,
  ICanvasRenderingContext,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { Timer } from "../Timer";
import { GameData } from "../GameData";
import { Images } from "../Images";

export class Tutorial3 {
  container: GUI.Container;
  image: HTMLImageElement;
  canvas: any;
  engine: any;
  scene: any;
  ref: any;
  ctx: ICanvasRenderingContext;
  advancedTexture: GUI.AdvancedDynamicTexture;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    this.advancedTexture = advancedTexture;

    this.container = new GUI.Container();
    this.container.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    this.createArrow(Images.data.arrow_flip, 150, 730, 0);
    this.createText("Boost active!\nTap to activate.", 100, 210);


    var close_btn = new GUI.Image();
    close_btn.source = Images.data.CloseBtn;
    close_btn.widthInPixels = 55;
    close_btn.heightInPixels = 55;
    close_btn.leftInPixels = -20;
    close_btn.topInPixels = 600;
    close_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    close_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    close_btn.onPointerClickObservable.add(() => {
      Events.ui.notifyObservers({
        type: EventTypes.TUTORIAL_CLOSE_BTN_CLICKED,
      });
    });

    this.container.addControl(close_btn);
    this.advancedTexture.addControl(this.container);

    this.ctx = this.advancedTexture.getContext();
    this.scene = GameData.instance.getScene();
    this.canvas = GameData.instance.getCanvas();
    this.engine = GameData.instance.getEngine();

  
  }

  private createArrow(img: string, x: number, y: number, rot: number) {
    let arrow = new GUI.Image();
    arrow.source = img;
    arrow.widthInPixels = 117 * 0.4;
    arrow.heightInPixels = 154 * 0.4;
    arrow.topInPixels = y;
    arrow.leftInPixels = x;
    arrow.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    arrow.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    arrow.rotation = rot;
    //arrow.scaleX = -1;

    this.container.addControl(arrow);
  }

  private createText(text: string, x: number, y: number) {
    let message = new GUI.TextBlock();
    message.text = text;
    message.color = "#FFFFFF";
    message.fontSize = 25;
    message.fontFamily = "PeaceSans";
    message.outlineWidth = 0;
    message.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    message.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    message.topInPixels = y;
    message.leftInPixels = x;
    this.container.addControl(message);
  }

  hide() {
    this.container.isEnabled = false;
    this.container.isVisible = false;

    // // this.scene.onAfterRenderObservable.remove(this.ref);

    // // // reset render // clear clearect
    // // this.engine.setSize(this.canvas.width, this.canvas.height, true);
    // // this.engine.resize();
  }
  show() {
    this.container.isEnabled = true;
    this.container.isVisible = true;

    // // var self = this;
    // // function draw() {

    // //   self.ctx.clearRect(480, 700, 70, 70);
    // //   self.advancedTexture.update();
    // // }

    // // this.ref = this.scene.onAfterRenderObservable.add(draw);

   
  }
}
