import * as GUI from "@babylonjs/gui";
import * as TWEEN from "@tweenjs/tween.js";
import { Images } from "../Images";

export class EntityUI {
  counter: GUI.TextBlock;
  fillEllipse: GUI.Ellipse;
  img: GUI.Image;
  isFirstTime: boolean = true;
  tween: TWEEN.Tween<{ xScale: number; yScale: number }>;
  container: GUI.Container;
  constructor(
    advancedTexture: GUI.AdvancedDynamicTexture,
    width: number = 120
  ) {
    this.container = new GUI.Container();
    this.container.adaptWidthToChildren = true;
    this.container.heightInPixels = 60;
    this.container.widthInPixels = 120;

    advancedTexture.addControl(this.container);

    let bg = new GUI.Image();
    bg.source =  Images.data.items_bg;
    bg.widthInPixels = width;
    bg.heightInPixels = 45;
    this.container.addControl(bg);

    this.img = new GUI.Image();
    this.img.source =  Images.data.heart;
    this.img.widthInPixels = 60;
    this.img.heightInPixels = 60;
    // this.img .paddingRight = 9;
    this.img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.container.addControl(this.img);

    this.counter = new GUI.TextBlock();
    this.counter.text = "0";
    this.counter.clipContent = false;

    this.counter.fontFamily = "PeaceSans";
    this.counter.widthInPixels = 80;
    this.counter.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.counter.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.counter.fontSize = 22;
    this.counter.color = "#FFFFFF";
    this.counter.outlineWidth = 0;
    this.counter.leftInPixels = 0;
    this.container.addControl(this.counter);

    const _data = {
      xScale: this.img.scaleX,
      yScale: this.img.scaleY,
    };
    this.tween = new TWEEN.Tween(_data)
      .to(
        {
          xScale: this.img.scaleX - 0.3,
          yScale: this.img.scaleY - 0.3,
        },
        100
      )
      .easing(TWEEN.Easing.Linear.Out)
      .onUpdate(() => {
        this.img.scaleX = _data.xScale;
        this.img.scaleY = _data.yScale;
      })
      .onComplete(() => {})
      .yoyo(true)
      .repeat(5);
  }
  setCounterText(count: string) {
    this.counter.text = count;

    if (this.isFirstTime) {
      this.isFirstTime = false;
      return;
    }

    this.tween.start();
  }

  setTexture(src: string) {
    this.img.source = src;
  }
  setPos(x: number, y: number) {
    this.container.topInPixels = x;
    this.container.leftInPixels = y;
  }
}
