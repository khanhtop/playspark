import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import * as TWEEN from "@tweenjs/tween.js";
//import { AdvancedDynamicTexture, Button } from "babylonjs-gui";

import * as GUI from "@babylonjs/gui";

export class TextPopup {
  private counter: GUI.TextBlock;
  private plane: Mesh;
  isAnimateComplete : boolean = true;
  constructor() {
    this.plane = MeshBuilder.CreatePlane("plane");
    // plane.parent = can;
    this.plane.position.y = 0.2;

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.plane);

    this.counter = new GUI.TextBlock();
    this.counter.text = "0";
    this.counter.color = "#FFFFFF";
    this.counter.fontSize = 150;
    this.counter.fontStyle = "bold";
    this.counter.outlineColor = "#555555";
    this.counter.outlineWidth = 10;
    this.counter.alpha = 0;
    advancedTexture.addControl(this.counter);


  }
  animate(pos: Vector3, text: string) {
    this.isAnimateComplete  = false;
    this.counter.alpha = 1;
    this.plane.position = pos.clone();
    this.counter.text = text;
    const _data = {
      x: this.plane.position.x,
      y: this.plane.position.y,
      z: this.plane.position.z,
      alpha: 1,
    };
    const tween = new TWEEN.Tween(_data)
      .to(
        {
          x: this.plane.position.x,
          y: this.plane.position.y + 0.3,
          z: this.plane.position.z,
          alpha: 0,
        },
        1000
      )
      .easing(TWEEN.Easing.Linear.Out)
      .onUpdate(() => {
        this.plane.position.x = _data.x;
        this.plane.position.y = _data.y;
        this.plane.position.z = _data.z;
        this.counter.alpha = _data.alpha;
        //console.log(_data);
      }).onComplete(()=>{
        this.isAnimateComplete  = true;
      })
      ;

    tween.start();
  }

}
