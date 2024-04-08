import { useAppContext } from "@/helpers/store";
import Leaderboard from "./dash/leaderboard";
import Text from "./ui/text";
import UIButton from "./ui/button";
import EmailSlide from "./forms/emailSlide";
import ShareButton from "./ui/shareButton";
import SignUp from "./forms/signUp";
import { restartEvent, reviveEvent } from "@/helpers/events";
import useMusic from "@/helpers/useMusic";
import GameButton from "./uiv2/gameButton";
// import Ranking from "./forms/ranking";

export default function Outro({ score, setStage, data, reviveCount, onReset }) {
  const context = useAppContext();
  useMusic("/uisounds/intro.mp3", 0.5);

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

  console.log(data);

  return (
    <div
      style={{
        backgroundImage: `url("${
          data?.backgroundSprite || data?.backgroundImage
        }")`,
      }}
      className={`bg-cover h-full w-full flex items-center justify-center`}
    >
      <div className="relative bg-white/50 border-2 border-white backdrop-blur rounded-2xl text-black font-light h-[80%] portrait:h-[90%] w-[90%] relative flex items-center justify-start flex-col">
        {!context.hasSubscribedToList && <EmailSlide data={data} />}
        {/* Header Title */}
        <div
          style={{ backgroundColor: data.primaryColor }}
          className="text-white absolute w-[80%] h-12 border-2 border-white left-[10%] -mt-4 rounded-full flex items-center justify-center"
        >
          <p className="font-octo text-2xl">Game Over</p>
        </div>
        {/* Main Content */}
        <div
          className={`h-full w-full rounded-2xl flex ${
            data.landscape ? "flex-row" : "flex-col"
          } overflow-hidden mt-8`}
        >
          <div
            className={`${
              data.landscape && "flex-1"
            } px-4 py-4 flex flex-col items-center`}
          >
            <div className="flex-1 flex flex-col w-full items-center">
              <Text {...data} className="text-lg w-full text-center">
                Your Score
              </Text>

              <div className="flex gap-2 items-center">
                <Text
                  {...data}
                  style={{ color: data.primaryColor }}
                  className="text-3xl mb-2 font-light"
                >
                  {score}
                </Text>
                <ShareButton data={data} score={score} />
              </div>
            </div>
            <GameButton
              bgColor="#00F"
              textColor={data.textColor}
              onClick={() => {
                setStage(selectStage());
              }}
              badge={reviveCount}
              disabled={reviveCount === 0}
            >
              Revive
            </GameButton>
            <GameButton
              bgColor={data.primaryColor}
              textColor={data.textColor}
              onClick={() => {
                restartEvent(context, data);
                onReset();
              }}
            >
              Restart
            </GameButton>
          </div>
          <div
            className={`${
              data.landscape && "flex-1"
            } px-4 py-4 flex flex-col items-center`}
          >
            {!context?.loggedIn?.uid ? (
              <>
                <Text {...data} className="text-lg w-full text-center">
                  Guest Player
                </Text>
                <p className="text-center text-sm mb-2">
                  Create an account or login to rank on the leaderboard and save
                  your progress and rewards.
                </p>
                <UIButton
                  text="Create Account"
                  {...{ ...data, primaryColor: "red" }}
                  onClick={() => {
                    context.setModal({
                      title: "Record Your Score",
                      onClose: () => {
                        context.setModal();
                      },
                      contents: (
                        <SignUp
                          data={data}
                          closeDialog={() => context.setModal()}
                        />
                      ),
                    });
                  }}
                  className="h-12 rounded-full mt-0"
                />
              </>
            ) : (
              <div className="w-full h-full overflow-y-scroll">
                <Text {...data} className="text-lg w-full text-center">
                  Top Players
                </Text>
                <Leaderboard gameData={data} score={score} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
