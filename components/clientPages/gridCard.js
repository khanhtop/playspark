import { useRouter } from "next/router";
import { useState } from "react";
import UIButton from "../ui/button";

export default function ClientGameGridCard({ item, user, playGame }) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const highScorer = item.leaderboard?.sort((a, b) => a - b)?.[0];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundImage: `url(${item?.gameIcon || item?.backgroundImage})`,
        transition: "0.5s all",
        color: user.textColor,
      }}
      onClick={() => playGame(item)}
      className="shadow-md shadow-white/30 font-octo rounded-xl bg-center bg-cover overflow-hidden relative group aspect-square"
    >
      <div className="px-4 py-4 absolute top-0 left-0 h-full w-full bg-white/70 flex flex-col">
        <div className="flex-1">
          <h1 className="md:text-2xl">{item.name}</h1>
          {/* {highScorer && (
            <p className="font-octo text-xl">
              Top Scorer: {highScorer?.name} ({highScorer?.score})
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
