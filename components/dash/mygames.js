import { sanitiseGameObject } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import Embed from "./embed";
import AnalyticsModal from "./analyticsModal";
import { archive, switchActive } from "@/helpers/api";
import FilterPills from "./filterPills";
import Button from "../forms/button";
import { FolderIcon } from "@heroicons/react/24/solid";
import CreateModal from "./createTournament/createModal";
import Swal from "sweetalert2";
import { deleteDocument } from "@/helpers/firebaseApi";

export default function MyGames({}) {
  const context = useAppContext();
  const [demo, setDemo] = useState();
  const [showEmbed, setShowEmbed] = useState();
  const [showAnalytics, setShowAnalytics] = useState();
  const [filter, setFilter] = useState("");
  const [isArchiving, setIsArchiving] = useState(false);
  const [showAddTournamentModal, setShowAddTournamentModal] = useState(false);

  const deleteGame = async (item) => {
    if (
      confirm(
        "Are you sure you want to remove this tournament?  The tournament and all of the associated data will be lost"
      ) == true
    ) {
      const tId = item.tournamentId.toString();
      await deleteDocument("tournaments", tId);
      // await deleteDoc(doc(firestore, "tournaments", tId));
    }
  };

  const archiveAll = async () => {
    setIsArchiving(true);
    const all = context.myGames.filter((a) => !a.isActive && !a.isArchived);
    for (let game of all) {
      await archive(game.tournamentId);
    }
    setIsArchiving(false);
  };

  return (
    <>
      <div className="flex justify-between">
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
            {
              value: "archived",
              text: "Archived",
              onSelected: () => null,
            },
          ]}
        />
        {filter === "inactive" && (
          <Button
            loading={isArchiving}
            onClick={() => archiveAll()}
            className="h-[36px] w-36 px-4 bg-red-500 text-xs flex gap-2"
          >
            <FolderIcon className="h-4 w-4" />
            <p>Archive All</p>
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 pb-8">
        {context.myGames
          ?.filter((a) =>
            filter === ""
              ? a
              : filter === "active"
              ? a.isActive
              : filter === "inactive"
              ? !a.isActive && !a.isArchived
              : a.isArchived
          )
          ?.map((item, key) => (
            <GameCard
              key={item.tournamentId}
              onAdd={() => setShowEmbed(item.tournamentId)}
              showActiveState={item?.isActive ?? false}
              buttonText="Get Embed Code"
              game={item}
              onDelete={() => deleteGame(item)}
              // onToggleActive={() => switchActive(item.tournamentId, true)}
              onShowInfo={[
                {
                  text: "Edit Tournament",
                  action: () => null,
                },
                {
                  text: "Use As Template",
                  action: () => {
                    const templateGame = sanitiseGameObject(item);
                    setShowAddTournamentModal(templateGame);
                  },
                },
                {
                  text: item.isActive ? "End Tournament" : "Restart Tournament",
                  action: () => {
                    Swal.fire({
                      icon: "question",
                      title: item.isActive
                        ? "End Tournament"
                        : "Restart Tournament",
                      text: item.isActive
                        ? "Are you sure you want to end the tournament? The tournament will no longer be accessible, and all end-game rewards will be distributed."
                        : "Restart Tournament",
                      showCancelButton: true,
                      confirmButtonText: item.isActive
                        ? "End Tournament"
                        : "Restart Tournament",
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#AAA",
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        switchActive(
                          item.tournamentId,
                          item?.isActive ?? false
                        );
                        Swal.fire({
                          icon: "success",
                          title: item.isActive
                            ? "Tournament Ended"
                            : "Tournament Restarted",
                          confirmButtonColor: "#AAA",
                        });
                      }
                    });
                  },
                },
                {
                  text: "View Analytics",
                  action: () => setShowAnalytics(item),
                },
                {
                  text: item.isActive ? "Play Demo" : "Archive Tournament",
                  action: () =>
                    item.isActive
                      ? setDemo({
                          id: item.tournamentId,
                          landscape: item.landscape,
                        })
                      : archive(item.tournamentId),
                },
              ]}
            />
          ))}
        {demo && (
          <div
            onClick={() => setDemo()}
            className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center"
          >
            <iframe
              src={`/ad/${demo.id}`}
              className={`${
                demo.landscape ? "h-[375px] w-[663px]" : "h-[663px] w-[375px]"
              }`}
            />
          </div>
        )}
        {showEmbed && <Embed id={showEmbed} setShowEmbed={setShowEmbed} />}
        {showAnalytics && (
          <AnalyticsModal
            item={showAnalytics}
            setShowAnalytics={setShowAnalytics}
          />
        )}
        {showAddTournamentModal && (
          <CreateModal
            hide={() => setShowAddTournamentModal(false)}
            data={showAddTournamentModal}
          />
        )}
      </div>
    </>
  );
}
