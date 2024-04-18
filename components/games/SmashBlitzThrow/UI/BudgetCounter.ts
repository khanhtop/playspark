export class BudgetCounter {
  scene: Phaser.Scene;
  group: Phaser.GameObjects.Container;
  counter: Phaser.GameObjects.Text;
  public instance:Phaser.GameObjects.Container;
  icon : Phaser.GameObjects.Sprite;
  constructor(_scene: Phaser.Scene) {
   
    this.scene = _scene;

    this.group = _scene.add.container();
    let font = {
      fontFamily: "budget_font",
      fontSize: "60px",
      fill: "#ffffff",
    };

    this.counter = _scene.add
      .text(35, -5, "000", font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 200)
      .setAlign("center")
      .setPadding(50, 50, 50, 50)
      .setCrop(0, 0, 200, 200)



      

    let bg = _scene.add
      .sprite(0, 0, "rounded_rectangle")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(200, 80)
      .setAlpha(0.7);
      
    this.icon = _scene.add
      .sprite(-50, 0, "powerup")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(70, 70)



    this.group.add(bg);
    this.group.add(this.counter);
    this.group.add( this.icon);

    this.instance = this.group;
    /* _scene.events.on("CountDownTimer:getUpdate", (counter: number) => {
        if (counter > 10) this.counter.setText(counter.toString());
        else this.counter.setText(`0${counter.toString()}`);
      });
  
      _scene.events.on("CountDownTimer:onComplete", () => {
        //console.log("CountDownTimer:onComplete");
        this.counter.setText("00");
      });*/
  }
  public setPos(x: number, y: number) {
    this.group.setPosition(x, y);
  }
  public setText(counter: string) {
    this.counter.setText(counter);
  }
  public setTexture(textureName: string) {
    this.icon.setTexture(textureName);
    this.icon.setDisplaySize(70, 70);
  }
}
