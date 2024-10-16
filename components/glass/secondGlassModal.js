import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function SecondGlassModal({
  showWhen,
  onClose,
  title,
  children,
  primaryColor,
  textColor,
}) {
  if (!showWhen) return <div />;
  return (
    <div
      style={{
        backgroundColor: showWhen ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
        transition: "0.25s all",
      }}
      className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-20"
    >
      <div className="h-[80%] w-[90%] bg-white/50 backdrop-blur z-30 rounded-3xl relative border-2">
        <div className="flex justify-center absolute w-full -mt-6">
          <div
            style={{ backgroundColor: primaryColor, color: textColor }}
            className="font-titan font-stroke h-12 w-40 rounded-full flex items-center justify-center border-2"
          >
            <p>{title}</p>
          </div>
        </div>
        <div className="flex justify-center absolute w-full -bottom-6">
          <div
            onClick={onClose}
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
