import { useEffect, useMemo, useRef, useState } from "react";
import {
  completeBattleForChallengee,
  completeBattleForChallenger,
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
import ChallengeIntro from "./challengeIntro";
import ChallengeOutro from "./challengeOutro";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function Challenge({ data, withPopoutBackNav, id }) {
  const context = useAppContext();
  const [stage, setStage] = useState(2);
  const [lockX, setLockX] = useState();
  const [lockY, setLockY] = useState();
  const [shouldRotate, setShouldRotate] = useState(false);
  const [score, setScore] = useState(0);
  const [prevBest, setPrevBest] = useState();

  // Lives & Restarts
  const MAX_REVIVES = 4;
  const [lives, setLives] = useState(data.id === 11 ? 10 : 3);
  const [reviveCount, setReviveCount] = useState(0);

  const calculateXpStealAmount = () => {
    if (context?.loggedIn?.uid === data?.challenger?.id) {
      return Math.floor(
        data.challengee.dataByClient[data.game.ownerId].xp / 10
      );
    } else if (context?.loggedIn?.uid === data?.challengee?.id) {
      return Math.floor(
        data.challenger.dataByClient[data.game.ownerId].xp / 10
      );
    }
  };

  const [hasNotified, setHasNotified] = useState(false);
  const callback = async (score) => {
    setScore(score);
    setStage(2);
    if (context?.loggedIn?.uid === data?.challenger?.id && !hasNotified) {
      console.warn("DEBUG - CHALLENGE.JS EFFECT TRIGGERED");
      // Challenger Has Completed
      setHasNotified(true);
      await completeBattleForChallenger(
        id,
        score,
        data?.challenger?.companyName,
        data?.game?.name,
        data?.challengee?.id,
        data?.challengee?.email
      );
    }
    if (context?.loggedIn?.uid === data?.challengee?.id && !hasNotified) {
      console.warn("DEBUG - CHALLENGE.JS EFFECT TRIGGERED");
      setHasNotified(true);
      await completeBattleForChallengee(
        id,
        score,
        data?.game?.name,
        data?.challengerResult?.score,
        data?.challenger?.companyName,
        data?.challengee?.companyName,
        data?.challenger?.id,
        data?.challengee?.id,
        data?.challenger?.email,
        data?.challengee?.email
      );
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

  return (
    <div
      style={{
        width: lockX ?? "100%",
        height: lockY ?? "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {withPopoutBackNav && <PopoutBackNav action={withPopoutBackNav} />}
      {stage === 0 && context?.loggedIn?.uid && (
        <img
          onClick={() => logout()}
          className="absolute bottom-4 left-4 text-black z-20 underline h-10 w-10"
          src="/clientPages/signout.png"
        />
      )}

      {shouldRotate && (
        <div className="absolute h-screen w-screen top-0 left-0 bg-black/90 z-30 flex items-center justify-center text-white font-octo text-2xl">
          <img src="/branding/rotate.png" className="h-[80%]" />
        </div>
      )}
      {stage === 0 && (
        <ChallengeIntro
          xpStealAmount={calculateXpStealAmount()}
          data={data}
          setStage={(a) => {
            setStage(a);
          }}
        />
      )}

      {stage === 1 &&
        getGame(data.game.id, data.game, callback, {
          lives: 1,
          score: 0,
          brandLogo: data?.game?.brandLogo,
          sponsorLogo: data?.game?.sponsorLogo,
          backgroundSprite: data?.game?.backgroundSprite,
          objectSprite: data?.game?.objectSprite,
          playerSprite: data?.game?.playerSprite,
          enemySprite: data?.game?.enemySprite,
          powerUpSprite: data?.game?.powerUpSprite,
          additionalSpriteOne: data?.game?.additionalSpriteOne,
          additionalSpriteTwo: data?.game?.additionalSpriteTwo,
          maxscore: 0,
          words: data?.game?.words || [],
        })}
      {stage === 2 && (
        <ChallengeOutro
          xpStealAmount={calculateXpStealAmount()}
          data={data}
          setStage={setStage}
          score={score}
          onReset={() => reset()}
          reviveCount={MAX_REVIVES - reviveCount}
        />
      )}

      <Modal primaryColor={data?.primaryColor} landscape={data?.landscape} />
    </div>
  );
}
