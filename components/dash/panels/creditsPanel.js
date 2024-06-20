import { useAppContext } from "@/helpers/store";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function CreditsPanel({}) {
  const context = useAppContext();
  const [height, setHeight] = useState(false);

  return (
    <div className="bg-white/100 text-black p-4 border-2 border-white/20 rounded-xl">
      <div
        className="overflow-hidden"
        style={{ height: height ? 70 : 30, transition: "0.25s all" }}
      >
        <div className="flex justify-between h-[35px]">
          <p className="text-xl font-bold text-black/70">
            Credits: {context?.profile?.creditBalance || 0}
          </p>
          <InformationCircleIcon
            onClick={() => setHeight(!height)}
            className="h-6 w-6 text-black/70"
          />
        </div>
        <p className="text-black/70">
          Approximately {Math.floor((context?.profile?.creditBalance || 0) / 2)}{" "}
          Regular Game Plays
        </p>
      </div>

      <div
        onClick={() => context.setShowStripe(true)}
        className="mt-2 text-white cursor-pointer bg-indigo-700 w-36 flex items-center justify-center py-2 rounded-lg"
      >
        Add Credits
      </div>
    </div>
  );
}
