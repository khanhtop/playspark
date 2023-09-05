import Advert from "@/components/ad";
import { getAd } from "@/helpers/api";

export default function Ad({ ad, id }) {
  return (
    <div className="text-white font-bold h-screen w-screen flex justify-center items-center">
      {ad ? <Advert data={ad} /> : <p>{id} - AD NOT FOUND</p>}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const ad = getAd(context.query?.id);
  return {
    props: {
      id: context.query?.id,
      ad: ad,
    },
  };
}
