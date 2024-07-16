import * as GUI from "@babylonjs/gui";
import { LevelCompleteUI } from "./LevelCompleteUI";
import { EventTypes, Events } from "../Events";
import { ComboPopup } from "./ComboPopup";
import { HUD } from "./HUD";
import { GameOverUI } from "./GameOverUI";
import { PauseUI } from "./PauseUI";
import { GameData } from "../GameData";
import { Utils } from "../Utils";
import { SaveLoadData } from "../SaveLoadData.";
import { BlackBG } from "./BlackBG";
import { TutorialManager } from "./TutorialManager";
import {
  ICanvasRenderingContext,
  ParticleSystem,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { Images } from "../Images";

export class GUI2DParticle {
  static instanc: GUI2DParticle = null;
  canAnimate: boolean = false;
  particlesArray = [];
  context: ICanvasRenderingContext;
  canvas: any;
  advancedTexture: GUI.AdvancedDynamicTexture;

  constructor() {
    GUI2DParticle.instanc = this;
    let scene = GameData.instance.getScene();
    this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI2");

    const canvas = GameData.instance.getCanvas();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context: ICanvasRenderingContext = this.advancedTexture.getContext();
    this.context = context;
    this.canvas = canvas;

    this.init();
  }
  private init() {
    for (let i = 0; i < 100; i++) {
      this.particlesArray.push(new Particle(this.canvas, this.context));
    }
  }

  private _animate() {
    if (!this.canAnimate) return;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    this.advancedTexture.update();
    requestAnimationFrame(() => {
      this._animate();
    });
  }
  animate(state: boolean) {
    this.canAnimate = state;
    if (state) {
      this._animate();
    } else {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.advancedTexture.update();
      for (let i = 0; i < 100; i++) {
        this.particlesArray[i].resetPos();
      }
    }
  }
}
export class Particle {
  x: number = 0;
  y: number = 0;
  defx: number = 0;
  defy: number = 0;
  size: number = 0;
  speedY: number = 0;
  context: ICanvasRenderingContext;
  colors = ["blue", "yellow", "red"];
  color: string;
  canvas: any;
  constructor(canvas, context) {
    this.context = context;
    this.canvas = canvas;

    this.defx = this.x = Math.random() * canvas.width;
    this.defy = this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 5 + 1;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.speedY = Math.random() * 1 + 3;
  }
  update() {
    this.y += this.speedY;
    if (this.y > this.canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * this.canvas.width;
    }
  }
  draw() {
    this.context.fillStyle = this.color;
    // this.context.beginPath();
    // this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // this.context.closePath();
    this.context.fillRect(this.x, this.y, this.size, this.size);
    //  this.context.fill();
  }
  resetPos() {
    this.x = this.defx;
    this.y = this.defy;
  }
}
