import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const computeLeaderboard = (
  leaderboard,
  score,
  uid,
  profile,
  email,
  demo,
  tournamentId,
  data
) => {
  if (!leaderboard) return;
  const _leaderboard = [...leaderboard];
  if (score > 0 && uid && profile?.companyName) {
    const position = _leaderboard.findIndex((a) => a.uid === uid);
    if (position === -1) {
      _leaderboard.push({
        email: email,
        score: score,
        uid: uid,
        name: profile?.companyName,
      });
      const sorted = _leaderboard.sort((a, b) => b.score > a.score);
      return {
        leaderboard: sorted,
        prevBest: 0,
        newBest: score,
      };
    } else {
      if (_leaderboard[position].score < score) {
        _leaderboard[position] = {
          ..._leaderboard[position],
          score: score,
        };
      }
    }
    if (!demo) {
      console.log("LB", _leaderboard);
      setDoc(
        doc(firestore, "tournaments", tournamentId),
        {
          ...data,
          leaderboard: _leaderboard,
        },
        { merge: true }
      );
    }
    const sorted = _leaderboard.sort((a, b) => b.score > a.score);
    return {
      leaderboard: sorted,
      prevBest: leaderboard[position].score,
      newBest:
        _leaderboard[position].score < score
          ? score
          : _leaderboard[position].score,
    };
  }
};
