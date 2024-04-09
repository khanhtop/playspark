import { TutorialMessage } from "./TutorialMessage";

export class Tutorial {
    scene: Phaser.Scene;
    constructor(_scene: Phaser.Scene,widthFactor:number,heightFactor:number) {
      this.scene = _scene;
  
      let t1 = new TutorialMessage(
        _scene,
        "TAP PLAYER AND PULL\n BACK TO THROW",
        widthFactor * 1.5,
        heightFactor * 7.9,
        1
      );
      let t2 = new TutorialMessage(
        _scene,
        "AIM AT TARGET.\n RELEASE TO THROW",
        widthFactor * 4,
        heightFactor * 5.9,
        2
      );

   
      _scene.events.on("Tutorial:hide", ()=>{
        t1.hide();
        t2.hide();

      });
 

      
      this.scene.events.on("GoalCounter:onChange", (counter: number) => {
        if (counter <= 0) console.log("---- you win");
      });
    }
  }
  