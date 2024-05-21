export class GameOverPopup {
  scene: Phaser.Scene;
  score: Phaser.GameObjects.Text;
  _tween: any;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    let font = {
      fontFamily: "budget_font",
      fontSize: "70px",
      fill: "#FF561E",
    };

    this.score = _scene.add
      .text(70, -40, `000`, font)
      .setOrigin(0.5, 0.5)
      .setSize(200, 500)
      .setPadding(0, 0, 10, 0)
      .setAlign("left")
      .setStroke("#000000", 10)
    

    this._tween = () => {
      _scene.tweens.addCounter({
        from: 1,
        to: 1.5,
        duration: 1000,
     
        onUpdate: (tween) => {
          const v = tween.getValue();
          this.score.setFontSize(20 + v * 64);
          //this.score.setColor(`rgb(${c}, ${c}, ${c})`);
        },
        onComplete: () => {
          //this.hide();

          this.scene.time.delayedCall(2000,()=>{
            _scene.events.emit("GameOver:onComplete");
          })
        },
      });
    };
    this.score.visible = false;
    //this._tween();
  }
  public show() {
    this.score.visible = true;
    this.score.setText(`Game Over`);
    this._tween();
  
  }
  public hide() {
    this.score.visible = false;
  }
  public setPos(x: number, y: number) {
    this.score.setPosition(x, y);
  }
}
