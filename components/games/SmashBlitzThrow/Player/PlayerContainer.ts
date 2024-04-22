export class PlayerContainer extends Phaser.GameObjects.Container
{
    //container: Phaser.GameObjects.Container;
    right_hand: Phaser.GameObjects.Sprite;
    scene!: Phaser.Scene;
    _body: Phaser.GameObjects.Sprite;
    head: Phaser.GameObjects.Sprite;
    headFirstPosX: number;
    headFirstPosY: number;
    rightHandFirstPosX: number;
    rightHandFirstPosY: number;
    leftHandFirstPosY: number;
    leftHandFirstPosX: number;
    left_hand: Phaser.GameObjects.Sprite;
    constructor (_scene:Phaser.Scene)
    {
        super(_scene);
      //  this.container = _scene.add.container();
        this.headFirstPosX = 5;
        this.headFirstPosY = -110;
        this.rightHandFirstPosX = -20;
        this.rightHandFirstPosY = -80;
        this.leftHandFirstPosX = 50;
        this.leftHandFirstPosY = -100;

    
        this.scene = _scene;
    

        this.head = _scene.add
          .sprite(this.headFirstPosX, this.headFirstPosY, "head")
          .setOrigin(0.5, 1)
          .setDisplaySize(120, 120);
    
        let shoes = _scene.add
          .sprite(20, 0, "shoes")
          .setOrigin(0.5, 1)
          .setDisplaySize(80, 80);
    
        this.right_hand = _scene.add
          .sprite(this.rightHandFirstPosX, this.rightHandFirstPosY, "right_hand")
          .setOrigin(0.5, 0.5)
          .setDisplaySize(40, 40);
    
        this.left_hand = _scene.add
          .sprite(this.leftHandFirstPosX, this.leftHandFirstPosY, "left_hand")
          .setOrigin(0.5, 0.5)
          .setDisplaySize(40, 40);
    
        this._body = _scene.add
          .sprite(7, -60, "body")
          .setOrigin(0.5, 1)
          .setDisplaySize(70, 70)
          .setInteractive();
    
        this.add(this._body);
        this.add(this.head);
        this.add(shoes);
        this.add(this.right_hand);
        this.add(this.left_hand);
    }

}