import { useAppContext } from "@/helpers/store";
import UIButton from "../ui/button";
import { getChallenge } from "@/helpers/achievements";

export default function Challenges({ totalXp, user, viewAchievements }) {
  const xpChallenge = getChallenge("xp", 2000);

  return (
    <div className="grid grid-cols-2 p-6">
      <ChallengeStatus
        viewAchievements={viewAchievements}
        title={xpChallenge?.item?.text}
        nChallenges={xpChallenge?.length}
        rank={xpChallenge.index}
        backgroundColor={user?.primaryColor}
        accentColor={user?.accentColor}
        textColor={user?.textColor}
      />
    </div>
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
    <div className="flex flex-col font-octo rounded-3xl text-base overflow-hidden relative group min-w-[320px] h-[200px] shadow-lg hover:shadow-md shadow-black/50 ">
      <div
        style={{
          backgroundImage: `url("/badges/challenge.png")`,
          transition: "0.5s all",
        }}
        className="bg-center bg-cover flex-1 p-2 relative"
      >
        <div className="absolute top-0 left-0 bg-white/50 w-full h-full flex items-end">
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
