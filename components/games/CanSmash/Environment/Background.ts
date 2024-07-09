import {
  Color3,
  Material,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsMotionType,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Utils } from "../Utils";
import { Materials } from "../Materials";

export class Background {
  constructor(scene: Scene) {
 
    let factor = 150;
    let width = 1960/factor;
    let height = 816/factor;
    var plan: Mesh = MeshBuilder.CreatePlane("plan", { width: width, height: height });
    plan.position = new Vector3(0, 1, 14);
    plan.rotation = new Vector3(0, 0, 0);

    plan.material = Materials.instance.background;

    var sphereAggregate = new PhysicsAggregate(
      plan,
      PhysicsShapeType.BOX,

      { mass: 1, restitution: 0.75, radius: 0.2 },
      scene
    );
    sphereAggregate.body.setMotionType(PhysicsMotionType.STATIC);
  }
}
