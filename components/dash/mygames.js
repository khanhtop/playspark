import { games } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import Embed from "./embed";

export default function MyGames({}) {
  const context = useAppContext();
  const [demo, setDemo] = useState();
  const [showEmbed, setShowEmbed] = useState();

  const showEmbedCode = (id) => {
    // setLink(
    //   `<iframe src="https://playspark.co/ad/` +
    //     id +
    //     ` class="h-[663px] w-[375px]"/>`
    // );
  };

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
    <div className="flex flex-wrap gap-4">
      {context.myGames?.map((item, key) => (
        <GameCard
          onAdd={() => setShowEmbed(item.tournamentId)}
          buttonText="Get Embed Code"
          game={item}
          onDemo={() => setDemo(item.tournamentId)}
          onDelete={() => deleteGame(item)}
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
    </div>
  );
}
