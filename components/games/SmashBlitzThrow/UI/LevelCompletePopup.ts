import { LevelManager } from "../LevelManager";
import { PlayerContainer } from "../Player/PlayerContainer";
import { PlayerController } from "../Player/PlayerController";

export class LevelCompletePopup {
  scene: Phaser.Scene;
  group: Phaser.GameObjects.Container;
  title: Phaser.GameObjects.Text;
  earnedCoinTitle: Phaser.GameObjects.Text;
  targetHit: Phaser.GameObjects.Text;
  score: Phaser.GameObjects.Text;
  //blach_bg: () => Phaser.GameObjects.Graphics;
  blach_bg: Phaser.GameObjects.Graphics;
  drawBlackBg: () => void;
  nextLevelTitle: Phaser.GameObjects.Text;

  constructor(_scene: Phaser.Scene, width: number, height: number) {
    this.scene = _scene;

    this.blach_bg = _scene.add.graphics();

    let diff = 50;
    this.drawBlackBg = () => {
      this.blach_bg
        .clear()
        .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
        .fillRect(0, 0, width, height)
        .setInteractive();
    };
    this.drawBlackBg();

    this.group = _scene.add.container();
    let font = {
      fontFamily: "budget_font",
      fontSize: "30px",
      fill: "#393D61",
    };

    let bebas_font = {
      fontFamily: "bebas_font",
      fontSize: "25px",
      fill: "#393D61",
    };

    this.title = _scene.add
      .text(0, -140, `LEVEL XX COMPLETE!`, font)
      .setOrigin(0.5, 0)
      .setSize(200, 500)
      .setAlign("center")
      .setPadding(0, 0, 10, 0);
    //.setCrop(0, 0, 200, 500);

    let targetHitTitle = _scene.add
      .text(10 - diff, -70, `TARGETS HIT:`, bebas_font)
      .setOrigin(0, 0.5)
      .setSize(200, 500)

      .setAlign("left")
      .setCrop(0, 0, 200, 500);

    this.targetHit = _scene.add
      .text(115 - diff, -70, `00`, bebas_font)
      .setOrigin(0, 0.5)
      .setSize(200, 500)

      .setAlign("left");
    //  .setCrop(0, 0, 200, 500);

    let scoreTitle = _scene.add
      .text(10 - diff, -40, `SCORE:`, bebas_font)
      .setOrigin(0, 0.5)
      .setSize(200, 500)
      .setAlign("left")

      .setCrop(0, 0, 200, 500);

    this.score = _scene.add
      .text(70 - diff, -40, `000`, bebas_font)
      .setOrigin(0, 0.5)
      .setSize(200, 500)
      .setAlign("left");

    this.nextLevelTitle = _scene.add
      .text(8 - diff, 0, `Next Level (Level ${0})`, bebas_font)
      .setOrigin(0, 0.5)
      .setSize(200, 500)
      .setAlign("left")

      .setCrop(0, 0, 200, 500);

    this.earnedCoinTitle = _scene.add
      .text(8 - diff, 35, `Hit ${0} targets in ${0} seconds`, bebas_font)
      .setOrigin(0, 0.5)
      .setAlign("left");
    //.setColor("#E6452A");

    /*let coins = _scene.add
      .sprite(50, 35, "coins")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(45, 45);*/

    let blue_btn = _scene.add
      .sprite(0, 110, "blue_btn")
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDisplaySize(120 * 1.3, 90 * 1.3);

    blue_btn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>
      _scene.events.emit("LevelCompletePopup:onClaimBtnClick")
    );

    _scene.events.on(
      "LevelCompletePopup:show",
      (level: number, coins: number, targetHit: number, score: number) => {
        this.show(level, coins, targetHit, score);
      }
    );

    let claimTitle = _scene.add
      .text(0, 97 + 10, `CLAIM`, font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 500)
      .setFontSize(40)
      .setAlign("center")
      .setColor("#ffffff")
      .setPadding(0, 0, 5, 0);
    // .setFontStyle("bold");
    //.setPadding(0,50,0,50)
    //.setCrop(0, 0, 200, 500);

    /* let green_ads_btn = _scene.add
      .sprite(80, 100, "green_ads_btn")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(120 * 1.3, 90 * 1.6);
*/
    let bg = _scene.add
      .sprite(0, 0, "popup_bg")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(500, 500)
      .setInteractive();

    //this.group.add(  this.blach_bg);
    //this.blach_bg
    //let playerCharacter =  Object.assign({}, PlayerController.instance.container);//{ ...PlayerController.instance.container } as Phaser.GameObjects.Container ;

    //{ ...PlayerController.instance.container } as Phaser.GameObjects.Container ;
    let c = _scene.add.group({
      classType: PlayerContainer,
      maxSize: 1,
      runChildUpdate: true,
    });
    let playerCharacter = c.get();
    playerCharacter.setScale(0.8, 0.8);
    playerCharacter.setPosition(-120, 70);

    this.group.add(bg);
    this.group.add(playerCharacter);
    this.group.add(this.title);
    this.group.add(targetHitTitle);
    this.group.add(scoreTitle);
    this.group.add(this.nextLevelTitle);
    this.group.add(this.earnedCoinTitle);
    //this.group.add(coins);
    this.group.add(blue_btn);
    //this.group.add(green_ads_btn);
    this.group.add(claimTitle);
    this.group.add(this.score);
    this.group.add(this.targetHit);

    // _scene.events.on("CountDownTimer:getUpdate", (counter: number) => {
    //   if (counter > 10) this.counter.setText(counter.toString());
    //   else this.counter.setText(`0${counter.toString()}`);
    // });

    // _scene.events.on("CountDownTimer:onComplete", () => {
    //   //console.log("CountDownTimer:onComplete");
    //   this.counter.setText("00");
    // });
  }
  private show(level: number, coins: number, targetHit: number, score: number) {
    this.drawBlackBg();

    this.group.visible = true;
    this.title.setText(`LEVEL ${level} COMPLETE!`);
    this.earnedCoinTitle.setText(`${coins} COINS!`);
    this.score.setText(score.toString());
    this.targetHit.setText(targetHit.toString());

    let nextLevelTxt = "";
    let tergetTxt = "";

    if (level < LevelManager.instance.data.length - 1) {
      let targetCount = LevelManager.instance.data[level][0];
      let timer = LevelManager.instance.data[level][1];

      nextLevelTxt = `Next Level (Level ${level + 1})`;
      tergetTxt = `Hit ${targetCount} targets in ${timer} seconds`;
    }
    this.nextLevelTitle.setText(nextLevelTxt);
    this.earnedCoinTitle.setText(tergetTxt);
  }
  public hide() {
    this.blach_bg.clear();
    this.group.visible = false;
  }
  public setPos(x: number, y: number) {
    this.group.setPosition(x, y);
  }
}
