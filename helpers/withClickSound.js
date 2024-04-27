import { useRef } from "react";

const withClickSound = (onClick) => {
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current = new Audio("/uisounds/click.wav");
    audioRef.current.load();
  }, []);

  const playClickSound = () => {
    audioRef.current.play();
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
