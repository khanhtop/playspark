import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const getLeaderboard = async (tournamentId) => {
  if (!tournamentId) return [];
  const response = await getDoc(
    doc(firestore, "tournaments", tournamentId.toString())
  );
  const rankings = response.data()?.leaderboard || [];
  const sorted = rankings.sort((a, b) => b.score - a.score);
  return sorted;
};

export const rankMe = (leaderboard, uid, score, email, companyName) => {
  if (score === 0)
    return {
      rankedBoard: leaderboard,
      mutated: false,
    };
  const position = leaderboard?.findIndex((a) => a.uid === uid);
  if (position !== -1 && score > leaderboard[position].score) {
    leaderboard[position].score = score;
  } else if (position === -1) {
    leaderboard.push({
      email: email,
      score: score,
      uid: uid,
      name: companyName,
    });
    leaderboard.sort((a, b) => b.score - a.score);
  }
  return {
    rankedBoard: leaderboard,
    mutated: true,
  };
};

export const updateLeaderboard = async (tournamentId, leaderboard) => {
  await setDoc(
    doc(firestore, "tournaments", tournamentId.toString()),
    {
      leaderboard: leaderboard,
    },
    { merge: true }
  );
};

export const getHighScore = async (tournamentId, uid) => {
  if (!tournamentId) return [];
  const response = await getDoc(
    doc(firestore, "tournaments", tournamentId.toString())
  );
  const rankings = response.data()?.leaderboard || [];
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
