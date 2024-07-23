import { useEffect, useState } from "react";
import LineChart from "./charts/lineChart";
import { useAppContext } from "@/helpers/store";
import BarChart from "./charts/barChart";
import CreditsPanel from "./panels/creditsPanel";
import Panel from "./panels/panel";

export default function Dashboard({}) {
  const context = useAppContext();
  const [impressions, setImpressions] = useState();
  const [plays, setPlays] = useState();
  const [ctr, setCtr] = useState();
  const [optins, setOptins] = useState();
  const [playableAds, setPlayableAds] = useState();

  useEffect(() => {
    if (context?.myGames) {
      let _names = [];
      let _impressions = [];
      let _ctr = [];
      let _plays = [];
      let _optins = [];
      let _playableads = [];
      for (let game of context.myGames.filter(
        (a) => !a.isArchived && a.isActive
      )) {
        if (game.name) {
          _names.push(game.name);
          _impressions.push(game.impressions);
          _plays.push(game.playCount ?? 0);
          _playableads.push(game.playableAdCount ?? 0);
          _optins.push(game.optInCount ?? 0);
          _ctr.push((game.playCount ?? 0) / (game.impressions ?? 1));
        }
      }
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
      setOptins({
        labels: _names,
        line1Data: _optins,
        line1Name: "Email Opt Ins",
      });
      setPlayableAds({
        labels: _names,
        line1Data: _playableads,
        line1Name: "Playable Ad Views",
      });
    }
  }, [context?.myGames]);

  return (
    <div className="pb-8">
      <CreditsPanel />
      <div className="text-white grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Panel>
          <h2 className="mb-4">Impressions Per Game</h2>
          {impressions && <BarChart chartData={impressions} />}
        </Panel>
        <Panel>
          <h2 className="mb-4">Plays Per Game</h2>
          {plays && <BarChart chartData={plays} />}
        </Panel>
        <Panel>
          <h2 className="mb-4">Click Through Rate (CTR)</h2>
          {ctr && <BarChart chartData={ctr} />}
        </Panel>
        {/* <div>
        <h2 className="mb-4">Email Opt Ins</h2>
        {ctr && <BarChart chartData={optins} />}
      </div>
      <div>
        <h2 className="mb-4">Playable Ad Views</h2>
        {ctr && <BarChart chartData={playableAds} />}
      </div> */}
      </div>
    </div>
  );
}
