import { Engine, Scene, setAndStartTimer } from "@babylonjs/core";

export class Timer {
  private _timers = {};
  private _nextFreeId = 0;
  private pause = false;
  static Instance: Timer = null;
  add(durationSecs, callback, scope) {
    if (durationSecs > 0) {
      var id = this._nextFreeId;

      this._timers[this._nextFreeId] = {
        secsLeft: durationSecs,
        callback: callback,
        scope: scope,
      };

      this._nextFreeId += 1;
      return id;
    }

    return null;
  }

  remove(id) {
    if (id != null) {
      delete this._timers[id];
    }
  }

  update(dt) {
    for (var property in this._timers) {
      var timer = this._timers[property];
      timer.secsLeft -= dt;
      if (timer.secsLeft <= 0) {
        timer.callback.call(timer.scope);
        delete this._timers[property];
      }
    }
  }

  Pause(state) {
    this.pause = state;
  }
  constructor(scene: Scene, engine: Engine) {
    Timer.Instance = this;

    setAndStartTimer({
      timeout: Infinity,
      contextObservable: scene.onBeforeRenderObservable,
      breakCondition: () => {
        // this will check if we need to break before the timeout has reached
        return scene.isDisposed;
      },
      onEnded: (data) => {
        console.log("Hello");

        // this will run when the timeout has passed
      },
      onTick: (data) => {
        console.log();

        if (!this.pause) {
          let deltaTime = engine.getDeltaTime() / 1000;
          if (scene.getAnimationRatio() == 0) deltaTime = 0; //scene.getAnimationRatio();
          this.update(deltaTime);
        }
        // this will run
      },
      onAborted: (data) => {
        // this function will run when the break condition has met (premature ending)
      },
    });

    /*  scene.onBeforeRenderObservable.add(() => {
      if (this.pause) return;
      const delta = engine.getDeltaTime() * 0.001;
      this.update(delta);
    });*/
  }
}
