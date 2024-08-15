import * as GUI from "@babylonjs/gui";
import * as TWEEN from "@tweenjs/tween.js";
import { EventTypes, Events } from "../Events";
import { PowerupCube } from "../Powerups/PowerupCube";
import {
  Color4,
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
import { TintedImage } from "./TintedImage";

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
    this.container.isPointerBlocker = false;

    let arrow = this.createArrow(Images.data.arrow_flip, 150, -150, 0);
    let infoText = this.createText("Tap Magnify to\nincrease size x2", -50, -60);
    arrow.addControl(infoText);


    let message = new GUI.TextBlock();
    message.text = "Boost active!";
    message.color = "#FFFFFF";
    message.outlineColor = "#45B1E2";
    message.fontSize = 50;
    message.fontFamily = "PeaceSans";
    message.outlineWidth = 5;
    message.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    message.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    message.isPointerBlocker = false;

    continueBtn.leftInPixels = 0;
    continueBtn.topInPixels = -50;
    continueBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    continueBtn.isVisible = false;


    var next_btn_base = new GUI.Image();
    next_btn_base.source = Images.data.btnBase;
    next_btn_base.widthInPixels = 104 * 1.3;
    next_btn_base.heightInPixels = 43 * 1.3;
    next_btn_base.leftInPixels = 0;
    next_btn_base.topInPixels = -46;
    next_btn_base.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    next_btn_base.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    next_btn_base.isEnabled = true;


    var next_btn = new TintedImage();
    next_btn.source = Images.data.NextBtn;
    next_btn.widthInPixels = 104 * 1.3;
    next_btn.heightInPixels = 43 * 1.3;
    next_btn.leftInPixels = 0;
    next_btn.topInPixels = -50;
    next_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    next_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    next_btn.isEnabled = true;

    next_btn.onImageLoadedObservable.addOnce(() => {
      next_btn.tint = Color4.FromHexString(
        GameData.instance.getSecondaryColor()
      );
    });


    next_btn.onPointerUpObservable.addOnce(() => {
      console.log("hello");
      
      continueBtn.isVisible = true;
      message.isVisible = false;
      //infoText.topInPixels = -50;
      //infoText.leftInPixels =  -60;
      //infoText.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

      infoText.text = "Tap shield to blow\nup enemy cans.";
      arrow.topInPixels = -50;
      next_btn.isVisible = false;
      next_btn_base.isVisible = false;
      BlackBG.instance.show(Images.data.blackbg4);
    });

  

    this.container.addControl(message);
    this.container.addControl(continueBtn);
    this.container.addControl(next_btn_base);
    this.container.addControl(next_btn);
    this.advancedTexture.addControl(this.container);

    this.ctx = this.advancedTexture.getContext();
    this.scene = GameData.instance.getScene();
    this.canvas = GameData.instance.getCanvas();
    this.engine = GameData.instance.getEngine();
  }

  private createArrow(img: string, x: number, y: number, rot: number): GUI.Container {
    let arrowContainer = new GUI.Container();
    arrowContainer.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    arrowContainer.verticalAlignment =  GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    arrowContainer.topInPixels = y;
    arrowContainer.leftInPixels = x;
    arrowContainer.isPointerBlocker = false;

    let arrow = new GUI.Image();
    arrow.source = img;
    arrow.widthInPixels = 117 * 0.4;
    arrow.heightInPixels = 154 * 0.4;
    arrow.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    arrow.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    arrow.rotation = rot;
    arrow.isPointerBlocker = false;
    //arrow.scaleX = -1;

    arrowContainer.addControl(arrow);
    this.container.addControl(arrowContainer);
    return arrowContainer;
  }

  private createText(text: string, x: number, y: number) {
    let message = new GUI.TextBlock();
    message.text = text;
    message.color = "#FFFFFF";
    message.fontSize = 25;
    message.fontFamily = "PeaceSans";
    message.outlineWidth = 0;
    message.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    message.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    message.topInPixels = y;
    message.leftInPixels = x;
    message.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    message.isPointerBlocker = false;
  //  this.container.addControl(message);
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
