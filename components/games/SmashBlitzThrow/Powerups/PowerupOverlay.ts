import { GAME_STATES } from "../Consts";
import { Global } from "../Global";
import { setHorizontalGradientToText } from "../Helper";
import { BlackBG } from "../UI/BlackBG";

export class PowerupOverlay extends Phaser.GameObjects.Container {
  scene!: Phaser.Scene;
  private blackBG: BlackBG;
  private font: { fontFamily: string; fontSize: string; fill: string };
  private title: Phaser.GameObjects.Text;
  private mesg: Phaser.GameObjects.Text;
  clickArea: Phaser.GameObjects.Sprite;

  constructor(_scene: Phaser.Scene) {
    super(_scene);
    let width = _scene.renderer.width;
    let height = _scene.renderer.height;

    this.clickArea = _scene.add
      .sprite(width / 2, height / 2, "bg")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height)
      .setAlpha(0.001)
      .setInteractive();

    this.scene = _scene;
    this.blackBG = BlackBG.getInstance(_scene, this);

    this.clickArea.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      (pointer: any) => {
        // alert("HH");
        this.hide();
      }
    );
    this.font = {
      fontFamily: "titan_one_regular",
      fontSize: "60px",
      fill: "#ffffff",
    };
    this.title = this.addText(0, 0, 60);
    this.mesg = this.addText(0, 50, 25);



  }

  //str=

  private addText(x: number, y: number, fntSize: number) {
    let text = this.scene.add
      .text(x, y, "", this.font)
      .setOrigin(0.5, 0.5)
      .setAlign("center")
      .setFontSize(fntSize);

    this.add(text);
    return text;
  }
  setTitleText(str: string, grd: any[]) {
    this.title.setText(str);
    setHorizontalGradientToText(this.title, grd);
  }
  setMsgText(str: string, grd: any[]) {
    this.mesg.setText(str);
    setHorizontalGradientToText(this.mesg, grd);
  }
  show() {
    Global.gameState = GAME_STATES.POEWR_UP_MODAL;
    this._show(true);
  }
  hide() {
    Global.gameState = GAME_STATES.PLAYING;
    this._show(false);
  }
  private _show(value: boolean) {
    this.blackBG.setShowState(value);
    this.visible = value;
    this.clickArea.setVisible(value);
    this.clickArea.setInteractive(value);
    this.title.setVisible(value);
    this.mesg.setVisible(value);
  }
  public static getInstance(_scene: Phaser.Scene): PowerupOverlay {
    if (!PowerupOverlay.instance) {
      PowerupOverlay.instance = new PowerupOverlay(_scene);
    }
   // parent.add(PowerupOverlay.instance);
    return PowerupOverlay.instance;
  }
  private static instance: PowerupOverlay;
}
