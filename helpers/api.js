//import Pong from ;
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { firestore } from "./firebase";
import { games } from "./games";
import Runner from "@/components/runnergame/runner";
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
    return packet;
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
    demo: true,
    leaderboard: [
      {
        name: "Demo Player",
        uid: "demoplayer",
        score: Math.floor(Math.random() * 10000),
      },
    ],
  };
}

export function getGame(id, data, callback, params) {
  if (id === 1)
    return (
      <Pong
        data={data}
        gameType="football"
        callback={callback}
        params={params}
      />
    );
  if (id === 2)
    return (
      <Pong data={data} gameType="hockey" callback={callback} params={params} />
    );
  if (id === 3)
    return (
      <Pong
        data={data}
        gameType="baseball"
        callback={callback}
        params={params}
      />
    );
  if (id === 4)
    return (
      <Pong data={data} gameType="nfl" callback={callback} params={params} />
    );
  if (id === 5)
    return (
      <Pong
        data={data}
        gameType="basketball"
        callback={callback}
        params={params}
      />
    );
  if (id === 6)
    return (
      <Pong
        data={data}
        gameType="baseballFall"
        callback={callback}
        params={params}
      />
    );
  if (id === 7) {
    return (
      <Runner
        data={data}
        gameType="runner"
        callback={callback}
        params={params}
      />
    );
  }
  if (id === 8)
    return (
      <Pong
        data={data}
        gameType="basketballFall"
        callback={callback}
        params={params}
      />
    );
  if (id === 9)
    return (
      <Pong
        data={data}
        gameType="cricketFall"
        callback={callback}
        params={params}
      />
    );
  if (id === 10)
    return (
      <Pong
        data={data}
        gameType="wheelspin"
        callback={callback}
        params={params}
      />
    );
  if (id === 11)
    return (
      <Pong
        data={data}
        gameType="cricket"
        callback={callback}
        params={params}
      />
    );
  if (id === 12)
    return (
      <Pong
        data={data}
        gameType="soccerFall"
        callback={callback}
        params={params}
      />
    );
  if (id === 13)
    return (
      <Pong
        data={data}
        gameType="newpongball"
        callback={callback}
        params={params}
      />
    );
}

export function incrementPlayCount(tournamentId, gameType = "freemium") {
  const key =
    gameType === "freemium" ? "freemiumPlayCount" : "premiumPlayCount";
  updateDoc(doc(firestore, "tournaments", tournamentId), {
    [key]: increment(1),
    playCount: increment(1),
  });
}

export function incrementImpressions(tournamentId) {
  updateDoc(doc(firestore, "tournaments", tournamentId), {
    impressions: increment(1),
  });
}

export async function incrementPlayableAdCount(tournamentId) {
  updateDoc(doc(firestore, "tournaments", tournamentId), {
    playableAdCount: increment(1),
  });
  return;
}

export async function incrementOptInCount(tournamentId) {
  updateDoc(doc(firestore, "tournaments", tournamentId), {
    optInCount: increment(1),
  });
  return;
}

export function incrementPlayCountWithImpressions(
  tournamentId,
  gameType = "freemium"
) {
  const key =
    gameType === "freemium" ? "freemiumPlayCount" : "premiumPlayCount";
  updateDoc(doc(firestore, "tournaments", tournamentId), {
    [key]: increment(1),
    playCount: increment(1),
    impressions: increment(1),
  });
}

// Subscriptions

export function switchTier(uid, tier) {
  updateDoc(doc(firestore, "users", uid), {
    tier: tier,
  });
}

export function switchActive(tournamentId, state) {
  console.log(tournamentId, state);
  updateDoc(doc(firestore, "tournaments", tournamentId.toString()), {
    isActive: !state,
  });
}
