import { useEffect, useMemo, useState } from "react";
import LineChart from "./charts/lineChart";
import { useAppContext } from "@/helpers/store";
import BarChart from "./charts/barChart";
import CreditsPanel from "./panels/creditsPanel";
import Panel from "./panels/panel";
import { Button, Card } from "flowbite-react";
import {
  ArrowRightIcon,
  HeartIcon,
  PlayIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import GameListModal from "./dashModals/gameListModal";
import PlayableAdListModal from "./dashModals/playableAdListModal";

export default function Dashboard({}) {
  const context = useAppContext();
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [showCreateAdModal, setShowCreateAdModal] = useState(false);
  const [impressions, setImpressions] = useState();
  const [plays, setPlays] = useState();
  const [ctr, setCtr] = useState();
  const [optins, setOptins] = useState();
  const [playableAds, setPlayableAds] = useState();

  const activeGames = useMemo(() => {
    return context.myGames.filter((game) => game.isActive && !game.isArchived)
      .length;
  }, [context.myGames]);

  const totalPlays = useMemo(() => {
    return context.myGames.reduce((sum, game) => {
      const playCount = parseInt(game.playCount, 10);
      return Number.isInteger(playCount) ? sum + playCount : sum;
    }, 0);
  }, [context.myGames]);

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
      <div className="flex gap-4">
        <Button
          onClick={() => setShowCreateGameModal(true)}
          size="xl"
          className="bg-blue-600 enabled:hover:bg-blue-500"
        >
          <PlusIcon className="mr-2 h-6 w-6" />
          Create Game
        </Button>
        <Button
          onClick={() => setShowCreateAdModal(true)}
          size="xl"
          className="bg-emerald-400 enabled:hover:bg-emerald-500"
        >
          <PlusIcon className="mr-2 h-6 w-6" />
          Create Playable Ad
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <DashboardStatisticCard
          Icon={HeartIcon}
          color="blue-500"
          value={activeGames}
          text="Active Games"
        />
        <DashboardStatisticCard
          Icon={PlayIcon}
          color="green-500"
          value={totalPlays}
          text="Games Played"
        />
        <DashboardStatisticCard
          Icon={UserIcon}
          color="pink-500"
          value={2000}
          text="Users"
        />
      </div>
      {showCreateGameModal && (
        <GameListModal onClose={() => setShowCreateGameModal(false)} />
      )}
      {showCreateAdModal && (
        <PlayableAdListModal onClose={() => setShowCreateAdModal(false)} />
      )}
      {/* <CreditsPanel /> */}
      {/* <div className="text-white grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4"> */}
      {/* <Panel>
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
        </Panel> */}
      {/* <div>
        <h2 className="mb-4">Email Opt Ins</h2>
        {ctr && <BarChart chartData={optins} />}
      </div>
      <div>
        <h2 className="mb-4">Playable Ad Views</h2>
        {ctr && <BarChart chartData={playableAds} />}
      </div> */}
      {/* </div> */}
    </div>
  );
}

function DashboardStatisticCard({ Icon, color, value, text }) {
  return (
    <Card className="hover:shadow-sm transition">
      <div className="flex">
        <div className={`bg-${color} rounded-full relative h-16 w-16`}>
          <div className="h-full w-full bg-white/80 absolute top-0 left-0" />
          <Icon
            className={`text-${color} z-2 absolute h-[100%] w-[100%] p-4 right-[1px]`}
          />
        </div>
        <div className="px-4 flex flex-col">
          <h3 className="text-3xl font-bold mb-1">{value}</h3>
          <p className="text-black/70">{text}</p>
        </div>
      </div>
    </Card>
  );
}
