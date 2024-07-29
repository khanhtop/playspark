import * as GUI from "@babylonjs/gui";
import { ILevelCompleteUIData } from "./LevelCompleteUIData";
import { EventTypes, Events } from "../Events";
import { LevelCreator } from "../LevelCreator";
import { Images } from "../Images";
import { Color4, EngineStore, IImage } from "@babylonjs/core";
import { GameData } from "../GameData";

export class PauseUI {
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
  score_count: GUI.TextBlock;
  timeBonus_count: any;
  levelScore_count: GUI.TextBlock;
  level_title_txt: GUI.TextBlock;
  container: GUI.Container;
  next_level_time: GUI.TextBlock;
  musicSwitchBtn: GUI.Image;
  sfxSwitchBtn: GUI.Image;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    this.container = new GUI.Container();
    this.container.adaptWidthToChildren = true;
    this.container.adaptHeightToChildren = true;
    this.container.clipChildren = false;
    this.container.clipContent = false;

    this.container.horizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var img = new GUI.Image();
    img.clipChildren = false;
    img.clipContent = false;
    img.source = Images.data.PopupBig;
    img.widthInPixels = 480;
    img.heightInPixels = 600;
    img.sourceWidth = 480;
    img.sourceHeight = 600;

    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    img.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(img);

    var modal_header = new TintedImage();
    modal_header.clipChildren = false;
    modal_header.clipContent = false;
    modal_header.source = Images.data.ModalHeader;
    modal_header.sourceWidth = 430;
    modal_header.sourceHeight = 84;
    modal_header.widthInPixels = 460;
    modal_header.heightInPixels = 100;
    modal_header.setWFactor(2);

    modal_header.onImageLoadedObservable.addOnce(() => {
      modal_header.tint = Color4.FromHexString(
        GameData.instance.getPrimaryColor()
      );
    });

    //  modal_header.topInPixels = 0;
    modal_header.leftInPixels = -10;
    modal_header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    modal_header.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.container.addControl(modal_header);

    this.level_title_txt = new GUI.TextBlock();
    this.level_title_txt.fontFamily = "PeaceSans";
    this.level_title_txt.text = "Level 3";
    this.level_title_txt.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.level_title_txt.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.level_title_txt.fontSize = 32;
    //this.level_title_txt.fontStyle = "bold";
    this.level_title_txt.topInPixels = -200;
    //this.level_title_txt.leftInPixels = -20;
    this.level_title_txt.color = GameData.instance.getTextColor();//"#117FB2";
    this.level_title_txt.outlineWidth = 0;
    this.container.addControl(this.level_title_txt);

    let paused_txt = new GUI.TextBlock();
    paused_txt.fontFamily = "PeaceSans";
    paused_txt.text = "PAUSED";
    paused_txt.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    paused_txt.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    paused_txt.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    paused_txt.fontSize = 34;
    //victory_txt.fontStyle = "bold";
    paused_txt.topInPixels = 5;
    paused_txt.color = "#ffffff";
    paused_txt.outlineColor = "#002663";
    paused_txt.outlineWidth = 6;
    this.container.addControl(paused_txt);

    let vDiff = 40;
    let hDiff = 170;
    var details = new GUI.Container();
    details.leftInPixels = 50;
    details.topInPixels = -100;
    this.container.addControl(details);

    let score_txt = new GUI.TextBlock();
    score_txt.fontFamily = "PeaceSans";
    score_txt.text = "SCORE";
    score_txt.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    score_txt.fontSize = 30;

    score_txt.topInPixels = -40;
    score_txt.leftInPixels = 57;
    score_txt.color = GameData.instance.getTextColor();//"#1979B3";
    score_txt.outlineWidth = 0;
    details.addControl(score_txt);

    this.score_count = new GUI.TextBlock();
    this.score_count.fontFamily = "PeaceSans";
    this.score_count.text = "12,000";
    this.score_count.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.score_count.fontSize = 35;

    this.score_count.topInPixels = -40;
    this.score_count.leftInPixels = 45;
    this.score_count.color = "#FAF8F9";
    this.score_count.outlineWidth = 4;
    this.score_count.outlineColor = "#1A1A3E";
    details.addControl(this.score_count);

    let timeBonus_txt = new GUI.TextBlock();
    timeBonus_txt.fontFamily = "PeaceSans";
    timeBonus_txt.text = "AUDIO SETTINGS";
    timeBonus_txt.textHorizontalAlignment =
      GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    timeBonus_txt.fontSize = 30;
    timeBonus_txt.fontStyle = "bold";
    timeBonus_txt.topInPixels = 20;
    timeBonus_txt.leftInPixels = 55;
    timeBonus_txt.color = GameData.instance.getTextColor(); // "#1979B3";
    timeBonus_txt.outlineWidth = 0;
    details.addControl(timeBonus_txt);

