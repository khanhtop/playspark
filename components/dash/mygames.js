import { games } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import Embed from "./embed";
import AnalyticsModal from "./analyticsModal";
import { switchActive } from "@/helpers/api";
import FilterPills from "./filterPills";

export default function MyGames({}) {
  const context = useAppContext();
  const [demo, setDemo] = useState();
  const [showEmbed, setShowEmbed] = useState();
  const [showAnalytics, setShowAnalytics] = useState();
  const [filter, setFilter] = useState("");

  const deleteGame = async (item) => {
    if (
      confirm(
        "Are you sure you want to remove this tournament?  The tournament and all of the associated data will be lost"
      ) == true
    ) {
      const tId = item.tournamentId.toString();
      await deleteDoc(doc(firestore, "tournaments", tId));
    }
  };

  return (
    <>
      <FilterPills
        selected={filter}
        onSelect={(a) => setFilter(a)}
        options={[
          {
            value: "",
            text: "All",
            onSelected: () => null,
          },
          {
            value: "active",
            text: "Running",
            onSelected: () => null,
          },
          {
            value: "inactive",
            text: "Ended",
            onSelected: () => null,
          },
        ]}
      />
      <div className="flex flex-wrap gap-4 pb-8">
        {context.myGames
          ?.filter((a) =>
            filter === "" ? a : filter === "active" ? a.isActive : !a.isActive
          )
          ?.map((item, key) => (
            <GameCard
              onAdd={() => setShowEmbed(item.tournamentId)}
              showActiveState={item?.isActive ?? false}
              buttonText="Get Embed Code"
              game={item}
              onDelete={() => switchActive(item.tournamentId, true)}
              onShowInfo={[
                {
                  text: "Edit Tournament",
                  action: () => null,
                },
                {
                  text: item.isActive ? "End Tournament" : "Restart Tournament",
                  action: () =>
                    switchActive(item.tournamentId, item?.isActive ?? false),
                },
                {
                  text: "View Analytics",
                  action: () => setShowAnalytics(item),
                },
                {
                  text: "Play Demo",
                  action: () => setDemo(item.tournamentId),
                },
              ]}
            />
          ))}
        {demo && (
          <div
            onClick={() => setDemo()}
            className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center"
          >
            <iframe src={`/ad/${demo}`} className="h-[663px] w-[375px]" />
          </div>
        )}
        {showEmbed && <Embed id={showEmbed} setShowEmbed={setShowEmbed} />}
        {showAnalytics && (
          <AnalyticsModal
            item={showAnalytics}
            setShowAnalytics={setShowAnalytics}
          />
        )}
      </div>
    </>
  );
}
