import { CreateGreasedLine, GreasedLineTools, Scene } from "@babylonjs/core";

import * as GUI from "@babylonjs/gui";
import { EventTypes, Events } from "../Events";
import { GameData } from "../GameData";
import * as TWEEN from "@tweenjs/tween.js";
import { Timer } from "../Timer";
import { ON_POWERUP_ENABLED } from "../Consts";

export class PowerupUI {
  //counter: GUI.TextBlock;
  container: GUI.Container;
  private fillEllipse: GUI.Ellipse;
  private timer: number = 0;
  private maxTime: number = 1;
  private type: EventTypes;
  private tween: TWEEN.Tween<{ alpha: number }>;
  private ring_img: GUI.Image;
  private fillEllipseBg: any;
  private timerHander: number;
  private isActive: boolean = false;
  constructor(
    advancedTexture: GUI.AdvancedDynamicTexture,
    imgSrc: string,
    ringImgSrc: string,
    eventType: EventTypes
  ) {
    this.type = eventType;

    this.container = new GUI.Container();
    this.container.isPointerBlocker = true;
    this.container.heightInPixels = 100;
    this.container.widthInPixels = 100;
    this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    advancedTexture.addControl(this.container);

    let ellipseSize = 85;
    let thickness = 5;
    this.fillEllipseBg = new GUI.Ellipse();
    this.fillEllipseBg.widthInPixels = ellipseSize;
    this.fillEllipseBg.heightInPixels = ellipseSize;
    this.fillEllipseBg.color = "white";
    this.fillEllipseBg.thickness = thickness;
    this.fillEllipseBg.arc = 1;
    this.fillEllipseBg.alpha = 0;
    this.container.addControl(this.fillEllipseBg);

    this.fillEllipse = new GUI.Ellipse();
    this.fillEllipse.rotation = -Math.PI / 2;
    this.fillEllipse.widthInPixels = ellipseSize;
    this.fillEllipse.heightInPixels = ellipseSize;
    this.fillEllipse.color = "red";
    this.fillEllipse.thickness = thickness;
    this.fillEllipse.arc = 0;
    this.fillEllipse.alpha = 0;
    this.container.addControl(this.fillEllipse);

    this.ring_img = new GUI.Image();
    this.ring_img.source = ringImgSrc;
    this.ring_img.widthInPixels = 110;
    this.ring_img.heightInPixels = 110;
    this.container.addControl(this.ring_img);
    this.ring_img.alpha = 0;

    var img = new GUI.Image();
    img.source = imgSrc;
    img.widthInPixels = 75;
    img.heightInPixels = 75;
    this.container.addControl(img);
    var self = this;

    const _data = {
      alpha: this.ring_img.alpha,
    };
    this.tween = new TWEEN.Tween(_data)
      .to(
        {
          alpha: 1,
        },
        1000
      )
      .easing(TWEEN.Easing.Linear.Out)
      .onUpdate(() => {
        this.ring_img.alpha = _data.alpha;
      })
      .onComplete(() => {
        // this.fillEllipseBg.alpha = this.ring_img.alpha = 0;
      })
      .yoyo(true)
      .repeat(Infinity);

    /*var thunder = new GUI.Image();
    thunder.source = Images.data.thunder;
    thunder.scaleX = 0.3;
    thunder.scaleY = 0.3;
    thunder.topInPixels = 30;
    thunder.leftInPixels = -10;
    this.container.addControl(thunder);

    this.counter = new GUI.TextBlock();
    this.counter.text = "1";
    this.counter.color = "#FFB200";
    this.counter.fontSize = 30;
    this.counter.fontStyle = "bold";
    this.counter.outlineColor = "#DB6B23";
    this.counter.outlineWidth = 2;
    this.counter.topInPixels = 27;
    this.counter.leftInPixels = 10;
    this.container.addControl(this.counter);*/

    this.container.onPointerClickObservable.add(function () {
      if (self.timer != 0) return;

      Events.ui.notifyObservers({
        type: self.type,
        sender: self,
        isActive: self.isActive,
      });
    });

    Events.ui.add((data: any) => {
      if (data.type == self.type && data.reciver == self) {
        self.timer = self.maxTime = data.time;
        Events.powerup.notifyObservers({
          type: self.type,
          state: true,
        });
        let delay = 0.1;
        self.timerHander = Timer.Instance.add(
          delay,
          () => {
            self.updateTimerUi(delay);
          },
          self
        );
      }
    });
  }
  private setFillArc(count: number) {
    this.fillEllipse.arc = count;
  }

  private updateTimerUi(delay: number) {
    if (this.timer <= 0) return;

    this.timer -= delay;
    //
    if (this.timer <= 0) {
      this.timer = 0;
      this.fillEllipseBg.alpha = 0;
      this.fillEllipse.alpha = 0;

      Events.powerup.notifyObservers({
        type: this.type,
        state: false,
      });
    } else {
      this.fillEllipseBg.alpha = 1;
      this.fillEllipse.alpha = 1;
    }
    this.setFillArc(this.timer / this.maxTime);
    this.timerHander = Timer.Instance.add(
      delay,
      () => {
        this.updateTimerUi(delay);
      },
      this
    );
  }

  startTween() {
    this.tween.start();
    this.isActive = true;
    Events.powerup.notifyObservers({
      type: ON_POWERUP_ENABLED
    });
  }

  stopTween() {
    this.fillEllipseBg.alpha = this.ring_img.alpha = 0;
    this.tween.stop();
    this.isActive = false;
  }
}
