import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function UIButton({
  text,
  primaryColor,
  textColor,
  theme,
  onClick,
  className,
  disabled,
  loading,
}) {
  if (theme === "aixel") {
    return (
      <button
        disabled={disabled || loading}
        onClick={onClick}
        style={{ opacity: disabled || loading ? 0.2 : 1 }}
        className={`${className} relative font-pixel flex text-xl hover:contrast-125 transition bg-sky-200 pb-1`}
      >
        <div
          style={{ backgroundColor: primaryColor, color: textColor }}
          className="absolute bg-red-500 top-[10%] left-0 scale-105 w-full h-[70%]"
        >
          <div className="absolute w-12 h-full bg-black/10" />
          <div className="w-full absolute bottom-0 bg-black/30 h-[3px]" />
        </div>
        <div
          className="flex relative"
          style={{ backgroundColor: primaryColor, color: textColor }}
        >
          <div className="h-12 w-12 bg-black/10 flex items-center justify-center">
            {/* <ChevronRightIcon className="h-8 w-8" /> */}
            <p className="text-5xl mb-3">{`>`}</p>
          </div>
          <div className="px-8 flex items-center pb-2 text-4xl uppercase">
            {loading ? (
              <ArrowPathIcon className="h-7 w-7 animate-spin" />
            ) : (
              text
            )}
          </div>
          <div className="w-full absolute bottom-0 bg-black/30 h-[5px]" />
        </div>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: primaryColor,
        color: textColor,
        opacity: disabled || loading ? 0.2 : 1,
      }}
      className={`${className} font-titan text-xl rounded-full px-12 py-2 hover:contrast-125  transition`}
    >
      <h3>
        {loading ? <ArrowPathIcon className="h-7 w-7 animate-spin" /> : text}
      </h3>
    </button>
  );
}
