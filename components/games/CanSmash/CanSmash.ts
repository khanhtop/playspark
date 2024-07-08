import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene } from "@babylonjs/core";

import { CameraController } from "./CameraController";
import { LightController } from "./LightController";
import { BallManager } from "./Ball/BallManager";

import { Inputs } from "./Inputs";
import { BallPicker } from "./Ball/BallPicker";
import { Ground } from "./Environment/Ground";
import { Background } from "./Environment/Background";
import * as TWEEN from "@tweenjs/tween.js";

import { PowerupManager } from "./Powerups/PowerupManager";
import { GUI2D } from "./GUI/GUI2D";
import { LevelCreator } from "./LevelCreator";
import { Materials } from "./Materials";
import { Loader } from "./Loader";
import { LiveManager } from "./GUI_EVENTTS/LiveManager";
import { ScoreManager } from "./GUI_EVENTTS/ScoreManager";
import { PowerupCreditManager } from "./Powerups/PowerupCreditManager";
import { TextPopupManager } from "./GUI/TextPopupManager";

import { CanManager } from "./Can/CanManager";
import { LevelManager } from "./LevelManager";
import { GameData } from "./GameData";
import { ImagePopupManager } from "./GUI/ImagePopupManager";
import { ComboBonus } from "./Combo/ComboBonus";
import { TimeBonus } from "./Combo/TimeBonus";
import { Timer } from "./Timer";
import { AudioManager } from "./AudioManager";
import { SaveLoadData } from "./SaveLoadData.";
import { DEFAULT_POWERUP_COUNT } from "./Consts";
import { ParticleManager } from "./ParticleManager";
import { Images } from "./Images";


class CanSmash {
  canvas:
    | HTMLCanvasElement
    | OffscreenCanvas
    | WebGLRenderingContext
    | WebGL2RenderingContext;
  scene: Scene;
  engine: Engine;

  constructor() {
    // create the canvas html element and attach it to the webpage
    this.canvas = document.createElement("canvas");
    //this.canvas.style.width = "100%";
    //this.canvas.style.height = "100%";

    //console.log(window.devicePixelRatio);

    //let width = window.innerWidth < window.innerHeight  ?  window.innerWidth:window.innerHeight  ;
    //let height = window.innerHeight;
    // let width = height * 1.777;
    //console.log(this.canvas.width);
    //console.log(this.canvas.height);
    // this.canvas.width = 530;
    // this.canvas.height = 942;

    this.canvas.id = "gameCanvas";
    document.body.appendChild(this.canvas);

    // initialize babylon scene and engine
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);

    new GameData(this.scene, this.engine, this.canvas);

    new SaveLoadData();

    new Timer(this.scene, this.engine);

    new AudioManager(this.scene);

    //this.engine.setSize(530,942);

    // this.engine.resize();

    this.resize();

    window.addEventListener("resize", () => {
      this.resize();
    });

    // hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
        if (this.scene.debugLayer.isVisible()) {
          this.scene.debugLayer.hide();
        } else {
          this.scene.debugLayer.show();
        }
      }
    });

    let loader = new Loader(this.scene, () => {
      this.init();
    });

    loader.loadMesh("can.glb");
    loader.loadMesh("barrel.glb");
    loader.loadMesh("ledges.glb");
    loader.loadFont("PeaceSans", "PeaceSansWebfont.ttf");

    //  barrel.glb
    // booster-collect.mp3
    // can.glb
    // can1.glb
    // can_hit.wav
    // click.mp3
    // enemy_hit.mp3
    // ledges.glb
    // lose.wav
    // music.mp3
    //powerupClick.mp3
    //  powerup_hit.wav
    // targetReach.mp3
    //  win.wav

    Object.keys(Images.data).forEach((key) => {
      loader.loadImage(Images.data[key]);
    });

    loader.loadPhysic();
  }

  resize() {
    let width = window.innerWidth;

    let height = width * 1.77;

    if (height > window.innerHeight) {
      height = window.innerHeight;
      width = height / 1.77;
    }

    this.engine.setSize(width, height, true);
    this.engine.resize();
  }
  init() {
    new CameraController(this.scene, this.canvas);
    new LightController(this.scene);
    new Materials([
      Images.data.logo1,
      Images.data.logo2,
      Images.data.logo3,
      Images.data.logo4,
    ]);

    /*var pipeline = new DefaultRenderingPipeline(
      "defaultPipeline", // The name of the pipeline
      true, // Do you want the pipeline to use HDR texture?
      this.scene, // The scene instance
      [CameraController.camera] // The list of cameras to be attached to
    );*/
    //pipeline.chromaticAberrationEnabled = true;
    //pipeline.grainEnabled = true;
    // pipeline.samples = 4;
    //pipeline.sharpenEnabled = true;
    //pipeline.sharpen.colorAmount = 0.0;
    //pipeline.depthOfFieldEnabled = true;

    /*pipeline.depthOfField.focusDistance  = 2000; // distance of the current focus point from the camera in millimeters considering 1 scene unit is 1 meter
pipeline.depthOfField.focalLength  = 50; // focal length of the camera in millimeters
pipeline.depthOfField.fStop  = 1.4; // aka F number of the camera defined in stops as it would be on a physical device*/

    //pipeline.imageProcessingEnabled = true;

    new BallManager(this.scene);
    //new PlatformCreator(this.scene);
    new Inputs(this.scene, this.canvas);
    new BallPicker(this.scene);
    new Ground(this.scene);
    new Background(this.scene);
    new TextPopupManager();
    new ImagePopupManager();
    new PowerupManager(this.scene);
    new GUI2D();
    //init after GUI2d
    new LiveManager(2);
    new ScoreManager(0);
    new PowerupCreditManager(DEFAULT_POWERUP_COUNT);

    new ParticleManager();

    function animate(time) {
      window.requestAnimationFrame(animate);
      TWEEN.update(time);
    }
    animate(performance.now());

    let canManager = new CanManager(this.scene);

    // init before LevelCreator
    let levelManager = new LevelManager(this.scene);

    let levelCreator = new LevelCreator();

    //init after GUI2d init
    levelCreator.create(0);

    new ComboBonus();
    new TimeBonus();
    /*
   let visibility = 0;
    const speed = 0.01;
    const radius = 1;
    const segments = 120; // higher = smoother circle

    const points = GreasedLineTools.GetCircleLinePoints(radius, segments);

    const circle = CreateGreasedLine(
      "circle-loader",
      {
        points,
      },
      {
        visibility,
      }
    );

    circle.position = new Vector3(0, 0.5, 4);
    this.scene.onBeforeRenderObservable.add(() => {
      visibility += speed * this.scene.getAnimationRatio();
      if (visibility > 1) visibility = 0;
      circle.greasedLineMaterial.visibility = visibility;
    });*/

    // run the main render loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

new CanSmash();