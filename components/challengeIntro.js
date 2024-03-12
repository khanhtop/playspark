import { playEvent } from "@/helpers/events";
import UIButton from "./ui/button";
import Text from "./ui/text";
import { useAppContext } from "@/helpers/store";
import SignUp from "./forms/signUp";

export default function ChallengeIntro({ data, setStage, role }) {
  const context = useAppContext();
  return (
    <div style={{ width: "100%" }} className={`h-full w-full relative`}>
      <img
        src={data?.game.backgroundImage}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="text-white items-center justify-end absolute top-0 left-0 h-full w-full  flex flex-col p-8 bg-black/90">
        <div className="flex-1 font-octo text-2xl my-12 w-[90%] rounded-2xl bg-white/5 backdrop-blur flex flex-col p-4 items-center justify-center gap-4">
          {/* Handle The Non-Logged In User */}
          {!context?.loggedIn?.uid && (
            <div className="text-center px-8 flex flex-col">
              <p>Sign In To Continue</p>
              <p className="font-roboto text-base mt-2">
                You need an account in order to participate in this challenge
              </p>
              <UIButton
                text="Create Account"
                {...data.game}
                onClick={() => {
                  context.setModal({
                    title: "Record Your Score",
                    onClose: () => {
                      context.setModal();
                    },
                    contents: (
                      <SignUp
                        data={data.game}
                        closeDialog={() => context.setModal()}
                      />
                    ),
                  });
                }}
                className="h-12 rounded-full mt-4"
              />
            </div>
          )}

          {/* Handle Logged In Users / Challenger / Already Completed */}
          {context?.loggedIn?.uid === data?.challenger?.id &&
            data?.challengerResult && (
              <div className="text-center px-8 flex flex-col">
                <p>You have already completed this challenge</p>
                <p className="font-roboto text-base mt-2">
                  Create another challenge and play again!
                </p>
              </div>
            )}

          {/* Handle Logged In Users / Challengee / Already Completed */}
          {context?.loggedIn?.uid === data?.challengee?.id &&
            data?.challengeeResult && (
              <div className="text-center px-8 flex flex-col">
                <p>This challenge has ended</p>
                <p className="font-roboto text-base mt-2">
                  Create another challenge and play again!
                </p>
              </div>
            )}

          {/* Handle Logged In Users / Challengee / Ready */}
          {context?.loggedIn?.uid === data?.challenger?.id &&
            !data?.challengerResult && (
              <div className="text-center px-8 flex flex-col items-center">
                <div className="flex flex-col items-center justify-center my-4">
                  <ChallengeAvatar data={data.challenger} />
                  <p className="text-red-500"> - VS - </p>
                  <ChallengeAvatar data={data.challengee} />
                </div>
                <ChallengeSummary
                  role="challenger"
                  data={data.challengee}
                  ready={true}
                />
              </div>
            )}

          {/* Handle Logged In Users / Challengee / Ready */}
          {context?.loggedIn?.uid === data?.challengee?.id &&
            !data?.challengeeResult && (
              <div className="text-center px-8 flex flex-col items-center">
                <div className="flex flex-col items-center justify-center my-4">
                  <ChallengeAvatar data={data.challenger} />
                  <p className="text-red-500"> - VS - </p>
                  <ChallengeAvatar data={data.challengee} />
                </div>
                <ChallengeSummary
                  role="challengee"
                  data={data.challenger}
                  ready={true}
                />
              </div>
            )}
        </div>

        <UIButton
          {...data.game}
          onClick={() => {
            playEvent(context, data);
            setStage(1);
          }}
          text="START"
        />
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

function ChallengeSummary({ data, role, ready }) {
  return (
    <div className="flex text-white/60 flex-col items-center gap-2 mt-2 font-roboto text-center text-base max-w-[80%] mt-4">
      {!ready ? (
        <p>You have already had your go!</p>
      ) : role === "challenger" ? (
        <div className="flex flex-col gap-2">
          <p>
            If you win the battle, you can steal {Math.floor(data.totalXp / 10)}
            XP from {data.companyName}
          </p>
          <p>
            As the battle creator, you must go first and set the score that{" "}
            {data.companyName} must beat.
          </p>
          <p className="">You only get one life, so make it count!</p>
        </div>
      ) : (
        <p>
          If you win the battle, you will win 200XP and reduce{" "}
          {data.companyName}'s XP by 10%
        </p>
      )}
    </div>
  );
}
