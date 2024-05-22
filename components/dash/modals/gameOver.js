import GameButton from "@/components/uiv2/gameButton";
import {
  getLeaderboard,
  rankMe,
  updateLeaderboard,
} from "@/helpers/leaderboard";
import { useAppContext } from "@/helpers/store";
import { useEffect, useMemo, useState } from "react";

export default function ModalGameOver({ data }) {
  const context = useAppContext();
  const [leaderboard, setLeaderboard] = useState({
    position: 1,
    length: 1,
  });

  console.log(leaderboard);

  const lb = data?.data?.leaderboard?.sort((a, b) => b.score - a.score) || [];

  const lbIndex = lb.findIndex((a) => a.score < data?.gameOverScore);
  const position = lbIndex === -1 ? lb.length + 1 : lbIndex + 1;

  useMemo(() => {
    console.log(
      data.data?.tournamentId,
      context?.profile?.companyName,
      data?.gameOverScore
    );
    if (!data.data?.tournamentId || !context?.profile?.companyName) return;
    getLeaderboard(data?.data?.tournamentId).then(async (lb) => {
      const { rankedBoard, mutated } = rankMe(
        lb,
        context.loggedIn?.uid,
        data?.gameOverScore,
        context.loggedIn?.email,
        context?.profile?.companyName || "",
        context?.profile?.profilePhoto
      );

      const lbIndex = rankedBoard.findIndex(
        (a) => a.uid === context?.loggedIn?.uid
      );
      let position = lbIndex + 1;
      if (lbIndex === -1) {
        position = rankedBoard.findIndex((a) => a.score < data?.gameOverScore);
      }
      setLeaderboard({
        position: position,
        length: rankedBoard.length + (lbIndex > -1 ? 0 : 1),
      });
      if (mutated) updateLeaderboard(data.data?.tournamentId, rankedBoard);
    });
  }, [
    data.data?.tournamentId,
    context?.profile?.companyName,
    data?.gameOverScore,
  ]);

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-2 font-octo text-black text-2xl items-center">
      <div className="flex flex-col items-center mb-4">
        <h1 className="">Your Score</h1>
        <h1
          className="text-4xl font-titan"
          style={{
            color: data.data?.primaryColor,
          }}
        >
          {data.gameOverScore}
        </h1>
      </div>
      <div className="flex items-center gap-0 mb-4 max-w-[400px]">
        <img
          src={`/theme_icons/${data.theme}/rank.png`}
          className="h-24 w-24"
        />
        <p className="font-octo text-2xl text-center text-black/100 max-w-[120px]">
          {!context?.loggedIn?.uid
            ? `You could be ranked #${leaderboard.position}`
            : `You ranked #${leaderboard.position} out of ${leaderboard.length}`}
        </p>
      </div>
      {!context?.loggedIn?.uid && (
        <div className="flex flex-col items-center gap-2 mb-4 max-w-[400px]">
          <p className="font-roboto text-lg text-center text-black/50">
            Signup or login to get your score on the leaderboard + access to
            prizes
          </p>
          <GameButton
            onClick={() => data.onAuth()}
            bgColor="red"
            textColor="white"
            theme={data?.theme}
          >
            Sign Up / Login
          </GameButton>
        </div>
      )}

      <GameButton
        disabled={data?.gameOverRevives === 0}
        bgColor="blue"
        textColor="white"
        theme={data?.theme}
        badge={data.gameOverRevives}
        onClick={() => data?.onRevive()}
      >
        Revive
      </GameButton>
    </div>
  );
}
