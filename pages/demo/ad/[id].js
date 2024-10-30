import PlayableAd from "@/components/playable_ad";
import { getPlayableAdDemo } from "@/helpers/api";
import { useAppContext } from "@/helpers/store";
import { useState } from "react";

export default function Demo({ ad, id }) {
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
        <p>{id} - AD NOT FAUND</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const ad = await getPlayableAdDemo(context.query?.id);
  return {
    props: {
      id: context.query?.id,
      ad: { ...ad, theme: "default", demo: true, isActive: true },
    },
  };
}
