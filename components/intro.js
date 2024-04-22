import { playEvent } from "@/helpers/events";
import UIButton from "./ui/button";
import Text from "./ui/text";
import { useAppContext } from "@/helpers/store";
import GameButton from "./uiv2/gameButton";
import { useEffect } from "react";
import useMusic from "@/helpers/useMusic";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import IntroPanel from "./menus/introPanel";

export default function Intro({ data, setStage, premium, ready, signingIn }) {
  const context = useAppContext();
  // useMusic("/uisounds/intro.mp3", 0.5);

  return (
    <div
      style={{ width: "100%" }}
      className={`h-full w-full ${
        premium ? "absolute top-0 left-0" : "relative"
      }`}
    >
      <img
        src={data?.backgroundImage}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <div className="text-white items-center justify-end h-full  flex flex-col pb-8 px-4 pt-4">
        <div className="w-full flex h-full items-start">
          <div className="flex-1 h-12 z-10"></div>
          <IntroPanel data={data} />
        </div>
        {(!premium || ready) && (
          <GameButton
            bgColor={data.primaryColor}
            textColor={data.textColor}
            onClick={() => {
              playEvent(context, data);
              setStage(1);
            }}
          >
            START
          </GameButton>
        )}
      </div>

      {signingIn === 1 && (
        <div className="absolute top-0 left-0 bg-black/60 backdrop-blur h-full w-full flex items-center justify-center">
          <ArrowPathIcon className="h-12 w-12 animate-spin" />
        </div>
      )}
    </div>
  );
}
