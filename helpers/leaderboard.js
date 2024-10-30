import { doc, increment, setDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "./firebase";
import { getDocument, updateDocument } from "./firebaseApi";

export const getLeaderboard = async (tournamentId) => {
  if (!tournamentId) return [];
  const response = await getDocument("tournaments", tournamentId.toString());
  // const response = await getDoc(
  //   doc(firestore, "tournaments", tournamentId.toString())
  // );
  const rankings = response?.leaderboard || [];
  const sorted = rankings.sort((a, b) => b.score - a.score);
  return sorted;
};

export const rankMe = (leaderboard, uid, score, companyName, avatar = null) => {
  if (score === 0)
    return {
      rankedBoard: leaderboard,
      mutated: false,
    };
  const position = leaderboard?.findIndex((a) => a.uid === uid);
  if (position !== -1 && score > leaderboard[position].score) {
    leaderboard[position].score = score;
    leaderboard[position].avatar = avatar;
  } else if (position === -1) {
    leaderboard.push({
      score: score,
      uid: uid,
      name: companyName,
      avatar: avatar,
    });
    leaderboard.sort((a, b) => b.score - a.score);
  }
  return {
    rankedBoard: leaderboard,
    mutated: true,
  };
};

export const updateLeaderboard = async (tournamentId, leaderboard) => {
  await updateDocument("tournaments", tournamentId.toString(), {
    leaderboard: leaderboard,
  });
  // await setDoc(
  //   doc(firestore, "tournaments", tournamentId.toString()),
  //   {
  //     leaderboard: leaderboard,
  //   },
  //   { merge: true }
  // );
};

export const updateScoreAndXP = async (uid, score, companyId) => {
  const xp = Math.floor(score / 12);
  await setDoc(
    doc(firestore, "users", uid.toString()),
    {
      memberOf: arrayUnion(companyId.toString()),
      totalScore: increment(score),
    },
    { merge: true }
  );
  return;
};

export const getHighScore = async (tournamentId, uid) => {
  if (!tournamentId) return [];
  const response = await getDocument("tournaments", tournamentId.toString());
  console.log(response, " LB");
  // const response = await getDoc(
  //   doc(firestore, "tournaments", tournamentId.toString())
  // );
  const rankings = response?.leaderboard || [];
  const position = rankings?.findIndex((a) => a.uid === uid);
  if (position === -1) return 0;
  return rankings[position].score;
};

export const computeTotalScore = (tournaments, uid) => {
  if (!tournaments || !uid) return;
  let totalScore = 0;
  tournaments.forEach((tournament) => {
    if (!tournament.leaderboard) return;
    tournament.leaderboard.forEach((lb) => {
      if (lb.uid === uid) {
        totalScore += lb.score;
      }
    });
  });
  return totalScore;
};

export const computeAggregateLeaderboard = (tournaments, uid) => {
  let lb = [];
  tournaments.forEach((tourn) => {
    if (tourn.leaderboard) {
      tourn.leaderboard.forEach((ranking) => {
        const index = lb.findIndex((item) => item.uid === ranking.uid);
        if (index === -1) {
          lb.push({ ...ranking, mine: ranking.uid === uid });
        } else {
          lb[index]["score"] += ranking.score;
        }
      });
    }
  });
  return lb.sort((a, b) => b.score - a.score);
};
