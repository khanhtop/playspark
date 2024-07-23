import * as GUI from "@babylonjs/gui";
import { Events } from "../Events";
import { Images } from "../Images";

export class ScoreUI {
  counter: GUI.TextBlock;
  fillEllipse: GUI.Ellipse;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
   

    let size = 200;
    let diff = 5;
    let height = 70;

    var container = new GUI.Container();
    container.adaptWidthToChildren = true;
    container.heightInPixels = height;
    container.widthInPixels = size;
    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.topInPixels = 90;
    advancedTexture.addControl(container);

    var img = new GUI.Image();
    img.source = Images.data.scorebg;
    img.widthInPixels = size;
    img.heightInPixels = height - diff;
    container.addControl(img);

    this.counter = new GUI.TextBlock();
    this.counter.fontFamily = "PeaceSans";
    this.counter.text = "00";
    this.counter.color = "white";
    this.counter.width = size;
    this.counter.fontSize = 30;
    this.counter.topInPixels = 14;
    container.addControl(this.counter);

    let score_title = new GUI.TextBlock();
    score_title.text = "SCORE";
    score_title.fontFamily = "PeaceSans";
    score_title.color = "white";
    score_title.width = size;
    score_title.fontSize = 20;
    score_title.topInPixels = -15;
    container.addControl(score_title);

  }

  setCounterText(count: string) {
    this.counter.text = count;
  }
}
