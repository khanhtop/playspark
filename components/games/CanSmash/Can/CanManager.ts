import {
  Engine,
  Mesh,
  Quaternion,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { EventTypes, Events } from "../Events";
import { ICan } from "./ICan";
import { LevelCreator } from "../LevelCreator";
import { Utils } from "../Utils";
import { Materials } from "../Materials";
import { GameData } from "../GameData";
import { CAN_REAPPEAR_TIME } from "../Consts";
import { Timer } from "../Timer";

export class CanManager {
  scene: Scene;
  timerHandle = null;
  timerHandle2 = null;
  reapearTime = 1;
  constructor(scene: Scene) {
    this.scene = scene;
    let ranIndex = 0;
    let hitCount = 0;

    Events.gamePlay.add((data: any) => {
      if (data.type != EventTypes.LEVEL_COMPLETE) return;
      Timer.Instance.remove(this.timerHandle);
      Timer.Instance.remove(this.timerHandle2);
    });
    this.reapearTime = CAN_REAPPEAR_TIME;
    Events.gamePlay.add((data: any) => {
      if (data.name != "CanManager:setReapearTime") return;
      //console.log(data);
      this.reapearTime = data.time;
    });

    GameData.instance.setHitCount(hitCount);
    Events.hits.add((_data: ICan) => {
      switch (_data.name) {
        case "can":
          hitCount = GameData.instance.getHitCount() + 1;
          GameData.instance.setHitCount(hitCount);

          //  console.log("hit count", hitCount);
          Events.ui.notifyObservers({
            type: EventTypes.REMAINING_TARGET_UI,
            hitCount: hitCount,
            targetCount: GameData.instance.getTargetCount(),
          });

          this.timerHandle = Timer.Instance.add(
            this.reapearTime,
            () => {
              let can = _data.data.sender;

              can.setPosition(
                new Vector3(
                  can.defaultPos.x +
                    LevelCreator.platforms[can.platformIndex].position.x,
                  can.defaultPos.y +
                    LevelCreator.platforms[can.platformIndex].position.y +
                    0.4,
                  can.defaultPos.z +
                    LevelCreator.platforms[can.platformIndex].position.z
                )
              );

              do {
                ranIndex = Utils.getRandomInt(Materials.instance.cans.length);
              } while (ranIndex == can.materialIndex);

              // if (ranIndex > 3) ranIndex = 0;
              can.setMaterial(Materials.instance.cans[ranIndex], ranIndex);
              can.setHitState(false);
            },
            this
          );

          break;
        case "enemy":
          //console.log(_data.targetName);
          this.timerHandle2 = Timer.Instance.add(
            this.reapearTime,
            () => {
              let enemy = _data.data.sender;
              enemy.setPosition(
                new Vector3(
                  enemy.defaultPos.x +
                    LevelCreator.platforms[enemy.platformIndex].position.x,
                  enemy.defaultPos.y +
                    LevelCreator.platforms[enemy.platformIndex].position.y +
                    0.4,
                  enemy.defaultPos.z +
                    LevelCreator.platforms[enemy.platformIndex].position.z
                )
              );

              // _data.data.sender.setActive(false);
              enemy.setHitState(false);
            },
            this
          );

          break;
      }
    });
  }
}
