import { Engine, Mesh, Scene, Vector3 } from "@babylonjs/core";
import { Utils } from "./Utils";
import { Materials } from "./Materials";
import { Can } from "./Can/Can";
import { levels } from "./Levels/Level1";
import { Barrel } from "./Barrel";
import { EventTypes, Events } from "./Events";
import { GameData } from "./GameData";
import { PowerupManager } from "./Powerups/PowerupManager";
import { Ledges } from "./Ledges";
import { PlatformTypes } from "./PlatformTypes";
import { CameraController } from "./CameraController";

export class LevelCreator {
  restart() {
    this.create();
  }
  cansPool: Can[];
  barrelPool: Barrel[];
  ledgesPool: Ledges[];
  static platforms: Mesh[];
  private lastLevelIndex: number = 0;

  static instane: LevelCreator = null;
  constructor() {
    LevelCreator.platforms = [];
    this.barrelPool = [];
    this.ledgesPool = [];
    this.cansPool = [];
    LevelCreator.instane = this;
  }

  create(levelIndex: number | undefined = undefined) {
    if (levelIndex == undefined) {
      levelIndex = this.lastLevelIndex;
    } else {
      this.lastLevelIndex = levelIndex;
    }

    GameData.instance.setHitCount(0);

    PowerupManager.instance.setShowCount(
      levels[levelIndex].powerup_appear_count
    );
    PowerupManager.instance.setAvilablePoses(levels[levelIndex].powerupPoses);
    PowerupManager.instance.start();

    GameData.instance.setCurrentLevel(levelIndex + 1);
    GameData.instance.setTotalLevel(levels.length);

    if (levelIndex < levels.length - 1) {
      GameData.instance.setNextLevelTime(levels[levelIndex + 1].time);
      GameData.instance.setNextLevelHitCount(
        levels[levelIndex + 1].target_count
      );
    }

    Events.gamePlay.add((_data: any) => {
      if (_data.type != "LevelCreator:resetCansPos") return;
      this.cansPool.forEach((can) => {
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
      });
    });

    GameData.instance.setTargetCount(levels[levelIndex].target_count);

    Events.ui.notifyObservers({
      type: EventTypes.RESET_TIMER,
      time: levels[levelIndex].time,
    });

    Events.ui.notifyObservers({
      type: EventTypes.REMAINING_TARGET_UI,
      hitCount: 0,
      targetCount: GameData.instance.getTargetCount(),
    });

    this.creatPlatforms(levelIndex);

    this.cansPool.forEach((can) => {
      can.disable();
    });

    levels[levelIndex].cans.forEach((canData, index) => {
      let can = this.cansPool[index];

      if (can == undefined) {
        can = new Can();
        this.cansPool.push(can);
      }

      can.init(
        new Vector3(canData.x, canData.y, canData.z),
        canData.type,
        canData.row
      );

      if (can !== undefined) {
        can.enable();
      }

      can.platformIndex = canData.platform - 1;
      can.setPosition(
        new Vector3(
          canData.x + LevelCreator.platforms[can.platformIndex].position.x,
          canData.y +
            LevelCreator.platforms[can.platformIndex].position.y +
            0.45,
          canData.z + LevelCreator.platforms[can.platformIndex].position.z
        )
      );
      switch (canData.type) {
        case "can":
          let ranIndex = Utils.getRandomInt(Materials.instance.cans.length);
          can.setMaterial(Materials.instance.cans[ranIndex], ranIndex);
 
          break;
        case "enemy":
          can.setMaterial(Materials.instance.enemy, 0);
          break;
      }
    });
  }
  creatPlatforms(levelIndex: number) {
    this.barrelPool.forEach((barrel) => {
      barrel.disable();
    });
    this.ledgesPool.forEach((ledges) => {
      ledges.disable();
    });
    LevelCreator.platforms = [];

    let barrelIndex = 0;
    let ledgesIndex = 0;

    levels[levelIndex].platforms.forEach((pData) => {
      switch (pData.type) {
        case PlatformTypes.BARREL:
          let barrel = this.barrelPool[barrelIndex];

          if (barrel == undefined) {
            barrel = new Barrel();
            this.barrelPool.push(barrel);
          }

          let platform = barrel.init(
            new Vector3(pData.x, pData.y, pData.z),
            pData.moveType,
            pData.range,
            pData.speed
          );

          if (barrel !== undefined) {
            barrel.enable();
          }

          LevelCreator.platforms.push(platform);
          barrelIndex++;
          break;
        case PlatformTypes.LEDGES:
          let ledges = this.ledgesPool[ledgesIndex];

          if (ledges == undefined) {
            ledges = new Ledges();
            this.ledgesPool.push(ledges);
          }

          let lplatform = ledges.init(
            new Vector3(pData.x, pData.y, pData.z),
            pData.moveType,
            pData.range,
            pData.speed
          );

          if (ledges !== undefined) {
            ledges.enable();
          }

          LevelCreator.platforms.push(lplatform);
          ledgesIndex++;
          break;
      }
    });
  }
}
