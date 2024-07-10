import {
  Color3,
  Color4,
  Material,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsShape,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  PhysicsShapeType,
  PhysicsViewer,
  Quaternion,
  Scene,
  Space,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector3,
  Vector4,
} from "@babylonjs/core";
import * as TWEEN from "@tweenjs/tween.js";
import { Materials } from "../Materials";
import { Events } from "../Events";

export class PowerupCube {
  cube: Mesh;
  triggerBody: PhysicsBody;
  triggerShape: PhysicsShapeBox;
  triggerTransform: TransformNode;
  scene: Scene;
  isHit: boolean = false;
  static instace: PowerupCube;
  constructor(scene: Scene, pos: Vector3) {
    this.scene = scene;
    PowerupCube.instace = this;
    //var viewer = new PhysicsViewer(scene);

    /* var cube2 = new PhysicsShapeBox(
      pos,
      Quaternion.Identity(),
      new Vector3(0.25, 0.25, 0.25),
      scene
    );

    cube2.isTrigger = true;*/

    this.cube = MeshBuilder.CreateBox(
      "platform",
      { width: 0.25, height: 0.25, depth: 0.25 },
      scene
    );

    this.cube.position = pos.clone();

    this.cube.material = Materials.instance.powerup;

    var triggerShapeRadius = 0.2;
    this.triggerShape = new PhysicsShapeBox(
      pos.clone(),
      Quaternion.Identity(),
      new Vector3(0.25, 0.25, 0.25),
      scene
    );

    this.triggerShape.isTrigger = true;
    this.triggerTransform = new TransformNode("triggerTransform");
    this.triggerBody = new PhysicsBody(
      this.triggerTransform,
      PhysicsMotionType.ANIMATED,
      true,
      scene
    );
    this.triggerBody.shape = this.triggerShape;

    // viewer.showBody(this.triggerBody);

    /* var sphereAggregate = new PhysicsAggregate(
      cube,
      PhysicsShapeType.BOX,

      { mass: 0, restitution: 0.75 },
      scene
    );
    sphereAggregate.body.setMotionType(PhysicsMotionType.STATIC);
*/
    const _data = {
      rotation: 0,
    };
    const tween = new TWEEN.Tween(_data)
      .to(
        {
          rotation: Math.PI,
        },
        1000
      )
      .easing(TWEEN.Easing.Linear.Out)
      .yoyo(true)
      .repeat(Infinity)
      .onUpdate(() => {
        this.cube.rotate(Vector3.Up(), 0.01, Space.LOCAL);
        //console.log(_data.rotation);
      });

    tween.start();

    //@ts-ignore
    const observable = window.hk.onTriggerCollisionObservable;

    const observer = observable.add((collisionEvent) => {
      if (collisionEvent.type === "TRIGGER_ENTERED" && !this.isHit) {
        // console.log(collisionEvent.collidedAgainst);
        if (
          collisionEvent.collider == this.triggerBody &&
          collisionEvent.collidedAgainst.transformNode.name == "ball"
        ) {
          // console.log("powerup cube");
          Events.hits.notifyObservers({
            name: "powerup",
            target: this.cube,
            sender: this,
          });

          this.isHit = true;
          this.cube.isVisible = false;
        }
      } else {
        //console.log("TRIGGER_Exit");
        // do something when trigger is exited
      }
    });
  }
  setPosition(pos: Vector3) {
    this.isHit = false;

    this.triggerBody.dispose();

    this.triggerShape.dispose();

    this.cube.position = pos.clone();
    this.cube.rotation = Vector3.Zero();

    this.cube.rotationQuaternion = Quaternion.Identity();

    //this.triggerBody.setLinearVelocity(Vector3.Zero());
    //this.triggerBody.setAngularVelocity(Vector3.Zero());

    this.cube.position = pos.clone();
    //node.rotation = this.defaultRot.clone();
    this.cube.rotationQuaternion = Quaternion.Identity();

    // this.triggerBody.setTargetTransform(pos.clone(), Quaternion.Identity());

    this.triggerShape = new PhysicsShapeBox(
      pos.clone(),
      Quaternion.Identity(),
      new Vector3(0.25, 0.25, 0.25),
      this.scene
    );
    this.triggerShape.isTrigger = true;

    this.triggerBody = new PhysicsBody(
      this.triggerTransform,
      PhysicsMotionType.ANIMATED,
      true,
      this.scene
    );
    this.triggerBody.shape = this.triggerShape;

    //viewer.showBody(this.triggerBody);
  }
}
