import { playClickSound } from "@/helpers/audio";
import { useAppContext } from "@/helpers/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function GlassModal({
  showWhen,
  onClose,
  title,
  children,
  primaryColor,
  textColor,
  theme,
}) {
  const context = useAppContext();
  if (!showWhen) return <div />;
  return (
    <div
      style={{
        backgroundColor: showWhen ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
        transition: "0.25s all",
      }}
      className="absolute top-0 left-0 h-full w-full flex items-center justify-center hover:translateY-200"
    >
      <div
        className={`${
          theme === "pixel"
            ? "rounded-none bg-white/100"
            : "rounded-3xl bg-white/50"
        } h-[80%] w-[90%]  backdrop-blur z-30 relative border-2 `}
      >
        <div className="flex justify-center absolute w-full -mt-6">
          <div
            style={{ backgroundColor: primaryColor, color: textColor }}
            className={`${
              theme === "default"
                ? "font-titan font-stroke rounded-full"
                : theme === "pixel"
                ? "font-pixel font-stroke text-3xl rounded-none pb-1"
                : "font-neon rounded-full "
            } h-12 w-40 flex items-center justify-center border-2`}
          >
            <p>{title}</p>
          </div>
        </div>
        <div className="flex justify-center absolute w-full -bottom-6">
          <div
            onClick={() => {
              playClickSound(context);
              onClose();
            }}
            className="bg-red-500 hover:bg-red-600 transition cursor-pointer text-white h-12 w-12 rounded-full flex items-center justify-center border-2"
          >
            <XMarkIcon className="h-8 w-8" />
          </div>
        </div>
        <showWhen.content data={showWhen.data} />
      </div>
    </div>
  );
}
