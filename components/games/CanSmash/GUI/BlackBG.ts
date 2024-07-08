import {
  AlphaState,
  Engine,
  ICanvasRenderingContext,
  Scene,
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import * as TWEEN from "@tweenjs/tween.js";
import { GameData } from "../GameData";
import { Images } from "../Images";

export class BlackBG {
  static instance: BlackBG = null;
  hide() {
    this.blackBG.isEnabled = false;
    this.blackBG.isVisible = false;
    this.blackBG.isPointerBlocker = false;
  }
  show(src: string =  Images.data.blackbg, alpha: number = 0.5) {
    this.blackBG.source = src; //;

    this.blackBG.alpha = alpha;
    this.blackBG.isEnabled = true;
    this.blackBG.isVisible = true;
    this.blackBG.isPointerBlocker = true;
  }
  blackBG: GUI.Image;

  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    BlackBG.instance = this;
    this.blackBG = new GUI.Image();
    this.blackBG.alpha = 0.5;
    this.blackBG.source =  Images.data.blackbg;
    this.blackBG.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.blackBG.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.blackBG.isPointerBlocker = true;
    advancedTexture.addControl(this.blackBG);

    let i = 0;
    // // /*  scene.onBeforeRenderObservable.add(() => {
    // //   ctx.save();
    // //   ctx.beginPath();

    // //   // i++
    // //   ctx.arc(250, 750, 50, 0, 2 * Math.PI);

    // //   ctx.closePath();
    // //   ctx.clip();

    // //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    // //   ctx.restore();

    // //   advancedTexture.update();
    // // });*/
    // advancedTexture.idealWidth
    // advancedTexture.idealWidth
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }
}
