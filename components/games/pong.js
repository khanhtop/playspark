import dynamic from "next/dynamic";
import { useRef } from "react";

const MiddlePong = dynamic(() => import("./pongGame"), {
  ssr: false,
});

export default function Pong({ data, gameType, callback, params }) {
  const childRef = useRef();

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
      <MiddlePong
        pongRef={childRef}
        handleScore={callback}
        gameType={gameType}
        params={params}
      />
    </div>
  );
}
