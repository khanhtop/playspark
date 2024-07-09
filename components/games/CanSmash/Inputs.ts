import { Scene } from "@babylonjs/core";
import { Events } from "./Events";

export class Inputs {
  constructor(scene: Scene, canvas: any) {
    canvas.addEventListener("pointerdown", this.onPointerDown, false);
    canvas.addEventListener("pointerup", this.onPointerUp, false);
    canvas.addEventListener("pointermove", this.onPointerMove, false);

    scene.onDispose = function () {
      canvas.removeEventListener("pointerdown", this.onPointerDown);
      canvas.removeEventListener("pointerup", this.onPointerUp);
      canvas.removeEventListener("pointermove", this.onPointerMove);
    };
  }

  onPointerDown(evt) {
    if (evt.button !== 0) {
      return;
    }
    Events.input.notifyObservers({ name: "onPointerDown", data: evt });
  }

  onPointerUp() {
    Events.input.notifyObservers({ name: "onPointerUp", data: null });
  }

  onPointerMove(evt) {
    Events.input.notifyObservers({ name: "onPointerMove", data: evt });
  }
}
