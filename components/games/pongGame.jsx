import Phaser from "phaser";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from "react";
import MainScene from "./mainScene";
import FallScene from "./fallScene";
import WheelScene from "./wheelScene";
import CricketScene from "./cricketScene";
import NewPongScene from "./newPongScene";
import WordleScene from "./wordle/scenes/Game";
import FlyBallScene from "./flyballScene";
import FlyCollectScene from "./flycollectScene";
import newFallScene from "./newFallScene";
import newCricketScene from "./newCricketScene";
import newCricketSmashScene from "./newCricketSmashScene";
import FootballPassScene from "./footballPassScene";
import NewCricketBall from "./newCricketBall";
import newFallGameScene from "./newFallGameScene";
import SmashBlitzThrowing from "./SmashBlitzThrow/app";

const PongClientComponent = forwardRef(
  ({ handleScore, gameType, params }, ref) => {
    const [hasRendered, setHasRendered] = useState(false);
    const memoizedHasRendered = useMemo(() => hasRendered, [hasRendered]);
    const gameRef = useRef();
    let mainScene;

    useImperativeHandle(
      ref,
      () => ({
        initGame: (lives) => {
          mainScene.initGame(lives);
        },
      }),
      [mainScene]
    );

    useEffect(() => {
      if (!memoizedHasRendered) {
        setHasRendered(true);
        let scene;
        console.log(`${handleScore}\n ${gameType}\n ${params}`);
        let config = {
          type: Phaser.AUTO,
          width: "100%",
          height: "100%",
          parent: "game",
          physics: {
            default: "arcade",
            arcade: {
              // debug: true,
              gravity: { y: 0 },
            },
          },
        };

        if (
          gameType == "baseballFall" ||
          gameType == "basketballFall" ||
          gameType == "cricketFall" ||
          gameType == "soccerFall"
        ) {
          scene = new FallScene(gameType, params);
        } else if (gameType == "wheelspin") {
          scene = new WheelScene(gameType, params);
        } else if (gameType == "cricket") {
          scene = new CricketScene(gameType, params);
        } else if (gameType == "newpongball") {
          scene = new NewPongScene(gameType, params);
        } else if (gameType == "wordle") {
          scene = new WordleScene(gameType, params);
        } else if (gameType == "flyball") {
          scene = new FlyBallScene(gameType, params);
        } else if (gameType == "flycollect") {
          scene = new FlyCollectScene(gameType, params);
        } else if (gameType == "newfallball") {
          scene = new newFallScene(gameType, params);
        } else if (gameType == "footballpass") {
          scene = new FootballPassScene(gameType, params);
        } else if (gameType == "newcricketsmash") {
          scene = new newCricketSmashScene(gameType, params);
        } else if (gameType == "newcricket") {
          scene = new newCricketScene(gameType, params);
        } else if (gameType == "smashBlitzThrow") {
          scene = new SmashBlitzThrowing(gameType, params);
          config = scene.config;
        } else if (gameType == "newcricketball") {
          scene = new NewCricketBall(gameType, params);
        } else if (gameType == "newfallgame") {
          scene = new newFallGameScene(gameType, params);
        } else {
          scene = new MainScene(gameType, params);
        }
        config.scene = scene;
        gameRef.current = new Phaser.Game(config);
        gameRef.current.events.once("ready", () => {
          mainScene = gameRef.current.scene.scenes[0];
          mainScene.setScoreHandle(handleScore);
        });
        console.log("game setup");
      }
    }, [memoizedHasRendered]);

    useEffect(() => {
      return () => {
        gameRef.current.destroy(true);
      };
    }, []);

    return (
      <div
        id="game"
        className={`${
          params.landscape ? "h-full" : "w-full"
        } flex-grow justify-center items-center`}
      >
        {" "}
      </div>
    );
  }
);

export default function MiddlePong({ handleScore, pongRef, gameType, params }) {
  return (
    <PongClientComponent
      handleScore={handleScore}
      ref={pongRef}
      gameType={gameType}
      params={params}
    />
  );
}
