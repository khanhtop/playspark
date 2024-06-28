import GameButton from "@/components/uiv2/gameButton";
import {
  getLeaderboard,
  rankMe,
  updateLeaderboard,
} from "@/helpers/leaderboard";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";

export default function ModalGameOver({ data }) {
  const context = useAppContext();
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState({
    position: 0,
    length: 0,
  });
  const [didNotBeat, setDidNotBeat] = useState(null);

  const lb = data?.data?.leaderboard?.sort((a, b) => b.score - a.score) || [];

  const lbIndex = lb.findIndex((a) => a.score < data?.gameOverScore);
  const position = lbIndex === -1 ? lb.length + 1 : lbIndex + 1;

  useMemo(() => {
    console.log(
      data.data?.tournamentId,
      context?.profile?.companyName,
      data?.gameOverScore
    );

    if (data.gameOverScore === 0) {
      setLoading(false);
      return;
    }

    getLeaderboard(data?.data?.tournamentId).then(async (lb) => {
      // If leaderboard is empty
      if (lb.length === 0) {
        setLeaderboard({
          position: 1,
          length: 1,
        });
        if (context?.loggedIn?.uid) {
          updateLeaderboard(data.data?.tournamentId, [
            {
              email: context?.profile?.email || null,
              score: data.gameOverScore,
              uid: context?.loggedIn?.uid,
              name: context?.profile?.companyName || null,
              avatar: context?.profile?.profilePhoto || null,
            },
          ]);
        }
        setLoading(false);
        return;
      }
      // If not logged in
      if (!context?.loggedIn?.uid) {
        const pos = lb
          .sort((a, b) => b.score - a.score)
          ?.findIndex((a) => a.score < data?.gameOverScore);
        setLeaderboard({
          position: pos === -1 ? lb.length + 1 : pos,
          length: lb.length + (pos === -1 ? 1 : 0),
        });
        setLoading(false);
        return;
      }
      // Otherwise rank the player
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
      if (rankedBoard[lbIndex].score > data.gameOverScore) {
        setDidNotBeat({
          previous: rankedBoard[lbIndex].score,
          current: data.gameOverScore,
        });
      }
      setLeaderboard({
        position: lbIndex + 1,
        length: rankedBoard.length,
      });
      if (mutated) updateLeaderboard(data.data?.tournamentId, rankedBoard);
      setLoading(false);
      return;
    });
  }, [
    data.data?.tournamentId,
    context?.profile?.companyName,
    data?.gameOverScore,
  ]);

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-2 font-octo text-black text-2xl items-center">
      <div
        className={`flex gap-2 ${
          data?.data?.landscape ? "flex-row" : "flex-col"
        }`}
      >
        <div className="flex flex-col items-center mb-2">
          <h1 className="">Your Score</h1>
          <h1
            className="text-4xl font-titan"
            style={{
              color: "black",
            }}
          >
            {data.gameOverScore}
          </h1>
        </div>
        {didNotBeat && (
          <div>
            <p className="font-octo text-xl text-center text-black/100 max-w-[200px] mb-2">
              Previous Best {didNotBeat.previous}
            </p>
          </div>
        )}
        {loading ? (
          <ArrowPathIcon className="h-10 w-10 mb-4 text-white animate-spin" />
        ) : (
          <div className="flex items-center gap-2 mb-4 max-w-[400px]">
            <img
              src={`/theme_icons/${data.theme}/rank.png`}
              className="h-24 w-24"
            />
            <p className="font-octo text-base text-center text-black/100 max-w-[120px]">
              {data?.gameOverScore === 0
                ? `Try again to rank on the leaderboard!`
                : !context?.loggedIn?.uid
                ? `You could be ranked #${leaderboard.position}`
                : `You ${didNotBeat ? "are still ranked" : "ranked"} #${
                    leaderboard.position
                  }`}
            </p>
          </div>
        )}
      </div>
      <div
        className={`flex gap-2 items-center ${
          data?.data?.landscape ? "flex-row" : "flex-col"
        }`}
      >
        {!context?.loggedIn?.uid && (
          <div
            style={{
              marginBottom: data?.data?.landscape ? 0 : 20,
              maxWidth: !data?.data?.landscape && 400,
            }}
            className={`flex ${
              data?.data?.landscape ? "flex-row" : "flex-col"
            } items-center gap-8  `}
          >
            <p className="font-roboto text-base text-center text-black/50">
              Signup or login to get your score on the leaderboard + access to
              prizes
            </p>
            <GameButton
              onClick={() => data.onAuth()}
              bgColor="red"
              textColor="white"
              theme={data?.theme}
            >
              Sign In
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
    </div>
  );
}
