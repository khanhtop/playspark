export class Ball {
  scene: Phaser.Scene;
  size: number = 0;
  sprite!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
  }
  init(x: number, y: number, textureName: string) {
    if (!this.sprite)
      this.sprite = this.scene.physics.add.image(x, y, textureName);
    // this.sprite.setOrigin(0,0);

    this.sprite.setScale(0.5, 0.5);
    this.sprite.setCircle(46);
   // this.sprite.setCollideWorldBounds(true);
    this.sprite.setPosition(x, y);
    this.sprite.setTexture(textureName);
    this.sprite.disableBody(true, true);
    this.sprite.setBounce(0,0.5);
    this.sprite.setDepth(10)
    this.sprite.body.onCollide = true;

    return this.sprite;
  }
}
