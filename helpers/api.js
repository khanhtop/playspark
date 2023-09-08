//import Pong from ;
import dynamic from "next/dynamic";
const Pong = dynamic(() => import("@/components/games/pong"), { ssr: false });

export function getAd(id) {
  if (id === "123") {
    return {
      gameName: "Tottenham Shootout",
      game: 0,
      primaryColor: "#132257",
      textColor: "#FFF",
      backgroundImage:
        "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    };
  } else {
    return null;
  }
}

export function getGame(id, data) {
  if (id === 0) return <Pong data={data} />;
}
