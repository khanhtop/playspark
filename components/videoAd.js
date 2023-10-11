import { mockVideos } from "@/helpers/mocks";
import dynamic from "next/dynamic";
import { useState } from "react";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

export default function VideoAd({ onSkip }) {
  const [totalLength, setTotalLength] = useState();
  const [showClaim, setShowClaim] = useState(true);
  const [right, setRight] = useState(-260);

  const shouldClaim = (time) => {
    if (time > totalLength - 10) {
      setRight(0);
      setShowClaim(true);
    } else {
      setShowClaim(false);
    }
  };
  return (
    <div className="bg-black h-full w-full relative">
      <MuxPlayer
        playbackId={mockVideos[Math.floor(Math.random() * mockVideos.length)]}
        onLoadedMetadata={(a) => setTotalLength(a.currentTarget.duration)}
        onTimeUpdate={(a) => shouldClaim(a.target.currentTime)}
        className="h-full w-full"
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
      <div
        onClick={onSkip}
        style={{
          right: right,
          transition: "1s right",
        }}
        className="cursor-pointer absolute h-[40px]  bottom-[20%] bg-black w-[260px] rounded-l-xl border-white border-l-2  border-t-2  border-b-2 flex items-center justify-center"
      >
        <p
          className={`text-white text-red-400 ${
            showClaim && "animate-bounce text-green-400 font-bold"
          }`}
        >
          SKIP
        </p>
      </div>
    </div>
  );
}
