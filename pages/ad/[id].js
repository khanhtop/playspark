import Advert from "@/components/ad";
import PremiumAdvert from "@/components/premiumAd";
import { getAd } from "@/helpers/api";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Ad({ ad, id }) {
  const getImageURL = (url) => {
    if (url.startsWith("http")) return url;
    return "https://playspark.co" + url;
  };
  return (
    <>
      <Head>
        <title>Play {ad.name} at PlaySpark</title>
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
      <div className="text-white font-bold w-screen h-screen flex items-center bg-black justify-center">
        {ad ? (
          ad.isPremium ? (
            <PremiumAdvert data={ad} />
          ) : (
            <Advert data={ad} />
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
  const ad = await getAd(context.query?.id);
  return {
    props: {
      id: context.query?.id,
      ad: ad,
      isPremium: true,
    },
  };
}
