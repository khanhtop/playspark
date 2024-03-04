import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ChallengeButton from "./challengeButton";
import { useState } from "react";
import { useAppContext } from "@/helpers/store";

export default function UserModal({ userData, onClose, tournaments }) {
  if (!userData) return <div />;
  const context = useAppContext();
  const client = userData?.client ?? {};
  const performanceData = userData?.dataByClient?.[client.id] || {};
  const [isChallenging, setIsChallenging] = useState(false);

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
        {isChallenging ? (
          <div>
            <h1 className="text-2xl mb-4">Select a challenge</h1>
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-scroll">
              {tournaments?.map((item, key) => (
                <div className="flex gap-4 items-center" key={key}>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={item.backgroundImage}
                  />
                  <p className="flex-1 font-octo text-xl">{item.name}</p>
                  <div className="cursor-pointer group flex items-center justify-center gap-1">
                    <p className="text-white/80 group-hover:text-white/100">
                      Challenge
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
              onChallengeButtonClick={() => setIsChallenging(true)}
            />
          </>
        )}
        <div
          onClick={() => (isChallenging ? setIsChallenging(false) : onClose())}
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
