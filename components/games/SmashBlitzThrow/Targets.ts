import { Observer } from "./Observer";

interface ITarget {
  name: string;
  sprite: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
}
export class Targets {
  target!: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  targets = new Map<number, Phaser.Types.Physics.Arcade.ImageWithStaticBody>(); //{ [name: string]: ITarget } = {};
  scene?: Phaser.Scene;
  counter: number = 0;
  static instance?: Targets;

  constructor(_scene: Phaser.Scene) {
    Targets.instance = this;

    //console.log("--- tagets instantiated!");
    this.scene = _scene;
    this.scene.events.on(
      "Targets:setTargetTexture",
      (index: number, texture: string) => {
        this.setSprite(index, texture);
      }
    );
  }

  create(
    targetName: string,
    spriteName: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const _sprite = this.scene?.physics.add.staticImage(x, y, "ball");
    if (!_sprite) return;

    // _sprite.setBodySize(80,80)
    //_sprite.setScale(20,20)
   
    //_sprite.setCircle(45,0,45)

    _sprite.body.onCollide = true;

    //_sprite.setCollideWorldBounds(true);
    _sprite.setImmovable();

    // _sprite.setOrigin(0.5, 0.5);

    //_sprite.setInteractive();
    _sprite.body.onCollide = true;

    /* this.target = this.scene.add
      .sprite(x, y, spriteName)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height);
    this.target.name = targetName;
    this.target.setInteractive();*/
    this.targets.set(this.counter, _sprite);
    this.counter++;

    return this.target;
  }
  getIdByTarget(target: any) {
    let indx: number = -1;
    this.targets.forEach((element, index) => {
      if (element == target) {
        indx = index;
      }
    });
    return indx;
  }

  getTarget(index: number) {
    return this.targets.get(index);
  }
  getAllTargets(): Map<
    number,
    Phaser.Types.Physics.Arcade.ImageWithStaticBody
  > {
    return this.targets;
  }
  setSprite(index: number, spriteName: string) {
    // return this.targets[name];
    let _sprite = this.targets.get(
      index
    ) as unknown as Phaser.Physics.Arcade.Sprite;

    _sprite.setTexture(spriteName)
    .setOrigin(0.5, 0.5)
    .setDisplaySize(90, 90)
    .setBodySize(90,90)
    .refreshBody()
   
    if(_sprite.body)
    _sprite.setCircle(_sprite.body.halfWidth, 0, _sprite.body.halfHeight - _sprite.body.halfWidth);

   
  }
}
