import { games } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import FilterPills from "./filterPills";
import CreateModal from "./createTournament/createModal";
import { playable_ads } from "@/helpers/playable_ads";
import { FaGamepad, FaAd } from "react-icons/fa";
import CreateModalPlayableAd from "./createTournament/createModalPlayableAd";

export default function MarketPlace({}) {
  const context = useAppContext();
  const [demo, setDemo] = useState({
    type: "game",
    id: null,
  });
  const [filter, setFilter] = useState("games");
  const [adding, setAdding] = useState(false);
  const [showAddTournamentModal, setShowAddTournamentModal] = useState(false);
  const [showAddPlayableAdModal, setShowAddPlayableAdModal] = useState(false);

  return (
    <>
      <FilterPills
        selected={filter}
        onSelect={(a) => setFilter(a)}
        options={[
          {
            value: "games",
            text: "Games",
            onSelected: () => null,
            icon: FaGamepad,
          },
          {
            value: "ads",
            text: "Playable Ads",
            onSelected: () => null,
            icon: FaAd,
          },
        ]}
      />
      <div className="flex gap-4 flex-wrap pb-8">
        {(filter === "games" ? games : playable_ads)?.map((item, key) => (
          <GameCard
            key={item.id}
            buttonText={filter === "games" ? "Create Tournament" : "Create Ad"}
            game={item}
            saving={adding === item.id}
            added={context.profile?.myGames?.includes(
              games.findIndex((a) => a.id === item.id)
            )}
            onDemo={() =>
              setDemo({
                type: filter === "games" ? "game" : "ad",
                id: item.id,
              })
            }
            onAdd={() => {
              if (filter === "games") {
                setShowAddTournamentModal(item);
              } else {
                setShowAddPlayableAdModal(item);
              }
            }}
          />
        ))}
        {demo.id && (
          <div
            onClick={() =>
              setDemo({
                type: "game",
                id: null,
              })
            }
            className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center"
          >
            {demo.type === "game" ? (
              <iframe
                src={`/demo/game/${demo.id}`}
                className="h-[663px] w-[375px]"
              />
            ) : (
              <iframe
                src={`/demo/ad/${demo.id}`}
                className="h-[663px] w-[375px]"
              />
            )}
          </div>
        )}
        {showAddTournamentModal && (
          <CreateModal
            hide={() => setShowAddTournamentModal(false)}
            data={showAddTournamentModal}
          />
        )}
        {showAddPlayableAdModal && (
          <CreateModalPlayableAd
            hide={() => setShowAddPlayableAdModal(false)}
            data={showAddPlayableAdModal}
          />
        )}
      </div>
    </>
  );
}
