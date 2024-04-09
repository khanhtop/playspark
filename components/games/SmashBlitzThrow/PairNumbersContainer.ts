export class PairNumbersContainer {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  counterLeft: Phaser.GameObjects.Text;
  counterRight: Phaser.GameObjects.Text;
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
      .setPadding(10,0,10,0)

    let counterStr = "0";
    if (counter > 0) counterStr = Math.trunc(counter / 10).toString();
    this.counterLeft = _scene.add
      .text(7, -1, counterStr, font)
      .setOrigin(1, 0.5)
      .setCrop(0, 0, 200, 200);
    counterStr = (counter % 10).toString();
    this.counterRight = _scene.add
      .text(7, -1, counterStr, font)
      .setOrigin(0, 0.5)
      .setCrop(0, 0, 200, 200);

    let bg = _scene.add
      .sprite(0, 0, "score_pan")
      .setOrigin(0.5, 0.5)

      .setDisplaySize(100, 70);

    this.container.add(bg);
    this.container.add(this.counterLeft);
    this.container.add(this.counterRight);
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
    let counterStr = "0";
    if (counter > 0) counterStr = Math.trunc(counter / 10).toString();
    this.counterLeft.setText(counterStr);
    counterStr = (counter % 10).toString();
    this.counterRight.setText(counterStr);
  }
}
