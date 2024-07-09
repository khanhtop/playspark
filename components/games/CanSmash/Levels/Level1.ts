import { Vector3 } from "@babylonjs/core";
import { PlatformMovmentTypes, PlatformTypes } from "../PlatformTypes";
let radious = 0.175;
export const levels = [
  // level 1
  {
    time: 30,
    target_count: 3,
    platforms: [
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 2,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 4,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 1,
        y: -0.2,
        z: 6,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },

      {
        moveType: PlatformMovmentTypes.STATIC,
        x: -1,
        y: -0.2,
        z: 8,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
    ],
    cans: [
      { platform: 1, type: "enemy", x: 0, y: 0, z: -radious },
      { platform: 1, type: "can", x: radious / 1.2, y: 0, z: 0, row: 1 },
      { platform: 1, type: "can", x: -radious / 1.2, y: 0, z: 0, row: 1 },
      { platform: 1, type: "can", x: 0, y: 0, z: radious, row: 1 },

      { platform: 2, type: "can", x: 0, y: 0, z: radious, row: 2 },
      { platform: 2, type: "can", x: radious / 1.2, y: 0, z: 0, row: 2 },
      { platform: 2, type: "can", x: -radious / 1.2, y: 0, z: 0, row: 2 },
      { platform: 2, type: "can", x: 0, y: 0, z: -radious, row: 2 },

      { platform: 3, type: "can", x: 0, y: 0, z: radious, row: 3 },
      { platform: 3, type: "can", x: radious / 1.2, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: -radious / 1.2, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: 0, y: 0, z: -radious, row: 3 },

      { platform: 4, type: "can", x: 0, y: 0, z: radious, row: 4 },
      { platform: 4, type: "can", x: radious / 1.2, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: -radious / 1.2, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: 0, y: 0, z: -radious, row: 4 },
      // { type: "can", x: -0.175, y: 0.46, z: 2 },
      // { type: "enemy", x: 0, y: 0.2, z: 2 },
    ],
    powerupPoses: [
      new Vector3(-0.5, -0.2, 2),
      new Vector3(0.5, -0.2, 2),
      new Vector3(0, -0.2, 4),
      new Vector3(-1, -0.2, 5),
      new Vector3(1, -0.2, 5),
    ],
  },

  // level 2
  {
    time: 30,
    target_count: 10,
    platforms: [
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 2,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 4,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 1,
        y: -0.2,
        z: 6,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },

      {
        moveType: PlatformMovmentTypes.STATIC,
        x: -1,
        y: -0.2,
        z: 8,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
    ],
    cans: [
      { platform: 1, type: "enemy", x: 0, y: 0, z: 0 },
      { platform: 1, type: "can", x: radious, y: 0, z: 0, row: 1 },
      { platform: 1, type: "can", x: -radious, y: 0, z: 0, row: 1 },

      { platform: 2, type: "enemy", x: 0, y: 0, z: 0 },
      { platform: 2, type: "can", x: radious, y: 0, z: 0, row: 2 },
      { platform: 2, type: "can", x: -radious, y: 0, z: 0, row: 2 },

      { platform: 3, type: "can", x: 0, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: radious, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: -radious, y: 0, z: 0, row: 3 },

      { platform: 4, type: "can", x: 0, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: radious, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: -radious, y: 0, z: 0, row: 4 },
    ],
    powerupPoses: [
      new Vector3(-0.5, -0.2, 2),
      new Vector3(0.5, -0.2, 2),
      new Vector3(0, -0.2, 4),
      new Vector3(-1, -0.2, 5),
      new Vector3(1, -0.2, 5),
    ],
  },

  // level 3
  {
    time: 30,
    target_count: 20,
    platforms: [
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 2,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: -1,
        y: -0.2,
        z: 4,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 1,
        y: -0.2,
        z: 6,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },

      {
        moveType: PlatformMovmentTypes.STATIC,
        x: -1,
        y: -0.2,
        z: 8,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
    ],
    cans: [
      { platform: 1, type: "enemy", x: 0, y: 0, z: 0 },
      { platform: 1, type: "can", x: radious, y: 0, z: 0, row: 1 },
      { platform: 1, type: "can", x: -radious, y: 0, z: 0, row: 1 },

      { platform: 2, type: "enemy", x: 0, y: 0, z: 0 },
      { platform: 2, type: "can", x: radious, y: 0, z: 0, row: 2 },
      { platform: 2, type: "can", x: -radious, y: 0, z: 0, row: 2 },

      { platform: 3, type: "can", x: 0, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: radious, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: -radious, y: 0, z: 0, row: 3 },

      { platform: 4, type: "can", x: 0, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: radious, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: -radious, y: 0, z: 0, row: 4 },
    ],
    powerupPoses: [
      new Vector3(-0.5, -0.2, 2),
      new Vector3(0.5, -0.2, 2),
      new Vector3(0, -0.2, 4),
      new Vector3(-1, -0.2, 5),
      new Vector3(1, -0.2, 5),
    ],
  },
  // level 4
  {
    time: 30,
    target_count: 10,
    platforms: [
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 2,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: -1,
        y: -0.2,
        z: 4,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 1,
        y: -0.2,
        z: 6,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },

      {
        moveType: PlatformMovmentTypes.STATIC,
        x: -1,
        y: -0.2,
        z: 8,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
    ],
    cans: [
      { platform: 1, type: "enemy", x: -radious / 2, y: 0, z: 0 },
      { platform: 1, type: "can", x: radious / 2, y: 0, z: 0, row: 1 },

      { platform: 2, type: "enemy", x: -radious / 2, y: 0, z: 0 },
      { platform: 2, type: "can", x: radious / 2, y: 0, z: 0, row: 2 },

      { platform: 3, type: "can", x: -radious / 2, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: radious / 2, y: 0, z: 0, row: 3 },

      { platform: 4, type: "can", x: -radious / 2, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: radious / 2, y: 0, z: 0, row: 4 },
    ],
    powerupPoses: [
      new Vector3(-0.5, -0.2, 2),
      new Vector3(0.5, -0.2, 2),
      new Vector3(0, -0.2, 4),
      new Vector3(-1, -0.2, 5),
      new Vector3(1, -0.2, 5),
    ],
  },
  // level 5
  {
    time: 10,
    target_count: 5,
    platforms: [
      {
        moveType: PlatformMovmentTypes.HORIZONTAL_MOVE,
        x: 0,
        y: -0.2,
        z: 2,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.HORIZONTAL_MOVE,
        x: -1,
        y: -0.2,
        z: 4,
        range: -0.7,
        speed: -0.5,
        type: PlatformTypes.BARREL,
      },
      {
        moveType: PlatformMovmentTypes.HORIZONTAL_MOVE,
        x: 1,
        y: -0.2,
        z: 6,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },

      {
        moveType: PlatformMovmentTypes.HORIZONTAL_MOVE,
        x: -1,
        y: -0.2,
        z: 8,
        range: -0.7,
        speed: -0.5,
        type: PlatformTypes.BARREL,
      },
    ],
    cans: [
      { platform: 1, type: "enemy", x: -radious / 2, y: 0, z: 0 },
      { platform: 1, type: "can", x: radious / 2, y: 0, z: 0, row: 1 },

      { platform: 2, type: "enemy", x: -radious / 2, y: 0, z: 0 },
      { platform: 2, type: "can", x: radious / 2, y: 0, z: 0, row: 2 },

      { platform: 3, type: "can", x: -radious / 2, y: 0, z: 0, row: 3 },
      { platform: 3, type: "can", x: radious / 2, y: 0, z: 0, row: 3 },

      { platform: 4, type: "can", x: -radious / 2, y: 0, z: 0, row: 4 },
      { platform: 4, type: "can", x: radious / 2, y: 0, z: 0, row: 4 },
    ],
    powerupPoses: [
      new Vector3(-0.5, -0.2, 2),
      new Vector3(0.5, -0.2, 2),
      new Vector3(0, -0.2, 4),
      new Vector3(-1, -0.2, 5),
      new Vector3(1, -0.2, 5),
    ],
  },

  /*
  // level 1000
  {
    time: 30,
    target_count: 30,
    platforms: [
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 2,
        type: PlatformTypes.LEDGES,
      },
      {
        moveType: PlatformMovmentTypes.HORIZONTAL_MOVE,
        x: 0,
        y: -0.2,
        z: 4,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.LEDGES,
      },
      {
        moveType: PlatformMovmentTypes.BOTH_MOVE,
        x: 0,
        y: -0.2,
        z: 6,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.LEDGES,
      },

      {
        moveType: PlatformMovmentTypes.VERTICAL_MOVE,
        x: -1,
        y: -0.2,
        z: 8,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.LEDGES,
      },
      {
        moveType: PlatformMovmentTypes.VERTICAL_MOVE,
        x: 1,
        y: -0.2,
        z: 10,
        range: 0.7,
        speed: -0.5,
        type: PlatformTypes.LEDGES,
      },
    ],
    cans: [
      { platform: 1, type: "enemy", x: 0, y: 0, z: 0 },
      { platform: 1, type: "can", x: 0, y: 0.26, z: 0, row: 1 },
      { platform: 1, type: "can", x: 0.175, y: 0, z: 0, row: 1 },
      { platform: 1, type: "can", x: -0.175, y: 0, z: 0, row: 1 },
      { platform: 2, type: "can", x: 0, y: 0, z: 0, row: 2 },
      { platform: 3, type: "can", x: 0, y: 0, z: 0, row: 3 },
      { platform: 4, type: "can", x: 0, y: 0, z: 0, row: 4 },
      { platform: 5, type: "can", x: 0, y: 0, z: 0, row: 4 },
      { platform: 5, type: "enemy", x: -0.175, y: 0, z: 0 },
      // { type: "can", x: -0.175, y: 0.46, z: 2 },
      // { type: "enemy", x: 0, y: 0.2, z: 2 },
    ],
    powerupPoses: [
      new Vector3(-0.5, -0.2, 2),
      new Vector3(0.5, -0.2, 2),
      new Vector3(0, -0.2, 4),
      new Vector3(-1, -0.2, 5),
      new Vector3(1, -0.2, 5),
    ],
  },
  // level 1002
  {
    time: 10,
    target_count: 5,
    platforms: [
      { moveType: PlatformMovmentTypes.STATIC, x: 0, y: -0.2, z: 3 },
      {
        moveType: PlatformMovmentTypes.STATIC,
        x: 0,
        y: -0.2,
        z: 3,
        range: 0.7,
        speed: 0.5,
        type: PlatformTypes.BARREL,
      },
    ],
    cans: [
      { platform: 1, type: "can", x: 0, y: 0, z: 0, row: 1 },
      { platform: 1, type: "can", x: 0, y: 0.26, z: 0, row: 1 },
      { platform: 1, type: "can", x: 0.175, y: 0, z: 0, row: 1 },
      { platform: 1, type: "can", x: -0.175, y: 0, z: 0, row: 1 },
    ],
    powerupPoses: [
      new Vector3(-0.5, -0.2, 2),
      new Vector3(0.5, -0.2, 2),
      new Vector3(0, -0.2, 4),
      new Vector3(-1, -0.2, 5),
      new Vector3(1, -0.2, 5),
    ],
  },*/
];
