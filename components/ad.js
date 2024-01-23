import { useEffect, useMemo, useState } from "react";
import {
  getGame,
  incrementImpressions,
  incrementOptInCount,
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
import { isIOS, isAndroid } from "react-device-detect";
import { WinModal } from "./ui/modalTypes";
import { getHighScore } from "@/helpers/leaderboard";
import NotificationBar from "./ui/notification";
import { scoreEvent } from "@/helpers/events";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Advert({ data, theme }) {
  const context = useAppContext();
  const [stage, setStage] = useState(0);
  const [lockX, setLockX] = useState();
  const [lockY, setLockY] = useState();
  const [shouldRotate, setShouldRotate] = useState(false);
  const [score, setScore] = useState(0);
  const [prevBest, setPrevBest] = useState();

  // Lives & Restarts
  const MAX_REVIVES = 4;
  const [lives, setLives] = useState(data.id === 11 ? 10 : 3);
  const [reviveCount, setReviveCount] = useState(0);

  useMemo(() => {
    if (!data.tournamentId || !context.loggedIn?.uid) return;
    getHighScore(data.tournamentId, context?.loggedIn?.uid).then(
      (highScore) => {
        setPrevBest(highScore);
      }
    );
  }, [data.tournamentId, context?.loggedIn?.uid]);

  useEffect(() => {
    if (score > prevBest) {
      setPrevBest(score);
    }
  }, [score]);

  const callback = (score) => {
    scoreEvent(context, score);
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
      setLockY(window.innerWidth * 0.9 * 0.58);
      setLockX(window.innerWidth * 0.9);
      return;
    }
    setLockX(window.innerHeight * 0.58);
    setLockY(undefined);
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

  return (
    <div
      style={{
        width: lockX ?? "100%",
        height: lockY ?? "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <NotificationBar notification={context.event} />
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
          backgroundSprite: data?.backgroundSprite,
          objectSprite: data?.objectSprite,
          playerSprite: data?.playerSprite,
          enemySprite: data?.enemySprite,
          powerUpSprite: data?.powerUpSprite,
          additionalSpriteOne: data?.additionalSpriteOne,
          maxscore: prevBest ?? 0,
          words: data?.words || [],
        })}
      {stage === 2 && (
        <Outro
          data={data}
          setStage={setStage}
          score={score}
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
            incrementOptInCount(data.tournamentId);
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
