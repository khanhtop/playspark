import {
  AbstractMesh,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  PhysicsViewer,
  Quaternion,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { Utils } from "../Utils";
import { Materials } from "../Materials";
import { Events } from "../Events";
import { IPoolable } from "../IPoolable";
import { Loader } from "../Loader";
import { CloneMesh } from "../CloneMesh";
import { Meshs } from "../Meshs";
import * as TWEEN from "@tweenjs/tween.js";

export class Can implements IPoolable {
  defaultRot = new Vector3(0, Utils.DToR(190), 0);
  defaultPos: Vector3;
  canContainer: Mesh = null;
  canBody: Mesh;
  meshs: Mesh[];
  sphereAggregate: PhysicsAggregate;
  tweenc: TWEEN.Tween<any>;
  scaleFactor = 2;
  materialIndex:number = 0;
  constructor() {
    const data = {
      scale:  this.scaleFactor ,

    };
    this.tweenc = new TWEEN.Tween(data)
      .to(
        {
          scale:  this.scaleFactor + 0.1 
        },
        100
      )
      .easing(TWEEN.Easing.Linear.Out)
      .onUpdate(() => {
        this.canContainer.scaling = new Vector3(
          data.scale,
          data.scale,
          data.scale
        );
      })
      .onComplete(() => {})
      .yoyo(true)
      .repeat(5);
  }
  isActive: boolean;
  private isHit: boolean;
  static index = 0;
  platformIndex: number = 0;
  row: number = 0;
  setActive(state: boolean): void {
    this.isActive = state;
    // for (let mesh of this.meshs) mesh.setEnabled(false);
    // this.canContainer.dispose();

    //console.log("set active",      this.canContainer.getChildren()[0].getChildren());
  }

  setMaterial(_material: StandardMaterial,index:number) {
    this.materialIndex = index;
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

  disable(): void {
    this.isActive = false;
    this.canContainer.setEnabled(false);
    this.sphereAggregate.dispose();
  }
  enable() {
    this.isActive = true;
    this.canContainer.setEnabled(true);
  }
  setPosition(pos: Vector3) {
    this.tweenc.start()

    this.setHitState(false);

    if (!this.sphereAggregate) return;
    if (!this.sphereAggregate.body) return;
    if (!this.canContainer.physicsBody) return;

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

  init(pos: Vector3, _name: string, row: number) {
    this.row = row;
    this.defaultPos = pos;
    this.setHitState(false);
    var viewer = new PhysicsViewer();
    if (this.canContainer == null) {
      this.canContainer = MeshBuilder.CreateCylinder("can1", {
        diameter: 0.07,
        height: 0.138,
      });

      //let defaultRot = new Vector3(0, Utils.DToR(190), 0);
      this.canContainer.position = this.defaultPos.clone();
      this.canContainer.material = Materials.instance.transparentMaterial;
      this.canContainer.rotation = this.defaultRot;

      let cloneMesh = new CloneMesh();
      const result = cloneMesh.get(Meshs.data.can);

      result.transformNodes.forEach((element) => {
        element.parent = this.canContainer;
      });

      this.meshs = [];
      result.meshes.forEach((mesh, index) => {
        this.meshs[index] = mesh.clone();
      });

      this.canBody = this.meshs[2];
      this.canBody.name = "body";

      this.meshs[1].material = Materials.instance.canUp;

      this.canContainer.scaling = new Vector3(this.scaleFactor,this.scaleFactor,this.scaleFactor);

      let meshses = this.canContainer.getChildMeshes();
      meshses = this.meshs;
    }

    this.sphereAggregate = new PhysicsAggregate(
      this.canContainer,
      PhysicsShapeType.CYLINDER,
      { mass: 1, restitution: 0.3, friction: 100 }
    );

    //sphereAggregate.body.setMotionType(PhysicsMotionType.STATIC);

    //  viewer.showBody(this.sphereAggregate.body);

    this.sphereAggregate.body.setCollisionCallbackEnabled(true);

    const observablee = this.sphereAggregate.body.getCollisionObservable();
    observablee.add((collisionEvent) => {
      // Process collisions for the player
      if (collisionEvent.type == "COLLISION_STARTED" && !this.isHit) {
        //  console.log(collisionEvent.collidedAgainst.transformNode.name )
        if (collisionEvent.collidedAgainst.transformNode.name == "ball") {
          this.setHitState(true);
          Events.hits.notifyObservers({
            name: _name,
            data: { sender: this, collisionEvent: collisionEvent },
          });
        } else if (
          collisionEvent.collidedAgainst.transformNode.name == "ground"
        ) {
          this.setHitState(true);
          Events.hits.notifyObservers({
            name: _name,
            targetName: "ground",
            data: { sender: this, collisionEvent: collisionEvent },
          });
        }
      }
    });
  }
}
