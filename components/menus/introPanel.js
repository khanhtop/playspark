import { useAppContext } from "@/helpers/store";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function IntroPanel({ data, theme, onAuthClick }) {
  const context = useAppContext();
  const [open, setOpen] = useState(false);

  if (!context.profile)
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

  const xp = context.profile?.dataByClient?.[data.ownerId]?.xp || 0;

  return (
    <div
      style={{ height: open ? 180 : 90, transition: "height 0.5s" }}
      onClick={() => setOpen(!open)}
      className="w-[200px] px-2 pt-2 pb-1 flex flex-col bg-black/30 backdrop-blur rounded-2xl shadow-lg border-2 border-white/20"
    >
      <div className="h-12 flex gap-2">
        <div className="h-full aspect-square rounded-2xl border-white border-2 overflow-hidden">
          <img
            src={context?.profile?.profilePhoto}
            className="h-full scale-110 object-cover"
          />
        </div>
        <div className="font-octo ">
          <p
            className={
              theme === "default"
                ? "font-titan font-stroke"
                : theme === "neon"
                ? "font-neon"
                : "font-pixel uppercase text-3xl -my-1"
            }
          >
            {context?.profile?.companyName}
          </p>
          <p
            className={
              theme === "default"
                ? "font-titan font-stroke"
                : theme === "neon"
                ? "font-neon"
                : "font-pixel uppercase text-2xl -my-2 -mt-3"
            }
          >
            XP: {xp}
          </p>
        </div>
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
          <p
            className={
              theme === "default"
                ? "font-titan font-stroke"
                : theme === "neon"
                ? "font-neon"
                : "font-pixel uppercase text-2xl -my-2"
            }
          >
            Play Count: {playCount}
          </p>
          <p
            className={
              theme === "default"
                ? "font-titan font-stroke"
                : theme === "neon"
                ? "font-neon"
                : "font-pixel uppercase text-2xl -my-2"
            }
          >
            Top Score: {tournamentScore}
          </p>
          <p
            className={
              theme === "default"
                ? "font-titan font-stroke"
                : theme === "neon"
                ? "font-neon"
                : "font-pixel uppercase text-2xl -my-2"
            }
          >
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
