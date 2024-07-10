import { Scene } from "@babylonjs/core";
import { Events } from "../Events";

import * as GUI from "@babylonjs/gui";
import { ImagePopup } from "./ImagePopup";

export class ImagePopupManager {
  counter: GUI.TextBlock;
  constructor() {
    let imagePopups: ImagePopup[] = [];

    Events.ui.add((data: any) => {
      if (data.name != "image_popup") return;

      let tp = null;
      for (let i = 0; i < imagePopups.length; i++) {
        if (imagePopups[i].isAnimateComplete) {
          tp = imagePopups[i];
          break;
        }
      }
      if (tp == null) {
        tp = new ImagePopup();
        imagePopups.push(tp);
      }
      
      tp.animate(data.pos.clone(), data.image);
    });
  }
}
