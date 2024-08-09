import { playEvent } from "@/helpers/events";
import { useAppContext } from "@/helpers/store";
import GameButton from "./uiv2/gameButton";
import { useEffect, useRef, useState } from "react";
import useMusic from "@/helpers/useMusic";
import {
  ArrowPathIcon,
  ChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import IntroPanel from "./menus/introPanel";
import GlassModal from "./glass/glassModal";
import ModalRewards from "./dash/modals/rewards";
import ModalSettings from "./dash/modals/settings";
import ModalLeaderboard from "./dash/modals/leaderboard";
import { playClickSound } from "@/helpers/audio";
import { themes } from "@/helpers/theming";
import ModalAuth from "./dash/modals/auth";
import ModalGameOver from "./dash/modals/gameOver";
import {
  deductCredits,
  getGameCreditConsumption,
  shutoffBalance,
} from "@/helpers/credits";
import IntroModal from "./dash/modals/introModal";
import LegalModal from "./dash/modals/legalModal";
import useGoogleFont from "@/helpers/useGoogleFont";
import WelcomeModal from "./dash/modals/welcomeModal";
import ProfileModal from "./dash/modals/profileModal";

export default function Intro({
  waitOnAuth,
  data,
  setStage,
  premium,
  ready,
  signingIn,
  gameOver,
  endDate,
  clientCredits,
  uuid,
  demo,
}) {
  const context = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const audio = useRef(null);
  useMusic(
    context?.data?.homescreenMusic ?? "/uisounds/intro.mp3",
    0.5,
    context.settings.bgm
  );

  useGoogleFont("Lexend Zetta", "custom-font");
  useGoogleFont(data.bodyFont || "Roboto", "primary-font");

  const playAudio = () => {
    const fileName = context?.data?.homescreenMusic ?? "/uisounds/intro.mp3";
    audio.current = new Audio(fileName);
    audio.current.play();
    context.setIsAudioPlaying(true);
  };

  useEffect(() => {
    return () => {
      if (audio.current) audio.current.pause();
    };
  }, []);

  const theme = data?.theme || "default";

  const expired = !data.isActive || (endDate && endDate < new Date());

  const selectStage = () => {
    const possibleRouting = [];
    if (data.demo) return 1;
    if (data.sponsoredVideo) possibleRouting.push(3);
    if (data.survey && !context.hasSeenSurvey) possibleRouting.push(4);
    if (data.playableAd) possibleRouting.push(5);
    if (possibleRouting.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleRouting.length);
      return possibleRouting[randomIndex];
    } else {
      return 1;
    }
  };

  useEffect(() => {
    if (gameOver.score !== null) {
      setShowModal({
        title: "Game Over",
        content: ModalGameOver,
        data: {
          data,
          theme: theme,
          gameOverScore: gameOver?.score,
          gameOverRevives: gameOver?.reviveCount,
          onRevive: () => {
            const stage = selectStage();
            setStage(stage);
          },
          onAuth: () => {
            setShowModal({
              title: "Sign Up",
              content: ModalAuth,
              data: { ...data, onClose: () => setShowModal(false) },
            });
          },
        },
      });
    }
  }, [gameOver.score]);

  useEffect(() => {
    if (
      context.loggedIn?.uid &&
      !demo &&
      !context.profile?.termsAgreed?.includes(data.tournamentId)
    ) {
      setShowModal({
        title: "Welcome",
        content: IntroModal,
        data: {
          ...data,
          hideClose: true,
          theme: theme,
          playAudio: () => playAudio(),
          onClose: () => setShowModal(false),
          onLegalClick: (document) =>
            setShowLegalModal({
              title: document.title || "Legal",
              content: LegalModal,
              data: {
                ...data,
                url: document.url,
                hideClose: false,
                isTermsOfUse: document.isTermsOfUse,
              },
            }),
        },
      });
    }

    // else if (
    //   context.loggedIn?.uid &&
    //   !demo &&
    //   context.profile?.termsAgreed?.includes(data.tournamentId)
    // ) {
    //   setShowModal({
    //     title: "Welcome",
    //     content: WelcomeModal,
    //     data: {
    //       ...data,
    //       hideClose: true,
    //       theme: theme,
    //       playAudio: () => playAudio(),
    //       onClose: () => setShowModal(false),
    //     },
    //   });
    // }
  }, [context.profile]);

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

          <IntroPanel
            onAvatarClick={() => {
              setShowModal({
                title: "Avatar",
                content: ProfileModal,
                data: {
                  ...data,
                  theme: theme,
                  onClose: () => setShowModal(false),
                },
              });
            }}
            theme={theme}
            data={data}
            uuid={uuid}
            waitOnAuth={waitOnAuth}
            onAuthClick={() => {
              setShowModal({
                title: "Sign Up",
                content: ModalAuth,
                data: {
                  ...data,
                  theme: theme,
                  onClose: () => setShowModal(false),
                },
              });
            }}
          />
        </div>
        {(!premium || ready) && (
          <GameButton
            disabled={
              !clientCredits || expired || clientCredits < shutoffBalance
            }
            bgColor={data.primaryColor}
            textColor={data.textColor}
            theme={theme}
            onClick={async () => {
              const creditAmount = getGameCreditConsumption(
                data?.creditConsumption
              );
              if (data.tournamentId) {
                deductCredits(data.ownerId, clientCredits || 0, creditAmount);
              }
              playEvent(context, data);
              setStage(1, true);
            }}
          >
            {expired || clientCredits < shutoffBalance ? "Game Ended" : "START"}
          </GameButton>
        )}

        <div
          style={{
            bottom: data?.landscape ? 28 : 160,
            right: data?.landscape ? 16 : 8,
          }}
          className="absolute w-[68px] right-2 z-10 flex justify-center mt-4"
        >
          <IconTray
            bgColor={data.primaryColor}
            textColor={data.textColor}
            theme={theme}
          >
            <IconButton
              Icon={`/theme_icons/${theme}/settings.png`}
              icon={`/theme_icons/${theme}/settings.png`}
              bgColor={data.primaryColor}
              textColor={data.textColor}
              theme={theme}
              onClick={() => {
                playClickSound(context);
                setShowModal({
                  title: "Settings",
                  content: ModalSettings,
                  data: { ...data, theme: theme },
                });
              }}
            />
            <IconButton
              Icon={TrophyIcon}
              icon={`/theme_icons/${theme}/rewards.png`}
              bgColor={data.primaryColor}
              textColor={data.textColor}
              theme={theme}
              onClick={() => {
                playClickSound(context);
                setShowModal({
                  title: "Rewards",
                  content: ModalRewards,
                  data: {
                    ...data,
                    theme: theme,
                    endDate: endDate,
                    onAuthClick: () =>
                      setShowModal({
                        title: "Sign Up",
                        content: ModalAuth,
                        data: {
                          ...data,
                          theme: theme,
                          onClose: () => setShowModal(false),
                        },
                      }),
                  },
                });
              }}
            />
            <IconButton
              Icon={ChartBarIcon}
              icon={`/theme_icons/${theme}/leaderboard.png`}
              bgColor={data.primaryColor}
              textColor={data.textColor}
              theme={theme}
              onClick={() => {
                playClickSound(context);
                setShowModal({
                  title: "Leaderboard",
                  content: ModalLeaderboard,
                  data: {
                    ...data,
                    theme: theme,
                    onAuthClick: () =>
                      setShowModal({
                        title: "Sign Up",
                        content: ModalAuth,
                        data: {
                          ...data,
                          theme: theme,
                          onClose: () => setShowModal(false),
                        },
                      }),
                  },
                });
              }}
            />
          </IconTray>
        </div>
      </div>

      <GlassModal
        hideClose={showModal?.data?.hideClose}
        showWhen={showModal}
        onClose={() => setShowModal(false)}
        title={showModal?.title ?? "Modal"}
        primaryColor={data.primaryColor}
        textColor={data.textColor}
        theme={theme}
      />

      <GlassModal
        hideClose={false}
        showWhen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
        title={showLegalModal?.title ?? "Modal"}
        primaryColor={data.primaryColor}
        textColor={data.textColor}
        theme={theme}
      />

      {signingIn === 1 && (
        <div className="absolute top-0 left-0 bg-black/60 backdrop-blur h-full w-full flex items-center justify-center">
          <ArrowPathIcon className="h-12 w-12 animate-spin" />
        </div>
      )}
    </div>
  );
}

function IconTray({ children, theme, bgColor, textColor }) {
  return (
    <div
      // style={{
      //   backgroundColor: theme === "default" ? "rgba(255,255,255,0)" : bgColor,
      // }}
      className={`${
        theme === "pixel" ? "rounded-none" : "rounded-full"
      } relative  h-full flex items-center justify-center flex-col py-0`}
    >
      {children}
    </div>
  );
}

function IconButton({ icon, theme, onClick, bgColor, textColor }) {
  const context = useAppContext();
  return (
    <div
      onClick={onClick}
      className={`h-full cursor-pointer aspect-square transition flex items-center justify-center`}
    >
      <img src={icon} className="w-full" />
    </div>
  );
}
