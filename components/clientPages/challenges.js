import { useAppContext } from "@/helpers/store";
import UIButton from "../ui/button";
import { getChallenge } from "@/helpers/achievements";
import EmbeddedModal from "./embeddedModal";
import { useState } from "react";

export default function Challenges({ data, user, viewAchievements }) {
  const xpChallenge = getChallenge("xp", data.xp);
  const nPlaysChallenge = getChallenge("nPlays", data.nPlays);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EmbeddedModal
        isOpen={showModal}
        user={user}
        onClose={() => setShowModal(false)}
      >
        <div className="h-full w-full px-1 py-1 flex flex-col">
          <img className="w-full rounded-2xl" src="/badges/challenge.png" />
          <div className="flex-1 mt-4 flex flex-col items-center text-center px-4 gap-4 font-octo">
            <h1 className="text-3xl">{showModal?.item?.text}</h1>
            <img src={showModal?.item?.image} className="h-24" />
            <p className="font-roboto px-4">{showModal?.item?.blurb}</p>
          </div>
          <UIButton
            onClick={() => setShowModal(false)}
            primaryColor={user.accentColor}
            textColor={user.primaryColor}
            text="OK"
            className=""
          />
        </div>
      </EmbeddedModal>
      <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4">
        <ChallengeStatus
          viewAchievements={() => setShowModal(xpChallenge)}
          title={xpChallenge?.item?.text}
          nChallenges={xpChallenge?.length}
          rank={xpChallenge.index}
          backgroundColor={user?.primaryColor}
          accentColor={user?.accentColor}
          textColor={user?.textColor}
        />
        <ChallengeStatus
          viewAchievements={() => setShowModal(nPlaysChallenge)}
          title={nPlaysChallenge?.item?.text}
          nChallenges={nPlaysChallenge?.length}
          rank={nPlaysChallenge.index}
          backgroundColor={user?.primaryColor}
          accentColor={user?.accentColor}
          textColor={user?.textColor}
        />
      </div>
    </>
  );
}

function ChallengeStatus({
  title,
  accentColor,
  textColor,
  backgroundColor,
  nChallenges,
  rank,
  viewAchievements,
}) {
  const context = useAppContext();
  return (
    <div
      className={`flex flex-col font-octo rounded-3xl text-base overflow-hidden relative group min-w-[320px] h-[200px] shadow-lg hover:shadow-md ${
        backgroundColor === "#000000" ? "shadow-[#333]/50" : "shadow-black/50"
      }`}
    >
      <div
        style={{
          backgroundImage: `url("/badges/challenge.png")`,
          transition: "0.5s all",
        }}
        className="bg-center bg-cover flex-1 p-2 relative"
      >
        <div className="absolute top-0 left-0 bg-black/20 w-full h-full flex items-end">
          <div className="flex justify-end w-full pb-2 pr-4">
            <UIButton
              onClick={() => viewAchievements()}
              primaryColor={accentColor}
              textColor={backgroundColor}
              text="View"
              className=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 py-1">
        <h3 className="text-base">{title ?? "NONE"}</h3>
        <div className="flex">
          <Stat text="Your Status" value={`${rank} / ${nChallenges}`} />
          {/* <Stat text="Your Rank" value={0} />
          <Stat text="Top Score" value={0} /> */}
        </div>
      </div>
    </div>
  );
}

function Stat({ text, value }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <p>{value}</p>
      <p className="opacity-50 text-sm">{text}</p>
    </div>
  );
}
