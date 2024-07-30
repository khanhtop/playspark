import * as GUI from "@babylonjs/gui";
import { Color4, EngineStore, IImage } from "@babylonjs/core";
export class TintedImage extends GUI.Image {
    private _tint: Color4;
    private _originalDomImage: IImage;
    private wFactor: number = 1;
    private hFactor: number = 1;
    constructor(name?: string, url?: string) {
      super(name, url);
    }
  
    setWFactor(factor: number) {
      this.wFactor = factor;
    }
    setHFactor(factor: number) {
      this.hFactor = factor;
    }
  
    get tint() {
      return this._tint;
    }
    set tint(value: Color4) {
      if (this._originalDomImage == undefined) {
        this._originalDomImage = this.domImage;
      }
      this._tint = value;
  
      // create a temp context to tint the image
      // 1: draw the tint color on the image canvas
      // 2: draw the greyscale image ontop, this will create a solid tint color cutout of the greyscale image
      //   destination-atop
      //   The existing canvas is only kept where it overlaps the new shape. The new shape is drawn behind the canvas content.
      // 3: draw the color image back onto the dom image, multiply seems to work better since in color white stays white and we want white to become the new color
      // color
      //  Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
      // multiply
      //  The pixels of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
      let cutoutCanvas = document.createElement("canvas");
      let cutoutContext = cutoutCanvas.getContext("2d");
      cutoutCanvas.width = this.imageWidth * this.wFactor;
      cutoutCanvas.height = this.imageHeight * this.hFactor;
      // fill offscreen buffer with the tint color
      cutoutContext.fillStyle = this._tint.toHexString();
      cutoutContext.fillRect(0, 0, cutoutCanvas.width, cutoutCanvas.height);
  
      // now we have a context filled with the tint color
      cutoutContext.globalCompositeOperation = "destination-atop";
      cutoutContext.drawImage(this._originalDomImage as CanvasImageSource, 0, 0);
  
      // now we cut out the greyscale image and have just the cutout left
      let imageCanvas = document.createElement("canvas");
      let imageCanvasContext = imageCanvas.getContext("2d");
      imageCanvas.width = this.imageWidth * this.wFactor;
      imageCanvas.height = this.imageHeight * this.hFactor;
      imageCanvasContext.drawImage(
        this._originalDomImage as CanvasImageSource,
        0,
        0
      );
  
      // now we have the greyscale on the image canvas
      imageCanvasContext.globalCompositeOperation = "multiply";
      // imageCanvasContext.fillStyle = this._tint.toHexString();
      // imageCanvasContext.fillRect(0,0,imageCanvas.width,imageCanvas.height);
      imageCanvasContext.drawImage(cutoutCanvas, 0, 0);
      // now we have a tinted image on the image canvas
      // is there no faster way than this?
      // Stolen from GUI.Image
      const engine =
        this._host?.getScene()?.getEngine() || EngineStore.LastCreatedEngine;
      this.domImage = engine.createCanvasImage();
  
      this.domImage.src = imageCanvas.toDataURL();
    }
  }
  