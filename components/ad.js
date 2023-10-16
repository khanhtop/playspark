import { useEffect, useState } from "react";
import { getGame, incrementPlayCount } from "@/helpers/api";
import dynamic from "next/dynamic";
import Outro from "./outro";
import { useAppContext } from "@/helpers/store";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import VideoAd from "./videoAd";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Advert({ data, theme }) {
  const context = useAppContext();
  const [stage, setStage] = useState(0);
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(
    data.leaderboard?.sort((a, b) => b.score > a.score) ?? []
  );

  const callback = (score) => {
    setScore(score);
    if (!data.demo) {
      console.log("Incrementing Plays");
      incrementPlayCount(data.tournamentId.toString(), "freemium");
    }
    setStage(2);
  };

  useEffect(() => {
    const _leaderboard = [...leaderboard];
    if (score > 0 && context?.loggedIn?.uid && context?.profile?.companyName) {
      const position = _leaderboard.findIndex(
        (a) => a.uid === context?.loggedIn?.uid
      );
      if (position === -1) {
        _leaderboard.push({
          email: context?.loggedIn?.email,
          score: score,
          uid: context?.loggedIn?.uid,
          name: context?.profile?.companyName,
        });
        const sorted = _leaderboard.sort((a, b) => b.score > a.score);
        setLeaderboard(sorted);
      } else {
        if (_leaderboard[position].score < score) {
          _leaderboard[position] = {
            ..._leaderboard[position],
            score: score,
          };
        }
      }
      if (!data.demo) {
        console.log(_leaderboard);
        setDoc(
          doc(firestore, "tournaments", data.tournamentId.toString()),
          {
            ...data,
            leaderboard: _leaderboard,
          },
          { merge: true }
        );
      }
      const sorted = _leaderboard.sort((a, b) => b.score > a.score);
      setLeaderboard(sorted);
    } else {
      console.log("Score zero or not logged in");
    }
  }, [score, context.loggedIn, context.profile]);

  useEffect(() => {
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
      {stage === 2 && <Intro data={data} setStage={setStage} />}
      {stage === 1 && getGame(data.id, data, callback)}
      {stage === 0 && (
        <Outro
          data={data}
          setStage={setStage}
          score={score}
          leaderboard={leaderboard}
        />
      )}
      {stage === 3 && <VideoAd onSkip={() => setStage(0)} />}
    </div>
  );
}
