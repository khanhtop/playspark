import { ShareIcon } from "@heroicons/react/24/solid";
import { RWebShare } from "react-web-share";

export default function ShareButton({ data, score }) {
  if (!data.canShare) return <div />;
  return (
    <RWebShare
      data={{
        text: `I just scored ${score} on ${data.name}, try and beat my score on the leaderboard!`,
        url: data?.canShareURL ?? `https:/playspark.co/${data.tournamentId}`,
        title: `${data.name}`,
      }}
      onClick={() => null}
    >
      <div className="cursor-pointer flex h-7 items-center gap-2 font-octo bg-black/20 px-4 py-0 rounded-full mb-1">
        <p>Share</p>
        <ShareIcon className="h-3 w-3 mb-[1px]" />
      </div>
    </RWebShare>
  );
}
