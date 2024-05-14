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
    if (!data.tournamentId || !context?.profile?.companyName) return;
    getLeaderboard(data.tournamentId).then(async (lb) => {
      const { rankedBoard, mutated } = rankMe(
        lb,
        context.loggedIn?.uid,
        score,
        context.loggedIn?.email,
        context?.profile?.companyName || ""
      );
      setLeaderboard(lb);
    });
  }, [data.tournamentId, context?.profile?.companyName, score]);

  if (!leaderboard)
    return (
      <div className="bg-white/50 h-full w-full rounded-3xl flex items-center justify-center">
        <ArrowPathIcon className="h-12 w-12 text-black/30 animate-spin" />
      </div>
    );

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4">
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
        backgroundColor: isMine
          ? gameData.primaryColor
          : "rgba(255,255,255,0.5)",
        color: isMine ? gameData.textColor : gameData.primaryColor,
      }}
      className="flex w-full pl-2 pr-4 rounded-full py-1 gap-2 items-center"
    >
      <div
        style={{
          backgroundColor: isMine ? gameData.textColor : gameData.primaryColor,
          color: isMine ? gameData.primaryColor : gameData.textColor,
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
      <p className="flex-1 font-octo text-xl">{item?.name}</p>
      <Text {...gameData} className="font-light text-xl">
        {item?.score}
      </Text>
    </div>
  );
}
