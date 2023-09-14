import { useEffect, useState } from "react";
import { getGame } from "@/helpers/api";
import dynamic from "next/dynamic";

const Intro = dynamic(() => import('./intro'), { ssr: false });

export default function Advert({ data }) {
    const [stage, setStage] = useState(0); // TODO: reset stage to 0
    useEffect(() => {
        console.log("Advert Loaded");
    }, []);
    return (
        <div className="h-full w-full">
            {stage === 0 && <Intro data={data} setStage={setStage} />}
            {stage === 1 && getGame(0, data)}
        </div>
    );
}
