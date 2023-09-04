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

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [profile, setProfile] = useState();

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
    if (loggedIn && !profile) {
      onSnapshot(doc(firestore, "users", loggedIn.uid), (doc) => {
        const data = doc.data();
        setProfile(doc.data() || {});
      });
    }
  }, [loggedIn]);

  const sharedState = {
    isAuthed,
    loggedIn,
    profile,
  };
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
