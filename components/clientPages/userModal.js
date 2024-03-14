import {
  ArrowPathIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import ChallengeButton from "./challengeButton";
import { useState } from "react";
import { useAppContext } from "@/helpers/store";
import Button from "../forms/button";
import { createChallenge } from "@/helpers/api";
import { useRouter } from "next/router";

export default function UserModal({ userData, onClose, tournaments, totalXp }) {
  if (!userData) return <div />;
  const context = useAppContext();
  const router = useRouter();
  const client = userData?.client ?? {};
  const performanceData = userData?.dataByClient?.[client.id] || {};
  const [isChallenging, setIsChallenging] = useState(false);
  const [isConfirmingChallenge, setIsConfirmingChallenge] = useState(false);
  const [loading, setLoading] = useState(false);
  const xpSteal = Math.floor(userData?.dataByClient[client.id]?.xp / 10);
  const xpLose = Math.floor(userData?.dataByClient[client.id]?.xp / 10);

  const issueChallenge = async () => {
    setLoading(true);
    const id = await createChallenge(isConfirmingChallenge, userData, {
      ...context.profile,
      id: context?.loggedIn.uid,
    });
    router.push("/battle/" + id);
    setLoading(false);
  };
  return (
    <div
      onClick={onClose}
      className="flex items-center justify-center h-screen w-screen backdrop-blur top-0 left-0 fixed z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: client.primaryColor,
          borderColor: client.accentColor,
          color: client.textColor,
        }}
        className="relative border-2 rounded-xl p-4 w-[90%] max-h-[90%] max-w-[500px]"
      >
        {isConfirmingChallenge ? (
          <div>
            <h1 className="text-2xl mb-4">Are you sure?</h1>
            <p>
              If you win the battle, you will steal {xpSteal}XP from{" "}
              {userData.companyName}. However, if you lose, you will lose{" "}
              {xpLose}XP.
            </p>
            <div className="flex mt-4 flex-row gap-2 max-h-[400px] overflow-y-scroll">
              <button
                disabled={loading}
                onClick={() => issueChallenge()}
                className="h-12 rounded-2xl flex-1 flex items-center justify-center"
                style={{
                  backgroundColor: client.accentColor,
                  textColor: client.primaryColor,
                }}
              >
                {loading ? (
                  <ArrowPathIcon className="h-8 w-8 animate-spin" />
                ) : (
                  "Do It!"
                )}
              </button>
              <button
                disabled={loading}
                className="h-12 rounded-2xl w-36"
                style={{
                  backgroundColor: client.accentColor,
                  textColor: client.primaryColor,
                }}
              >
                Don't Do It!
              </button>
            </div>
          </div>
        ) : isChallenging ? (
          <div>
            <h1 className="text-2xl mb-4">Select a game</h1>
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-scroll">
              {tournaments?.map((item, key) => (
                <div className="flex gap-4 items-center" key={key}>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={item.backgroundImage}
                  />
                  <p className="flex-1 font-octo text-xl">{item.name}</p>
                  <div
                    onClick={() => setIsConfirmingChallenge(item)}
                    className="cursor-pointer group flex items-center justify-center gap-1"
                  >
                    <p className="text-white/80 group-hover:text-white/100">
                      Battle!
                    </p>
                    <ChevronRightIcon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div
              style={{ borderColor: client.accentColor }}
              className="flex gap-4 border-b-2 border-b-black pb-4"
            >
              <div className="h-36 w-36 rounded-full overflow-hidden scale-100">
                <img src={userData.profilePhoto} className="scale-110" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-octo tracking-wider uppercase">
                  {userData.companyName}
                </h1>
                <div className="flex items-center gap-2">
                  <img
                    src="/clientPages/xp.png"
                    className="h-12 border-2 p-1 rounded-full"
                  />
                  <p className="text-2xl">{performanceData?.xp}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/clientPages/coins.png"
                    className="h-12 border-2 p-1 rounded-full"
                  />
                  <p className="text-2xl">{performanceData?.coins}</p>
                </div>
              </div>
            </div>
            {userData?.analytics?.playCount && userData?.totalXp && (
              <p className="mt-2">
                Has played {userData?.analytics?.playCount} times and has
                accumulated {userData?.totalXp} XP throughout their journey.
              </p>
            )}

            <ChallengeButton
              userData={userData}
              client={client}
              onChallengeButtonClick={() => setIsChallenging(true)}
            />
          </>
        )}
        <div
          onClick={() =>
            isConfirmingChallenge
              ? setIsConfirmingChallenge(false)
              : isChallenging
              ? setIsChallenging(false)
              : onClose()
          }
          style={{
            backgroundColor: client.accentColor,
            color: client.primaryColor,
          }}
          className="hover:opacity-90 transition cursor-pointer absolute p-1 -top-4 -right-4 rounded-full h-12 w-12"
        >
          <XMarkIcon className="" />
        </div>
      </div>
    </div>
  );
}
