import { useState, cloneElement } from "react";
import Intro from "./intro";
import { getGame } from "@/helpers/api";
import Head from "next/head";

export default function Advert({ data }) {
  const [stage, setStage] = useState(0);

  return (
    <>
      <Head></Head>
      <div className="h-full w-full">
        {stage === 0 && <Intro data={data} setStage={setStage} />}
        {stage === 1 && cloneElement(getGame(0), { data: data })}
      </div>
    </>
  );
}
