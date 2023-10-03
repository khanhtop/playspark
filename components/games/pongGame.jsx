import Phaser from "phaser";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import MainScene from "./mainScene";
import FallScene from "./fallScene";

const PongClientComponent = forwardRef(({ handleScore, gameType }, ref) => {
  const [hasRendered, setHasRendered] = useState(false);
  const memoizedHasRendered = useMemo(() => hasRendered, [hasRendered]);
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
      if(gameType == 'baseballFall') {
        scene = new FallScene(gameType);
      } else {
        scene = new MainScene(gameType);
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

      const game = new Phaser.Game(config);
      game.events.once("ready", () => {
        mainScene = game.scene.scenes[0];
        mainScene.setScoreHandle(handleScore);
      });

      console.log("game setup");

      return () => {
        //console.log('destroyed');
        //game.destroy(true);
      };
    }
  }, [memoizedHasRendered]);

  return (
    <div id="game" className={`w-full flex-grow justify-center items-center`}>
      {" "}
    </div>
  );
});

export default function MiddlePong({ handleScore, pongRef, gameType }) {
  return (
    <PongClientComponent
      handleScore={handleScore}
      ref={pongRef}
      gameType={gameType}
    />
  );
}
