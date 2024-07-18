import { Quaternion, Scene, Vector3 } from "@babylonjs/core";

import { PowerupCube } from "./PowerupCube";
import { EventData, EventTypes, Events } from "../Events";
import { Utils } from "../Utils";
import { POWERUP_REAPPEAR_TIME } from "../Consts";
import { ShieldPowerup } from "./ShieldPowerup";
import { BigBallPowerup } from "./BigBallPowerup";
import { Timer } from "../Timer";

export class PowerupManager {
  static instance: PowerupManager = null;
  private poses: Vector3[] = [];
  private scene: Scene;
  private index: number = 0;
  private powerupCube: PowerupCube = null;
  private timeoutHandler = null;
  showCount: number;
  constructor(scene: Scene) {
    this.scene = scene;
    PowerupManager.instance = this;

    new ShieldPowerup();
    new BigBallPowerup();

    Events.hits.add((data: any) => {
      if (data.name !== "powerup") return;
      this.index++;
      if (this.index >= this.poses.length) {
        this.index = 0;
        this.poses = this.shuffleArray(this.poses);
      }
      var self = this;

      this.showCount--;

      if (this.showCount > 0) {
        this.timeoutHandler = Timer.Instance.add(
          POWERUP_REAPPEAR_TIME,
          () => {
            data.target.isVisible = true;
            data.sender.setPosition(self.poses[self.index]);
          },
          this
        );
      }
    });

    // new PowerupCube(scene, new Vector3(-.3, 0.4, 3));
  }

  setAvilablePoses(poses: Vector3[]) {
    this.poses = poses;
  }
  setShowCount(count: number) {
    this.showCount = count;
  }
  start() {
    Timer.Instance.remove(this.timeoutHandler);
    /* this.timeoutHandler = Timer.Instance.add(
      POWERUP_REAPPEAR_TIME,
      () => {
     
        this.powerupCube.cube.isVisible = true;
        this.powerupCube.setPosition(this.poses[this.index]);
      },
      this
    );
*/

    this.index = 0;
    this.poses = this.shuffleArray(this.poses);
    if (this.powerupCube == null) {
      this.powerupCube = new PowerupCube(this.scene, this.poses[0]);
    }

    console.log("set powerup cube pos", this.poses[0])

    this.powerupCube.cube.isVisible = true;
    this.powerupCube.setPosition(this.poses[0]);
  }

  shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
