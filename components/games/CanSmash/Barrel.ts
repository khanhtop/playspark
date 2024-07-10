import {
  Engine,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsMotionType,
  PhysicsShapeType,
  PhysicsViewer,
  Quaternion,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { Utils } from "./Utils";
import { Materials } from "./Materials";
import { Events } from "./Events";
import { IPoolable } from "./IPoolable";
import { CloneMesh } from "./CloneMesh";
import { PlatformMovmentTypes } from "./PlatformTypes";
import { GameData } from "./GameData";
import { Timer } from "./Timer";
import { Meshs } from "./Meshs";

export class Barrel {
  defaultRot = new Vector3(0, Utils.DToR(190), 0);
  defaultPos: Vector3;
  canContainer: Mesh = null;
  canBody: Mesh;
  meshs: Mesh[];
  scene: Scene;
  engine: Engine;
  private sphereAggregate: PhysicsAggregate;
  private timer = 0;
  private type: PlatformMovmentTypes;
  private speed: number = 0;
  private xPos: number = 0;
  private yPos: number = 0;
  private zPos: number = 0;
  private sign: number = 0;
  private range: number = 0;
  private canMove: boolean = false;
  private interval = 0.001;
  private timerHandler = null;
  constructor() {
    this.scene = GameData.instance.getScene();
    this.engine = GameData.instance.getEngine();
    var self = this;

    // this.scene.onBeforeRenderObservable.add(() => {
    //   self.onUpdate();
    // });
  }
  onUpdate() {
    if (!this.canMove) return;
    const delta = this.engine.getDeltaTime() * 0.001;
    this.timer += delta;

    if (
      this.type == PlatformMovmentTypes.HORIZONTAL_MOVE ||
      this.type == PlatformMovmentTypes.BOTH_MOVE
    )
      this.xPos = this.sign * this.range * Math.sin(this.timer * this.speed);
    if (
      this.type == PlatformMovmentTypes.VERTICAL_MOVE ||
      this.type == PlatformMovmentTypes.BOTH_MOVE
    )
      this.yPos = this.sign * this.range * Math.cos(this.timer * this.speed);

    //this.canContainer.position = new Vector3(xPos, yPos, 2);
    this.sphereAggregate.body.setTargetTransform(
      new Vector3(this.xPos, this.yPos, this.zPos),
      Quaternion.Identity()
    );
    //   xPos += 0.01 * delta;

    this.timerHandler = Timer.Instance.add(
      this.interval,
      () => {
        this.onUpdate();
      },
      this
    );
  }
  
  isActive: boolean;
  private isHit: boolean;

  disable(): void {
    this.timer = 0;
    this.canMove = false;
    this.isActive = false;
    this.canContainer.setEnabled(false);
    this.sphereAggregate.dispose();
  }
  enable() {
    this.timer = 0;
    this.isActive = true;
    this.canContainer.setEnabled(true);

    if (this.timerHandler != null) Timer.Instance.remove(this.timerHandler);

    this.timerHandler = Timer.Instance.add(
      this.interval,
      () => {
        this.onUpdate();
      },
      this
    );
  }

  setMaterial(_material: StandardMaterial) {
    // this.canBody.material = _material;
    //this.canContainer.dispose();

    //console.log("setmaterial", this.canContainer.getChildMeshes());
    this.canContainer.getChildMeshes().forEach((mesh) => {
      //console.log(mesh.name);
      if (mesh.name.includes("body")) {
        mesh.material = _material;
      }
      //mesh.setEnabled(false)
      //console.log(mesh.name)
    });
    // this.canBody.material.diffuseTexture = new Texture(Images.data.logo1);;;//Materials.instance.canUp;
  }

  setPosition(pos) {
    this.canContainer.position = pos.clone();
    this.canContainer.rotation = Vector3.Zero();

    this.canContainer.rotationQuaternion = Quaternion.Identity();

    this.sphereAggregate.body.setLinearVelocity(Vector3.Zero());
    this.sphereAggregate.body.setAngularVelocity(Vector3.Zero());

    this.canContainer.position = pos.clone();
    //node.rotation = this.defaultRot.clone();
    this.canContainer.rotationQuaternion = Quaternion.Identity();

    this.sphereAggregate.body.disablePreStep = false;

    this.sphereAggregate.body.setTargetTransform(
      pos.clone(),
      Quaternion.Identity()
    );
  }

  setHitState(state: boolean) {
    this.isHit = state;
  }
  getHitState() {
    return this.isHit;
  }
  init(pos: Vector3, type: PlatformMovmentTypes, range: number = 0, speed: number = 0) {
    this.defaultPos = pos;
    this.speed = speed;
    this.type = type;
    this.range = range;
    var viewer = new PhysicsViewer();
    if (this.canContainer == null) {
      this.canContainer = MeshBuilder.CreateCylinder("barrel", {
        diameter: 0.27,
        height: 0.25,
      });

      //let defaultRot = new Vector3(0, Utils.DToR(190), 0);
      this.canContainer.position = this.defaultPos.clone();
      this.canContainer.material = Materials.instance.transparentMaterial;
      this.canContainer.rotation = this.defaultRot;

    

      let cloneMesh = new CloneMesh();
      const result = cloneMesh.get(Meshs.data.barrel);

      result.meshes.forEach((element) => {
        element.parent = this.canContainer;
      });

      this.meshs = [];
      result.meshes.forEach((mesh, index) => {
        this.meshs[index] = mesh.clone();
      });

      this.canBody = this.meshs[1];
      this.canBody.name = "body";

      this.meshs[2].material = Materials.instance.barrelUp;
      this.meshs[1].material = Materials.instance.barrelBody;

      this.canContainer.scaling = new Vector3(2, 2, 2);

      let meshses = this.canContainer.getChildMeshes();
      meshses = this.meshs;
    }
    this.sphereAggregate = new PhysicsAggregate(
      this.canContainer,
      PhysicsShapeType.CYLINDER,
      { mass: 1, restitution: 0.3, friction: 1000 }
    );
    this.sphereAggregate.body.setMotionType(PhysicsMotionType.ANIMATED);

   // viewer.showBody(this.sphereAggregate.body);

    this.sphereAggregate.body.disablePreStep = false;

    this.sphereAggregate.body.setCollisionCallbackEnabled(true);

    const observablee = this.sphereAggregate.body.getCollisionObservable();
    observablee.add((collisionEvent) => {
      // Process collisions for the player
      if (collisionEvent.type == "COLLISION_STARTED") {
        if (
          collisionEvent.collidedAgainst.transformNode.name == "ball" &&
          !this.isHit
        ) {
          this.setHitState(true);
          Events.hits.notifyObservers({
            name: "barrel",
            data: { sender: this, collisionEvent: collisionEvent },
          });
        }
      }
    });

    this.canContainer.position = this.defaultPos.clone();
    this.timer = 0;

    this.yPos = this.canContainer.position.y;
    this.xPos = this.canContainer.position.x;
    this.zPos = this.canContainer.position.z;

    this.sign = this.speed < 0 ? -1 : 1;
    if (
      this.type == PlatformMovmentTypes.HORIZONTAL_MOVE ||
      this.type == PlatformMovmentTypes.BOTH_MOVE
    )
      this.xPos = this.sign * this.range * Math.sin(this.timer * this.speed);
    if (
      this.type == PlatformMovmentTypes.VERTICAL_MOVE ||
      this.type == PlatformMovmentTypes.BOTH_MOVE
    )
      this.yPos = this.sign * this.range * Math.cos(this.timer * this.speed);
    this.canContainer.position = new Vector3(this.xPos, this.yPos, this.zPos);

    this.canMove = true;

    return this.canContainer;
  }
}
