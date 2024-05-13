import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const determineStreak = async (profile, uid, tournament) => {
  const lastStreak = profile?.streaks || {};
  if (!lastStreak?.[tournament.tournamentId]) {
    await updateDoc(doc(firestore, "users", uid), {
      streaks: {
        ...lastStreak,
        [tournament.tournamentId]: {
          timestamp: Date.now().toString(),
          streak: 1,
          maxStreak: 1,
        },
      },
    });
    return {
      trigger: false,
      value: 1,
    };
  } else {
    const streakData = lastStreak?.[tournament.tournamentId];
    const streakAmount = streakData?.streak;
    const maxStreak = streakData?.maxStreak || 0;
    const streakTimestamp = parseInt(streakData?.timestamp);
    const delta = Math.floor((Date.now() - streakTimestamp) / 1000);
    const streakPeriod = 86400; // seconds
    const streakExpiry = 172800; // seconds

    if (delta < streakExpiry) {
      await updateDoc(doc(firestore, "users", uid), {
        streaks: {
          ...lastStreak,
          [tournament.tournamentId]: {
            timestamp:
              delta > streakPeriod
                ? Date.now().toString()
                : streakTimestamp.toString(),
            streak: streakAmount + (delta > streakPeriod ? 1 : 0),
            maxStreak:
              streakAmount + (delta > streakPeriod ? 1 : 0) > maxStreak
                ? streakAmount + (delta > streakPeriod ? 1 : 0)
                : maxStreak,
          },
        },
      });
      return {
        trigger: delta > streakPeriod ? true : false,
        value: streakAmount + (delta > streakPeriod ? 1 : 0),
      };
    } else {
      await updateDoc(doc(firestore, "users", uid), {
        streaks: {
          ...lastStreak,
          [tournament.tournamentId]: {
            timestamp: Date.now().toString(),
            streak: 1,
            maxStreak: maxStreak === 0 ? 1 : maxStreak,
          },
        },
      });
      return {
        trigger: false,
        value: 1,
      };
    }
  }
};
