import * as GUI from "@babylonjs/gui";
import { ILevelCompleteUIData } from "./LevelCompleteUIData";
import { EventTypes, Events } from "../Events";
import { LevelCreator } from "../LevelCreator";
import { Images } from "../Images";
import { levels } from "../Levels/Level1";
import { GUI2DParticle } from "./GUI2DParticle";

export class LevelCompleteUI {
  fillEllipse: GUI.Ellipse;
  level: string;
  levelScore: string;
  targetsHits: string;
  totalScore: string;
  timeBonus: string;
  nextLevel: string;
  nextLevelHitTargets: string;
  hitTargets_txt: GUI.TextBlock;
  nextLevel_txt: GUI.TextBlock;
  totalScore_count: GUI.TextBlock;
  targetshits_count: GUI.TextBlock;
  timeBonus_count: any;
  levelScore_count: GUI.TextBlock;
  level_title_txt: GUI.TextBlock;
  container: GUI.Container;
  next_level_time: GUI.TextBlock;
  next_btn: GUI.Image;
  btn_base: GUI.Button;
  target_img: any;
  hourglass_img: GUI.Image;
  next_level_bg: GUI.Image;
  greatWork: GUI.TextBlock;
  completed_all_levels: GUI.TextBlock;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    this.container = new GUI.Container();
    this.container.adaptWidthToChildren = true;
    this.container.adaptHeightToChildren = true;
    this.container.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var img = new GUI.Image();
    img.source = Images.data.PopupBig;
    img.widthInPixels = 480;
    img.heightInPixels = 600;
    img.sourceWidth = 480;
    img.sourceHeight = 600;

    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(img);

    var img = new GUI.Image();
    img.source = Images.data.starsBg;
    img.widthInPixels = 200 * 1.15;
    img.heightInPixels = 76 * 1.15;
    img.topInPixels = 85;
    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.container.addControl(img);

    var img = new GUI.Image();
    img.source = Images.data.CenterStar;
    img.widthInPixels = 193 * 0.3;
    img.heightInPixels = 189 * 0.3;
    img.topInPixels = 85;
    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.container.addControl(img);

    var img = new GUI.Image();
    img.source = Images.data.RightStar;
    img.widthInPixels = 193 * 0.3;
    img.heightInPixels = 189 * 0.3;
    img.topInPixels = 100;
    img.leftInPixels = 70;
    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.container.addControl(img);

    var img = new GUI.Image();
    img.source = Images.data.LeftStar;
    img.widthInPixels = 193 * 0.3;
    img.heightInPixels = 189 * 0.3;
    img.topInPixels = 100;
    img.leftInPixels = -70;
    //img.scaleX = -1
    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.container.addControl(img);

    this.next_level_bg = new GUI.Image();
    this.next_level_bg.source = Images.data.nextlvl_bg;
    this.next_level_bg.widthInPixels = 365;
    this.next_level_bg.heightInPixels = 108;
    this.next_level_bg.sourceWidth = 365;
    this.next_level_bg.sourceHeight = 108;

    this.next_level_bg.topInPixels = 140;
    this.next_level_bg.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.next_level_bg.verticalAlignment =
      GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(this.next_level_bg);

    this.level_title_txt = new GUI.TextBlock();
    this.level_title_txt.fontFamily = "PeaceSans";
    this.level_title_txt.text = "Level 3 Complete!";
    this.level_title_txt.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.level_title_txt.fontSize = 32;
    //this.level_title_txt.fontStyle = "bold";
    this.level_title_txt.topInPixels = -95;
    this.level_title_txt.leftInPixels = 0;
    this.level_title_txt.color = "#0B1B70";
    this.level_title_txt.outlineColor = "#88B5DF";
    this.level_title_txt.outlineWidth = 4;
    this.container.addControl(this.level_title_txt);

    let victory_txt = new GUI.TextBlock();
    victory_txt.fontFamily = "PeaceSans";
    victory_txt.text = "VICTORY";
    victory_txt.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    victory_txt.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    victory_txt.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    victory_txt.fontSize = 34;
    //victory_txt.fontStyle = "bold";
    victory_txt.topInPixels = 5;
    victory_txt.color = "#ffffff";
    victory_txt.outlineColor = "#002663";
    victory_txt.outlineWidth = 6;
    this.container.addControl(victory_txt);

    let vDiff = 40;
    let hDiff = 170;
    var details = new GUI.Container();
    details.leftInPixels = 50;
    details.topInPixels = -100;
    this.container.addControl(details);

