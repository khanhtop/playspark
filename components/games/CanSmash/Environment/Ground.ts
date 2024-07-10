import { Color3, Mesh, MeshBuilder, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { Utils } from "../Utils";
import { Materials } from "../Materials";

export class Ground {
  constructor(scene:Scene) {
    let height = 14;
    var ground: Mesh = MeshBuilder.CreatePlane("ground", { width: 50 , height:height });
    ground.position = new Vector3(0, -1, height/2);
    ground.rotation = new Vector3(Utils.DToR(90), 0, 0);


    ground.material = Materials.instance.ground;;

    var sphereAggregate = new PhysicsAggregate(
      ground,
      PhysicsShapeType.BOX,

      { mass: 1, restitution: 0.75, radius: 0.2 },
      scene
    );
    sphereAggregate.body.setMotionType(PhysicsMotionType.STATIC);

  }

}
