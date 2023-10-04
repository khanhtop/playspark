import Advert from "@/components/ad";
import { getAd } from "@/helpers/api";
import { useEffect } from "react";

export default function Ad({ ad, id }) {
  console.log(ad);
  useEffect(() => {
    console.log("AD Loaded");
  }, []);
  return (
    <div className="text-white font-bold ">
      {ad ? <Advert data={ad} /> : <p>{id} - AD NOT FOUND</p>}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const ad = await getAd(context.query?.id);
  console.log(ad);
  return {
    props: {
      id: context.query?.id,
      ad: ad,
    },
  };
}
