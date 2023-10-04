import { games } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";

export default function MyGames({}) {
  const context = useAppContext();
  const [demo, setDemo] = useState();
  const [link, setLink] = useState();

  const showEmbedCode = (id) => {
    setLink(
      `<iframe src="https://playspark.co/ad/` +
        id +
        ` class="h-[663px] w-[375px]"/>`
    );
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
          onAdd={() => showEmbedCode(item.tournamentId)}
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
      {link && (
        <div
          onClick={() => setLink()}
          className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg px-4 w-[90%] max-w-[500px] h-[100px] bg-white flex items-center justify-center"
          >
            <div className="rounded-full bg-gray-200 flex w-full overflow-hidden">
              <input
                className="bg-transparent flex-1 text-xs px-4"
                value={link}
              />
              <button className="w-24 hover:bg-gray-300">Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
