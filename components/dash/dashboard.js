import { useEffect, useState } from "react";
import LineChart from "./charts/lineChart";
import { useAppContext } from "@/helpers/store";
import BarChart from "./charts/barChart";

export default function Dashboard({}) {
  const context = useAppContext();
  const [impressions, setImpressions] = useState();
  const [plays, setPlays] = useState();
  const [ctr, setCtr] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    if (context?.myGames) {
      let _names = [];
      let _impressions = [];
      let _ctr = [];
      let _plays = [];
      let _users = [];
      for (let game of context.myGames) {
        if (game.name) {
          _names.push(game.name);
          _impressions.push(game.impressions);
          _plays.push(game.playCount ?? 0);
          _plays.push(game.users?.length ?? 0);
          _ctr.push((game.playCount ?? 0) / (game.impressions ?? 1));
        }
      }
      const chartData = {
        labels: _names,
        line1Data: _impressions,
        line2Data: _plays,
        line1Name: "Impressions",
        line2Name: "Plays",
      };
      setImpressions({
        labels: _names,
        line1Data: _impressions,
        line1Name: "Impressions",
      });
      setPlays({
        labels: _names,
        line1Data: _plays,
        line1Name: "Plays",
      });
      setCtr({
        labels: _names,
        line1Data: _ctr,
        line1Name: "CTR",
      });
      setUsers({
        labels: _names,
        line1Data: _users,
        line1Name: "User Volume",
      });
    }
  }, [context?.myGames]);

  return (
    <div className="text-white grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div>
        <h2 className="mb-4">Impressions Per Game</h2>
        {impressions && <BarChart chartData={impressions} />}
      </div>
      <div>
        <h2 className="mb-4">Plays Per Game</h2>
        {plays && <BarChart chartData={plays} />}
      </div>
      {/* <div>
        <h2 className="mb-4">User Volume</h2>
        {ctr && <BarChart chartData={users} />}
      </div> */}
      <div>
        <h2 className="mb-4">Click Through Rate (CTR)</h2>
        {ctr && <BarChart chartData={ctr} />}
      </div>
    </div>
  );
}
