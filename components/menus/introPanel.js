import { getLeaderboard } from "@/helpers/leaderboard";
import { useAppContext } from "@/helpers/store";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState, useMemo } from "react";

//

export default function IntroPanel({
  data,
  theme,
  onAuthClick,
  waitOnAuth,
  uuid,
}) {
  const context = useAppContext();
  const [open, setOpen] = useState(false);
  const [rank, setRank] = useState(null);

  useMemo(() => {
    if (!data?.tournamentId || !context?.loggedIn?.uid || waitOnAuth) return;
    getLeaderboard(data?.tournamentId).then(async (lb) => {
      const index = lb.findIndex((a) => a.uid === context.loggedIn.uid);
      if (index > -1) {
        setRank(index + 1);
      }
    });
  }, [data.tournamentId, context?.loggedIn]);

  if (waitOnAuth) return <div />;

  if (!context.profile && !waitOnAuth)
    return (
      <div
        onClick={onAuthClick}
        className="w-[200px] font-octo px-2 pt-2 pb-1 flex flex-col bg-black/30 hover:bg-black/50 transition cursor-pointer backdrop-blur rounded-2xl shadow-lg border-2 border-white/20 items-center justify-center"
      >
        <p className="text-xl">Sign In</p>
        <p className="font-roboto text-white/50 text-center text-sm">
          To access rewards and rank on leaderboards.
        </p>
      </div>
    );

  const tournamentScore =
    data?.leaderboard?.find((a) => a.uid === context?.loggedIn?.uid)?.score ||
    0;
  const maxStreak =
    context.profile?.streaks?.[data.tournamentId]?.maxStreak || 0;

  const playCount = context.profile?.analytics?.playCount || 0;

  const xp = context.profile?.dataByTournament?.[data.tournamentId]?.xp || 0;

  return (
    <div
      style={{
        height: open ? 180 : 90,
        width: open ? "90%" : 80,
        transition: "height 0.5s",
      }}
      onClick={() => setOpen(!open)}
      className="px-2 pt-2 pb-1 flex flex-col bg-black/30 backdrop-blur rounded-2xl shadow-lg border-2 border-white/20"
    >
      <div
        className={`h-12 flex ${
          open ? "justify-start" : "justify-center"
        } gap-2`}
      >
        <div className="h-full aspect-square rounded-2xl border-white border-2 overflow-hidden">
          <img
            src={context?.profile?.profilePhoto}
            className="h-full scale-110 object-cover"
          />
        </div>
        {open && (
          <div
            style={{
              opacity: open ? 1 : 0,
            }}
            className="font-octo "
          >
            <p style={{ color: "white" }} className="custom-font font-light">
              {context?.config?.name || context?.profile?.companyName}
            </p>
            <p style={{ color: "white" }} className="custom-font font-light">
              XP: {xp}
            </p>
          </div>
        )}
      </div>
      <div
        style={{
          height: open ? 80 : 0,
          opacity: open ? 1 : 0,
          transition: "0.5s all",
        }}
        className="flex-1 flex-col overflow-hidden"
      >
        <div className="px-1 py-3">
          <p style={{ color: "white" }} className="custom-font font-light">
            Rank: {rank ? `#${rank}` : "_"}
          </p>
          <p style={{ color: "white" }} className="custom-font font-light">
            Top Score: {tournamentScore}
          </p>
          <p style={{ color: "white" }} className="custom-font font-light">
            Best Streak: {maxStreak}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        {open ? (
          <ChevronUpIcon className="h-6 w-6" />
        ) : (
          <ChevronDownIcon className="h-6 w-6" />
        )}
      </div>
    </div>
  );
}
