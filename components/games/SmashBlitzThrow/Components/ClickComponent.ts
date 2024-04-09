import { IComponent } from "../ComponentService";

export class ClickComponent implements IComponent {
  private gameObject!: Phaser.GameObjects.GameObject;
public callBack:any;
  init(go: Phaser.GameObjects.GameObject) {
    this.gameObject = go;
  }
  awake() {
   // console.log("awake", );
  }

  start() {
    //console.log("start");
  
    this.gameObject.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      ()=>this.handleClick()
    );
  }

  destroy() {
   
    this.gameObject.off(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      ()=>this.handleClick()
    );
  }

  private handleClick() {
    this.callBack();
  }
}
