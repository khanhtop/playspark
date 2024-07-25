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

export class Tutorial2 {
  container: GUI.Container;
  image: HTMLImageElement;
  canvas: any;
  engine: any;
  scene: any;
  ref: any;
  ctx: ICanvasRenderingContext;
  advancedTexture: GUI.AdvancedDynamicTexture;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture,  continueBtn:GUI.Image) {
    this.advancedTexture = advancedTexture;

    this.container = new GUI.Container();
    this.container.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    this.createArrow(Images.data.arrow, 50, 270, 0);
    this.createText("Collect power \n credits", 100, -250);

    this.createArrow(Images.data.arrow, 50, 500, 0);
    this.createText("Lose a life if hit \n enemy target", 100, -10);

    this.createArrow(Images.data.arrow, -170, 270, 91.5);
    this.createText("Hit the target to \n earn points", -150, -110);


    continueBtn.leftInPixels = 0;
    continueBtn.topInPixels = 170;


    this.container.addControl(continueBtn);
    this.advancedTexture.addControl(this.container);

 /*   this.ctx = this.advancedTexture.getContext();
    this.scene = GameData.instance.getScene();
    this.canvas = GameData.instance.getCanvas();
    this.engine = GameData.instance.getEngine();*/

  
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
