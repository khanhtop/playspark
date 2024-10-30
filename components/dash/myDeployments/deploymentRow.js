import { cloudinaryToReimage } from "@/helpers/reimage";
import {
  ArrowRightCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import Embed from "../embed";
import { useState } from "react";

export default function DeploymentRow({ item }) {
  const [showEmbed, setShowEmbed] = useState(false);
  return (
    <div className="h-20 w-full bg-blue-200/40 shadow-md rounded-lg px-2 py-1 flex gap-2">
      <img
        className="h-full rounded-md"
        src={cloudinaryToReimage(
          item.gameIcon ?? item.backgroundImage,
          "h-200"
        )}
      />
      <div className="flex-1 flex flex-col">
        <h3 className="text-black/70 font-light">{item.name}</h3>
        <div className="text-xs text-blue-800">
          <p>Impressions: 100</p>
          <p>Clicks: 20</p>
        </div>
      </div>
      <div className="flex items-end ">
        <div className="flex items-center gap-1">
          <p
            onClick={() => setShowEmbed(item.tournamentId)}
            className="font-light underline cursor-pointer"
          >
            Embed
          </p>
          {/* <ArrowRightCircleIcon className="h-4 w-4" /> */}
        </div>
      </div>
      {showEmbed && (
        <Embed id={showEmbed} setShowEmbed={setShowEmbed} playableAd />
      )}
    </div>
  );
}
