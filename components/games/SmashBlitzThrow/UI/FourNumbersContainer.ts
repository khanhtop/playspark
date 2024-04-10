import { separateDigits } from "../Helper";

export class FourNumbersContainer {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  numberContainer: Phaser.GameObjects.Container;
  counter1: Phaser.GameObjects.Text;
  counter2: Phaser.GameObjects.Text;
  counter3: Phaser.GameObjects.Text;
  counter4: Phaser.GameObjects.Text;
  title: Phaser.GameObjects.Text;
  constructor(
    _scene: Phaser.Scene,
    x: number,
    y: number,
    counter: number,
    title: string,
    color: string,
    scale: number = 1
  ) {
    this.scene = _scene;
    this.container = _scene.add.container(x, y);
    this.numberContainer = _scene.add.container(0, 0);
    let font = {
      fontFamily: "score_font",
      fontSize: "50px",
      fill: color,
    };

    let title_font = {
      fontFamily: "budget_font",
      fontSize: "25px",
      fill: "#ffffff",
    };

    this.title = _scene.add
      .text(0, -50, title, title_font)
      .setOrigin(0.5, 0.5)
      //.setCrop(0, 0, 300, 200)
      .setPadding(10, 0, 10, 0);

    let counterStr = "0";

    this.counter1 = _scene.add
      .text(50, -1, counterStr, font)
      .setOrigin(0.5, 0.5)
      .setCrop(0, 0, 200, 200);

    this.counter2 = _scene.add
      .text(15, -1, counterStr, font)
      .setOrigin(0.5, 0.5)
      .setCrop(0, 0, 200, 200);

    this.counter3 = _scene.add
      .text(-20, -1, counterStr, font)
      .setOrigin(0.5, 0.5)
      .setCrop(0, 0, 200, 200);

    this.counter4 = _scene.add
      .text(-55, -1, counterStr, font)
      .setOrigin(0.5, 0.5)
      .setCrop(0, 0, 200, 200);

    let bg = _scene.add
      .sprite(0, 0, "score_pan")
      .setOrigin(0.5, 0.5)

      .setDisplaySize(170, 70);

    this.numberContainer.add(this.counter1);
    this.numberContainer.add(this.counter2);
    this.numberContainer.add(this.counter3);
    this.numberContainer.add(this.counter4);
    this.numberContainer.setPosition(10, 0);

    this.container.add(bg);

    this.container.add(this.numberContainer);
    this.container.add(this.title);
    this.container.setScale(scale);

    /* _scene.events.on("CountDownTimer:getUpdate", (counter: number) => {
      if (counter > 10) this.counterLeft.setText(counter.toString());
      else this.counterLeft.setText(`0${counter.toString()}`);
    });

    _scene.events.on("CountDownTimer:onComplete", () => {
      //console.log("CountDownTimer:onComplete");
      this.counterLeft.setText("0");
    });*/
  }

  setText(counter: number) {
    let nums = separateDigits(counter);
    this.counter1.setText(nums[0] == undefined ? "0" : `${nums[0]}` );
    this.counter2.setText(nums[1] == undefined ? "0" : `${nums[1]}`);
    this.counter3.setText(nums[2] == undefined ? "0" : `${nums[2]}`);
    this.counter4.setText(nums[3] == undefined ? "0" : `${nums[3]}`);
  }

}
