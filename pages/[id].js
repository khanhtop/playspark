import AuthModal from "@/components/auth/authModal";
import Areas from "@/components/clientPages/areas";
import Hero from "@/components/clientPages/hero";
import HorizontalGamesScroll from "@/components/clientPages/horizontalGamesScroll";
import ProfileWrapper from "@/components/clientPages/profileWrapper";
import ClientAchievements from "@/components/clientPages/subpages/clientAchievements";
import ClientChat from "@/components/clientPages/subpages/clientChat";
import ClientCoins from "@/components/clientPages/subpages/clientCoins";
import ClientEmbeddedGame from "@/components/clientPages/subpages/clientEmbeddedGame";
import ClientHome from "@/components/clientPages/subpages/clientHome";
import ClientNotifications from "@/components/clientPages/subpages/clientNotifications";
import ClientPrizes from "@/components/clientPages/subpages/clientPrizes";
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
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

export default function PageHandler({
  user,
  tournaments,
  tournamentsByPlayCount,
  tournamentsByDate,
  leaderboard,
}) {
  const context = useAppContext();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [screen, setScreen] = useState("home");
  const [activeGame, setActiveGame] = useState();

  // REWARDS
  const _rewardsUnsub = useRef(null);
  const [rewards, setRewards] = useState([]);

  // PRIZES
  const _prizesUnsub = useRef(null);
  const [prizes, setPrizes] = useState([]);

  // Create Rewards Listener
  const getRewards = () => {
    const q = query(
      collection(firestore, "rewards"),
      where("ownerId", "==", user.id)
    );
    _rewardsUnsub.current = onSnapshot(q, (querySnapshot) => {
      const _rewards = [];
      querySnapshot.forEach((doc) => {
        _rewards.push({ ...doc.data(), id: doc.id });
      });
      setRewards(_rewards);
    });
  };

  // Create Rewards Listener
  const getPrizes = () => {
    const q = query(
      collection(firestore, "prizes"),
      where("ownerId", "==", user.id)
    );
    _prizesUnsub.current = onSnapshot(q, (querySnapshot) => {
      const _prizes = [];
      querySnapshot.forEach((doc) => {
        _prizes.push({ ...doc.data(), id: doc.id });
      });
      setPrizes(_prizes);
    });
  };

  useEffect(() => {
    if (_rewardsUnsub.current === null) {
      getRewards();
    }
    if (_prizesUnsub.current === null) {
      getPrizes();
    }
    return () => {
      _rewardsUnsub?.current();
      _prizesUnsub?.current();
    };
  }, []);

  useEffect(() => {
    context.fetchAvatars();
  }, []);

  useEffect(() => {
    if (context?.avatars && context.profile && !context.profile.profilePhoto) {
      setDoc(
        doc(firestore, "users", context?.loggedIn?.uid),
        {
          profilePhoto:
            context?.avatars[
              Math.floor(Math.random() * context?.avatars.length)
            ],
        },
        { merge: true }
      );
    }
  }, [context?.avatars, context.profile]);

  const data = {
    user: {
      ...user,
      primaryColor: user.primaryColor ?? "#222",
      accentColor: user.accentColor ?? "#00DDFF",
      textColor: user.textColor ?? "#FFF",
    },
    rewards,
    prizes,
    tournaments,
    tournamentsByPlayCount,
    tournamentsByDate,
    leaderboard,
    context,
    setScreen: (s) => {
      if (screen === "game") {
        router.replace(router.asPath);
      }
      setScreen(s);
    },
    screen,
    setActiveGame,
    activeGame,
  };

  return (
    <>
      <ProfileWrapper>
        {screen !== "game" && (
          <TopNav
            data={data.user}
            prizes={data.prizes}
            context={context}
            totalScore={
              context?.profile?.dataByClient?.[data.user.id]?.coins || 0
            }
            totalXp={context?.profile?.dataByClient?.[data.user.id]?.xp || 0}
            showLogin={() => setShowLogin(true)}
            setScreen={setScreen}
          />
        )}
        {screen === "home" && <ClientHome {...data} />}
        {screen === "coins" && <ClientCoins {...data} />}
        {screen === "xp" && <ClientXP {...data} />}
        {screen === "profile" && <ClientProfile {...data} />}
        {screen === "notifications" && <ClientNotifications {...data} />}
        {screen === "game" && <ClientEmbeddedGame {...data} />}
        {screen === "achievements" && <ClientAchievements {...data} />}
        {screen === "prizes" && <ClientPrizes {...data} />}
        {screen === "chat" && <ClientChat {...data} />}
      </ProfileWrapper>
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
        where("isActive", "==", true),
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
        where("memberOf", "array-contains", userDoc.id)
      );
      const leaderboardSnapshot = await getDocs(leaderboardRef);
      const leaderboard = leaderboardSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        currentXp: doc.data()?.dataByClient?.[userDoc.id]?.xp || 0,
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
