import { Scene } from "@babylonjs/core";
import { EventTypes, Events } from "../Events";

import * as GUI from "@babylonjs/gui";
import { TextPopup } from "./TextPopup";

export class TextPopupManager {
  counter: GUI.TextBlock;
  constructor() {
    let textPopups: TextPopup[] = [];

    Events.ui.add((data: any) => {
      if (data.type !=  EventTypes.SHOW_TEXT_POPUP) return;

      let tp = null;
      for (let i = 0; i < textPopups.length; i++) {
        if (textPopups[i].isAnimateComplete) {
          tp = textPopups[i];
          break;
        }
      }
      if (tp == null) {
        tp = new TextPopup();
        textPopups.push(tp);
      }
      
      tp.animate(data.pos.clone(), data.text);
    });
  }
}
