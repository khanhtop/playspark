import { ArcRotateCamera,  HemisphericLight,  Scene, Vector3 } from "@babylonjs/core";

export class LightController {
    constructor(scene:Scene){

  
    var light1: HemisphericLight = new HemisphericLight(
        "light1",
        new Vector3(1, 1, 0),
        scene
      );
      light1.intensity = 1;

    
    }
}