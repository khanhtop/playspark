export class TimerContainer {
  scene: Phaser.Scene;
  group: Phaser.GameObjects.Container;
  counter: Phaser.GameObjects.Text;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    this.group = _scene.add.container();
    let font = {
      fontFamily: "budget_font",
      fontSize: "60px",
      fill: "#000000",
    };

    this.counter = _scene.add
      .text(0, -5, "00", font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 200)
      .setAlign("center")
      .setPadding(50, 50, 50, 50)
      .setCrop(0, 0, 200, 200)

      .setAlpha(1);

    let bg = _scene.add
      .sprite(0, 0, "budget_bg")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(100, 100);

    this.group.add(bg);
    this.group.add(this.counter);

    _scene.events.on("CountDownTimer:getUpdate", (counter: number) => {
      if (counter >= 10) this.counter.setText(counter.toString());
      else this.counter.setText(`0${counter.toString()}`);
    });

    _scene.events.on("CountDownTimer:onComplete", () => {
      //console.log("CountDownTimer:onComplete");
      this.counter.setText("00");
    });
  }
  public setPos(x: number, y: number) {
    this.group.setPosition(x, y);
  }
}
