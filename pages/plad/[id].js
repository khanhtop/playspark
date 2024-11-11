import PlayableAd from "@/components/playable_ad";
import { getPlayableAd } from "@/helpers/firebaseServerSide";
import { useAppContext } from "@/helpers/store";
import { useState } from "react";

export default function PlayableAdWrapper({ ad, id, client }) {
  console.log(ad);
  const context = useAppContext();
  const [hasInitialisedAudio, setHasInitialisedAudio] = useState(false);
  return (
    <div
      className={`text-white font-bold w-screen ${
        context.device === "ios" ? "h-[calc(100vh-80px)]" : "h-screen"
      } flex items-center bg-black justify-center`}
    >
      {ad ? (
        <PlayableAd
          hasInitialisedAudio={hasInitialisedAudio}
          setHasInitialisedAudio={setHasInitialisedAudio}
          data={ad}
        />
      ) : (
        <p>{id} - AD NOT FOUND</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:'
  const ad = await getPlayableAd(context.query.id);

  return {
    props: {
      id: context.query?.id,
      ad: {
        ...ad,
        theme: "default",
        isActive: true,
        winProbability:
          typeof ad.winProbability === "string"
            ? parseFloat(ad.winProbability)
            : ad.winProbability,
      },
    },
  };
}
