import { games } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import Advert from "../ad";
import CreateTournamentModal from "./createTournamentModal";
import FilterPills from "./filterPills";
import CreateModal from "./createTournament/createModal";

export default function MarketPlace({}) {
  const context = useAppContext();
  const [demo, setDemo] = useState();
  const [filter, setFilter] = useState("");
  const [adding, setAdding] = useState(false);
  const [showAddTournamentModal, setShowAddTournamentModal] = useState(false);

  const addToLibrary = async (item) => {
    setAdding(item.id);
    const _myGames = context.profile?.myGames || [];
    const _uid = Date.now();
    _myGames.push(_uid);
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
      myGames: _myGames,
    });
    await setDoc(doc(firestore, "tournaments", _uid.toString()), {
      ...item,
      tournamentId: _uid,
      ownerId: context.loggedIn?.uid,
    });
    alert("Tournament added to My Games");
    setAdding(false);
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
            value: "free",
            text: "Basic",
            onSelected: () => null,
          },
          {
            value: "premium",
            text: "Premium",
            onSelected: () => null,
          },
        ]}
      />
      <div className="flex gap-4 flex-wrap pb-8">
        {games
          .filter((a) =>
            filter === "" ? a : filter === "free" ? !a.isPremium : a.isPremium
          )
          ?.map((item, key) => (
            <GameCard
              key={key}
              buttonText="Create Tournament"
              game={item}
              saving={adding === item.id}
              added={context.profile?.myGames?.includes(
                games.findIndex((a) => a.id === item.id)
              )}
              onDemo={() => setDemo(item.id)}
              onAdd={() => {
                // addToLibrary(item);
                setShowAddTournamentModal(item);
              }}
            />
          ))}
        {demo && (
          <div
            onClick={() => setDemo()}
            className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center"
          >
            {(demo == 11 || demo == 17 || demo == 22 ) ? (
              <iframe src={`/demo/${demo}`} className="h-[688px] w-[1248px]" />
            ) : (
              <iframe src={`/demo/${demo}`} className="h-[663px] w-[375px]" />
            )}
          </div>
        )}
        {showAddTournamentModal && (
          <CreateModal
            hide={() => setShowAddTournamentModal(false)}
            data={showAddTournamentModal}
          />
          // <CreateTournamentModal
          //   data={showAddTournamentModal}
          //   hide={() => setShowAddTournamentModal(false)}
          //   setAdding={setAdding}
          // />
        )}
      </div>
    </>
  );
}
