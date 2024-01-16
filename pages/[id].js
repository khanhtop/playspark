import AuthModal from "@/components/auth/authModal";
import Areas from "@/components/clientPages/areas";
import Hero from "@/components/clientPages/hero";
import HorizontalGamesScroll from "@/components/clientPages/horizontalGamesScroll";
import ClientCoins from "@/components/clientPages/subpages/clientCoins";
import ClientHome from "@/components/clientPages/subpages/clientHome";
import ClientNotifications from "@/components/clientPages/subpages/clientNotifications";
import ClientProfile from "@/components/clientPages/subpages/clientProfile";
import ClientXP from "@/components/clientPages/subpages/clientXp";
import TopNav from "@/components/clientPages/topnav";
import UIButton from "@/components/ui/button";
import { firestore } from "@/helpers/firebase";
import {
  computeAggregateLeaderboard,
  computeTotalScore,
} from "@/helpers/leaderboard";
import { useAppContext } from "@/helpers/store";
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function PageHandler({
  user,
  tournaments,
  tournamentsByPlayCount,
  tournamentsByDate,
  leaderboard,
}) {
  const context = useAppContext();
  const [showLogin, setShowLogin] = useState(false);
  const [screen, setScreen] = useState("home");

  const data = {
    user: {
      ...user,
      primaryColor: user.primaryColor ?? "#222",
      accentColor: user.accentColor ?? "#00DDFF",
      textColor: user.textColor ?? "#FFF",
    },
    tournaments,
    tournamentsByPlayCount,
    tournamentsByDate,
    leaderboard,
    context,
    setScreen,
    screen,
  };

  return (
    <>
      <div className="min-h-screen">
        <TopNav
          data={data.user}
          context={context}
          totalScore={context?.profile?.totalScore || 0}
          totalXp={context?.profile?.totalXp || 0}
          showLogin={() => setShowLogin(true)}
          setScreen={setScreen}
        />
        {screen === "home" && <ClientHome {...data} />}
        {screen === "coins" && <ClientCoins {...data} />}
        {screen === "xp" && <ClientXP {...data} />}
        {screen === "profile" && <ClientProfile {...data} />}
        {screen === "notifications" && <ClientNotifications {...data} />}
      </div>
      {showLogin && (
        <AuthModal user={user} closeModal={() => setShowLogin(false)} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const usersRef = query(
      collection(firestore, "users"),
      where("slug", "==", id)
    );
    const querySnapshot = await getDocs(usersRef);
    const userDoc = querySnapshot.docs[0];
    if (userDoc) {
      const userData = { id: userDoc.id, ...userDoc.data() };
      const tournamentsRef = query(
        collection(firestore, "tournaments"),
        where("ownerId", "==", userDoc.id)
      );
      const tournamentsSnapshot = await getDocs(tournamentsRef);
      const tournamentsData = tournamentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const tournamentsByPlayCount = tournamentsData
        ? [...tournamentsData]
            .sort((a, b) => {
              const playCountA = a.freemiumPlayCount || 0;
              const playCountB = b.freemiumPlayCount || 0;
              return playCountB - playCountA;
            })
            .slice(0, 5)
        : [];

      const tournamentsByDate = tournamentsData
        ? [...tournamentsData]
            .sort((a, b) => {
              const dateB = a.timestamp || 0;
              const dateA = b.timestamp || 0;
              return dateB - dateA;
            })
            .slice(0, 5)
        : [];

      const leaderboardRef = query(
        collection(firestore, "users"),
        where("memberOf", "==", userDoc.id),
        orderBy("totalScore", "desc"),
        limit(10)
      );
      const leaderboardSnapshot = await getDocs(leaderboardRef);
      const leaderboard = leaderboardSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      return {
        props: {
          user: userData,
          tournaments: tournamentsData,
          tournamentsByPlayCount: tournamentsByPlayCount,
          tournamentsByDate: tournamentsByDate,
          leaderboard: leaderboard,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return {
      props: {
        user: null,
      },
    };
  }
}
