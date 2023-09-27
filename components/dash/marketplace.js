import { games } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";

export default function MarketPlace({}) {
  const context = useAppContext();
  const [demo, setDemo] = useState();

  const addToLibrary = async (id) => {
    const _myGames = context.profile?.myGames || [];
    _myGames.push(id);
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
      myGames: _myGames,
    });
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {games.map((item, key) => (
        <GameCard
          buttonText="Add To My Games"
          game={item}
          added={context.profile?.myGames?.includes(
            games.findIndex((a) => a.id === item.id)
          )}
          onDemo={() => setDemo(item.id)}
          onAdd={() => addToLibrary(games.findIndex((a) => a.id === item.id))}
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
    </div>
  );
}
