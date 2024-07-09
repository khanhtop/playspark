import { Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";
import * as TWEEN from "@tweenjs/tween.js";
//import { AdvancedDynamicTexture, Button } from "babylonjs-gui";

import * as GUI from "@babylonjs/gui";
import { Images } from "../Images";

export class ImagePopup {
  private icon: GUI.Image;
  private plane: Mesh;
  isAnimateComplete: boolean = true;
  constructor() {
    this.plane = MeshBuilder.CreatePlane("plane", { size: 0.3 });
    // plane.parent = can;
    this.plane.position.y = 0.2;

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.plane);

    this.icon = new GUI.Image();
    this.icon.source = Images.data.danger_transparent;
    advancedTexture.addControl(this.icon);
  }
  animate(pos: Vector3, img: string) {
    this.isAnimateComplete = false;
    this.icon.alpha = 0;
    this.plane.position = pos.clone();
    this.plane.scaling = Vector3.One();

    const _data = {
      x: this.plane.position.x,
      y: this.plane.position.y,
      z: this.plane.position.z,
      scaleX: this.plane.scaling.x,
      scaleY: this.plane.scaling.y,
      alpha: 0,
    };
    const tween = new TWEEN.Tween(_data)
      .to(
        {
          x: this.plane.position.x,
          y: this.plane.position.y + 0.15,
          z: this.plane.position.z,
          scaleX: this.plane.scaling.x + 0.3,
          scaleY: this.plane.scaling.y + 0.3,
          alpha: 1,
        },
        1000
      )
      .easing(TWEEN.Easing.Linear.Out)
      .onUpdate(() => {
        this.plane.position.x = _data.x;
        this.plane.position.y = _data.y;
        this.plane.position.z = _data.z;
        this.plane.scaling.z = _data.z;
        this.plane.scaling = new Vector3(_data.scaleX, _data.scaleY, 1);
        this.icon.alpha = _data.alpha;
        //console.log(_data);
      })
      .onComplete(() => {
       
        const _data = {
          alpha: 1,
        };
        const tween = new TWEEN.Tween(_data)
          .to(
            {
              alpha: 0,
            },
            500
          )
          .easing(TWEEN.Easing.Linear.Out)
          .onUpdate(() => {
            this.icon.alpha = _data.alpha;
            //console.log(_data);
          })
          .onComplete(() => {
            this.isAnimateComplete = true;
            this.icon.alpha = 0;
          });
        tween.start();
      });
    tween.start();
  }
}
