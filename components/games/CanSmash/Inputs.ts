import { Scene } from "@babylonjs/core";
import { Events } from "./Events";

export class Inputs {

  constructor(scene: Scene, canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointerdown", this.onPointerDown, false);
    canvas.addEventListener("pointerup", this.onPointerUp, false);
    canvas.addEventListener("pointermove", this.onPointerMove, false);

    scene.onDispose = function () {
      canvas.removeEventListener("pointerdown", this.onPointerDown);
      canvas.removeEventListener("pointerup", this.onPointerUp);
      canvas.removeEventListener("pointermove", this.onPointerMove);
    };
  }

  onPointerDown(evt:PointerEvent) {
    evt.preventDefault();

    if (evt.button !== 0) {
      return;
    }
    Events.input.notifyObservers({ name: "onPointerDown", data: evt });
  }

  onPointerUp(evt:PointerEvent) {
    evt.preventDefault();
    Events.input.notifyObservers({ name: "onPointerUp", data: null });
  }

  onPointerMove(evt:PointerEvent) {
 
    Events.input.notifyObservers({ name: "onPointerMove", data: evt });
    evt.preventDefault();
  }
}
