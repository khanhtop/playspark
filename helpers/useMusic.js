import { useEffect } from "react";
import { isIOS, isAndroid } from "react-device-detect";
import { useAppContext } from "./store";

const useMusic = (hasInitialisedAudio, fileName, play) => {
  const context = useAppContext();

  useEffect(() => {
    if (!hasInitialisedAudio) return;

    // Create a new Audio instance
    const audio = new Audio(fileName);

    if (play && !context.isAudioPlaying) {
      audio
        .play()
        .then(() => {
          context.setIsAudioPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    } else if (!play) {
      audio.pause();
      audio.currentTime = 0;
      context.setIsAudioPlaying(false);
    }

    return () => {
      if (isIOS || isAndroid) {
        audio.pause();
      }
      audio.currentTime = 0;
      context.setIsAudioPlaying(false);
    };
  }, [fileName, play]);
};

export default useMusic;
