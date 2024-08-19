import Advert from "@/components/ad";
import { getAd, getClient } from "@/helpers/api";
import { deductCredits, getGameCreditConsumption } from "@/helpers/credits";
import { decryptEmail, refactorEmail } from "@/helpers/crypto";
import { auth, firestore, logoutWithoutReroute } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { determineStreak } from "@/helpers/streaks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState, useMemo, useRef } from "react";

export default function Ad({
  ad,
  client,
  id,
  config,
  userId,
  email,
  externalId,
}) {
  const context = useAppContext();
  const [hasInitialisedAudio, setHasInitialisedAudio] = useState(false);
  const [signingIn, setSigingIn] = useState(0);
  const [waitOnAuth, setWaitOnAuth] = useState(false);
  const [clientCredits, setClientCredits] = useState();
  const subscriptionRef = useRef(null);
  const [deviceId, setDeviceId] = useState(null);

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

  // LISTEN TO CLIENT CREDITS

  useEffect(() => {
    if (ad.ownerId && !clientCredits && !subscriptionRef?.current) {
      subscriptionRef.current = onSnapshot(
        doc(firestore, "users", ad.ownerId),
        (doc) => {
          if (doc.exists()) {
            setClientCredits(() => {
              const newCreditBalance = doc.data().creditBalance;
              return newCreditBalance;
            });
          }
        },
        (error) => {
          console.log("Error getting document:", error);
        }
      );
    }
  }, [ad.ownerId, clientCredits]);

  useEffect(() => {
    if (subscriptionRef.current) {
      return () => subscriptionRef?.current();
    }
  }, []);

  // END LISTEN

  const getImageURL = (url) => {
    if (url.startsWith("http")) return url;
    return "https://playspark.co" + url;
  };

  // AUTO-SIGN IN WITH PROVIDED EMAIL

  useEffect(() => {
    if (externalId && externalId !== "override") {
      setWaitOnAuth(true);
      logoutWithoutReroute();
      fetch("https://playspark.co/api/auth/externalUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: externalId, name: config.name }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (json.email && json.password) {
            signInWithEmailAndPassword(auth, json.email, json.password);
          }
        });
    } else if (
      (externalId && externalId === "override") ||
      (ad.ownerId === "xwMcL84YdoRXAV52oNjmhVhCHD63" &&
        // context.loggedIn?.uid &&
        !context?.profile?.isAdmin)
    ) {
      const uuid = getDeviceID();
      console.log(uuid);

      if (uuid !== null) {
        const emailStructure = uuid + "@playspark.co";
        setWaitOnAuth(true);
        logoutWithoutReroute();
        fetch("/api/auth/externalUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailStructure, name: config.name }),
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            console.log(json);
            if (json.email && json.password) {
              signInWithEmailAndPassword(auth, json.email, json.password);
            }
          });
      }
    }
  }, [externalId, ad]);

  useEffect(() => {
    if (waitOnAuth && context?.profile) setWaitOnAuth(false);
  }, [waitOnAuth, context.profile]);

  const [hasLoggedStreak, setHasLoggedStreak] = useState(false);

  useMemo(() => {
    if (context.profile && !hasLoggedStreak) {
      setHasLoggedStreak(true);
      const streak = determineStreak(
        context.profile,
        context?.loggedIn?.uid,
        ad
      ).then((result) => {
        if (result.trigger && result.value > 1) {
          context.setEvent({
            title: `${result.value * 10} XP`,
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
            client={client}
            hasInitialisedAudio={hasInitialisedAudio}
            setHasInitialisedAudio={setHasInitialisedAudio}
            waitOnAuth={waitOnAuth}
            signingIn={signingIn}
            data={ad}
            userId={userId}
            email={email}
            clientCredits={clientCredits}
            uuid={deviceId}
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

  const { deviceIdSignIn } = context?.query;

  let externalId = null;

  if (user && platform) {
    const emailAddress = decryptEmail(user, platform);
    externalId = refactorEmail(emailAddress, platform);
  }

  if (deviceIdSignIn) externalId = "override";

  const ad = await getAd(id);
  const client = await getClient(ad.ownerId);

  return {
    props: {
      id: id,
      client: client,
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

      externalId: externalId || null,
      name: name || null,
      // externalPass: externalPass,
      config: {
        name: name || null,
        hideBackButton: ad.hideBack ? true : false,
        hideRevive: ad.disableRevive ? true : false,
        forceLogout: forcelogout === "true" ? true : false,
      },
    },
  };
}
