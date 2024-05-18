export class TutorialMessage {
  scene: Phaser.Scene;
  group: Phaser.GameObjects.Container;
  constructor(
    _scene: Phaser.Scene,
    message: string,
    x: number,
    y: number,
    number: number
  ) {
    this.scene = _scene;

    this.group = _scene.add.container();

    let bg = _scene.add
      .sprite(0, 0, "rounded_rectangle2")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(250, 100)
      .setAlpha(0.7);

    let font = {
      fontFamily: "budget_font",
      fontSize: "30px",
      fill: "#ffffff",
    };

    let messageBox = _scene.add
      .text(0, 0, message, font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 200)
      .setAlign("center");
    //.setPadding(50, 50, 50, 50)
    //.setCrop(0, 0, 200, 200);

    let icon = _scene.add
      .sprite(-109, -60, "budget_bg")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    let counter = _scene.add
      .text(-110, -62, number.toString(), font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 200)
      .setAlign("center")
      .setFontSize(30)
      .setColor("#000000")
      .setPadding(50, 50, 50, 50)
      .setCrop(0, 0, 200, 200);

    this.group.add(bg);
    this.group.add(messageBox);
    this.group.add(icon);
    this.group.add(counter);

    this.group.setPosition(x, y);
    this.scene.events.on("GoalCounter:onChange", (counter: number) => {
      //if (counter <= 0) console.log("---- you win");
    });
  }
  hide() {
    this.group.visible = false;
  }
}
