import {
  AlphaState,
  Color4,
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
import { TintedImage } from "./TintedImage";

export class Tutorial4 {
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

    let arrow_up2 = new TintedImage();
    arrow_up2.source = Images.data.arrow_up;
    arrow_up2.widthInPixels = 50 * 1.2;
    arrow_up2.heightInPixels = 131 * 1.2;
    arrow_up2.topInPixels = -350;
    arrow_up2.leftInPixels = 0;
    arrow_up2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    arrow_up2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.setp.addControl(arrow_up2);
    arrow_up2.onImageLoadedObservable.addOnce(() => {
      arrow_up2.tint = Color4.FromHexString("#FF0000");
    });

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
    this.message.text = `As you flick up, release 
your finger later for
longer and higher launches`;

    this.message.color = "#FFFFFF";
    this.message.fontSize = 30;
    this.message.fontFamily = "PeaceSans";
    this.message.outlineWidth = 0;
    this.message.topInPixels = -115;
    this.message.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.message.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.setp.addControl(this.message);

    continueBtn.leftInPixels = 0;
    continueBtn.topInPixels = -220;

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
  }
}
