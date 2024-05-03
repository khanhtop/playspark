import { useRef } from "react";
import { useAppContext } from "./store";

const withClickSound = (onClick) => {
  const audioRef = useRef();
  const context = useAppContext();
  useEffect(() => {
    audioRef.current = new Audio("/uisounds/click.wav");
    audioRef.current.load();
  }, []);

  const playClickSound = () => {
    if (context.settings.soundFx) {
      audioRef.current.play();
    }
  };

  const handleClick = (event) => {
    playClickSound();
    if (onClick) {
      onClick(event);
    }
  };

  return handleClick;
};

export default withClickSound;
