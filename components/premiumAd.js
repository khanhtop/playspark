import { useCallback, useEffect, useRef, useState } from "react";
import {
  getGame,
  incrementImpressions,
  incrementPlayCount,
  incrementPlayCountWithImpressions,
} from "@/helpers/api";
import dynamic from "next/dynamic";
import Outro from "./outro";
import { useAppContext } from "@/helpers/store";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import VideoAd from "./videoAd";
import { mockVideos } from "@/helpers/mocks";
import { tryGetGame } from "@/helpers/premiumGames";
import { Unity, useUnityContext } from "react-unity-webgl";
import UnityGame from "./games/unityGame";
import Survey from "./survey";

// UNITY

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function PremiumAdvert({ data }) {
  const context = useAppContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [stage, setStage] = useState(0);
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(
    data.leaderboard?.sort((a, b) => b.score > a.score) ?? []
  );

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
    const width =
      window?.frameElement?.offsetWidth || window?.innerHeight * 0.58;
    const height = window?.frameElement?.offsetHeight || window?.innerHeight;
    setDimensions({ x: width, y: height });
  }, []);

  const [hasLoggedImpression, setHasLoggedImpression] = useState(false);

  useEffect(() => {
    if (data.tournamentId && !hasLoggedImpression) {
      setHasLoggedImpression(true);
      incrementImpressions(data.tournamentId.toString());
    }
  }, [data?.tournamentId]);

  return (
    <div
      style={{
        width: dimensions.x,
        height: dimensions.y,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {(stage === 0 || stage === 1) && (
        <UnityGame
          shouldPlay={stage === 1}
          data={data}
          onLoad={() => setIsLoaded(true)}
          onFinish={(score) => {
            setScore(score);
            setStage(2);
          }}
        />
      )}
      {stage === 0 && (
        <Intro
          data={data}
          setStage={(a) => {
            setStage(a);
            if (!data.demo) {
              incrementPlayCount(data.tournamentId.toString(), "premium");
            }
          }}
          premium
          ready={isLoaded}
        />
      )}
      {stage === 2 && (
        <Outro
          data={data}
          setStage={setStage}
          score={score}
          leaderboard={leaderboard}
        />
      )}
      {stage === 3 && (
        <VideoAd
          video={
            data?.sponsoredVideo ??
            mockVideos[Math.floor(Math.random() * mockVideos.length)]
          }
          data={data}
          onSkip={() => {
            updateDoc(
              doc(firestore, "tournaments", data.tournamentId.toString()),
              {
                videoViews: increment(1),
              }
            ).then(() => {
              if (!data.demo) {
                incrementPlayCountWithImpressions(
                  data.tournamentId.toString(),
                  "premium"
                );
              }
              setStage(1);
            });
          }}
        />
      )}
      {stage === 4 && (
        <Survey
          data={data}
          onComplete={(response) => {
            if (!data.demo) {
              incrementPlayCountWithImpressions(
                data.tournamentId.toString(),
                "premium"
              );
            }
            setStage(1);
          }}
        />
      )}
    </div>
  );
}
