import Advert from "@/components/ad";
import { getAd } from "@/helpers/firebaseServerSide";
import { useAppContext } from "@/helpers/store";
import { useState } from "react";

export default function PlayableAd({ ad, id, client }) {
  const context = useAppContext();
  const [hasInitialisedAudio, setHasInitialisedAudio] = useState(false);
  return (
    <div
      className={`text-white font-bold w-screen ${
        context.device === "ios" ? "h-[calc(100vh-80px)]" : "h-screen"
      } flex items-center bg-black justify-center`}
    >
      {ad ? (
        <Advert
          hasInitialisedAudio={hasInitialisedAudio}
          setHasInitialisedAudio={setHasInitialisedAudio}
          data={ad}
          client={client}
          clientCredits={999}
        />
      ) : (
        <p>{id} - AD NOT FOUND</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const ad = await getAd(context.query?.id);
  return {
    props: {
      id: context.query?.id,
      ad: { ...ad, theme: "default", isActive: true },
    },
  };
}