    var switch_bg = new TintedImage();
    switch_bg.source = Images.data.switch;

    switch_bg.onImageLoadedObservable.addOnce(() => {
      switch_bg.tint = Color4.FromHexString(
        GameData.instance.getPrimaryColor()
      );
    });

    // getTextColor() {
    //   return this.textColor;
    // }

    switch_bg.widthInPixels = 230;
    switch_bg.heightInPixels = 70;
    switch_bg.topInPixels = -12;
    switch_bg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    switch_bg.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(switch_bg);

    var switch_bg1 = new TintedImage();
    switch_bg1.onImageLoadedObservable.addOnce(() => {
      switch_bg1.tint = Color4.FromHexString(
        GameData.instance.getPrimaryColor()
      );
    });

    switch_bg1.source = Images.data.switch;
    switch_bg1.widthInPixels = 230;
    switch_bg1.heightInPixels = 70;
    switch_bg1.topInPixels = 78;
    switch_bg1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    switch_bg1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(switch_bg1);

    var audio_icon = new GUI.Image();
    audio_icon.source = Images.data.SoundIcon;
    audio_icon.widthInPixels = 60;
    audio_icon.heightInPixels = 60;
    audio_icon.topInPixels = -10;
    audio_icon.leftInPixels = -80;
    audio_icon.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    audio_icon.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(audio_icon);

    var audio_icon = new GUI.Image();
    audio_icon.source = Images.data.MusicIcon;
    audio_icon.widthInPixels = 60;
    audio_icon.heightInPixels = 60;
    audio_icon.topInPixels = 80;
    audio_icon.leftInPixels = -80;
    audio_icon.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    audio_icon.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(audio_icon);

    var switch_base = new GUI.Image();
    switch_base.source = Images.data.switch_base;
    switch_base.widthInPixels = 150;
    switch_base.heightInPixels = 60;
    switch_base.topInPixels = 80;
    switch_base.leftInPixels = 35;
    switch_base.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    switch_base.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(switch_base);

    var switch_base = new GUI.Image();
    switch_base.source = Images.data.switch_base;
    switch_base.widthInPixels = 150;
    switch_base.heightInPixels = 60;
    switch_base.topInPixels = -10;
    switch_base.leftInPixels = 35;
    switch_base.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    switch_base.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(switch_base);

    this.sfxSwitchBtn = new GUI.Image();
    this.initSwitchBtn(this.sfxSwitchBtn, -10, true);
    this.initSwitchBtnFunc(
      this.sfxSwitchBtn,
      EventTypes.ON_SFX_BTN_STATE_CHANGED
    );
    this.setSwitchState(this.sfxSwitchBtn, false);

    this.musicSwitchBtn = new GUI.Image();
    this.initSwitchBtn(this.musicSwitchBtn, 80, true);
    this.initSwitchBtnFunc(
      this.musicSwitchBtn,
      EventTypes.ON_MUSIC_BTN_STATE_CHANGED
    );
    this.setSwitchState(this.musicSwitchBtn, false);

    var btn_base = GUI.Button.CreateImageOnlyButton("but", Images.data.BtnBase);

    btn_base.widthInPixels = 190 / 1.3;
    btn_base.heightInPixels = 74 / 1.3;
    btn_base.topInPixels = 240;
    btn_base.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    btn_base.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    btn_base.isPointerBlocker = false;
    //btn_base.color = "transparent";
    this.container.addControl(btn_base);

    //var next_btn = GUI.Button.CreateImageOnlyButton("but", Images.data.NextBtn);

