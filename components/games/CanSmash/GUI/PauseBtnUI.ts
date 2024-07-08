
import * as GUI from "@babylonjs/gui";
import { EventTypes, Events } from "../Events";
import { Images } from "../Images";

export class PauseBtnUI {
  counter: GUI.TextBlock;
  fillEllipse: GUI.Ellipse;
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {

    var container = new GUI.Container();
    container.adaptWidthToChildren = true;
    container.heightInPixels = 70 ;
    container.widthInPixels = 70 ;
    container.adaptWidthToChildren = true;
    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.topInPixels = 25;
    container.leftInPixels = 20;
    advancedTexture.addControl(container);

    var img = new GUI.Image();
    img.source = Images.data.pause_button;
    img.widthInPixels = 60;
    img.heightInPixels = 60;
    img.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.addControl(img);


    img.onPointerClickObservable.add( () =>{
      Events.gamePlay.notifyObservers({type:EventTypes.ON_PAUSE_BTN_CLICKED})
    });

  }



}
