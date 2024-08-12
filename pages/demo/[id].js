import Advert from "@/components/ad";
import PremiumAdvert from "@/components/premiumAd";
import Modal from "@/components/ui/modal";
import { getDemo } from "@/helpers/api";
import { useAppContext } from "@/helpers/store";

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
        ad.isPremium ? (
          <PremiumAdvert data={ad} />
        ) : (
          <Advert
            hasInitialisedAudio={hasInitialisedAudio}
            setHasInitialisedAudio={setHasInitialisedAudio}
            data={ad}
            clientCredits={999}
          />
        )
      ) : (
        <p>{id} - AD NOT FOUND</p>
      )}
      {/* <Modal title="Leaderboard" /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const ad = await getDemo(context.query?.id);
  return {
    props: {
      id: context.query?.id,
      ad: { ...ad, theme: "default", demo: true, isActive: true },
    },
  };
}
