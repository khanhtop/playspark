import {
  ActionManager,
  Color3,
  CombineAction,
  DoNothingAction,
  InterpolateValueAction,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  PhysicsViewer,
  PointLight,
  Quaternion,
  Scene,
  SetStateAction,
  SetValueAction,
  Vector3,
} from "@babylonjs/core";
import { Materials } from "../Materials";
import { CloneMesh } from "../CloneMesh";
import { Meshs } from "../Meshs";
import { Events } from "../Events";
import { Utils } from "../Utils";

export class Ball {
  static instance: Ball = null;
  ball: Mesh;
  defaultPos: Vector3;
  scene: Scene;
  sphereAggregate: PhysicsAggregate;
  viewer: PhysicsViewer;
  constructor(scene: Scene, defaultPos: Vector3) {
    Ball.instance = this;
    this.scene = scene;
    this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.1 }, scene);
    this.defaultPos = defaultPos;
    this.ball.position = this.defaultPos.clone();
    this.ball.material = Materials.instance.transparentMaterial;

    //this.viewer = new PhysicsViewer();

    let cloneMesh = new CloneMesh();
    const result = cloneMesh.get(Meshs.data.ball);


    result.meshes.forEach((element) => {
      element.parent = this.ball;
      element.material = Materials.instance.ball;
      element.name = "ball";
    });

   // var light1 = new PointLight("omni", new Vector3(0, 50, 0), scene);
   this.ball.rotation = new Vector3(Utils.DToR(10),Utils.DToR(10) ,20);
   
    this.prepareButton(this.ball, Color3.Red(), this.ball, scene);
    this.ball.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPointerOutTrigger,
        this.ball.material,
        "emissiveColor",
        Materials.instance.redMat.emissiveColor
      )
    );
    this.ball.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPointerOverTrigger,
        this.ball.material,
        "emissiveColor",
        Color3.White()
      )
    );
  }

  // On pick interpolations
  prepareButton(mesh, color, light, scene) {
    var goToColorAction = new InterpolateValueAction(
      ActionManager.OnPickTrigger,
      light,
      "diffuse",
      color,
      1000,
      null,
      true
    );

    mesh.actionManager = new ActionManager(scene);
    mesh.actionManager
      .registerAction(
        new InterpolateValueAction(
          ActionManager.OnPickTrigger,
          light,
          "diffuse",
          Color3.Black(),
          1000
        )
      )
      .then(
        new CombineAction(ActionManager.NothingTrigger, [
          // Then is used to add a child action used alternatively with the root action.
          goToColorAction, // First click: root action. Second click: child action. Third click: going back to root action and so on...
          new SetValueAction(
            ActionManager.NothingTrigger,
            mesh.material,
            "wireframe",
            false
          ),
        ])
      );
    mesh.actionManager
      .registerAction(
        new SetValueAction(
          ActionManager.OnPickTrigger,
          mesh.material,
          "wireframe",
          true
        )
      )
      .then(new DoNothingAction());
    mesh.actionManager
      .registerAction(
        new SetStateAction(ActionManager.OnPickTrigger, light, "off")
      )
      .then(new SetStateAction(ActionManager.OnPickTrigger, light, "on"));
  }

  resetPos() {
    this.ball.position = this.defaultPos.clone();
   
    this.ball.rotationQuaternion = Quaternion.Identity();
    this.ball.rotation = new Vector3(Utils.DToR(10),Utils.DToR(10) ,20);
  }

  setPhysicBody() {
    this.sphereAggregate = new PhysicsAggregate(
      this.ball,
      PhysicsShapeType.SPHERE,
      { mass: 1, restitution: 0.0 },
      this.scene
    );

    //  this.viewer.showBody(this.sphereAggregate.body);
  }
  disposePhysicBody() {
    if (this.sphereAggregate != null) this.sphereAggregate.dispose();
    this.sphereAggregate = null;
  }

  applyForce(dir: Vector3, force: number) {
    let diff = dir.multiply(new Vector3(force, force, force));
    this.sphereAggregate.body.applyForce(diff, this.ball.position);

    this.sphereAggregate.body.applyAngularImpulse(diff);
  }

  setScale(scaleFactor: number) {
    this.ball.scaling = Vector3.One().multiplyByFloats(
      scaleFactor,
      scaleFactor,
      scaleFactor
    );

    if (this.sphereAggregate != null) {
      this.disposePhysicBody();
      this.setPhysicBody();
    }
  }
}
