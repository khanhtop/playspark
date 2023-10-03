import { useEffect, useState } from "react";
import { getGame } from "@/helpers/api";
import dynamic from "next/dynamic";
import Outro from "./outro";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Advert({ data }) {
  const [stage, setStage] = useState(0);
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);

  const callback = (score) => {
    setScore(score);
    setStage(2);
  };

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
      {stage === 1 && getGame(data.id, data, callback)}
      {stage === 2 && <Outro data={data} setStage={setStage} score={score} />}
    </div>
  );
}
