import { useEffect, useState } from "react";
import { getPlayableAd } from "@/helpers/api";
import dynamic from "next/dynamic";
import Outro from "./outro";
import { useAppContext } from "@/helpers/store";
import { isIOS, isAndroid } from "react-device-detect";
import Modal from "./ui/modal";
import { cloudinaryToReimage } from "@/helpers/reimage";
import PlayableAdIntro from "./playableAdIntro";

const Intro = dynamic(() => import("./intro"), { ssr: false });

export default function PlayableAd({ data, hasInitialisedAudio }) {
  const context = useAppContext();
  const [stage, setStage] = useState(0);
  const [lockX, setLockX] = useState();
  const [lockY, setLockY] = useState();
  const [shouldRotate, setShouldRotate] = useState(false);
  const [score, setScore] = useState(null);

  const callback = (score, level = null, boostCredits = null) => {
    setScore(score);
    setStage(0);
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
      {stage === 0 && (
        <PlayableAdIntro
          score={score}
          hasInitialisedAudio={hasInitialisedAudio}
          data={data}
          setStage={(a, withReset = false) => {
            setStage(a);
          }}
        />
      )}

      {stage === 1 &&
        getPlayableAd(data.id, data, callback, {
          winProbability: data?.winProbability,
          score: 0,
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
      <Modal primaryColor={data?.primaryColor} landscape={data?.landscape} />
    </div>
  );
}
