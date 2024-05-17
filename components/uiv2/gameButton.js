import { useEffect, useRef } from "react";

export default function GameButton({
  className,
  bgColor,
  textColor,
  children,
  onClick,
  badge,
  disabled,
  onMouseDown,
  onMouseUp,
  theme,
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

  if (theme === "neon") {
    return (
      <div
        onClick={handleClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          backgroundColor: disabled ? "#DDD" : bgColor || "cyan",
          color: textColor || "white",
        }}
        className={`${className} rounded-3xl border-4 cursor-pointer w-60 h-16 relative`}
      >
        <div
          style={{ backgroundColor: bgColor }}
          className="absolute h-full w-[calc(100%+10px)] -ml-[5px] animate-pulse scale-y-[120%] px-2 rounded-full"
        />

        <div
          style={{ backgroundColor: disabled ? "#AAA" : bgColor || "cyan" }}
          className="absolute rounded-3xl h-full w-full"
        />

        <div
          className={`absolute w-full h-full flex items-center justify-center font-neon font-stroke text-4xl`}
        >
          {children}
        </div>
        {badge && (
          <div
            className={`absolute -top-2 -right-2 bg-red-500 h-8 w-8 flex items-center font-neon text-xl justify-center rounded-full border-2 border-white`}
          >
            {badge}
          </div>
        )}
      </div>
    );
  }

  if (theme === "pixel") {
    return (
      <div
        onClick={handleClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          backgroundColor: disabled ? "#DDD" : bgColor || "cyan",
          color: textColor || "white",
        }}
        className={`${className} rounded-none cursor-pointer w-60 h-16 relative`}
      >
        <div
          style={{
            backgroundColor: disabled ? "#DDD" : bgColor || "cyan",
            color: textColor || "white",
          }}
          className="absolute h-[90%] w-[105%] -left-[2.5%] top-[5%] z-0"
        />
        <div
          style={{
            backgroundColor: disabled ? "#DDD" : bgColor || "cyan",
            color: textColor || "white",
          }}
          className="absolute h-[120%] w-[90%] left-[5%] -top-[10%] z-0"
        />
        <div
          style={{ backgroundColor: disabled ? "#AAA" : bgColor || "cyan" }}
          className="absolute h-full w-full opacity-100 z-2"
        />

        <div
          className={`absolute w-full h-full flex items-center justify-center font-pixel text-5xl pb-1`}
        >
          {children}
        </div>
        {badge && (
          <div
            className={`${
              theme === "pixel"
                ? "font-pixel -top-3 -right-3"
                : "font-octo rounded-full border-2 border-white -top-2 -right-2 "
            } absolute bg-red-500 h-8 w-8 flex items-center text-xl justify-center`}
          >
            {badge}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        backgroundColor: disabled ? "#DDD" : bgColor || "cyan",
        color: textColor || "white",
      }}
      className={`${className} rounded-3xl border-white border-4 cursor-pointer w-60 h-16 relative`}
    >
      <img
        src="/buttons/button_stripes.png"
        className="absolute top-0 left-8 h-full"
      />
      <div
        style={{ backgroundColor: disabled ? "#AAA" : bgColor || "cyan" }}
        className="absolute rounded-3xl h-full w-full opacity-70"
      />

      <div
        className={`absolute w-full h-full flex items-center justify-center font-octo text-4xl`}
      >
        {children}
      </div>
      {badge && (
        <div
          className={`absolute -top-2 -right-2 bg-red-500 h-8 w-8 flex items-center font-octo text-xl justify-center rounded-full border-2 border-white`}
        >
          {badge}
        </div>
      )}
    </div>
  );
}
