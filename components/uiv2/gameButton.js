import { useEffect, useRef } from "react";

export default function GameButton({
  className,
  bgColor,
  textColor,
  children,
  onClick,
  badge,
  disabled,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/uisounds/click.wav");
    audioRef.current.load();
  }, []);

  const handleClick = () => {
    if (disabled) return;
    audioRef.current.play();
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: disabled ? "#DDD" : bgColor || "cyan",
        color: textColor || "white",
      }}
      className={`${className} cursor-pointer w-60 h-16 rounded-3xl relative border-white border-4`}
    >
      <img
        src="/buttons/button_stripes.png"
        className="absolute top-0 left-8 h-full w-full"
      />
      <div
        style={{ backgroundColor: disabled ? "#AAA" : bgColor || "cyan" }}
        className="absolute rounded-3xl h-full w-full opacity-70"
      />

      <div className="absolute w-full h-full flex items-center justify-center text-4xl font-octo">
        {children}
      </div>
      {badge && (
        <div className="absolute -top-2 -right-2 bg-red-500 h-8 w-8 flex items-center justify-center rounded-full font-octo text-xl border-2 border-white">
          {badge}
        </div>
      )}
    </div>
  );
}
