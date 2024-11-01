import { useState, useEffect } from "react";
import CreateWrapper from "./createWrapper";
import CreateSummary from "./createSummary";
import { useAppContext } from "@/helpers/store";
import CreateConfiguration from "./createConfiguration";
import CreateConfigReimage from "./createConfigReimage";
import { setDocument } from "@/helpers/firebaseApi";
import CreatePaDesign from "./playableAds/createPaDesign";
import CreatePaRewards from "./playableAds/createPaRewards";

export default function CreateModalPlayableAd({ data, hide }) {
  const context = useAppContext();
  const stages = ["Design", "Look & Feel", "Configuration", "Summary"];
  const [stage, setStage] = useState(0);
  const [tournament, setTournament] = useState({
    ...data,
    rewards: [],
    winProbability: 0.8,
  });
  const [adding, setAdding] = useState(false);

  console.log(tournament);

  const createTournament = async () => {
    setAdding(true);
    const _uid = Date.now();
    await setDocument("playable_ads", _uid.toString(), {
      ...tournament,
      tournamentId: _uid,
      ownerId: context.loggedIn?.uid,
      ownerCompanyName: context?.profile?.companyName,
      ...(context?.profile?.sponsorLogo && {
        sponsorLogo: context.profile.sponsorLogo,
      }),
      ...(context?.profile?.brandLogo && {
        brandLogo: context.profile.brandLogo,
      }),
    });
    setAdding(false);
    hide();
  };

  return (
    <div
      onClick={() => hide()}
      className="fixed backdrop-blur h-screen w-screen top-0 left-0 bg-black/80 z-20 flex items-center justify-center transition"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="overflow-hidden h-[80%] bg-white w-[95%] border-2 border-black/10 rounded-2xl flex flex-col"
      >
        <CreateWrapper
          stages={stages}
          stage={stage}
          tournament={tournament}
          onNavigate={(step) => setStage(step)}
          onComplete={() => createTournament()}
          isAdding={adding}
        >
          {stage === 0 && (
            <CreatePaDesign
              tournament={tournament}
              setTournament={setTournament}
            />
          )}
          {stage === 1 && data.useReimage ? (
            <CreateConfigReimage
              tournament={tournament}
              setTournament={setTournament}
            />
          ) : (
            stage === 1 && (
              <CreateConfiguration
                isAdmin={true}
                tournament={tournament}
                setTournament={setTournament}
              />
            )
          )}
          {stage === 2 && (
            <CreatePaRewards
              tournament={tournament}
              setTournament={setTournament}
            />
          )}
          {stage === 3 && (
            <CreateSummary
              tournament={tournament}
              setTournament={setTournament}
            />
          )}
        </CreateWrapper>
      </div>
    </div>
  );
}
