import { useEffect, useMemo, useRef, useState } from "react";
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
import { firestore, logout } from "@/helpers/firebase";
import VideoAd from "./videoAd";
import { mockVideos } from "@/helpers/mocks";
import Survey from "./survey";
import Pong from "./games/pong";
import { isIOS, isAndroid } from "react-device-detect";
import { WinModal } from "./ui/modalTypes";
import { getHighScore } from "@/helpers/leaderboard";
import NotificationBar from "./ui/notification";
import { playableAdFinishedCTA, scoreEvent } from "@/helpers/events";
import Modal from "./ui/modal";
import { sendEvent, updateDwell } from "@/helpers/analytics";
import PopoutBackNav from "./clientPages/popoutBackNav";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Advert({
  data,
  withPopoutBackNav,
  signingIn,
  userId,
  email,
}) {
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

  useEffect(() => {
    // For Sportzfan Only
    context.setWebhookBasePayload({
      userId: userId,
      email: email,
    });
  }, [userId, email]);

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

  const callback = (score, level = null, boostCredits = null) => {
    scoreEvent(context, score, data);
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

  let dwellCallback = () => null;
  let dwellTime = 0;
  let dwellId = null;

  const dwell = () => {
    updateDwell(dwellId, {
      user_id: context?.loggedIn?.uid?.toString() || null,
      tournament_id: data?.tournamentId?.toString() || null,
      event_name: "dwell",
      client_id: data?.ownerId?.toString() || null,
      client_name: data?.ownerCompanyName?.toString() || null,
      event_value: dwellTime,
    }).then((result) => {
      if (result) dwellId = result;
    });
  };

  useEffect(() => {
    dwell();
    dwellCallback = setInterval(() => {
      dwellTime += 15;
      dwell();
    }, 15000);

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

    return () => clearInterval(dwellCallback);
  }, []);

  const [hasLoggedImpression, setHasLoggedImpression] = useState(false);

  useEffect(() => {
    if (data?.tournamentId && !hasLoggedImpression) {
      setHasLoggedImpression(true);
      incrementImpressions(data?.tournamentId?.toString());
    }
  }, [data?.tournamentId]);

  const eventChannel = useRef(null);

  useEffect(() => {
    if (!eventChannel.current) {
      eventChannel.current = setInterval(() => {
        context.setEventQueue((prevQueue) => {
          const evQueue = [...prevQueue];
          const popped = evQueue.pop();
          context.showEvent(popped);
          return [...evQueue];
        });
      }, 3500);
    }
    return () => {
      if (eventChannel.current) clearInterval(eventChannel.current);
    };
  }, []);

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
      {withPopoutBackNav && <PopoutBackNav action={withPopoutBackNav} />}
      {/* {stage === 0 && context?.loggedIn?.uid && (
        <img
          onClick={() => logout()}
          className="absolute bottom-4 left-4 text-black z-20 underline h-10 w-10"
          src="/clientPages/signout.png"
        />
      )} */}

      {shouldRotate && (
        <div className="absolute h-screen w-screen top-0 left-0 bg-black/90 z-30 flex items-center justify-center text-white font-octo text-2xl">
          <img src="/branding/rotate.png" className="h-[80%]" />
        </div>
      )}
      {stage === 0 && (
        <Intro
          signingIn={signingIn}
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
          additionalSpriteTwo: data?.additionalSpriteTwo,
          additionalSpriteThree: data?.additionalSpriteThree,
          additionalSpriteFour: data?.additionalSpriteFour,
          additionalSpriteFive: data?.additionalSpriteFive,
          additionalSpriteSix: data?.additionalSpriteSix,
          maxscore: prevBest ?? 0,
          words: data?.words || [],
          ball: data?.ball,
          powerup: data?.powerup,
          obstacle: data?.obstacle,
          landscape: data?.landscape || false,
          normal_target_1: data?.normal_target_1,
          normal_target_2: data?.normal_target_2,
          normal_target_3: data?.normal_target_3,
          high_value_target: data?.high_value_target,
          level: data?.level,
          shoes: data?.shoes,
          head: data?.head,
          right_hand: data?.right_hand,
          left_hand: data?.left_hand,
          body: data?.body,
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
            playableAdFinishedCTA(context, data);
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
      <Modal primaryColor={data?.primaryColor} landscape={data?.landscape} />
    </div>
  );
}
