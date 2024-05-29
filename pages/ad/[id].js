import Advert from "@/components/ad";
import { getAd, getClient } from "@/helpers/api";
import { decryptEmail, refactorEmail } from "@/helpers/crypto";
import { auth, logoutWithoutReroute } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { determineStreak } from "@/helpers/streaks";
import { signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import { useEffect, useState, useMemo } from "react";

export default function Ad({ ad, id, config, userId, email, externalId }) {
  const context = useAppContext();
  const [signingIn, setSigingIn] = useState(0);
  const [waitOnAuth, setWaitOnAuth] = useState(false);

  const getImageURL = (url) => {
    if (url.startsWith("http")) return url;
    return "https://playspark.co" + url;
  };

  useEffect(() => {
    if (externalId) {
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
    }
  }, [externalId]);

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
            waitOnAuth={waitOnAuth}
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
