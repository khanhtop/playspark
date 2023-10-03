import dynamic from "next/dynamic";
import { useRef } from "react";

const MiddleRunner = dynamic(() => import("./runnerGame"), {
  ssr: false,
});

export default function Runner({ data, gameType }) {
  const childRef = useRef();

  const startNewGame = () => {
    // this is how to start a new game with 5 lives
    childRef.current.initGame(5);
  };

  const scoreHandler = (score) => {
    // this is where you can handle the score event when game is finished
    alert("YOU WON: " + score);
  };

  return (
    <div
      style={{
        backgroundColor: data?.primaryColor,
        color: data?.textColor,
        width: "100%",
        height: "100%",
      }}
      className={`aspect-w-9 aspect-h-19 h-full w-auto relative flex flex-col`}
    >
      <div
        style={{
          fontFamily: "enhanced_led_board-7",
          visibility: "hidden",
          height: "0px",
          width: "0px",
        }}
      >
        .
      </div>
      <div
        style={{
          fontFamily: "TitanOne-Regular",
          visibility: "hidden",
          height: "0px",
          width: "0px",
        }}
      >
        .
      </div>
      <div className="w-full h-24 bg-white/20 flex items-center justify-center">
        <img
          src="/defaults/banner.jpg"
          className="object-cover h-full w-full"
        />
      </div>
      <MiddleRunner
        runnerRef={childRef}
        handleScore={scoreHandler}
        gameType={gameType}
      />
    </div>
  );
}
