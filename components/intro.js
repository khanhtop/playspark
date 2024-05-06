import { playEvent } from "@/helpers/events";
import UIButton from "./ui/button";
import Text from "./ui/text";
import { useAppContext } from "@/helpers/store";
import GameButton from "./uiv2/gameButton";
import { useEffect, useState } from "react";
import useMusic from "@/helpers/useMusic";
import {
  ArrowPathIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import IntroPanel from "./menus/introPanel";
import GlassModal from "./glass/glassModal";
import ModalRewards from "./dash/modals/rewards";
import ModalSettings from "./dash/modals/settings";
import ModalLeaderboard from "./dash/modals/leaderboard";
import { playClickSound } from "@/helpers/audio";
import ModalGameOver from "./dash/modals/gameOver";

export default function Intro({
  data,
  setStage,
  premium,
  ready,
  signingIn,
  gameOver,
}) {
  const context = useAppContext();
  const [showModal, setShowModal] = useState(false);
  useMusic(
    data?.homescreenMusic ?? "/uisounds/intro.mp3",
    0.5,
    context.settings.bgm
  );

  useEffect(() => {
    if (gameOver.score !== null) {
      setShowModal({
        title: "Game Over",
        content: ModalGameOver,
        data: {
          data,
          gameOverScore: gameOver?.score,
          gameOverRevives: gameOver?.reviveCount,
          onRevive: () => {
            setStage(1);
          },
        },
      });
    }
  }, [gameOver.score]);

  return (
    <div
      style={{ width: "100%" }}
      className={`h-full w-full ${
        premium ? "absolute top-0 left-0" : "relative"
      }`}
    >
      <img
        src={data?.backgroundImage}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <div className="text-white items-center justify-end h-full flex flex-col pb-8 px-4 pt-4">
        <div className="w-full flex h-full items-start">
          <div className="flex-1 h-12 z-10"></div>
          <IntroPanel data={data} />
        </div>

        {(!premium || ready) && (
          <GameButton
            bgColor={data.primaryColor}
            textColor={data.textColor}
            onClick={() => {
              playEvent(context, data);
              setStage(1, true);
            }}
          >
            START
          </GameButton>
        )}

        {context?.loggedIn?.uid && (
          <div className="w-full h-20 z-10 flex justify-center mt-4">
            <div className="bg-black/30 shadow-lg border-2 border-white/20 h-full gap-4 px-4 backdrop-blur flex items-center justify-center py-2 rounded-full">
              <IconButton
                Icon={Cog6ToothIcon}
                onClick={() => {
                  playClickSound(context);
                  setShowModal({
                    title: "Settings",
                    content: ModalSettings,
                    data: data,
                  });
                }}
              />
              <IconButton
                Icon={TrophyIcon}
                onClick={() => {
                  playClickSound(context);
                  setShowModal({
                    title: "Rewards",
                    content: ModalRewards,
                    data: data,
                  });
                }}
              />
              <IconButton
                Icon={ChartBarIcon}
                onClick={() => {
                  playClickSound(context);
                  setShowModal({
                    title: "Leaderboard",
                    content: ModalLeaderboard,
                    data: data,
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>

      <GlassModal
        showWhen={showModal}
        onClose={() => setShowModal(false)}
        title={showModal?.title ?? "Modal"}
        primaryColor={data.primaryColor}
        textColor={data.textColor}
      />

      {signingIn === 1 && (
        <div className="absolute top-0 left-0 bg-black/60 backdrop-blur h-full w-full flex items-center justify-center">
          <ArrowPathIcon className="h-12 w-12 animate-spin" />
        </div>
      )}
    </div>
  );
}

function IconButton({ Icon, onClick }) {
  const context = useAppContext();
  return (
    <div
      onClick={() => {
        if (context?.loggedIn?.uid) onClick();
      }}
      className="h-full aspect-square bg-black/30 hover:bg-black/100 transition shadow-lg border-2 border-white/20 rounded-full backdrop-blur flex items-center justify-center"
    >
      <Icon className="h-8 w-8" />
    </div>
  );
}
