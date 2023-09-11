import Advert from "@/components/ad";
import { getAd } from "@/helpers/api";
import { useEffect } from "react";

export default function Ad({ ad, id }) {
    useEffect(() => {
        console.log("AD Loaded");
    }, []);
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
