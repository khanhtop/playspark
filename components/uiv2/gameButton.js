export default function GameButton({
  className,
  bgColor,
  textColor,
  children,
  onClick,
}) {
  const handleClick = () => {
    const audio = new Audio("/uisounds/click.wav");
    audio.play();
    if (onClick) onClick();
  };
  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: bgColor || "cyan",
        color: textColor || "white",
      }}
      className={`${className} cursor-pointer w-60 h-16 rounded-3xl overflow-hidden relative border-white border-4`}
    >
      <img
        src="/buttons/button_stripes.png"
        className="absolute top-0 left-8 h-full"
      />
      <div
        style={{ backgroundColor: bgColor || "cyan" }}
        className="absolute left-8 h-full w-full opacity-70"
      />

      <div className="absolute w-full h-full flex items-center justify-center text-4xl font-octo">
        {children}
      </div>
    </div>
  );
}
