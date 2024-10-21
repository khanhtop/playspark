import Advert from "@/components/ad";
import { getAd, getClient } from "@/helpers/api";
import { useAppContext } from "@/helpers/store";
import { determineStreak } from "@/helpers/streaks";
import Head from "next/head";
import { useEffect, useState, useMemo, useRef } from "react";

export default function Ad({ ad, client, id }) {
  const context = useAppContext();
  const [hasInitialisedAudio, setHasInitialisedAudio] = useState(false);
  const [signingIn, setSigingIn] = useState(0);
  const [waitOnAuth, setWaitOnAuth] = useState(false);
  const [clientCredits, setClientCredits] = useState();
  const [deviceId, setDeviceId] = useState(null);

  const getImageURL = (url) => {
    if (url.startsWith("http")) return url;
    return "https://playspark.co" + url;
  };

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
          />
        ) : (
          <p>{id} - AD NOT FOUND</p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context?.query;
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
    },
  };
}
