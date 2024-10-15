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
import {
  levelEvent,
  playableAdFinishedCTA,
  scoreEvent,
} from "@/helpers/events";
import Modal from "./ui/modal";
import { updateDwell } from "@/helpers/analytics";
import PopoutBackNav from "./clientPages/popoutBackNav";
import { cloudinaryToReimage } from "@/helpers/reimage";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Advert({
  waitOnAuth,
  data,
  client,
  withPopoutBackNav,
  signingIn,
  userId,
  email,
  clientCredits,
  uuid,
  hasInitialisedAudio,
  setHasInitialisedAudio,
}) {
  const context = useAppContext();
  const [stage, setStage] = useState(0);
  const [lockX, setLockX] = useState();
  const [lockY, setLockY] = useState();
  const [shouldRotate, setShouldRotate] = useState(false);
  const [score, setScore] = useState(null);
  const [level, setLevel] = useState(1);
  const [boostCredits, setBoostCredits] = useState(0);
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

  const parseEndDate = (date) => {
    if (date) {
      const parsed = JSON.parse(date);
      const milliseconds =
        parsed.seconds * 1000 + Math.floor(parsed.nanoseconds / 1000000);
      return new Date(milliseconds);
    } else {
      return null;
    }
  };

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
    levelEvent(context, level, data);
    if (reviveCount - MAX_REVIVES) {
      setLives(data.id === 11 ? 3 : 1);
      setScore(score);
      setLevel(level);
      setBoostCredits(boostCredits);
      setStage(0);
      setReviveCount((prevReviveCount) => prevReviveCount + 1);
    } else {
      setLives(data.id === 11 ? 10 : 3);
      setScore(0);
      setLevel(1);
      setBoostCredits(0);
      setStage(0);
    }
  };

  const reset = () => {
    setReviveCount(0);
    setLives(data.id === 11 ? 10 : 3);
    setScore(0);
    setLevel(1);
    setBoostCredits(0);
    setStage(1);
  };

  const determineConstraints = () => {
    if (isIOS || isAndroid) {
      setLockX(undefined);
      setLockY(undefined);
      return;
    }
    if (window?.frameElement?.offsetHeight) {
      setLockX(window.frameElement?.offsetWidth);
      setLockY(window.frameElement?.offsetHeight);
      return;
    }
    if (data.landscape) {
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
      <NotificationBar
        notification={context.event}
        theme={data?.theme ?? "default"}
      />
      {!context?.config?.hideBackButton && (
        <PopoutBackNav action={withPopoutBackNav} />
      )}

      {shouldRotate && (
        <div className="absolute h-screen w-screen top-0 left-0 bg-black/90 z-30 flex items-center justify-center text-white font-octo text-2xl">
          <img src="/branding/rotate.png" className="h-[80%]" />
        </div>
      )}
      {stage === 0 && (
        <Intro
          client={client}
          hasInitialisedAudio={hasInitialisedAudio}
          setHasInitialisedAudio={setHasInitialisedAudio}
          clientCredits={clientCredits}
          demo={data.demo}
          uuid={uuid}
          waitOnAuth={waitOnAuth}
          endDate={parseEndDate(data.endDate)}
          signingIn={signingIn}
          data={data}
          setStage={(a, withReset = false) => {
            if (withReset) reset();
            setStage(a);
            if (!data.demo) {
              incrementPlayCount(data?.tournamentId?.toString(), "freemium");
            }
          }}
          gameOver={{
            score: score,
            reviveCount: MAX_REVIVES - reviveCount,
          }}
        />
      )}

      {stage === 1 &&
        getGame(data.id, data, callback, {
          lives: lives,
          score: score,
          level: level,
          boostCredits: boostCredits,
          brandLogo: cloudinaryToReimage(data?.brandLogo),
          sponsorLogo: cloudinaryToReimage(data?.sponsorLogo),
          backgroundSprite: cloudinaryToReimage(data?.backgroundSprite),
          objectSprite: cloudinaryToReimage(data?.objectSprite),
          playerSprite: cloudinaryToReimage(data?.playerSprite),
          enemySprite: cloudinaryToReimage(data?.enemySprite),
          powerUpSprite: cloudinaryToReimage(data?.powerUpSprite),
          additionalSpriteOne: cloudinaryToReimage(data?.additionalSpriteOne),
          additionalSpriteTwo: cloudinaryToReimage(data?.additionalSpriteTwo),
          additionalSpriteThree: cloudinaryToReimage(
            data?.additionalSpriteThree
          ),
          additionalSpriteFour: cloudinaryToReimage(data?.additionalSpriteFour),
          additionalSpriteFive: cloudinaryToReimage(data?.additionalSpriteFive),
          additionalSpriteSix: cloudinaryToReimage(data?.additionalSpriteSix),
          backgroundMusic: data?.backgroundMusic,
          glbOne: data?.glbOne,
          glbTwo: data?.glbTwo,
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
          shoes: data?.shoes,
          head: data?.head,
          right_hand: data?.right_hand,
          left_hand: data?.left_hand,
          body: data?.body,
          primaryColor: data?.primaryColor,
          textColor: data?.textColor,
          accentColor: data?.accentColor,
          secondaryColor: data?.secondaryColor,
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
                  data={data}
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
