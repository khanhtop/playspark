export class PlayerController {
  // container: Phaser.GameObjects.Container;
  //right_hand: Phaser.GameObjects.Sprite;
  scene!: Phaser.Scene;
  player_sprite: Phaser.GameObjects.Sprite;
  constructor(_scene: Phaser.Scene, x: number, y: number) {
    //this.container = _scene.add.container();
    this.scene = _scene;

    this.player_sprite = _scene.add
      .sprite(x, y, "p1_player_ready")
      .setDisplaySize(200, 300)
      .setOrigin(0.3, 0.6)
      .setInteractive();

    const progress_frame = this.scene.anims.generateFrameNames(
      "p1_player_ready",
      {
        start: 0,
        end: 3,
      }
    );
    this.scene.anims.create({
      key: "p1_player_ready",
      frames: progress_frame,
      frameRate: 20,
      repeat: -1,
      yoyo: true,
    });
    this.player_sprite.play("p1_player_ready");

    const p1_push_back = this.scene.anims.generateFrameNames("p1_push_back", {
      start: 0,
      end: 3,
    });
    this.scene.anims.create({
      key: "p1_push_back",
      frames: p1_push_back,
      frameRate: 20,
    });
   // this.player_sprite.play("p1_push_back");

    const p1_throwing = this.scene.anims.generateFrameNames("p1_throwing", {
      start: 0,
      end: 3,
    });
    this.scene.anims.create({
      key: "p1_throwing",
      frames: p1_throwing,
      frameRate: 20,
    });
    //this.player_sprite.play("p1_throwing");

    this.player_sprite.on(
      "animationcomplete",
      (animation: any, frame: any, gameObject: any, frameKey: any) => {
        //console.log(animation, frame, gameObject, frameKey);
        if(animation.key == "p1_throwing")
        this.player_sprite.play("p1_player_ready");
      }
    );

    this.scene.events.on("BallShooter:onShootComplete",()=>{
      this.player_sprite.play("p1_push_back");
    });
    this.scene.events.on("BallShooter:onShoot",()=>{
      this.player_sprite.play("p1_throwing");
    });
   // this.scene.events.emit("BallShooter:onShootComplete");

    /* let shoes = _scene.add
      .sprite(20, 0, "shoes")
      .setOrigin(0.5, 1)
      .setDisplaySize(80, 30);

    this.right_hand = _scene.add
      .sprite(0, 0, "right_hand")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    let left_hand = _scene.add.sprite(0, 0, "left_hand").setOrigin(0.5, 0.5);

    let body = _scene.add
      .sprite(0, -35, "body")
      .setOrigin(0.5, 1)
      .setDisplaySize(90, 150);

    this.container.add(shoes);
    this.container.add(this.right_hand);
    this.container.add(left_hand);
    this.container.add(body);

    this.container.setPosition(x, y);

    this.onRightHanRelease(100,200);*/
  }
  /* setRightHandPos(x: number, y: number) {
    this.right_hand.setPosition(x, y);
  }
  onRightHanRelease(x: number, y: number) {
    //this.right_hand.twee
    this.scene.tweens.addCounter({
      from: 1,
      to: 1.5,
      duration: 1000,


      onUpdate: (tween) => {
        const v = tween.getValue();
        // this.score.setFontSize(20 + v * 64);
        this.right_hand.setPosition(v,v)
      },
      onComplete: () => {
        // this.hide();
      },
    });
  }*/
}
