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
  
    let size = 50;
    this.sprite.setSize(size,size)
    let sih =  this.sprite.texture.getSourceImage().height;
    let siw =  this.sprite.texture.getSourceImage().width;


    // this.sprite.setOrigin(0,0);

    // this.sprite.setScale(0.5, 0.5);
    //this.sprite.setCircle(46);

    // this.sprite.setCollideWorldBounds(true);
    this.sprite
      .setPosition(x, y)
      .setOrigin(0.5, 0.5)
      .setTexture(textureName)
      .disableBody(true, true)
      .setBounce(0, 0.5)
      .setDisplaySize(size, size)
      .setDepth(10)
      .setBodySize(siw/(size/siw), sih/(size/siw))
      .refreshBody();

    this.sprite.body.onCollide = true;

    if (this.sprite.body)
      this.sprite.setCircle(
        this.sprite.body.halfWidth,
        0,
        this.sprite.body.halfHeight - this.sprite.body.halfWidth
      );

    return this.sprite;
  }
}
