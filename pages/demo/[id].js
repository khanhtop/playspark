import Advert from "@/components/ad";
import { getAd, getDemo } from "@/helpers/api";
import { useEffect } from "react";

export default function Demo({ ad, id }) {
  useEffect(() => {
    console.log("DEMO Loaded");
  }, []);
  return (
    <div className="text-white font-bold ">
      {ad ? <Advert data={ad} /> : <p>{id} - AD NOT FOUND</p>}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const ad = await getDemo(context.query?.id);
  return {
    props: {
      id: context.query?.id,
      ad: ad,
    },
  };
}
