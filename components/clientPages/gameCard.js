import { useRouter } from "next/router";
import { useState } from "react";
import UIButton from "../ui/button";
import { useAppContext } from "@/helpers/store";

export default function ClientGameCard({ data, item, playGame }) {
  const router = useRouter();
  const context = useAppContext();
  const [hover, setHover] = useState(false);
  const highScorer = item.leaderboard?.sort((a, b) => a - b)?.[0];
  console.log(item);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col font-octo rounded-3xl text-base overflow-hidden relative group min-w-[320px] h-[200px] shadow-lg hover:shadow-md shadow-black/50 "
    >
      <div
        style={{
          backgroundImage: `url(${item.backgroundImage})`,
          transition: "0.5s all",
        }}
        className="bg-center bg-cover flex-1 flex items-end p-2"
      >
        <div className="flex justify-end w-full">
          <UIButton
            onClick={() => playGame(item)}
            primaryColor={data.accentColor}
            textColor={data.primaryColor}
            text="Play"
            className=""
          />
        </div>
      </div>
      <div className="flex flex-col px-4 py-1">
        <h3 className="text-base">{item.name}</h3>
        <div className="flex">
          <Stat
            text="Your Top Score"
            value={
              item?.leaderboard?.find((a) => a.uid === context.loggedIn?.uid)
                ?.score || "-"
            }
          />
          <Stat
            text="Your Rank"
            value={
              !item?.leaderboard ||
              item?.leaderboard?.findIndex(
                (a) => a.uid === context.loggedIn?.uid
              ) === -1
                ? "-"
                : item?.leaderboard?.findIndex(
                    (a) => a.uid === context.loggedIn?.uid
                  ) + 1
            }
          />
          <Stat text="Top Score" value={item?.leaderboard?.[0]?.score} />
        </div>
      </div>
    </div>
  );
}

function Stat({ text, value }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <p>{value}</p>
      <p className="opacity-50 text-sm">{text}</p>
    </div>
  );
}
