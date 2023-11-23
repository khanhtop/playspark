import { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { isIOS, isAndroid, isSafari } from "react-device-detect";
import { getSubscriptionType } from "./tiers";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [profile, setProfile] = useState();
  const [myGames, setMyGames] = useState();
  const [device, setDevice] = useState("desktop");
  const [modal, setModal] = useState(false);

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

  useEffect(() => {
    // Listen To Profile
    let _profileUnsub = () => null;
    let _myGamesUnsub = () => null;
    if (loggedIn && !profile) {
      _profileUnsub = onSnapshot(
        doc(firestore, "users", loggedIn.uid),
        (doc) => {
          const data = doc.data();
          setProfile(
            { ...data, subscription: getSubscriptionType(data?.tier ?? 0) } || {
              subscription: getSubscriptionType(data?.tier ?? 0),
            }
          );
        }
      );
    }
    if (loggedIn && !myGames) {
      const q = query(
        collection(firestore, "tournaments"),
        where("ownerId", "==", loggedIn.uid)
      );
      const _myGamesUnsub = onSnapshot(q, (querySnapshot) => {
        const _myGames = [];
        querySnapshot.forEach((doc) => {
          _myGames.push(doc.data());
        });
        setMyGames(_myGames);
      });
    }
    return () => {
      _profileUnsub();
      _myGamesUnsub();
      setProfile();
      setMyGames();
    };
  }, [loggedIn]);

  // Track content that has been seen
  const [hasSeenSurvey, setHasSeenSurvey] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [hasSubscribedToList, setHasSubscribedToList] = useState(false);

  const sharedState = {
    isAuthed,
    loggedIn,
    profile,
    myGames,
    device,
    hasSeenSurvey,
    setHasSeenSurvey,
    hasSeenVideo,
    setHasSeenVideo,
    hasSubscribedToList,
    setHasSubscribedToList,
    modal,
    setModal,
  };
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
