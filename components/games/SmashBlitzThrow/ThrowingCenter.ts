export class ThrowingCenter {
  scene: Phaser.Scene;
  size: number = 0;
  sprite!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  throwingCenter?: Phaser.GameObjects.Image;

  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
  }
  init(x: number, y: number, texureName: string) {
    if (!this.throwingCenter) {
      this.throwingCenter = this.scene.add.image(x, y, texureName).setDepth(1);
      this.throwingCenter.setScale(0.1, 0.1);
      this.throwingCenter.setOrigin(0.5, 0.5);
    } else {
      this.sprite.setTexture(texureName);
      this.throwingCenter.setPosition(x, y);
    }

    return this.throwingCenter;
  }
}
