import { useEffect, useState } from "react";
import { isIOS, isAndroid } from "react-device-detect";
import { useAppContext } from "./store";

const useMusic = (hasInitialisedAudio, fileName, maxVolume, play) => {
  const context = useAppContext();

  useEffect(() => {
    if (!hasInitialisedAudio) return;
    const audio = new Audio(fileName);
    audio.volume = 0;
    if (play) {
      audio.play();
    }

    let fadeInRequestId;
    const fadeIn = (timestamp) => {
      if (audio?.played?.length === 1) context.setIsAudioPlaying(true);
      audio.volume = Math.min(audio.volume + 0.01, maxVolume); // Increase volume gradually
      if (audio.volume < maxVolume) {
        fadeInRequestId = requestAnimationFrame(fadeIn);
      } else {
        cancelAnimationFrame(fadeInRequestId);
      }
    };
    fadeInRequestId = requestAnimationFrame(fadeIn);

    return () => {
      let fadeOutRequestId;
      if (isIOS || isAndroid) {
        audio.pause();
      }
      const fadeOut = (timestamp) => {
        audio.volume = Math.max(audio.volume - 0.05, 0); // Decrease volume gradually
        if (audio.volume > 0) {
          fadeOutRequestId = requestAnimationFrame(fadeOut);
        } else {
          cancelAnimationFrame(fadeOutRequestId);
          audio.pause();
          audio.currentTime = 0;
        }
      };
      fadeOutRequestId = requestAnimationFrame(fadeOut);
    };
  }, [fileName, maxVolume, play]);
};

export default useMusic;