    var save_btn = new GUI.Image();
    save_btn.source = Images.data.SaveBtn;
    save_btn.widthInPixels = 190 / 1.3;
    save_btn.heightInPixels = 74 / 1.3;
    save_btn.topInPixels = 230;
    save_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    save_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    save_btn.isPointerBlocker = true;
    save_btn.color = "transparent";
    this.container.addControl(save_btn);
    save_btn.onPointerClickObservable.add(function () {
      Events.ui.notifyObservers({ type: EventTypes.SAVE_BTN_CLICKED });
      Events.gamePlay.notifyObservers({
        type: EventTypes.ON_PAUSE_POPUP_CLOSED,
      });
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
      Events.gamePlay.notifyObservers({
        type: EventTypes.ON_PAUSE_POPUP_CLOSED,
      });
    });
    advancedTexture.addControl(this.container);
  }

  private initSwitchBtnFunc(switch_btn: GUI.Image, type: EventTypes) {
    switch_btn.onPointerClickObservable.add(function () {
      if (switch_btn.leftInPixels == 70) {
        switch_btn.leftInPixels = 0;
        Events.ui.notifyObservers({ type: type, state: false });
      } else {
        switch_btn.leftInPixels = 70;
        Events.ui.notifyObservers({ type: type, state: true });
      }
    });
  }

  private initSwitchBtn(
    switch_btn: GUI.Image,
    topInPixels: number,
    state: boolean
  ) {
    switch_btn.source = Images.data.Handler;
    switch_btn.widthInPixels = 80;
    switch_btn.heightInPixels = 60;
    switch_btn.topInPixels = topInPixels;

    this.setSwitchState(switch_btn, state);

    switch_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    switch_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.container.addControl(switch_btn);
  }

  private setSwitchState(switch_btn: GUI.Image, state: boolean) {
    if (state) switch_btn.leftInPixels = 70;
    else switch_btn.leftInPixels = 0;
  }

  showPopup(music: boolean, sfx: boolean, level: number, score: number) {
    this.container.isEnabled = true;
    this.container.isVisible = true;

    this.score_count.text = score.toString();
    this.level_title_txt.text = `Level ${level}`;

    this.setSwitchState(this.musicSwitchBtn, music);
    this.setSwitchState(this.sfxSwitchBtn, sfx);
  }
  hidePopup() {
    this.container.isEnabled = false;
    this.container.isVisible = false;
  }
}

class TintedImage extends GUI.Image {
  private _tint: Color4;
  private _originalDomImage: IImage;
  private wFactor: number = 1;
  private hFactor: number = 1;
  constructor(name?: string, url?: string) {
    super(name, url);
  }

  setWFactor(factor: number) {
    this.wFactor = factor;
  }
  setHFactor(factor: number) {
    this.hFactor = factor;
  }

  get tint() {
    return this._tint;
  }
  set tint(value: Color4) {
    if (this._originalDomImage == undefined) {
      this._originalDomImage = this.domImage;
    }
    this._tint = value;

    // create a temp context to tint the image
    // 1: draw the tint color on the image canvas
    // 2: draw the greyscale image ontop, this will create a solid tint color cutout of the greyscale image
    //   destination-atop
    //   The existing canvas is only kept where it overlaps the new shape. The new shape is drawn behind the canvas content.
    // 3: draw the color image back onto the dom image, multiply seems to work better since in color white stays white and we want white to become the new color
    // color
    //  Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
    // multiply
    //  The pixels of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
    let cutoutCanvas = document.createElement("canvas");
    let cutoutContext = cutoutCanvas.getContext("2d");
    cutoutCanvas.width = this.imageWidth * this.wFactor;
    cutoutCanvas.height = this.imageHeight * this.hFactor;
    // fill offscreen buffer with the tint color
    cutoutContext.fillStyle = this._tint.toHexString();
    cutoutContext.fillRect(0, 0, cutoutCanvas.width, cutoutCanvas.height);

    // now we have a context filled with the tint color
    cutoutContext.globalCompositeOperation = "destination-atop";
    cutoutContext.drawImage(this._originalDomImage as CanvasImageSource, 0, 0);

    // now we cut out the greyscale image and have just the cutout left
    let imageCanvas = document.createElement("canvas");
    let imageCanvasContext = imageCanvas.getContext("2d");
    imageCanvas.width = this.imageWidth * this.wFactor;
    imageCanvas.height = this.imageHeight * this.hFactor;
    imageCanvasContext.drawImage(
      this._originalDomImage as CanvasImageSource,
      0,
      0
    );

    // now we have the greyscale on the image canvas
    imageCanvasContext.globalCompositeOperation = "multiply";
    // imageCanvasContext.fillStyle = this._tint.toHexString();
    // imageCanvasContext.fillRect(0,0,imageCanvas.width,imageCanvas.height);
    imageCanvasContext.drawImage(cutoutCanvas, 0, 0);
    // now we have a tinted image on the image canvas
    // is there no faster way than this?
    // Stolen from GUI.Image
    const engine =
      this._host?.getScene()?.getEngine() || EngineStore.LastCreatedEngine;
    this.domImage = engine.createCanvasImage();

    this.domImage.src = imageCanvas.toDataURL();
  }
}
