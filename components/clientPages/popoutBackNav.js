import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PopoutBackNav({ action }) {
  const [left, setLeft] = useState(40);
  const router = useRouter();

  const updateLeft = () => {
    setLeft(80);
    setTimeout(() => {
      setLeft(40);
    }, 2000);
  };

  return (
    <div
      style={{ width: left, transition: "0.5s width" }}
      onClick={() => {
        if (left > 40) {
          () => {
            window.parent.postMessage(
              { type: "game_event", data: { action: "game_end" } },
              "*"
            );
          };
          if (action) {
            action();
          } else {
            router.back();
          }
        } else {
          updateLeft();
        }
      }}
      className="absolute w-12 h-12 bg-white top-12 z-20 -left-2 rounded-r-xl border-cyan-500 border-2 flex items-center justify-center pl-1"
    >
      <XMarkIcon
        className={`h-8 w-8 ${
          left > 40 ? "text-cyan-500/100 animate-pulse" : "text-cyan-500/30"
        }`}
      />
    </div>
  );
}
