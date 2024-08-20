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
import { TintedImage } from "./TintedImage";

export class Tutorial2 {
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

    let arr1 = this.createArrow(Images.data.arrow, -50, 60, 0);
    let con1 = this.createText("Collect power \n credits", 100, -250);
    con1.addControl(arr1)

    let arr2 = this.createArrow(Images.data.arrow, 0, 60, 0);
    let con2 =  this.createText("Lose a life if hit \n enemy target", 100, -10);
    con2.addControl(arr2)


    let arr3 =  this.createArrow(Images.data.arrow, -20, -60, 91.5);
    let con3 = this.createText("Hit the target to \n earn points", -150, -110);
    con3.addControl(arr3)


  /*  continueBtn.leftInPixels = 0;
    continueBtn.topInPixels = 170;

    this.container.addControl(continueBtn);*/


    var next_btn_base = new GUI.Image();
    next_btn_base.source = Images.data.btnBase;
    next_btn_base.widthInPixels = 104 * 1.3;
    next_btn_base.heightInPixels = 43 * 1.3;
    next_btn_base.leftInPixels = 0;
    next_btn_base.topInPixels = 176;
    next_btn_base.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    next_btn_base.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    next_btn_base.isEnabled = true;


    var next_btn = new TintedImage();
    next_btn.source = Images.data.NextBtn;
    next_btn.widthInPixels = 104 * 1.3;
    next_btn.heightInPixels = 43 * 1.3;
    next_btn.leftInPixels = 0;
    next_btn.topInPixels = 170;
    next_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    next_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    next_btn.isEnabled = true;

    next_btn.onImageLoadedObservable.addOnce(() => {
      next_btn.tint = Color4.FromHexString(
        GameData.instance.getSecondaryColor()
      );
    });


    next_btn.onPointerUpObservable.addOnce(() => {
      Events.ui.notifyObservers({
        type: EventTypes.TUTORIAL_CLOSE_BTN_CLICKED,
      });
    });

    this.container.addControl(next_btn_base);
    this.container.addControl(next_btn);
    this.advancedTexture.addControl(this.container);

  }

  private createArrow(img: string, x: number, y: number, rot: number) {
    let arrow = new GUI.Image();
    arrow.source = img;
    arrow.widthInPixels = 117 * 0.4;
    arrow.heightInPixels = 154 * 0.4;
    arrow.topInPixels = y;
    arrow.leftInPixels = x;
    arrow.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    arrow.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    arrow.rotation = rot;
    //this.container.addControl(arrow);
    return arrow;
  }

  private createText(text: string, x: number, y: number):GUI.Container {
    let arrowContainer = new GUI.Container();
    arrowContainer.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    arrowContainer.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    arrowContainer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    arrowContainer.topInPixels = y;
    arrowContainer.leftInPixels = x;
    arrowContainer.isPointerBlocker = false;

    let message = new GUI.TextBlock();
    message.text = text;
    message.color = "#FFFFFF";
    message.fontSize = 25;
    message.fontFamily = "PeaceSans";
    message.outlineWidth = 0;
    // message.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    //message.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    // message.topInPixels = y;
    // message.leftInPixels = x;
    arrowContainer.addControl(message);
    this.container.addControl(arrowContainer);

    return arrowContainer;
  }

  hide() {
    this.container.isEnabled = false;
    this.container.isVisible = false;
    this.container.isPointerBlocker = false;
    /* this.scene.onAfterRenderObservable.remove(this.ref);

    // reset render // clear clearect
    this.engine.setSize(this.canvas.width, this.canvas.height, true);
    this.engine.resize();*/
  }
  show() {
    setTimeout(() => {
      PowerupCube.instace.setPosition(new Vector3(0, 0, 7));
    }, 500);

    this.container.isEnabled = true;
    this.container.isVisible = true;

    /* var self = this;
    function draw() {

      self.ctx.clearRect(250, 308, 40, 40);
      self.ctx.clearRect(130, 260, 55, 42);
      self.ctx.clearRect(250, 520, 40, 72);

      self.advancedTexture.update();
    }

    this.ref = this.scene.onAfterRenderObservable.add(draw);

    // this.ctx.save();*/
  }
}
