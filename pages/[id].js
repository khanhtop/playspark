import AuthModal from "@/components/auth/authModal";
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
import { auth, firestore, logoutWithoutReroute } from "@/helpers/firebase";
import { setDocument } from "@/helpers/firebaseApi";
import {
  getLeaderboardForUser,
  getTournamentsByOwnerId,
  getUserBySlug,
  sortTournamentsByDate,
  sortTournamentsByPlayCount,
} from "@/helpers/firebaseServerSide";
import { useAppContext } from "@/helpers/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

export default function PageHandler({
  user,
  tournaments,
  tournamentsByPlayCount,
  tournamentsByDate,
  leaderboard,
  shouldAuthWithDeviceId,
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

  // Device ID Auth Code

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Function to create a fingerprint from browser details
  function createFingerprint() {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    const fingerprint = [
      navigatorInfo.userAgent,
      navigatorInfo.language,
      screenInfo.colorDepth,
      new Date().getTimezoneOffset(),
      navigatorInfo.platform,
      navigatorInfo.doNotTrack,
      screenInfo.height,
      screenInfo.width,
    ].join("");
    return fingerprint;
  }

  // Simple hash function to create a 16-bit hash
  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return (hash & 0xffff).toString(16).padStart(4, "0"); // Return 16-bit hash
  }

  // Function to get or generate a device ID
  function getDeviceID() {
    // Check if a device ID is already stored
    let deviceID = localStorage.getItem("psUUID");
    if (!deviceID) {
      // Create a fingerprint and generate a UUID
      const fingerprint = createFingerprint();
      const uuid = generateUUID();
      // Hash the fingerprint with a simple hash function
      const hashedFingerprint = simpleHash(fingerprint);
      // Combine the hashed fingerprint with the UUID to create the device ID
      deviceID = `${hashedFingerprint}-${uuid}`;
      // Store the device ID in localStorage
      localStorage.setItem("psUUID", deviceID);
    }
    return deviceID;
  }

  useEffect(() => {
    if (shouldAuthWithDeviceId && context && !context?.loggedIn?.uid) {
      const uuid = getDeviceID();
      if (uuid !== null) {
        const emailStructure = uuid + "@playspark.co";
        logoutWithoutReroute();
        fetch("/api/auth/externalUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailStructure, name: null }),
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            if (json.email && json.password) {
              signInWithEmailAndPassword(auth, json.email, json.password);
            }
          });
      }
    }
  }, [shouldAuthWithDeviceId, context]);

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
      setDocument("users", context?.loggedIn?.uid, {
        profilePhoto:
          context?.avatars[Math.floor(Math.random() * context?.avatars.length)],
      });
      // setDoc(
      //   doc(firestore, "users", context?.loggedIn?.uid),
      //   {
      //     profilePhoto:
      //       context?.avatars[
      //         Math.floor(Math.random() * context?.avatars.length)
      //       ],
      //   },
      //   { merge: true }
      // );
    }
  }, [context?.avatars, context.profile]);

  const data = {
    user: {
      ...user,
      primaryColor: user?.primaryColor ?? "#222",
      accentColor: user?.accentColor ?? "#00DDFF",
      textColor: user?.textColor ?? "#FFF",
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
  const { id, deviceIdSignIn } = context.query;

  try {
    // Fetch user data by slug
    const userData = await getUserBySlug(id);
    console.log(userData);

    if (!userData) {
      return { notFound: true };
    }

    // Fetch tournaments by user ID
    const tournamentsData = await getTournamentsByOwnerId(userData.id);

    // Sort tournaments by play count and date
    const tournamentsByPlayCount = sortTournamentsByPlayCount(tournamentsData);
    const tournamentsByDate = sortTournamentsByDate(tournamentsData);

    // Fetch leaderboard for the user
    const leaderboard = await getLeaderboardForUser(userData.id);

    return {
      props: {
        user: userData,
        tournaments: tournamentsData,
        tournamentsByPlayCount,
        tournamentsByDate,
        leaderboard,
        shouldAuthWithDeviceId:
          deviceIdSignIn || userData?.id === "xwMcL84YdoRXAV52oNjmhVhCHD63",
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return {
      props: {
        user: null,
      },
    };
  }
}
