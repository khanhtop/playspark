import {
  AbstractMesh,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { EventData, EventTypes, Events } from "../Events";
import { Utils } from "../Utils";
import { Ball } from "./Ball";
import { Inputs } from "../Inputs";

export class BallPicker {
  ball: AbstractMesh;
  scene: Scene;
  startPos: Vector3;
  currentPos: Vector3;

  canDrag: boolean = false;
  isActive: boolean = true;
  isPonterUpFunCalled: boolean = false;
  speed: number;
  constructor(scene: Scene) {
    this.scene = scene;
    Events.input.add((data: EventData) => {
      switch (data.name) {
        case "onPointerDown":
          this.mouseSpeedCounnt = 0;
          this.isPonterUpFunCalled = false;
          this.onPointerDown(data.data);
          break;
        case "onPointerUp":
          if (!this.isPonterUpFunCalled) this.onPointerUp();
          break;
        case "onPointerMove":
          this.onPointerMove(data.data);
          break;
      }
    });

    Events.input.add((data: any) => {
      if (data.name != "BallPicker:setActive") return;
      this.isActive = data.state;
    });

    var self = this;
    let prevX = 0;
    let prevY = 0;
    function animate(time) {
      window.requestAnimationFrame(animate);

      if (!self.canDrag) return;

      if (self.speed < 0.1 || (self.lastX == prevX && self.lastY == prevY)) {
        self.mouseSpeedCounnt++;
        if (self.mouseSpeedCounnt >= 5) {
          self.mouseSpeedCounnt = 0;
          self.isPonterUpFunCalled = true;
          self.onPointerUp();
        }
      }

      prevY = self.lastY;
      prevX = self.lastX;

      self.dragBall();
    }
    animate(performance.now());
  }

  dragBall() {
    if (!this.isActive) return;
    this.currentPos = this.getGroundPosition();
    if (!this.currentPos) {
      return;
    }
    var diff = this.currentPos.subtract(this.startPos);
    // var diff = current.subtract(startingPoint);
    // diff.x = 0;
    diff.y = 0;
    diff.z = 0;

    this.ball.position.addInPlace(diff);

    this.startPos = this.currentPos;
  }
  lastTime = Date.now();
  lastX = 0;
  lastY = 0;
  mouseSpeedCounnt = 0;
  onPointerMove(event: PointerEvent) {
    if (Utils.isgamePaused) return;
    if (this.isPonterUpFunCalled) return;

    const now = Date.now();
    const dt = now - this.lastTime; // Time difference in milliseconds

    const dx = event.screenX - this.lastX; // Difference in X coordinates
    const dy = event.screenY - this.lastY; // Difference in Y coordinates

    const distance = Math.sqrt(dx * dx + dy * dy); // Euclidean distance
    this.speed = distance / dt; // Speed in pixels per millisecond

    // console.log(`Speed: ${this.speed} pixels/ms`);

    this.lastTime = now;
    this.lastX = event.screenX;
    this.lastY = event.screenY;
  }

  onPointerDown(evt: PointerEvent) {
    if (Utils.isgamePaused) return;
    if (!this.isActive) return;
    if (!this.isActive) return;

    //this.ball = null;
    //  console.log("onPointerDown ----", data);

    // check if we are under a mesh
    var pickInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

    if (pickInfo.hit) {
      let currentMesh = pickInfo.pickedMesh;
      // console.log("currentMesh: ----", currentMesh.name);
      if (currentMesh.name == "ball") {
        this.ball = Ball.instance.ball; //currentMesh;
        this.startPos = Ball.instance.ball.position;

        this.canDrag = true;
      }
    }
  }

  onPointerUp() {
    if (!this.isActive) return;
    if (!this.canDrag) return;

    this.canDrag = false;

    let pInWorld = this.getPointerPositionInWorld();

    // pInWorld.z < 0.1 => means if pointer up exacly over the ball
    if (!pInWorld || pInWorld.z < 0.1) {
      return;
    }

    //console.log(pInWorld)

    var dir = pInWorld.subtract(this.ball.position);
    dir = dir.normalize();

    Events.gamePlay.notifyObservers({
      type: EventTypes.ON_BALL_TARGET_SET,
      ball: this.ball,
      dir: dir,
    });

    this.isPonterUpFunCalled = true;

    //sphereAggregate.body.applyForce(diff, this.ball.position);
  }

  getGroundPosition() {
    // Use a predicate to get position on the ground
    var pickinfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
    if (pickinfo.hit && pickinfo.pickedMesh.name == "ball") {
      return pickinfo.pickedPoint;
    }

    return null;
  }
  getPointerPositionInWorld() {
    var pickinfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
    if (pickinfo.hit) {
      return pickinfo.pickedPoint;
    }
    return null;
  }
}
