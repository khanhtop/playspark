export class BackGroundManager {
  bg: Phaser.GameObjects.Sprite;
  constructor(
    _scene: Phaser.Scene,
    url: string,
    width: number,
    height: number
  ) {
    /* this.params.backgroundSprite = !!this.params.backgroundSprite
    ? this.params.backgroundSprite
    : "/pong/" + gameType + "/background/bg1.jpg";*/

    if (url != undefined) {
     // console.log(`---[[[ new bg : ${url}`);

      _scene.load.image("new_bg", url);
      _scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
        // texture loaded so use instead of the placeholder+
        ///console.log(`---[[[ new setttt bg : ${url}`);
        this.bg
          .setTexture("new_bg")
          .setPosition(0, 0)
          .setOrigin(0, 0)
          .setDisplaySize(width, height);
      });
      _scene.load.start();
    }

    this.bg = _scene.add
      .sprite(0, 0, "bg")
      .setOrigin(0, 0)
      .setDisplaySize(width, height);

    this.bg.setInteractive();
  }
  getBG() {
    return this.bg;
  }
}
