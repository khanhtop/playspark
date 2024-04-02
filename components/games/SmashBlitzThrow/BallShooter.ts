export class BallShooter {
  scene: Phaser.Scene;
  size: number = 0;
  canShoot: boolean;

  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    this.canShoot = false;
  
  }
  init(
    center: Phaser.Types.Math.Vector2Like,
    ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  ) {
    let angle = 0;
    let prevPos: Phaser.Types.Math.Vector2Like;

    
    this.scene.events.on("Input:pointerdown", (pointer: any) => {
     
      this.canShoot = true;
      this.scene.events.emit("BallShooter:onShootComplete");
    });

    this.scene.events.on("Input:pointermove", (pointer: any) => {
      
      if(!this.canShoot )
      return;
      angle = Phaser.Math.Angle.BetweenPoints(pointer, center);
      prevPos = pointer;
      
    });

    this.scene.events.on("Input:pointerup", (pointer: any) => {
   
      if(!this.canShoot )
      return;
      this.canShoot = false;
      const dist = Phaser.Math.Distance.Between(
        pointer.downX,
        pointer.downY,
        pointer.upX,
        pointer.upY
      );
      // console.log(prevPos,pointer ,  dist)
      ball.enableBody(true, center.x, center.y, true, true);
      // chthis.spriteick.play('fly');
      this.scene.physics.velocityFromRotation(
        angle,
        10 * dist,
        ball.body.velocity
      );

      this.scene.events.emit("BallShooter:onShoot");
      
    });

 
  }
}
