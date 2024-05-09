import { useState } from "react";
import AreaTabs from "./areaTabs";
import ClientGameGridCard from "./gridCard";
import AggregateLeaderboard from "./aggregateLeaderboard";
import { useAppContext } from "@/helpers/store";
import Achievements from "./achievements";
import Challenges from "./challenges";
import ClientGameCard from "./gameCard";

export default function Areas({
  user,
  tournaments,
  aggregateLeaderboard,
  playGame,
  totalXp,
  viewAchievements,
  setScreen,
}) {
  const context = useAppContext();
  const [tab, setTab] = useState("games");

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: user.primaryColor, color: user.textColor }}
    >
      <AreaTabs
        user={user}
        onClick={(a) => setTab(a.value)}
        selected={tab}
        options={
          context?.loggedIn?.uid
            ? [
                {
                  text: "Games",
                  value: "games",
                },
                {
                  text: "Challenges",
                  value: "challenges",
                },
                {
                  text: "Top Players",
                  value: "leaderboard",
                },
              ]
            : [
                {
                  text: "Games",
                  value: "games",
                },
                {
                  text: "Top Players",
                  value: "leaderboard",
                },
              ]
        }
      />
      {tab === "games" && (
        <div className="grid grid-cols-1 px-5 md:grid-cols-3 gap-6 md:gap-8 md:px-4 py-8">
          {tournaments.map((item, key) => (
            <ClientGameCard
              data={user}
              item={item}
              key={item.tournamentId}
              playGame={playGame}
            />
          ))}
        </div>
      )}
      {/* {tab === "challenges" && <Achievements data={{ xp: totalXp }} />} */}
      {tab === "challenges" && (
        <Challenges
          data={{
            xp: totalXp || 0,
            nPlays: context?.profile?.analytics?.playCount || 0,
          }}
          user={user}
          viewAchievements={viewAchievements}
        />
      )}
      {tab === "leaderboard" && (
        <div className="">
          <AggregateLeaderboard
            user={user}
            totalXp={totalXp}
            lb={aggregateLeaderboard}
            tournaments={tournaments}
            setScreen={setScreen}
          />
        </div>
      )}
    </div>
  );
}
