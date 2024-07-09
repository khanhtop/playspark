import { useEffect } from "react";
import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import("@babylonjs/inspector");
import "@babylonjs/loaders/glTF";
import * as TWEEN from "@tweenjs/tween.js";

import { CameraController } from "./CameraController";
import { LightController } from "./LightController";
import { BallManager } from "./Ball/BallManager";
import { Inputs } from "./Inputs";
import { BallPicker } from "./Ball/BallPicker";
import { Ground } from "./Environment/Ground";
import { Background } from "./Environment/Background";
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
import { Sounds } from "./Sounds";

const CanSmash = () => {
  useEffect(() => {
    var div = document.createElement("div");
    div.id = "game";
    //document.body.appendChild(div);
    //.appendChild(div);
    let mainElement = document.getElementsByTagName("main")[0];
    mainElement.insertBefore(div, mainElement.firstChild);

    // create the canvas html element and attach it to the webpage
    const canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    div.appendChild(canvas);

    // initialize babylon scene and engine
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    new GameData(scene, engine, canvas);
    new SaveLoadData();
    new Timer(scene, engine);

    const resize = () => {
      let width = window.innerWidth;
      let height = width * 1.77;

      if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height / 1.77;
      }

      engine.setSize(width, height, true);
      engine.resize();
    };

    resize();
    window.addEventListener("resize", resize);

    // hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });

    const loader = new Loader(scene, () => {
      init();
    });

    let baseUrl = "/pong/canSmash/";
    loader.loadMesh(baseUrl , "can.glb");
    loader.loadMesh(baseUrl , "barrel.glb");
    loader.loadMesh(baseUrl,"ledges.glb");
    loader.loadFont(baseUrl, "PeaceSans", "PeaceSansWebfont.ttf");

    Object.keys(Sounds.data).forEach((key) => {
      Sounds.data[key] = baseUrl + Sounds.data[key];
    });

    Object.keys(Images.data).forEach((key) => {
      Images.data[key] = baseUrl + Images.data[key];
      loader.loadImage(Images.data[key]);
    });

    loader.loadPhysic();
    new AudioManager(scene);

    const init = () => {
      new CameraController(scene, canvas);
      new LightController(scene);
      new Materials([
        Images.data.logo1,
        Images.data.logo2,
        Images.data.logo3,
        Images.data.logo4,
      ]);

      new BallManager(scene);
      new Inputs(scene, canvas);
      new BallPicker(scene);
      new Ground(scene);
      new Background(scene);
      new TextPopupManager();
      new ImagePopupManager();
      new PowerupManager(scene);
      new GUI2D();
      new LiveManager(2);
      new ScoreManager(0);
      new PowerupCreditManager(DEFAULT_POWERUP_COUNT);
      new ParticleManager();

      function animate(time) {
        window.requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      animate(performance.now());

      new CanManager(scene);
      new LevelManager(scene);
      const levelCreator = new LevelCreator();
      levelCreator.create(0);
      new ComboBonus();
      new TimeBonus();

      engine.runRenderLoop(() => {
        scene.render();
      });
    };

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", null);
      engine.dispose();
      canvas.remove();
    };
  }, []);

  return null;
};

export default CanSmash;
