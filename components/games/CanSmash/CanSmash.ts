import { useEffect } from "react";
import { Engine, Mesh, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
// import("@babylonjs/inspector");
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
import { Events, EventTypes } from "./Events";
import { Meshs } from "./Meshs";
import { Utils } from "./Utils";
import { levels } from "./Levels/Level1";
import { TutorialManager } from "./GUI/TutorialManager";

const CanSmash = (data: any) => {
  //   ball,
  //   brandLogo,
  //   high_value_target,
  //   landscape,
  //   maxscore,
  //   normal_target_1,
  //   normal_target_2,
  //   normal_target_3,
  //   objectSprite,
  //   obstacle,
  //   playerSprite,
  //   powerup,
  //   sponsorLogo;

  useEffect(() => {
    console.log("CanSmash4:", data);

    var gameDiv = document.getElementById("game");
    if (gameDiv != null) {
      ReInit(data);
      return;
    }

    let timerHandle = null;
    Events.gamePlay.add((_data: any) => {
      timerHandle = ShowWraperGameOver(_data, timerHandle, data);
    });

    let score = 0;
    let level = 1;
    let lives = 2;
    let boostCredits = 0;

    var div = document.createElement("div");
    div.id = "game";
    document.querySelector("main > div > div").appendChild(div);

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
    // window.addEventListener("keydown", (ev) => {
    //   if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
    //     if (scene.debugLayer.isVisible()) {
    //       scene.debugLayer.hide();
    //     } else {
    //       scene.debugLayer.show();
    //     }
    //   }
    // });

    const loader = new Loader(scene, () => {
      init();
    });

    let baseUrl = "/pong/canSmash/";
    loader.loadMesh(baseUrl, Meshs.data.can);

    loader.loadMesh(baseUrl, Meshs.data.ledges);
    loader.loadFont(baseUrl, "PeaceSans", "PeaceSansWebfont.ttf");

    Object.keys(Sounds.data).forEach((key) => {
      Sounds.data[key] = baseUrl + Sounds.data[key];
    });
    Object.keys(Images.data).forEach((key) => {
      Images.data[key] = baseUrl + Images.data[key];
    });

    let ballBaseUrl = baseUrl;
    let barrelBaseUrl = baseUrl;

    console.log(ballBaseUrl);
    ({ score, level, lives, boostCredits, ballBaseUrl, barrelBaseUrl } =
      initParams(
        data,
        score,
        level,
        lives,
        boostCredits,
        ballBaseUrl,
        barrelBaseUrl
      ));

    loader.loadMesh(ballBaseUrl, Meshs.data.ball);
    loader.loadMesh(barrelBaseUrl, Meshs.data.barrel);

    Object.keys(Images.data).forEach((key) => {
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

      let liveManager = new LiveManager(lives);
      new ScoreManager(score);
      new PowerupCreditManager(boostCredits);
      new ParticleManager();

      if (level == 1) new TutorialManager(GUI2D.instance.advancedTexture);

      function animate(time) {
        window.requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      animate(performance.now());

      new CanManager(scene);
      new LevelManager(scene);
      const levelCreator = new LevelCreator();
      levelCreator.create(level - 1);
      new ComboBonus();
      new TimeBonus();

      engine.runRenderLoop(() => {
        scene.render();
      });
    };

    return () => {
      /*window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", null);
      engine.dispose();
      canvas.remove();
      Events.gamePlay.clear();
      Events.ui.clear();
      Events.hits.clear();
      Events.input.clear();
      Events.powerup.clear();
      Events..clear();*/
    };
  }, []);

  return null;
};

export default CanSmash;
function ShowWraperGameOver(_data: any, timerHandle: any, data: any) {
  if (
    _data.name == "gameOverClose" ||
    _data.name == "gameOver" ||
    _data.name == "LevelManager:onLastWinPopUpShow" ||
    _data.name == "LevelManager:onLastWinPopupClosed"
  ) {
    Events.gamePlay.notifyObservers({ type: "BallManager:resetPos" });
    let timer = 0;
    Utils.pause(true);

    timer =
      _data.name == "gameOver" ||
      _data.name == "LevelManager:onLastWinPopUpShow"
        ? 5000
        : 0;
    clearTimeout(timerHandle);
    timerHandle = setTimeout(() => {
      let currentLevel = GameData.instance.getCurrentLevel();
      let currentScore = GameData.instance.getTotalScore();
      data.callback(currentScore, currentLevel, 2);
      Events.sound.notifyObservers({
        type: "AudioManager:setMuteState",
        state: true,
      });
    }, timer);
  }
  return timerHandle;
}

function ReInit(data: any) {
  let lives = parseInt(data.params.lives);
  let score = parseInt(data.params.score);
  let level = parseInt(data.params.level);
  let boostCredits = parseInt(data.params.boostCredits);

  if (score == 0 && level == 1) {
    Restart(lives, level, boostCredits);
  } else {
    Revive(lives);
  }
  //example
  //reset
  // lives: 3 score: 0 level: 1 boostCredits: 0
  //revive
  //lives: 1 score: 1225 level: 1 boostCredits: 2
}

function Restart(lives: number, level: number, boostCredits: number) {
  Reset(lives, levels[level - 1].time);
  Events.gamePlay.notifyObservers({ type: "ScoreManager:setScore", count: 0 });
  Events.ui.notifyObservers({ type: "EntityUI:setCreditCount", count: 0 });
  LevelCreator.instane.create(0);
}
function Revive(lives: number) {
  Reset(lives, 10);
  setTimeout(() => {
    Events.gamePlay.notifyObservers({ type: "LevelCreator:resetCansPos" });
  }, 500);
}

function Reset(lives: number, timer: number) {
  Events.sound.notifyObservers({
    type: "AudioManager:setMuteState",
    state: false,
  });

  Events.ui.notifyObservers({ type: "LiveManager:setCount", count: lives });
  Events.ui.notifyObservers({ type: "TimerUI:resetByRevive", count: timer });
  Events.gamePlay.notifyObservers({ type: "GUI2D:hideGameOverUI" });
  // Events.gamePlay.notifyObservers({ type: "BallManager:resetPos" });

  Utils.pause(false);
}

function initParams(
  data: any,
  score: number,
  level: number,
  lives: number,
  boostCredits: number,
  ballBaseUrl: string,
  barrelBaseUrl: string
) {
  if (data == undefined)
    return { score, level, lives, boostCredits, ballBaseUrl, barrelBaseUrl };
  if (data.params == undefined)
    return { score, level, lives, boostCredits, ballBaseUrl, barrelBaseUrl };

  if (data.params.backgroundMusic != undefined)
    Sounds.data.music = data.params.backgroundMusic;

  if (data.params.glbOne != undefined) {
    const result = extractFileAndBase(data.params.glbOne);
    ballBaseUrl = result.baseUrl;
    Meshs.data.ball = result.file;
  }

  if (data.params.ball != undefined)
    Images.data.ball = data.params.playerSprite;

  if (data.params.glbTwo != undefined) {
    const result = extractFileAndBase(data.params.glbTwo);
    barrelBaseUrl = result.baseUrl;
    Meshs.data.barrel = result.file;
  }

  if (data.params.additionalSpriteSix != undefined)
    Images.data.greengrass = data.params.additionalSpriteSix;
  if (data.params.backgroundSprite != undefined)
    Images.data.background = data.params.backgroundSprite;

  if (data.params.enemySprite != undefined)
    Images.data.enemy = data.params.enemySprite;

  if (data.params.powerUpSprite != undefined)
    Images.data.powerup_credit = data.params.powerUpSprite;

  if (data.params.additionalSpriteOne != undefined)
    Images.data.logo1 = data.params.additionalSpriteOne;

  if (data.params.additionalSpriteTwo != undefined)
    Images.data.logo2 = data.params.additionalSpriteTwo;

  if (data.params.additionalSpriteThree != undefined)
    Images.data.logo3 = data.params.additionalSpriteThree;

  if (data.params.additionalSpriteFour != undefined)
    Images.data.logo4 = data.params.additionalSpriteFour;

  if (data.params.objectSprite != undefined)
    Images.data.barrel = data.params.objectSprite;

  if (data.params.score != undefined) score = parseInt(data.params.score);

  if (data.params.level != undefined) level = parseInt(data.params.level);

  if (data.params.lives != undefined) lives = parseInt(data.params.lives);

  if (data.params.boostCredits != undefined)
    boostCredits = parseInt(data.params.boostCredits);

  return { score, level, lives, boostCredits, ballBaseUrl, barrelBaseUrl };
}

function extractFileAndBase(url) {
  const urlObj = new URL(url);

  const pathSegments = urlObj.pathname.split("/");

  const file = pathSegments.pop();

  const baseUrl = url.replace(file, "");

  return {
    file: file,
    baseUrl: baseUrl,
  };
}
