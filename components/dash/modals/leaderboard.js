import { useMemo, useState } from "react";
// import Leaderboard from "../leaderboard";
import { useAppContext } from "@/helpers/store";
import { getLeaderboard, rankMe } from "@/helpers/leaderboard";
import Text from "@/components/ui/text";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function ModalLeaderboard({ data }) {
  const context = useAppContext();
  const [leaderboard, setLeaderboard] = useState();

  const score = 100;

  useMemo(() => {
    if (!data.tournamentId) return;
    getLeaderboard(data.tournamentId).then(async (lb) => {
      setLeaderboard(lb);
    });
  }, [data.tournamentId]);

  if (!leaderboard)
    return (
      <div className="bg-white/50 h-full w-full rounded-3xl flex items-center justify-center">
        <ArrowPathIcon className="h-12 w-12 text-black/30 animate-spin" />
      </div>
    );

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 overflow-y-scroll h-full">
      {!context?.loggedIn?.uid && (
        <div
          onClick={() => data.onAuthClick()}
          className="w-full bg-white/30 cursor-pointer backdrop-blur text-center py-4 px-8 border-2 border-white/50 rounded-2xl text-black/50 flex flex-col"
        >
          <p className="font-bold text-xl mb-1 text-black/70">Sign Up</p>
          <p className="text-sm">
            If you sign up, you can rank your best scores on the leaderboard and
            win prizes!
          </p>
        </div>
      )}
      {leaderboard
        ?.sort((a, b) => b.score - a.score)
        ?.map((item, key) => (
          <PositionRow
            item={item}
            key={key}
            gameData={data}
            index={key}
            isMine={item.uid === context.loggedIn?.uid}
          />
        ))}
    </div>
  );
}

function PositionRow({ gameData, index, item, topSlice, isMine }) {
  return (
    <div
      style={{
        backgroundColor: gameData.primaryColor,
        color: gameData.textColor,
      }}
      className={`flex w-full pl-2 pr-4 rounded-full py-1 gap-2 items-center border-2 ${
        !isMine ? "border-transparent" : "animate-pulse border-yellow-400"
      }`}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          color: "#333",
        }}
        className="w-10 h-10 rounded-full flex items-center justify-center"
      >
        <Text {...gameData} className="">
          {index + 1}
        </Text>
      </div>
      <div className="h-10 w-10 rounded-full overflow-hidden bg-[#777]">
        {item.avatar ? (
          <img src={item.avatar} className="scale-110" />
        ) : (
          <img src={"/branding/pad.png"} className="scale-75" />
        )}
      </div>
      <Text {...gameData} className="flex-1 font-light text-xl">
        {item?.name}
      </Text>
      {/* <p className="flex-1 font-octo text-xl">{item?.name}</p> */}
      <Text {...gameData} className="font-light text-xl">
        {item?.score}
      </Text>
    </div>
  );
}

//
