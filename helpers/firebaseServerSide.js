import admin from "@/helpers/firebaseAdmin";

export async function getAd(id) {
  const adRef = admin.firestore().collection("tournaments").doc(id);
  const ad = await adRef.get();

  if (ad.exists) {
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
  const challengeRef = admin.firestore().collection("challenges").doc(id);
  const challenge = await challengeRef.get();

  if (challenge.exists) {
    const packet = {
      ...challenge.data(),
    };
    return packet;
  } else {
    return null;
  }
}

export async function getClient(id) {
  const userRef = admin.firestore().collection("users").doc(id);
  const user = await userRef.get();

  if (user.exists) {
    const packet = {
      ...user.data(),
    };
    return packet;
  } else {
    return null;
  }
}

export async function getUserBySlug(slug) {
  const firestore = admin.firestore();
  const usersRef = firestore.collection("users").where("slug", "==", slug);
  const querySnapshot = await usersRef.get();

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
}

export async function getTournamentsByOwnerId(ownerId) {
  const firestore = admin.firestore();
  const tournamentsRef = firestore
    .collection("tournaments")
    .where("isActive", "==", true)
    .where("ownerId", "==", ownerId);
  const tournamentsSnapshot = await tournamentsRef.get();

  const tournamentsData = tournamentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    endDate: doc.data().endDate ? JSON.stringify(doc.data().endDate) : null,
  }));

  return tournamentsData;
}

export function sortTournamentsByPlayCount(tournamentsData) {
  return tournamentsData
    .sort((a, b) => {
      const playCountA = a.freemiumPlayCount || 0;
      const playCountB = b.freemiumPlayCount || 0;
      return playCountB - playCountA;
    })
    .slice(0, 5);
}

export function sortTournamentsByDate(tournamentsData) {
  return tournamentsData
    .sort((a, b) => {
      const dateB = a.timestamp || 0;
      const dateA = b.timestamp || 0;
      return dateB - dateA;
    })
    .slice(0, 5);
}

export async function getLeaderboardForUser(userId) {
  const firestore = admin.firestore();
  const leaderboardRef = firestore
    .collection("users")
    .where("memberOf", "array-contains", userId);
  const leaderboardSnapshot = await leaderboardRef.get();

  const leaderboard = leaderboardSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    currentXp: doc.data()?.dataByClient?.[userId]?.xp || 0,
  }));

  return leaderboard;
}