    let targetshits_txt = new GUI.TextBlock();
    this.setUpTextTitle(targetshits_txt, -56, "Targets Hit");
    this.targetshits_count = new GUI.TextBlock();
    this.setUpText( this.targetshits_count ,-56, "32");


    let timeBonus_txt = new GUI.TextBlock();
    this.setUpTextTitle(timeBonus_txt, -18, "Time Bonus");
    this.timeBonus_count = new GUI.TextBlock();
    this.setUpText( this.timeBonus_count ,-18, "5");


    let levelScore_txt = new GUI.TextBlock();
    this.setUpTextTitle(levelScore_txt, 18, "Level Score");
    this.levelScore_count = new GUI.TextBlock();
    this.setUpText( this.levelScore_count ,18, "1,000");


    let totalScore_txt = new GUI.TextBlock();
    this.setUpTextTitle(totalScore_txt, 55, "Total Score");
    this.totalScore_count = new GUI.TextBlock();
    this.setUpText( this.totalScore_count ,55, "12,000");


    this.nextLevel_txt = new GUI.TextBlock();
    this.nextLevel_txt.fontFamily = "PeaceSans";
    this.nextLevel_txt.text = "Next Level: 4";
    this.nextLevel_txt.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.nextLevel_txt.fontSize = 25;
    // this.nextLevel_txt.fontStyle = "bold";
    this.nextLevel_txt.topInPixels = 220;
    this.nextLevel_txt.leftInPixels = -50;
    this.nextLevel_txt.color = "#FAF8F9";
    this.nextLevel_txt.outlineWidth = 4;
    this.nextLevel_txt.outlineColor = "#1A1A3E";
    details.addControl(this.nextLevel_txt);

    this.hitTargets_txt = new GUI.TextBlock();
    this.hitTargets_txt.fontFamily = "PeaceSans";
    this.hitTargets_txt.text = "X5";
    this.hitTargets_txt.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.hitTargets_txt.fontSize = 30;
    this.hitTargets_txt.topInPixels = 262;
    this.hitTargets_txt.leftInPixels = 108;
    this.hitTargets_txt.color = "#FAF8F9";
    this.hitTargets_txt.outlineWidth = 4;
    this.hitTargets_txt.outlineColor = "#1A1A3E";
    details.addControl(this.hitTargets_txt);

    this.next_level_time = new GUI.TextBlock();
    this.next_level_time.fontFamily = "PeaceSans";
    this.next_level_time.text = "30 sec";
    this.next_level_time.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.next_level_time.fontSize = 30;
    this.next_level_time.topInPixels = 260;
    this.next_level_time.leftInPixels = 248;
    this.next_level_time.color = "#FAF8F9";
    this.next_level_time.outlineWidth = 4;
    this.next_level_time.outlineColor = "#1A1A3E";
    details.addControl(this.next_level_time);

    this.hourglass_img = new GUI.Image();
    this.hourglass_img.source = Images.data.Hourglass;
    this.hourglass_img.widthInPixels = 165 / 4.8;
    this.hourglass_img.heightInPixels = 205 / 4.8;
    this.hourglass_img.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.hourglass_img.verticalAlignment =
      GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.hourglass_img.topInPixels = 260;
    this.hourglass_img.leftInPixels = -15;
    details.addControl(this.hourglass_img);

    this.target_img = new GUI.Image();
    this.target_img.source = Images.data.Booster05;
    this.target_img.widthInPixels = 184 / 4.8;
    this.target_img.heightInPixels = 192 / 4.8;
    this.target_img.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.target_img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.target_img.topInPixels = 260;
    this.target_img.leftInPixels = -155;
    details.addControl(this.target_img);

    this.btn_base = GUI.Button.CreateImageOnlyButton("but", Images.data.BtnBase);

    this.btn_base.widthInPixels = 190 / 1.3;
    this.btn_base.heightInPixels = 74 / 1.3;
    this.btn_base.topInPixels = 240;
    this.btn_base.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.btn_base.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.btn_base.isPointerBlocker = false;
    //btn_base.color = "transparent";
    this.container.addControl(this.btn_base);

    //var next_btn = GUI.Button.CreateImageOnlyButton("but", Images.data.NextBtn);

    this.next_btn = new GUI.Image();
    this.next_btn.source = Images.data.NextBtn;
    this.next_btn.widthInPixels = 190 / 1.3;
    this.next_btn.heightInPixels = 74 / 1.3;
    this.next_btn.topInPixels = 230;
    this.next_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.next_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.next_btn.isPointerBlocker = true;
    this.next_btn.color = "transparent";
    this.container.addControl(this.next_btn);
    this.next_btn.onPointerClickObservable.add(function () {
      Events.ui.notifyObservers({ type: EventTypes.CONTINUE_BTN_CLICKED });
    });

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
    close_btn.onPointerClickObservable.add(function () {
      //
      Events.ui.notifyObservers({ type: EventTypes.ON_LEVEL_COMPLETE_UI_CLOSE_BTN_CLICKED });

    });
    advancedTexture.addControl(this.container);


