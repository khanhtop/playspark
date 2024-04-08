import { useEffect } from "react";

const useMusic = (fileName, maxVolume) => {
  useEffect(() => {
    const audio = new Audio(fileName);
    audio.volume = 0;
    audio.play();

    let fadeInRequestId;
    const fadeIn = (timestamp) => {
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
  }, [fileName, maxVolume]);
};

export default useMusic;
