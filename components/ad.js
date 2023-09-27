import { useEffect, useState } from "react";
import { getGame } from "@/helpers/api";
import dynamic from "next/dynamic";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Advert({ data }) {
  const [stage, setStage] = useState(0);
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("Advert Loaded");
    const width = window?.frameElement?.offsetWidth || 500;
    const height = window?.frameElement?.offsetHeight || 900;
    setDimensions({ x: width, y: height });
  }, []);
  return (
    <div
      style={{
        width: dimensions.x,
        height: dimensions.y,
      }}
    >
      {stage === 0 && <Intro data={data} setStage={setStage} />}
      {stage === 1 && getGame(data.game, data)}
    </div>
  );
}