    this.greatWork = new GUI.TextBlock();
    this.greatWork.fontFamily = "PeaceSans";
    this.greatWork.text = "Great Work!";
    this.greatWork.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
      this.greatWork.fontSize = 32;
    this.greatWork.topInPixels = 120;
    this.greatWork.leftInPixels = 0;
    this.greatWork.color = "#0B1B70";
    this.greatWork.outlineColor = "#88B5DF";
    this.greatWork.outlineWidth = 4;
    this.container.addControl(  this.greatWork);


    let levelCount = levels.length;
    this.completed_all_levels = new GUI.TextBlock();
    this.completed_all_levels.clipChildren = false;
    this.completed_all_levels.clipContent = false;
    this.completed_all_levels.fontFamily = "PeaceSans";
    this.completed_all_levels.text = `You completed all ${levelCount} levels!`;
    this.completed_all_levels.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.completed_all_levels.fontSize = 23;
    this.completed_all_levels.topInPixels = 260;
    this.completed_all_levels.leftInPixels = 30;
    this.completed_all_levels.color = "#FAF8F9";
    this.completed_all_levels.outlineWidth = 4;
    this.completed_all_levels.outlineColor = "#1A1A3E";
    details.addControl(this.completed_all_levels);


    new GUI2DParticle ();
    /* var g_img = new GUI.Image();
    g_img.source = Images.data.3;
    g_img.alpha = 0.5;
    // g_img.widthInPixels = 480;
    // g_img.heightInPixels = 600;
    g_img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    g_img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(g_img);*/

    //advancedTexture.addControl(container);
  }

  setUpTextTitle(textBlock: GUI.TextBlock, topInPixels: number, txt: string) {
    textBlock.fontFamily = "PeaceSans";
    textBlock.text = txt;
    textBlock.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    textBlock.fontSize = 30;
   // textBlock.fontStyle = "bold";
    textBlock.topInPixels = topInPixels;
    textBlock.leftInPixels = 67;
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
    TextBlock.leftInPixels = -60;
    TextBlock.color = "#FAF8F9";

    TextBlock.outlineWidth = 4;
    TextBlock.outlineColor = "#1A1A3E";
    this.container.addControl(TextBlock);
  }

  showPopup(data: ILevelCompleteUIData) {
    this.container.isEnabled = true;
    this.container.isVisible = true;

    this.level_title_txt.text = `Level ${data.levelNum} Complete!`;
    this.levelScore_count.text = data.levelScore.toString();
    this.timeBonus_count.text = data.timeBonus.toString();
    this.targetshits_count.text = data.targetsHits.toString();

    this.totalScore_count.text = data.totalScore.toString();

    if (data.nextLevel == undefined) this.nextLevel_txt.text = "";
    else this.nextLevel_txt.text = "Next Level: " + data.nextLevel;

    if (data.nextLevelHitTargets == undefined) this.hitTargets_txt.text = "";
    else this.hitTargets_txt.text = `X${data.nextLevelHitTargets}`;

    if (data.nextLevelTime == undefined) this.next_level_time.text = "";
    else this.next_level_time.text = `${data.nextLevelTime} sec`;

    if (data.nextLevel == undefined) {
      this.btn_base.isVisible = false;
      this.next_btn.isVisible = false;
      this.btn_base.isEnabled = false;
      this.next_btn.isEnabled = false;

      this.hourglass_img.isEnabled = false;
      this.target_img.isEnabled = false;
      this.hourglass_img.isVisible = false;
      this.target_img.isVisible = false;

      this.completed_all_levels.isVisible = true;
      this.greatWork.isVisible = true;

      

    } else {
      this.btn_base.isVisible = true;
      this.next_btn.isVisible = true;
      this.btn_base.isEnabled = true;
      this.next_btn.isEnabled = true;

      this.hourglass_img.isEnabled = true;
      this.target_img.isEnabled = true;
      this.hourglass_img.isVisible = true;
      this.target_img.isVisible = true;

      this.completed_all_levels.isVisible = false;
      this.greatWork.isVisible = false;

      
    }
    GUI2DParticle.instanc.animate(true);


  }
  hidePopup() {
    GUI2DParticle.instanc.animate(false);
    this.container.isEnabled = false;
    this.container.isVisible = false;
  }
}
