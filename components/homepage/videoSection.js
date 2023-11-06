import { ArrowDownIcon } from "@heroicons/react/24/solid";
import MuxPlayer from "@mux/mux-player-react";

export default function VideoSection() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-16 md:py-0">
      <div className="max-w-[1000px] flex-1 w-full text-left px-12 flex flex-col justify-center items-center">
        <h3 className="md:text-2xl max-w-[60%] text-center mb-8 font-octolight">
          Are you looking for an innovative way to captivate your audience,
          boost brand engagement, and drive revenue? Look no further! Leverage
          rewarded mobile gaming as a powerful tool to engage and retain users
          like never before.
        </h3>
        <MuxPlayer
          playbackId="jes2JpY021gTDjtGdbxMMUq6BjSgcdJXjdMJ7CcFmb2Q"
          className="overflow-hidden w-full md:w-[50%]"
          metadata={{
            video_id: "video-id-123456",
            video_title: "Bick Buck Bunny",
            viewer_user_id: "user-id-bc-789",
          }}
          streamType="on-demand"
        />
      </div>
      <div className="h-36 w-full flex items-center justify-center">
        <ArrowDownIcon className="animate-bounce text-cyan-500 h-12 w-12" />
      </div>
    </div>
  );
}
