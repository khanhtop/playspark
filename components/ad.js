import { useEffect, useState } from "react";
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
import Survey from "./survey";
import Pong from "./games/pong";
import { isIOS, isAndroid, isSafari } from "react-device-detect";
import { WinModal } from "./ui/modalTypes";
import { computeLeaderboard } from "@/helpers/leaderboard";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Advert({ data, theme }) {
  const context = useAppContext();
  const [stage, setStage] = useState(0);
  const [lockX, setLockX] = useState();
  const [lockY, setLockY] = useState();
  const [dimensions, setDimensions] = useState({ x: undefined, y: undefined });
  const [shouldRotate, setShouldRotate] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(
    data.leaderboard?.sort((a, b) => b.score > a.score) ?? []
  );
  const [prevBest, setPrevBest] = useState();

  // Lives & Restarts
  const MAX_REVIVES = 4;
  const [lives, setLives] = useState(data.id === 11 ? 10 : 3);
  const [reviveCount, setReviveCount] = useState(0);

  const callback = (score) => {
    if (reviveCount - MAX_REVIVES) {
      setLives(data.id === 11 ? 3 : 1);
      setScore(score);
      setStage(2);
      setReviveCount(reviveCount + 1);
    } else {
      setLives(data.id === 11 ? 10 : 3);
      setScore(0);
      setStage(2);
    }
  };

  const reset = () => {
    setReviveCount(0);
    setLives(data.id === 11 ? 10 : 3);
    setScore(0);
    setStage(1);
  };

  useEffect(() => {
    const _lb = computeLeaderboard(
      leaderboard,
      score,
      context?.loggedIn?.uid,
      context?.profile,
      context?.loggedIn?.email,
      data?.demo,
      data?.tournamentId?.toString(),
      data
    );
    if (_lb?.leaderboard) {
      setLeaderboard(_lb?.leaderboard);
      console.log(_lb?.prevBest);
      setPrevBest(_lb?.prevBest);
    }
  }, [score, context.loggedIn, context.profile]);

  useEffect(() => {
    if (leaderboard.find((a) => a.uid === context?.loggedIn?.uid)?.score) {
      setPrevBest(
        leaderboard.find((a) => a.uid === context?.loggedIn?.uid)?.score
      );
    }
  }, [leaderboard]);

  const determineConstraints = () => {
    if (isIOS || isAndroid) {
      setLockX(undefined);
      setLockY(undefined);
      return;
    }
    if (window?.frameElement?.offsetHeight) {
      console.log("IN FRAME");
      setLockX(window.frameElement?.offsetWidth);
      setLockY(window.frameElement?.offsetHeight);
      return;
    }
    if (data.landscape) {
      console.log("NOT IN FRAME");
      setLockY(window.innerWidth * 0.58);
      return;
    }
    setLockX(window.innerHeight * 0.58);
    setLockY(undefined);
  };

  const constrainToFrame = () => {
    if (window?.frameElement) {
      setDimensions({
        x: window.frameElement?.offsetWidth,
        y: window.frameElement?.offsetHeight,
      });
    }
  };

  const getFrameDimensions = () => {
    if (!isIOS && !isAndroid) {
      return {
        width: window?.frameElement?.offsetWidth || window?.innerHeight * 0.58,
        height: window?.frameElement?.offsetHeight || window?.innerHeight,
      };
    } else {
      return {
        width: window?.frameElement?.offsetWidth || window?.innerWidth,
        height: window?.frameElement?.offsetHeight || window?.innerHeight,
      };
    }
  };

  const handleOrientationChange = (event) => {
    if (window?.frameElement?.offsetWidth) return;
    setTimeout(() => {
      if (
        (data.landscape && window.innerHeight > window.innerWidth) ||
        (!data.landscape && window.innerWidth > window.innerHeight)
      ) {
        setShouldRotate(true);
      } else {
        setShouldRotate(false);
      }
    }, 500);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && (isIOS || isAndroid)) {
      window.addEventListener("orientationchange", handleOrientationChange);
      return () => {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    }
  }, [data]);

  useEffect(() => {
    if (
      (isIOS || isAndroid) &&
      ((data.landscape && window.innerHeight > window.innerWidth) ||
        (!data.landscape && window.innerWidth > window.innerHeight))
    ) {
      setShouldRotate(true);
    } else {
      setShouldRotate(false);
    }
    determineConstraints();
  }, []);

  const [hasLoggedImpression, setHasLoggedImpression] = useState(false);

  useEffect(() => {
    if (data?.tournamentId && !hasLoggedImpression) {
      setHasLoggedImpression(true);
      incrementImpressions(data?.tournamentId?.toString());
    }
  }, [data?.tournamentId]);

  console.log(data?.tournamentId);

  return (
    <div
      style={{
        width: lockX ?? "100%",
        height: lockY ?? "100%",
        overflow: "hidden",
      }}
    >
      {shouldRotate && (
        <div className="absolute h-screen w-screen top-0 left-0 bg-black/90 z-30 flex items-center justify-center text-white font-octo text-2xl">
          <img src="/branding/rotate.png" className="h-[80%]" />
        </div>
      )}
      {stage === 0 && (
        <Intro
          data={data}
          setStage={(a) => {
            setStage(a);
            if (!data.demo) {
              incrementPlayCount(data?.tournamentId?.toString(), "freemium");
            }
          }}
        />
      )}

      {stage === 1 &&
        getGame(data.id, data, callback, {
          lives: lives,
          score: score,
          brandLogo: data?.brandLogo,
          sponsorLogo: data?.sponsorLogo,
          maxscore: prevBest ?? 0,
        })}
      {stage === 2 && (
        <Outro
          data={data}
          setStage={setStage}
          score={score}
          leaderboard={leaderboard}
          prevBest={prevBest}
          onReset={() => reset()}
          reviveCount={MAX_REVIVES - reviveCount}
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
              doc(firestore, "tournaments", data?.tournamentId?.toString()),
              {
                videoViews: increment(1),
              }
            ).then(() => {
              if (!data.demo) {
                incrementPlayCountWithImpressions(
                  data?.tournamentId?.toString(),
                  "freemium"
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
                data?.tournamentId?.toString(),
                "freemium"
              );
            }
            setStage(1);
          }}
        />
      )}
      {stage === 5 && (
        <Pong
          gameType="wheelspin"
          callback={() => {
            context.setModal({
              title: "You Win",
              contents: (
                <WinModal
                  onClaim={() => {
                    context.setModal();
                    setStage(1);
                  }}
                />
              ),
            });
          }}
          params={{
            logo: "/branding/logo.png",
            winProbability: data?.playableAd?.winProbability ?? 0.5,
          }}
        />
      )}
    </div>
  );
}
