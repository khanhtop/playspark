import { Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";
import * as TWEEN from "@tweenjs/tween.js";
//import { AdvancedDynamicTexture, Button } from "babylonjs-gui";

import * as GUI from "@babylonjs/gui";

export class ComboPopup {
  private counter: GUI.TextBlock;

  isAnimateComplete: boolean = true;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    this.counter = new GUI.TextBlock();
    this.counter.text = "Combo 2X";

    //this.counter.widthInPixels = 80;

    this.counter.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.counter.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    this.counter.fontSize = 50;
   // this.counter.fontStyle = "bold";
    this.counter.fontFamily = "PeaceSans";
    this.counter.color = "#FFB200";
    this.counter.outlineColor = "#DB6B23";
    this.counter.outlineWidth = 5;
    this.counter.alpha = 0;
    this.counter.isPointerBlocker = false;
    advancedTexture.addControl(this.counter);
  }
  animate(text: string) {
    this.isAnimateComplete = false;
    this.counter.alpha = 1;

    this.counter.scaleX = 1
     this.counter.scaleY = 1;
     
    this.counter.text = text;
    const _data = {
      scaleX: this.counter.scaleX,
      scaleY: this.counter.scaleY
    };
    const tween = new TWEEN.Tween(_data)
      .to(
        {
          scaleX: this.counter.scaleX + 0.5,
          scaleY: this.counter.scaleY + 0.5

        },
        200
      )
      .easing(TWEEN.Easing.Linear.Out)
      .yoyo(true)
      .repeat(5)
      .onUpdate(() => {
        this.counter.scaleX = _data.scaleX;
        this.counter.scaleY = _data.scaleY;
      })
      .onComplete(() => {
        this.isAnimateComplete = true;
        this.counter.alpha = 0;
      });
    tween.start();
  }
}
