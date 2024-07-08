import * as GUI from "@babylonjs/gui";
import { ILevelCompleteUIData } from "./LevelCompleteUIData";
import { EventTypes, Events } from "../Events";
import { LevelCreator } from "../LevelCreator";
import { Utils } from "../Utils";
import { Images } from "../Images";

export class GameOverUI {
  targetshits_count: GUI.TextBlock;
  yourScore_count: GUI.TextBlock;
  levelReached_count: GUI.TextBlock;
  level_title_txt: GUI.TextBlock;
  container: GUI.Container;

  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    this.container = new GUI.Container();
    this.container.adaptWidthToChildren = true;
    this.container.adaptHeightToChildren = true;
    this.container.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var img = new GUI.Image();
    img.source =  Images.data.LosePopup;
    img.widthInPixels = 480;
    img.heightInPixels = 420;
    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(img);

    var sad_img = new GUI.Image();
    sad_img.source = Images.data.sad;
    sad_img.widthInPixels = 117;
    sad_img.heightInPixels = 116;
    sad_img.topInPixels = -70;
    sad_img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    sad_img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(sad_img);

    let gameover_txt = new GUI.TextBlock();
    gameover_txt.fontFamily = "PeaceSans";
    gameover_txt.text = "GAME OVER";
    gameover_txt.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    gameover_txt.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    gameover_txt.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    gameover_txt.fontSize = 34;
    gameover_txt.topInPixels = 10;
    gameover_txt.color = "#ffffff";
    gameover_txt.outlineColor = "#002663";
    gameover_txt.outlineWidth = 6;
    this.container.addControl(gameover_txt);

    let vDiff = 90;

    let levelReached_txt = new GUI.TextBlock();
    this.setUpTextTitle(levelReached_txt, 120,  "Level Reached");

    let yourScore_txt = new GUI.TextBlock();
    this.setUpTextTitle(yourScore_txt, 80, "Your Score");

    let targetshits_txt = new GUI.TextBlock();
    this.setUpTextTitle(targetshits_txt, 38, "Targets Hit");


    this.levelReached_count = new GUI.TextBlock();
    this.setUpText(this.levelReached_count, 120, "400");

    this.yourScore_count = new GUI.TextBlock();
    this.setUpText(this.yourScore_count, 80, "10,000");

    this.targetshits_count = new GUI.TextBlock();
    this.setUpText(this.targetshits_count, 38, "300");


    var self = this;
    var close_btn = new GUI.Image();
    close_btn.source = Images.data.CloseBtn;
    close_btn.widthInPixels = 55;
    close_btn.heightInPixels = 55;
    close_btn.leftInPixels = -18;
    close_btn.topInPixels = 5;
    close_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    close_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.container.addControl(close_btn);
    close_btn.onPointerClickObservable.add(() => {
      self.hidePopup();
      //console.log("Restart Level");
      LevelCreator.instane.restart();
      // temporary
      Utils.pause(false);
    });
    advancedTexture.addControl(this.container);
  }

  setUpTextTitle(textBlock: GUI.TextBlock, topInPixels: number, txt: string) {
    textBlock.fontFamily = "PeaceSans";
    textBlock.text = txt;
    textBlock.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    textBlock.fontSize = 30;
    textBlock.topInPixels = topInPixels;
    textBlock.leftInPixels = 50;
    textBlock.color = "#1979B3";
    textBlock.outlineWidth = 0;
    this.container.addControl(textBlock);
  }
  setUpText(TextBlock: GUI.TextBlock, topInPixels: number, txt: string) {
    TextBlock.fontFamily = "PeaceSans";
    TextBlock.text = txt;
    TextBlock.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    TextBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    TextBlock.highlightLineWidth = 0;
    TextBlock.clipContent = false;
    TextBlock.fontSize = 35;
    TextBlock.topInPixels = topInPixels;
    TextBlock.leftInPixels = -80;
    TextBlock.color = "#FAF8F9";

    TextBlock.outlineWidth = 4;
    TextBlock.outlineColor = "#1A1A3E";
    this.container.addControl(TextBlock);
  }
  showPopup(currentLevel: number, currentScore: number, targetHits: number) {
    this.container.isEnabled = true;
    this.container.isVisible = true;

    this.yourScore_count.text = currentScore.toString();
    this.levelReached_count.text = currentLevel.toString();
    this.targetshits_count.text = targetHits.toString();
  }
  hidePopup() {
    this.container.isEnabled = false;
    this.container.isVisible = false;
  }
}
