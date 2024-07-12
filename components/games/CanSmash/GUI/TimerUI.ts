import { CreateGreasedLine, GreasedLineTools, Scene } from "@babylonjs/core";

import * as GUI from "@babylonjs/gui";
import { GameData } from "../GameData";
import { EventTypes, Events } from "../Events";
import { Timer } from "../Timer";

export class TimerUI {
  private counter: GUI.TextBlock;
  private fillEllipse: GUI.Ellipse;
  private maxTime: number = 0;
  private timer: number;
  private timerHander = null;
  static instance: TimerUI = null;
  delta: number;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    let size = 100 + "px";
    TimerUI.instance = this;

    var container = new GUI.Container();
    container.adaptWidthToChildren = true;
    container.height = 150 + "px";
    container.width = 150 + "px";
    container.paddingBottomInPixels = 10;
    container.paddingRightInPixels = 10;
    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    container.leftInPixels = 20;
    container.topInPixels = 5;
    advancedTexture.addControl(container);

    var centerCircle = new GUI.Ellipse();
    centerCircle.widthInPixels = 90;
    centerCircle.heightInPixels = 90;
    centerCircle.background = "white";
    centerCircle.thickness = 0;
    centerCircle.arc = 2;
    container.addControl(centerCircle);

    var fillEllipseBg = new GUI.Ellipse();
    fillEllipseBg.widthInPixels = 110;
    fillEllipseBg.heightInPixels = 110;
    fillEllipseBg.color = "white";
    fillEllipseBg.thickness = 5;
    fillEllipseBg.arc = 1;
    container.addControl(fillEllipseBg);

    this.fillEllipse = new GUI.Ellipse();
    this.fillEllipse.rotation = -Math.PI / 2;
    this.fillEllipse.widthInPixels = 110;
    this.fillEllipse.heightInPixels = 110;
    this.fillEllipse.color = "Orange";
    this.fillEllipse.thickness = 5;
    this.fillEllipse.arc = 1;
    container.addControl(this.fillEllipse);

    this.counter = new GUI.TextBlock();
    this.counter.text = "00";
    this.counter.color = "black";
    this.counter.width = size;
    this.counter.fontSize = 30;
    this.counter.fontStyle = "bold";
    this.counter.fontFamily = "PeaceSans";
    // this.counter.outlineColor = "#DB6B23";
    // this.counter.outlineWidth = 2;
    container.addControl(this.counter);

    this.timer = this.maxTime;
    this.setFillArc(1);

    var self = this;
    let scene = GameData.instance.getScene();
    let engine = GameData.instance.getEngine();

    this.delta = 0.1;
    this.timerHander = Timer.Instance.add(
      this.delta,
      () => {
        self.updateTimerUi(self.delta);
      },
      this
    );

    Events.ui.add((data: any) => {
      if (data.type == "TimerUI:resetByRevive") {
        if (this.timer < 10) this.reset(data.count);
      }
    });
  }
  updateTimerUi(delta: number) {
    if (this.timer <= 0) return;
    //const delta = engine.getDeltaTime() * 0.001;
    this.timer -= delta;
    //
    if (this.timer <= 0) {
      this.timer = 0;
      Events.ui.notifyObservers({ type: EventTypes.TIMER_COMPLETE });
    }
    this.setFillArc(this.timer / this.maxTime);
    this.setCounterText(this.timer.toFixed());

    this.timerHander = Timer.Instance.add(
      delta,
      () => {
        this.updateTimerUi(delta);
      },
      this
    );
  }
  reset(count: number) {
    this.maxTime = count;
    this.timer = this.maxTime;
    Timer.Instance.remove(this.timerHander);
    this.timerHander = Timer.Instance.add(
      this.delta,
      () => {
        this.updateTimerUi(this.delta);
      },
      this
    );
  }

  getCurrentTime() {
    return this.timer;
  }
  getMaxTime() {
    return this.maxTime;
  }
  private setCounterText(count: string) {
    this.counter.text = count;
  }

  private setFillArc(count: number) {
    this.fillEllipse.arc = count;
  }
}
