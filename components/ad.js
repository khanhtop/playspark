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
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });
  const [shouldRotate, setShouldRotate] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(
    data.leaderboard?.sort((a, b) => b.score > a.score) ?? []
  );
  const [prevBest, setPrevBest] = useState();

  // Lives & Restarts
  const [lives, setLives] = useState(3);

  const callback = (score) => {
    setLives(1);
    setScore(score);
    setStage(2);
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
      setPrevBest(_lb?.prevBest);
    }
  }, [score, context.loggedIn, context.profile]);

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
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (
        (data.landscape && height > width) ||
        (!data.landscape && width > height)
      ) {
        setShouldRotate(true);
      } else {
        setShouldRotate(false);
      }
      setDimensions({ x: width, y: height });
    }, 100);
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
    const { width, height } = getFrameDimensions();
    if (
      (data.landscape && height > width) ||
      (!data.landscape && width > height)
    ) {
      setShouldRotate(true);
    } else {
      setShouldRotate(false);
    }
    setDimensions({ x: width, y: height });
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
        width: dimensions.x,
        height: dimensions.y,
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
        })}
      {stage === 2 && (
        <Outro
          data={data}
          setStage={setStage}
          score={score}
          leaderboard={leaderboard}
          prevBest={prevBest}
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
