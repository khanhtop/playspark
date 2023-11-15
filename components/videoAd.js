import { mockVideos } from "@/helpers/mocks";
import dynamic from "next/dynamic";
import { useState } from "react";
import UIButton from "./ui/button";
import { useAppContext } from "@/helpers/store";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

export default function VideoAd({ data, onSkip, video }) {
  const context = useAppContext();
  const [totalLength, setTotalLength] = useState();
  const [remainingTime, setRemainingTime] = useState();
  const [showClaim, setShowClaim] = useState(false);
  const [right, setRight] = useState(-260);

  const shouldClaim = (time) => {
    setRemainingTime(Math.floor(totalLength - time - 9));
    if (time > totalLength - 10) {
      console.log("TRIG");
      setShowClaim(true);
    }
  };
  return (
    <div className="bg-black h-full w-full relative">
      <MuxPlayer
        playbackId={video}
        onLoadedMetadata={(a) => setTotalLength(a.currentTarget.duration)}
        onTimeUpdate={(a) => shouldClaim(a.target.currentTime)}
        className="w-full"
        style={{
          "--controls": "none",
        }}
        autoPlay={true}
        metadata={{
          video_id: "video-id-123456",
          video_title: "Bick Buck Bunny",
          viewer_user_id: "user-id-bc-789",
        }}
        streamType="on-demand"
      />
      <div className="px-4 absolute bg-[#222] w-full bottom-0 left-0 h-16 flex items-center">
        <button
          disabled={!showClaim}
          onClick={() => {
            context.setHasSeenVideo(true);
            onSkip();
          }}
          className={`${
            showClaim ? "opacity-100 underline" : "opacity-50"
          } flex-1 text-left`}
        >
          {!remainingTime
            ? ""
            : showClaim
            ? "Claim Extra Life"
            : `Claim In ${remainingTime}`}
        </button>
        {data?.sponsoredVideoCtaUrl && (
          <button
            onClick={() => window.open(data.sponsoredVideoCtaUrl)}
            className="text-black bg-white/50 px-6 rounded-full py-2"
          >
            Learn More
          </button>
        )}
      </div>
      {/* <div
        onClick={onSkip}
        className="cursor-pointer absolute h-[40px]  bottom-[20%] bg-black w-[260px] rounded-l-xl border-white border-l-2  border-t-2  border-b-2 flex items-center justify-center"
      >
        <p
          className={`text-white text-red-400 ${
            showClaim && "animate-bounce text-green-400 font-bold"
          }`}
        >
          SKIP
        </p>
      </div> */}
    </div>
  );
}
