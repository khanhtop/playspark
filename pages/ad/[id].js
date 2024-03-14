import Advert from "@/components/ad";
import PremiumAdvert from "@/components/premiumAd";
import Modal from "@/components/ui/modal";
import { getAd, getClient } from "@/helpers/api";
import { useAppContext } from "@/helpers/store";
import Head from "next/head";
import { useEffect, useState } from "react";
import { isIOS, isAndroid, isSafari } from "react-device-detect";

export default function Ad({ ad, id, coins, xp, userId, email }) {
  const context = useAppContext();

  const getImageURL = (url) => {
    if (url.startsWith("http")) return url;
    return "https://playspark.co" + url;
  };
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
          !ad.isActive ? (
            <p>This tournament is not currently running.</p>
          ) : ad.isPremium ? (
            <PremiumAdvert data={ad} />
          ) : (
            <Advert
              data={ad}
              coins={coins}
              userId={userId}
              xp={xp}
              email={email}
            />
          )
        ) : (
          <p>{id} - AD NOT FOUND</p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const { id, email, xp, coins, userId } = context?.query;
  const ad = await getAd(id);
  const client = await getClient(ad.ownerId);
  return {
    props: {
      id: id,
      ad: {
        ...ad,
        xpWebhook: client.xpWebhook,
      },
      email: email || null,
      xp: xp || null,
      coins: coins || null,
      userId: userId || null,
      xpWebhook: client.xpWebhook,
    },
  };
}
