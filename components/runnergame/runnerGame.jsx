import Phaser from "phaser";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import MainSceneRunner from "./mainSceneRunner";

const RunnerClientComponent = forwardRef(({ handleScore, gameType }, ref) => {
  const [hasRendered, setHasRendered] = useState(false);
  const memoizedHasRendered = useMemo(() => hasRendered, [hasRendered]);
  let mainSceneRunner;

  useImperativeHandle(
    ref,
    () => ({
      initGame: (lives) => {
        mainSceneRunner.initGame(lives);
      },
    }),
    [mainSceneRunner]
  );

  useEffect(() => {
    if (!memoizedHasRendered) {
      setHasRendered(true);

      const scene = new MainSceneRunner(gameType);

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
        mainSceneRunner = game.scene.scenes[0];
        mainSceneRunner.setScoreHandle(handleScore);
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

export default function MiddleRunner({ handleScore, pongRef, gameType }) {
  return (
    <RunnerClientComponent
      handleScore={handleScore}
      ref={pongRef}
      gameType={gameType}
    />
  );
}
