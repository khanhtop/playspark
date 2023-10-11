import dynamic from "next/dynamic";
import { useRef } from "react";
import BannerAd from "../advertising/bannerAd";

const MiddlePong = dynamic(() => import("./pongGame"), {
  ssr: false,
});

export default function Pong({ data, gameType, callback }) {
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

      <div className="w-full h-[90px] bg-black flex items-center justify-center">
        <BannerAd size="small" position="top" delay={250} />
      </div>
      <MiddlePong
        pongRef={childRef}
        handleScore={callback}
        gameType={gameType}
      />
    </div>
  );
}
