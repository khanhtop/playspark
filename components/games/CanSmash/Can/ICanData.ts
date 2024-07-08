import { IPhysicsCollisionEvent } from "@babylonjs/core";
import { Can } from "./Can";

export interface ICanData {
  sender: Can;
  collisionEvent: IPhysicsCollisionEvent;
}
