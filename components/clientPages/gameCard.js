import { useRouter } from "next/router";
import { useState } from "react";
import UIButton from "../ui/button";

export default function ClientGameCard({ item }) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const highScorer = item.leaderboard?.sort((a, b) => a - b)?.[0];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundImage: `url(${item.backgroundImage})`,
        transition: "0.5s all",
      }}
      className="shadow-md shadow-white/30 font-octo rounded-xl bg-center bg-cover overflow-hidden relative group min-w-[400px] h-[250px]"
    >
      <div className="px-4 py-4 absolute top-0 left-0 h-full w-full bg-black/70 flex flex-col">
        <div className="flex-1">
          <h1>{item.name}</h1>
          {highScorer && (
            <p className="font-octo text-white/70 text-xl">
              Top Scorer: {highScorer?.name} ({highScorer?.score})
            </p>
          )}
        </div>
        <div className="flex justify-end w-full">
          <UIButton
            onClick={() =>
              window.open(
                `https://playspark.co/ad/${item.tournamentId}`,
                "__blank"
              )
            }
            theme="pixel"
            primaryColor={item.primaryColor}
            textColor={item.textColor}
            text="Play"
            className=""
          />
        </div>
      </div>
    </div>
  );
}
