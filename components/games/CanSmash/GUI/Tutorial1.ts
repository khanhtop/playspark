import {
  AlphaState,
  Engine,
  ICanvasRenderingContext,
  Scene,
  Vector3,
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { TextureHelper } from "@babylonjs/inspector/textureHelper";
import * as TWEEN from "@tweenjs/tween.js";
import { EventTypes, Events } from "../Events";
import { GameData } from "../GameData";
import { PowerupCube } from "../Powerups/PowerupCube";
import { Images } from "../Images";

export class Tutorial1 {
  hand: GUI.Image;
  arrow_up: GUI.Image;
  message: GUI.TextBlock;
  setp: GUI.Container;
  tween: TWEEN.Tween<{ y: number; alpha: number }>;
  image: HTMLImageElement;
  constructor(
    advancedTexture: GUI.AdvancedDynamicTexture,
    continueBtn: GUI.Image
  ) {
    this.setp = new GUI.Container();
    this.setp.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.setp.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    this.arrow_up = new GUI.Image();
    this.arrow_up.source = Images.data.arrow_up;
    this.arrow_up.widthInPixels = 50 * 1.2;
    this.arrow_up.heightInPixels = 131 * 1.2;
    this.arrow_up.topInPixels = -190;
    this.arrow_up.leftInPixels = 0;
    this.arrow_up.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.arrow_up.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.setp.addControl(this.arrow_up);

    this.hand = new GUI.Image();
    this.hand.source = Images.data.hand;
    this.hand.widthInPixels = 94 * 1.2;
    this.hand.heightInPixels = 75 * 1.2;
    this.hand.topInPixels = -30;
    this.hand.leftInPixels = 50;
    this.hand.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.hand.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.setp.addControl(this.hand);

    this.message = new GUI.TextBlock();
    this.message.text = "Swipe up and \n release to launch";
    this.message.color = "#FFFFFF";
    this.message.fontSize = 30;
    this.message.fontFamily = "PeaceSans";
    this.message.outlineWidth = 0;
    this.message.topInPixels = 60;
    this.message.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.message.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.setp.addControl(this.message);

    continueBtn.leftInPixels = 0;
    continueBtn.topInPixels = -25;

    this.setp.addControl(continueBtn);
    advancedTexture.addControl(this.setp);

    const _data = {
      y: this.hand.topInPixels,
      alpha: this.hand.alpha,
    };
    this.tween = new TWEEN.Tween(_data)
      .to(
        {
          y: this.hand.topInPixels - 300,
          alpha: 0.5,
        },
        1200
      )
      .easing(TWEEN.Easing.Linear.Out)
      .onUpdate(() => {
        this.hand.topInPixels = _data.y;
        this.hand.alpha = _data.alpha;
      })
      //.yoyo(true)
      .repeat(Infinity)
      .onComplete(() => {});

    // // const ctx: ICanvasRenderingContext = advancedTexture.getContext();
    // // let scene: Scene = GameData.instance.getScene();
    // // let canvas = GameData.instance.getCanvas();
    // // let engine: Engine = GameData.instance.getEngine();
    // // let i = 0;

    // // this.image = new Image(94 * 1.2, 75 * 1.2); // Using optional size for image
    // // this.image.onload = drawImageActualSize; // Draw when image has loaded
    // // this.image.src = Images.data.hand;

    // // var self = this;
    // // function drawImageActualSize() {
    // //   scene.onAfterRenderObservable.add(() => {
    // //     // ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // //     // ctx.fillRect(0, 0, canvas.width * 5, canvas.height * 5);

    // //     //ctx.clearRect(0, 0, canvas.width * 5, canvas.height * 5); // Clear the canvas

    // //     // ctx.fillRect(0, 0, canvas.width * 5, canvas.height * 5); // Redraw the background
    // //     i -= 3;

    // //     ctx.save();
    // //     ctx.beginPath();
    // //     ctx.arc(270, 843, 50, 0, 2 * Math.PI);
    // //     ctx.closePath();
    // //     ctx.clip();
    // //     ctx.clearRect(0, 0, canvas.width * 5, canvas.height * 5);
    // //     ctx.restore();

    // //    // ctx.drawImage(this, 270, 843 + i); // Draw the image at the new position

    // //   //  if (i < -200) i = 0;
    // //     advancedTexture.update();
    // //   });
    // // }
  }

  hide() {
    this.setp.isEnabled = false;
    this.setp.isVisible = false;
    this.setp.isPointerBlocker = false;
  }
  show() {
    this.setp.isEnabled = true;
    this.setp.isVisible = true;
    this.tween.start();

    setTimeout(() => {
      // hide power up cube from scene
      PowerupCube.instace.setPosition(new Vector3(0, 20, 0));
    }, 500);
  }
}
