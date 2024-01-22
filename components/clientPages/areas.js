import { useState } from "react";
import AreaTabs from "./areaTabs";
import ClientGameGridCard from "./gridCard";
import AggregateLeaderboard from "./aggregateLeaderboard";
import { useAppContext } from "@/helpers/store";

export default function Areas({ user, tournaments, aggregateLeaderboard }) {
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
                  text: "Leaderboard",
                  value: "leaderboard",
                },
              ]
            : [
                {
                  text: "Games",
                  value: "games",
                },
              ]
        }
      />
      {tab === "games" && (
        <div className="grid md:grid-cols-3 gap-8 px-4 py-4">
          {tournaments.map((item, key) => (
            <ClientGameGridCard item={item} key={item.tournamentId} />
          ))}
        </div>
      )}
      {tab === "challenges" && <div className="min-h-[500px]"></div>}
      {tab === "leaderboard" && (
        <div className="">
          <AggregateLeaderboard user={user} lb={aggregateLeaderboard} />
        </div>
      )}
    </div>
  );
}
