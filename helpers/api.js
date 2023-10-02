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
  } else if (id === "124") {
    return {
      gameName: "Tottenham Hockey",
      game: 1,
      primaryColor: "#132257",
      textColor: "#FFF",
      backgroundImage:
        "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    };
  } else if (id === "125") {
    return {
      gameName: "Tottenham Baseball",
      game: 2,
      primaryColor: "#132257",
      textColor: "#FFF",
      backgroundImage:
        "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    };
  } else if (id === "126") {
    return {
      gameName: "Tottenham NFL",
      game: 3,
      primaryColor: "#132257",
      textColor: "#FFF",
      backgroundImage:
        "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    };
  } else if (id === "127") {
    return {
      gameName: "Tottenham Basketball",
      game: 4,
      primaryColor: "#132257",
      textColor: "#FFF",
      backgroundImage:
        "https://dailypost.ng/wp-content/uploads/2019/07/Tottenham-Hotspur.jpg",
    };
  } else if (id === "128") {
    return {
      gameName: "Tottenham Baseball Fall",
      game: 5,
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
  if (id === 0) return <Pong data={data} gameType="football" />;
  if (id === 1) return <Pong data={data} gameType="hockey" />;
  if (id === 2) return <Pong data={data} gameType="baseball" />;
  if (id === 3) return <Pong data={data} gameType="nfl" />;
  if (id === 4) return <Pong data={data} gameType="basketball" />;
  if (id === 5) return <Pong data={data} gameType="baseballFall" />;
}
