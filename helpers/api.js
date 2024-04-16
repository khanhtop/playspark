//import Pong from ;
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

export async function getChallenge(id) {
  const ad = await getDoc(doc(firestore, "challenges", id));
  if (ad.exists()) {
    const packet = {
      ...ad.data(),
    };
    return packet;
  } else {
    return null;
  }
}

export async function getClient(id) {
  const user = await getDoc(doc(firestore, "users", id));
  if (user.exists()) {
    const packet = {
      ...user.data(),
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

  if (id === 14)
    return (
      <Pong
        data={data}
        gameType="newfallball"
        callback={callback}
        params={params}
      />
    );
  if (id === 15)
    return (
      <Pong data={data} gameType="wordle" callback={callback} params={params} />
    );

  if (id === 16)
    return (
      <Pong
        data={data}
        gameType="flyball"
        callback={callback}
        params={params}
      />
    );

  if (id === 17)
    return (
      <Pong
        data={data}
        gameType="newcricket"
        callback={callback}
        params={params}
      />
    );

  if (id === 18)
    return (
      <Pong
        data={data}
        gameType="footballpass"
        callback={callback}
        params={params}
      />
    );

  if (id === 19)
    return (
      <Pong
        data={data}
        gameType="flycollect"
        callback={callback}
        params={params}
      />
    );

  if (id === 21)
    return (
      <Pong
        data={data}
        gameType="newfallgame"
        callback={callback}
        params={params}
      />
    );

  if (id === 22)
    return (
      <Pong
        data={data}
        gameType="smashBlitzThrow"
        callback={callback}
        params={params}
      />
    );
  
  if (id === 23)
    return (
      <Pong
        data={data}
        gameType="newcricketsmash"
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
  updateDoc(doc(firestore, "tournaments", tournamentId.toString()), {
    impressions: increment(1),
  });
}

export async function incrementPlayableAdCount(tournamentId) {
  updateDoc(doc(firestore, "tournaments", tournamentId.toString()), {
    playableAdCount: increment(1),
  });
  return;
}

export async function incrementOptInCount(tournamentId) {
  console.log(tournamentId);
  updateDoc(doc(firestore, "tournaments", tournamentId.toString()), {
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
  updateDoc(doc(firestore, "tournaments", tournamentId.toString()), {
    isActive: !state,
  });
}

export async function archive(tournamentId) {
  updateDoc(doc(firestore, "tournaments", tournamentId.toString()), {
    isArchived: true,
    isActive: false,
  });
  return;
}

export async function createChallenge(game, challengee, challenger, referrer) {
  const challengeId = Date.now().toString();
  await setDoc(doc(firestore, "challenges", challengeId), {
    game: game,
    challengee: challengee,
    challenger: challenger,
    referrer: referrer,
    timestamp: Date.now(),
  });
  await addDoc(collection(firestore, "notifications"), {
    timestamp: Date.now(),
    link: `https://playspark.co/battle/${challengeId}`,
    text: `The battle has begun with ${challengee?.companyName}`,
    uid: challenger.id,
  });
  return challengeId;
}

export async function completeBattleForChallenger(
  challengeId,
  score,
  challengerName,
  gameName,
  challengeeId,
  challengeeEmail
) {
  await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: challengeeEmail,
      template: 0,
      name: challengerName,
      subject: `You have been challenged by ${challengerName}!`,
      game: gameName,
      url: `https://playspark.co/battle/${challengeId}`,
      customText: `${challengerName} has invited you to beat their score of ${score} in ${gameName}.  Win the battle and steal XP from ${challengerName}!`,
    }),
  });
  await updateDoc(doc(firestore, "challenges", challengeId), {
    challengerResult: {
      score: score,
      timestamp: Date.now(),
    },
  });
  await addDoc(collection(firestore, "notifications"), {
    timestamp: Date.now(),
    link: `https://playspark.co/battle/${challengeId}`,
    text: `${challengerName} has invited you to beat their score of ${score} in ${gameName}.  Win the battle and steal XP from ${challengerName}!`,
    uid: challengeeId,
  });
  return;
}

export async function completeBattleForChallengee(
  challengeId,
  score,
  gameName,
  challengerScore,
  challengerName,
  challengeeName,
  challengerId,
  challengeeId,
  challengerEmail,
  challengeeEmail,
  clientId
) {
  console.warn("DEBUG - API.JS TRIGGERED");
  const challengerWon = parseInt(challengerScore) > parseInt(score);
  const { dataByClient: challengerDataByClient, xp: challengerXp } =
    await getDataByClientAndXP(challengerId);
  const { dataByClient: challengeeDataByClient, xp: challengeeXp } =
    await getDataByClientAndXP(challengeeId);
  const xpStealAmount = challengerWon
    ? Math.floor(challengeeDataByClient[clientId]["xp"] / 10)
    : Math.floor(challengerDataByClient[clientId]["xp"] / 10);
  await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template: challengerWon ? 2 : 1,
      email: challengeeEmail,
      name: challengerName,
      subject: `The battle with ${challengerName} has ended!`,
      game: gameName,
      url: `https://playspark.co/battle/${challengeId}`,
      customText: `${
        challengerWon ? "You Lost" : "You Won"
      } the battle with ${challengerName} with a score of ${score} vs ${challengerScore} in ${gameName}`,
    }),
  });
  await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template: challengerWon ? 1 : 2,
      email: challengerEmail,
      name: challengeeName,
      subject: `The battle with ${challengeeName} has ended!`,
      game: gameName,
      url: `https://playspark.co/battle/${challengeId}`,
      customText: `${
        challengerWon ? "You Won" : "You Lost"
      } the battle with ${challengeeName} with a score of ${challengerScore} vs ${score} in ${gameName}`,
    }),
  });
  await updateDoc(doc(firestore, "challenges", challengeId), {
    challengeeResult: {
      score: score,
      timestamp: Date.now(),
    },
    xpMovement: {
      to: challengerWon ? "challenger" : "challengee",
      amount: xpStealAmount,
    },
  });
  await addDoc(collection(firestore, "notifications"), {
    timestamp: Date.now(),
    link: ``,
    text: `${
      challengerWon ? "You Lost" : "You Won"
    } the battle with ${challengerName}`,
    uid: challengeeId,
  });
  await addDoc(collection(firestore, "notifications"), {
    timestamp: Date.now(),
    link: ``,
    text: `${
      challengerWon ? "You Won" : "You Lost"
    } the battle with ${challengeeName}`,
    uid: challengerId,
  });
  const challengerOutputData = {
    dataByClient: {
      ...challengerDataByClient,
      [clientId]: {
        ...challengerDataByClient[clientId],
        xp: challengerWon
          ? challengerDataByClient[clientId]["xp"] + xpStealAmount
          : challengerDataByClient[clientId]["xp"] - xpStealAmount,
      },
    },
    totalXp: challengerWon
      ? challengerXp + xpStealAmount
      : challengerXp - xpStealAmount,
  };
  const challengeeOutputData = {
    dataByClient: {
      ...challengeeDataByClient,
      [clientId]: {
        ...challengeeDataByClient[clientId],
        xp: challengerWon
          ? challengeeDataByClient[clientId]["xp"] - xpStealAmount
          : challengeeDataByClient[clientId]["xp"] + xpStealAmount,
      },
    },
    totalXp: challengerWon
      ? challengeeXp - xpStealAmount
      : challengeeXp + xpStealAmount,
  };
  await updateDoc(
    doc(firestore, "users", challengerId.toString()),
    challengerOutputData
  );
  await updateDoc(
    doc(firestore, "users", challengeeId.toString()),
    challengeeOutputData
  );
  return;
}

async function getDataByClientAndXP(userId) {
  const result = await getDoc(doc(firestore, "users", userId.toString()));
  return {
    dataByClient: result.data()?.dataByClient,
    xp: result.data()?.totalXp,
  };
}
