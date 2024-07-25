import { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "./firebase";
import {
  FieldPath,
  collection,
  doc,
  documentId,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { isIOS, isAndroid, isSafari } from "react-device-detect";
import { getSubscriptionType } from "./tiers";
import { playNotificationSound } from "./audio";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [config, setConfig] = useState({
    name: null,
    hideBackButton: false,
    hideRevive: false,
    forceLogout: false,
  });
  const [isAuthed, setIsAuthed] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [profile, setProfile] = useState();
  const [myGames, setMyGames] = useState();
  const [rewards, setRewards] = useState();
  const [prizes, setPrizes] = useState();
  const [battles, setBattles] = useState();
  const [notifications, setNotifications] = useState();
  const [chats, setChats] = useState();
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [device, setDevice] = useState("desktop");
  const [modal, setModal] = useState(false);
  const [event, showEvent] = useState(false);
  const [eventQueue, setEventQueue] = useState([]);

  // Stripe
  const [showStripe, setShowStripe] = useState(false);

  // Is BG Audio Plating
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Settings
  const [settings, setSettings] = useState({
    bgm: true,
    soundFx: true,
    notifications: true,
  });
  const [latestChat, setLatestChat] = useState();

  // For Webhooks
  const [webhookBasePayload, setWebhookBasePayload] = useState({
    userId: null,
    email: null,
  });

  const setEvent = (ev) => {
    setEventQueue((prevQueue) => {
      return [ev, ...prevQueue];
    });
    // setEventQueue([ev, ...eventQueue]);
  };

  useEffect(() => {
    if (isIOS && isSafari) {
      setDevice("ios");
    }
  }, [isIOS, isAndroid]);

  // Auth State

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(user);
        setIsAuthed(true);
      } else {
        setLoggedIn(false);
        setIsAuthed(true);
      }
    });
    return () => setIsAuthed(false);
  }, []);

  // Profile

  const patchProfileWithEmail = async () => {
    if (loggedIn.uid) {
      setDoc(
        doc(firestore, "users", loggedIn.uid),
        {
          email: loggedIn.email,
        },
        { merge: true }
      );
    }
  };

  useEffect(() => {
    // Listen To Profile
    let _profileUnsub = () => null;
    let _myGamesUnsub = () => null;
    let _rewardsUnsub = () => null;
    let _prizesUnsub = () => null;
    let _notificationsUnsub = () => null;
    let _chatsUnsub = () => null;
    let _battleUnsub = () => null;
    if (loggedIn && !profile) {
      _profileUnsub = onSnapshot(
        doc(firestore, "users", loggedIn.uid),
        (doc) => {
          const data = doc.data();
          if (!data?.email) patchProfileWithEmail();
          setProfile(
            { ...data, subscription: getSubscriptionType(data?.tier ?? 0) } || {
              subscription: getSubscriptionType(data?.tier ?? 0),
            }
          );
          if (data?.gameConfig) {
            setSettings(data.gameConfig);
          }
        }
      );
    }
    if (loggedIn && !myGames) {
      const q = query(
        collection(firestore, "tournaments"),
        where("ownerId", "==", loggedIn.uid)
      );
      _myGamesUnsub = onSnapshot(q, (querySnapshot) => {
        const _myGames = [];
        querySnapshot.forEach((doc) => {
          _myGames.push(doc.data());
        });
        setMyGames(_myGames);
      });
    }

    if (loggedIn && !rewards) {
      const q = query(
        collection(firestore, "rewards"),
        where("ownerId", "==", loggedIn.uid)
      );
      _rewardsUnsub = onSnapshot(q, (querySnapshot) => {
        const _rewards = [];
        querySnapshot.forEach((doc) => {
          _rewards.push({ ...doc.data(), id: doc.id });
        });
        setRewards(_rewards);
      });
    }

    if (loggedIn && !prizes) {
      const q = query(
        collection(firestore, "prizes"),
        where("ownerId", "==", loggedIn.uid)
      );
      _prizesUnsub = onSnapshot(q, (querySnapshot) => {
        const _prizes = [];
        querySnapshot.forEach((doc) => {
          _prizes.push({ ...doc.data(), id: doc.id });
        });
        setPrizes(_prizes);
      });
    }

    if (loggedIn && !notifications) {
      const q = query(
        collection(firestore, "notifications"),
        where("uid", "==", loggedIn.uid),
        orderBy("timestamp", "desc"),
        limit(30)
      );
      _notificationsUnsub = onSnapshot(q, (querySnapshot) => {
        if (notifications) {
          playNotificationSound();
          setHasNewNotification(true);
        }
        const _notifications = [];
        querySnapshot.forEach((doc) => {
          _notifications.push({ ...doc.data(), id: doc.id });
        });
        setNotifications(_notifications);
      });
    }

    if (loggedIn && !chats) {
      const q = query(
        collection(firestore, "chats"),
        or(
          where("chatterA.id", "==", loggedIn.uid),
          where("chatterB.id", "==", loggedIn.uid)
        ),
        orderBy("updatedAt", "desc"),
        limit(30)
      );
      _chatsUnsub = onSnapshot(q, (querySnapshot) => {
        const _chats = [];
        querySnapshot.forEach((doc) => {
          _chats.push({ ...doc.data(), id: doc.id });
        });
        setChats(_chats);
      });
    }

    if (loggedIn && !battles) {
      const q = query(
        collection(firestore, "challenges"),
        or(
          where("challenger.id", "==", loggedIn.uid),
          where("challengee.id", "==", loggedIn.uid)
        ),
        limit(30)
      );
      _battleUnsub = onSnapshot(q, (querySnapshot) => {
        const _battles = [];
        querySnapshot.forEach((doc) => {
          _battles.push({ ...doc.data(), id: doc.id });
        });
        setBattles(
          _battles.sort((a, b) => {
            return b.id - a.id;
          })
        );
      });
    }

    return () => {
      _profileUnsub();
      _myGamesUnsub();
      _rewardsUnsub();
      _prizesUnsub();
      _battleUnsub();
      _notificationsUnsub();
      setProfile();
      setMyGames();
      setRewards();
      setPrizes();
      setNotifications();
    };
  }, [loggedIn]);

  // Track content that has been seen
  const [hasSeenSurvey, setHasSeenSurvey] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [hasSubscribedToList, setHasSubscribedToList] = useState(false);

  // Fetch Avatars
  const [avatars, setAvatars] = useState();

  const fetchAvatars = async () => {
    if (avatars) return;
    const res = await fetch("https://api.reimage.dev/get/tags?avatar", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REIMAGE_KEY}`,
      },
    });
    const json = await res.json();
    setAvatars(json.thumbnails);
    return avatars;
  };

  console.log(config);

  const sharedState = {
    config,
    setConfig,
    isAuthed,
    loggedIn,
    profile,
    myGames,
    rewards,
    prizes,
    notifications,
    device,
    hasSeenSurvey,
    setHasSeenSurvey,
    hasSeenVideo,
    setHasSeenVideo,
    hasSubscribedToList,
    setHasSubscribedToList,
    modal,
    setModal,
    event,
    showEvent,
    setEvent,
    eventQueue,
    setEventQueue,
    avatars,
    fetchAvatars,
    webhookBasePayload,
    setWebhookBasePayload,
    battles,
    hasNewNotification,
    setHasNewNotification,
    settings,
    setSettings,
    chats,
    latestChat,
    setLatestChat,
    showStripe,
    setShowStripe,
    isAudioPlaying,
    setIsAudioPlaying,
  };
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
