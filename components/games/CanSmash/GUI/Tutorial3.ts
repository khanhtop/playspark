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
import { BlackBG } from "./BlackBG";

export class Tutorial3 {
  container: GUI.Container;
  image: HTMLImageElement;
  canvas: any;
  engine: any;
  scene: any;
  ref: any;
  ctx: ICanvasRenderingContext;
  advancedTexture: GUI.AdvancedDynamicTexture;
  constructor(
    advancedTexture: GUI.AdvancedDynamicTexture,
    continueBtn: GUI.Image
  ) {
    this.advancedTexture = advancedTexture;

    this.container = new GUI.Container();
    this.container.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    let arrow = this.createArrow(Images.data.arrow_flip, 150, 730, 0);
    let infoText = this.createText(
      "Tap Magnify to\nincrease size x2",
      100,
      210
    );

    let message = new GUI.TextBlock();
    message.text = "Boost active!";
    message.color = "#FFFFFF";
    message.outlineColor = "#45B1E2";
    message.fontSize = 50;
    message.fontFamily = "PeaceSans";
    message.outlineWidth = 5;
    message.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    message.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(message);

    continueBtn.leftInPixels = 0;
    continueBtn.topInPixels = 400;
    continueBtn.isVisible = false;

    var next_btn = new GUI.Image();
    next_btn.source = Images.data.NextBtn;
    next_btn.widthInPixels = 120 * 1.2;
    next_btn.heightInPixels = 47 * 1.2;
    next_btn.leftInPixels = 0;
    next_btn.topInPixels = 400;
    next_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    next_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(next_btn);

    next_btn.onPointerUpObservable.addOnce(() => {
      continueBtn.isVisible = true;
      message.isVisible = false;
      infoText.topInPixels = 330;
      infoText.leftInPixels = 50;
      infoText.text = "Tap shield to blow\nup enemy cans.";
      arrow.topInPixels = 850;
      next_btn.isVisible = false;
      BlackBG.instance.show(Images.data.blackbg4);
    });

    this.container.addControl(continueBtn);
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
    return arrow;
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
    return message;
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
