import Phaser from "phaser";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef
} from "react";
import MainScene from "./mainScene";
import FallScene from "./fallScene";
import WheelScene from "./wheelScene";
import CricketScene from "./cricketScene";
import NewPongScene from "./newPongScene";
import WordleScene from "./wordleScene";

const PongClientComponent = forwardRef(({ handleScore, gameType, params }, ref) => {
  const [hasRendered, setHasRendered] = useState(false);
  const memoizedHasRendered = useMemo(() => hasRendered, [hasRendered]);
  const gameRef = useRef()
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
      if(gameType == 'baseballFall' || gameType == 'basketballFall' || gameType == 'cricketFall' || gameType == 'soccerFall') {
        scene = new FallScene(gameType, params);
      } else if(gameType == 'wheelspin') {
        scene = new WheelScene(gameType, params);
      } else if(gameType == 'cricket') {
        scene = new CricketScene(gameType, params);
      } else if(gameType == 'newpongball') {
        scene = new NewPongScene(gameType, params);
      } else if(gameType == 'wordle') {
        scene = new WordleScene(gameType, params);
      } else {
        scene = new MainScene(gameType, params);
      }

      const config = {
        type: Phaser.AUTO,
        width: "100%",
        height: "100%",
        parent: "game",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
          },
        },
        scene: scene,
      };

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
  }, [])

  return (
    <div id="game" className={`w-full flex-grow justify-center items-center`}>
      {" "}
    </div>
  );
});

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
