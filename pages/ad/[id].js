import Advert from "@/components/ad";
import { getAd } from "@/helpers/api";
import { useEffect, useState } from "react";

export default function Ad({ ad, id }) {
  return (
    <div className="text-white font-bold ">
      {ad ? <Advert data={ad} /> : <p>{id} - AD NOT FOUND</p>}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the ad from the id here:
  const ad = await getAd(context.query?.id);
  return {
    props: {
      id: context.query?.id,
      ad: ad,
    },
  };
}
