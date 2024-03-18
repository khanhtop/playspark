import { useAppContext } from "@/helpers/store";
import Leaderboard from "./dash/leaderboard";
import Text from "./ui/text";
import UIButton from "./ui/button";
import EmailSlide from "./forms/emailSlide";
import ShareButton from "./ui/shareButton";
import SignUp from "./forms/signUp";
import { restartEvent, reviveEvent } from "@/helpers/events";
// import Ranking from "./forms/ranking";

export default function ChallengeOutro({ score, data }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-2xl text-black font-light h-[80%] portrait:h-[90%] w-[90%] relative flex items-center justify-start flex-col">
        {/* Header Title */}
        <div
          style={{ backgroundColor: data.game?.primaryColor }}
          className="text-white absolute w-[80%] h-12 border-2 border-white left-[10%] -mt-4 rounded-full flex items-center justify-center"
        >
          <p className="font-octo text-2xl">Battle Over</p>
        </div>
        {/* Main Content */}
        <div
          className={`h-full w-full rounded-2xl flex ${
            data.game?.landscape ? "flex-row" : "flex-col"
          } overflow-hidden mt-8`}
        >
          <div
            className={`${
              data.game?.landscape && "flex-1"
            } px-4 py-4 flex flex-col items-center`}
          >
            <div className="font-octo text-xl flex flex-col items-center justify-center my-4">
              <ChallengeAvatar data={data.challenger} />
              <p className="text-red-500"> - VS - </p>
              <ChallengeAvatar data={data.challengee} />
            </div>
            <div className="flex-1 flex flex-col w-full items-center">
              <Text {...data.game} className="text-lg w-full text-center">
                You Scored
              </Text>

              <div className="flex gap-2 items-center">
                <Text
                  {...data.game}
                  style={{ color: data.game?.primaryColor }}
                  className="text-3xl mb-2 font-light"
                >
                  {score}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChallengeAvatar({ data }) {
  return (
    <div className="flex items-center gap-2 my-0 relative z-0">
      <div className="h-6 w-6 rounded-full overflow-hidden absolute -top-3 -right-4 border-2 border-white/50">
        <img src={data.profilePhoto} className="h-full w-full scale-110" />
      </div>

      <p className="z-10 uppercase">{data.companyName}</p>
    </div>
  );
}
