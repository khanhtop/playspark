import dynamic from "next/dynamic";
import { useRef } from "react";

const MiddleRunner = dynamic(() => import("./runnerGame"), {
  ssr: false,
});

export default function Runner({ data, gameType }) {
  const childRef = useRef();

  const scoreHandler = (score) => {
    // this is where you can handle the score event when game is finished
    alert("YOU WON: " + score);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
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
      <div
        style={{
          fontFamily: "Gamer",
          visibility: "hidden",
          height: "0px",
          width: "0px",
        }}
      >
        .
      </div>
      <MiddleRunner
        runnerRef={childRef}
        handleScore={scoreHandler}
        gameType={gameType}
      />
    </div>
  );
}
