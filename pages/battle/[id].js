import Challenge from "@/components/challenge";
import { getAd, getChallenge } from "@/helpers/api";
import { useAppContext } from "@/helpers/store";
import Head from "next/head";

export default function ChallengeHome({ ad, id }) {
  const getImageURL = (url) => {
    if (url.startsWith("http")) return url;
    return "https://playspark.co" + url;
  };

  return (
    <>
      <Head>
        <title>{`Play ${ad.game.name} at PlaySpark`}</title>
        <meta
          name="description"
          content={`Play ${ad.game.name} and many other awesome games at PlaySpark.co`}
        />
        <meta
          property="og:url"
          content={`https://playspark.co/challenge/${id.toString()}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`Play ${ad.game.name} at PlaySpark`}
        />
        <meta
          property="og:description"
          content={`Play ${ad.game.name} and many other awesome games at PlaySpark.co`}
        />
        <meta
          property="og:image"
          content={getImageURL(ad.game.backgroundImage)}
        />
        <meta
          name="twitter:card"
          content={getImageURL(ad.game.backgroundImage)}
        />
        <meta property="twitter:domain" content="playspark.co" />
        <meta
          property="twitter:url"
          content="https://playspark.co/ad/1696389045606"
        />
        <meta
          name="twitter:title"
          content={`Play ${ad.game.name} at PlaySpark`}
        />
        <meta
          name="twitter:description"
          content={`Play ${ad?.game.name} and many other awesome games at PlaySpark.co`}
        />
        <meta
          name="twitter:image"
          content={getImageURL(ad.game.backgroundImage)}
        />
      </Head>
      <div
        className={`text-white font-bold w-[calc(100dvw)] h-[calc(100dvh)] flex items-center bg-black justify-center`}
      >
        {ad ? <Challenge data={ad} /> : <p>{id} - AD NOT FOUND</p>}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const ad = await getChallenge(context.query?.id);

  return {
    props: {
      id: context.query?.id,
      ad: ad,
    },
  };
}
