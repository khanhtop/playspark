//import Pong from ;
import { doc, getDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { firestore } from "./firebase";
import { games } from "./games";
const Pong = dynamic(() => import("@/components/games/pong"), { ssr: false });

export async function getAd(id) {
  const ad = await getDoc(doc(firestore, "tournaments", id));
  if (ad.exists()) {
    const packet = {
      ...ad.data(),
      primaryColor: ad.data()?.primaryColor ?? "#132257",
      textColor: ad.data()?.textColor ?? "#FFF",
      backgroundImage:
        ad.data()?.backgroundImage ??
        "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    };
  } else if (id === "6") {
    return {
      gameName: "Tottenham Baseball Fall",
      game: 6,
      primaryColor: "#132257",
      textColor: "#FFF",
      backgroundImage:
        "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    };
  } else {
    return null;
  }
}

export async function getDemo(id) {
  const game = games.find((a) => a.id === parseInt(id));
  return {
    ...game,
    backgroundImage:
      game?.backgroundImage ??
      "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    primaryColor: game.primaryColor ?? "#132257",
    textColor: game.textColor ?? "#FFF",
  };
}

export function getGame(id, data) {
  if (id === 1) return <Pong data={data} gameType="football" />;
  if (id === 2) return <Pong data={data} gameType="hockey" />;
  if (id === 3) return <Pong data={data} gameType="baseball" />;
  if (id === 4) return <Pong data={data} gameType="nfl" />;
  if (id === 5) return <Pong data={data} gameType="basketball" />;
  if (id === 6) return <Pong data={data} gameType="baseballFall" />;
}
