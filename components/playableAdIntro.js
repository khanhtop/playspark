import { useAppContext } from "@/helpers/store";
import GameButton from "./uiv2/gameButton";
import { useEffect, useRef, useState } from "react";
import useMusic from "@/helpers/useMusic";

import useGoogleFont from "@/helpers/useGoogleFont";
import { cloudinaryToReimage } from "@/helpers/reimage";

export default function PlayableAdIntro({
  data,
  setStage,
  score,
  hasInitialisedAudio,
}) {
  const context = useAppContext();

  // Audio
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audio = useRef(null);

  if (typeof window !== "undefined" && !audio.current) {
    audio.current = new Audio(data?.homescreenMusic ?? "/uisounds/intro.mp3");
  }

  useMusic(
    hasInitialisedAudio,
    data?.homescreenMusic ?? "/uisounds/intro.mp3",
    context.settings.bgm
  );

  useGoogleFont(data.font || "Anton", "custom-font");
  useGoogleFont(data.bodyFont || "Roboto", "primary-font");

  const playAudio = () => {
    if (context.settings.bgm && !isAudioPlaying) {
      setIsAudioPlaying(true);
      audio.current.play();
    }
  };

  useEffect(() => {
    if (context.settings.bgm && !isAudioPlaying && !hasInitialisedAudio) {
      playAudio();
    }
    return () => {
      if (audio.current) {
        setIsAudioPlaying(false);
        audio.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (context.settings.bgm && !isAudioPlaying) {
      playAudio();
    } else if (!context.settings.bgm) {
      setIsAudioPlaying(false);
      audio.current.pause();
    }
  }, [context.settings.bgm]);

  const theme = data?.theme || "default";

  return (
    <div style={{ width: "100%" }} className={`h-full w-full relative`}>
      <img
        src={cloudinaryToReimage(
          data?.backgroundImage,
          data?.landscape ? "w-1200" : "w-600"
        )}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <div className="text-white items-center justify-end h-full flex flex-col pb-8 px-4 pt-4">
        {score > 0 && (
          <div className="bg-black h-10 mb-4 w-full z-20 flex items-center justify-center rounded-xl">
            <h1>Last Score : {score || 0}</h1>
          </div>
        )}

        <GameButton
          bgColor={
            data.secondaryColor ||
            data.accentColor ||
            data.primaryColor ||
            "black"
          }
          textColor={data.textColor}
          theme={theme}
          onClick={async () => {
            setStage(1, true);
          }}
        >
          Play
        </GameButton>
      </div>
    </div>
  );
}
