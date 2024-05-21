import Advert from "@/components/ad";
import PremiumAdvert from "@/components/premiumAd";
import Modal from "@/components/ui/modal";
import { getAd, getClient } from "@/helpers/api";
import { decryptEmail, refactorEmail } from "@/helpers/crypto";
import {
  auth,
  firestore,
  logout,
  logoutWithoutReroute,
} from "@/helpers/firebase";
import { generateProfile } from "@/helpers/profileGen";
import { useAppContext } from "@/helpers/store";
import { determineStreak } from "@/helpers/streaks";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { setConfig } from "next/config";
import Head from "next/head";
import { useEffect, useState, useMemo } from "react";
import { isIOS, isAndroid, isSafari } from "react-device-detect";

export default function Ad({
  ad,
  id,
  config,
  userId,
  email,
  externalId,
  externalPass,
}) {
  const context = useAppContext();
  const [signingIn, setSigingIn] = useState(0);

  const getImageURL = (url) => {
    if (url.startsWith("http")) return url;
    return "https://playspark.co" + url;
  };

  useEffect(() => {
    if (context.isAuthed && !context?.loggedIn?.uid && signingIn === 0) {
      setSigingIn(1);
      if (externalId && externalPass) {
        handleAutomatedSignin();
      } else {
        setSigingIn(2);
      }
    }
  }, [context.isAuthed, externalId, externalPass]);

  // Force Logout
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  useEffect(() => {
    if (config.forceLogout && !hasLoggedOut) {
      setHasLoggedOut(true);
      logoutWithoutReroute();
    }
  }, [config.forceLogout]);

  const handleAutomatedSignin = async () => {
    if (!externalId || !externalPass || context?.loggedIn?.uid) return;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        externalId,
        externalPass
      );
      const user = userCredential.user;
      const uid = user.uid;
      if (uid) setSigingIn(2);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            externalId,
            externalPass
          );
          const username = generateProfile();
          const user = userCredential.user;
          const uid = user.uid;
          setDoc(
            doc(firestore, "users", uid),
            {
              companyName: username,
              pwd: externalPass,
            },
            { merge: true }
          );
          context.setEvent({
            title: `Signed In`,
            text: `${username}`,
          });
          setSigingIn(2);
        } catch (error) {
          console.log(error);
          setSigingIn(2);
        }
      }
    }
  };

  const [hasLoggedStreak, setHasLoggedStreak] = useState(false);

  useMemo(() => {
    if (context.profile && !hasLoggedStreak) {
      setHasLoggedStreak(true);
      const streak = determineStreak(
        context.profile,
        context?.loggedIn?.uid,
        ad
      ).then((result) => {
        console.log(result);
        if (result.trigger && result.value > 1) {
          context.setEvent({
            title: `+ ${result.value * 10}XP`,
            text: `Streak of ${result.value}`,
          });
        }
      });
    }
  }, [context]);

  useEffect(() => {
    context.setConfig(config);
  }, [config]);

  return (
    <>
      <Head>
        <title>{`Play ${ad.name} at PlaySpark`}</title>
        <meta
          name="description"
          content={`Play ${ad.name} and many other awesome games at PlaySpark.co`}
        />
        <meta
          property="og:url"
          content={`https://playspark.co/ad/${ad.tournamentId.toString()}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Play ${ad.name} at PlaySpark`} />
        <meta
          property="og:description"
          content={`Play ${ad.name} and many other awesome games at PlaySpark.co`}
        />
        <meta property="og:image" content={getImageURL(ad.backgroundImage)} />
        <meta name="twitter:card" content={getImageURL(ad.backgroundImage)} />
        <meta property="twitter:domain" content="playspark.co" />
        <meta
          property="twitter:url"
          content="https://playspark.co/ad/1696389045606"
        />
        <meta name="twitter:title" content={`Play ${ad.name} at PlaySpark`} />
        <meta
          name="twitter:description"
          content={`Play ${ad.name} and many other awesome games at PlaySpark.co`}
        />
        <meta name="twitter:image" content={getImageURL(ad.backgroundImage)} />
      </Head>
      <div
        className={`text-white font-bold w-[calc(100dvw)] h-[calc(100dvh)] flex items-center bg-black justify-center`}
      >
        {ad ? (
          <Advert
            signingIn={signingIn}
            data={ad}
            userId={userId}
            email={email}
          />
        ) : (
          <p>{id} - AD NOT FOUND</p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const { id, email, xp, coins, userId, user, platform } = context?.query;

  // Additional parameters
  const { name, hideback, hiderevive, forcelogout } = context?.query;

  let externalId = null;
  let externalPass = null;

  if (user && platform) {
    const emailAddress = decryptEmail(user, platform);
    externalId = refactorEmail(emailAddress, platform);
  }

  if (externalId) {
    const snapshot = await getDocs(
      query(collection(firestore, "users"), where("email", "==", externalId))
    );
    const pwd = snapshot.docs[0]?.data()?.pwd;
    if (pwd) {
      externalPass = pwd;
    } else {
      externalPass = Math.random().toString(36).substring(2, 14);
    }
  }

  const ad = await getAd(id);
  const client = await getClient(ad.ownerId);

  return {
    props: {
      id: id,
      ad: {
        ...ad,
        endDate: ad.endDate ? JSON.stringify(ad.endDate) : null,
        xpWebhook: client?.xpWebhook || null,
      },
      email: email || null,
      xp: xp || null,
      coins: coins || null,
      userId: userId || null,
      xpWebhook: client?.xpWebhook || null,

      externalId: externalId,
      externalPass: externalPass,
      config: {
        name: name || null,
        hideBackButton: hideback === "true" ? true : false,
        hideRevive: hiderevive === "true" ? true : false,
        forceLogout: forcelogout === "true" ? true : false,
      },
    },
  };
}
