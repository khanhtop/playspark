import { useState, useEffect } from "react";
import CreateWrapper from "./createWrapper";
import CreateDesign from "./createDesign";
import CreateMarketing from "./createMarketing";
import CreateSummary from "./createSummary";
import { useAppContext } from "@/helpers/store";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import CreateConfiguration from "./createConfiguration";
import CreateConfigReimage from "./createConfigReimage";
import CreateRewards from "./createRewards";
import CreateAdvanced from "./createAdvanced";

export default function CreateModal({ data, hide }) {
  const context = useAppContext();
  const stages = [
    "Design",
    "Game Configuration",
    "Marketing",
    "Rewards",
    "Advanced",
    "Summary",
  ];
  const [stage, setStage] = useState(0);
  const [tournament, setTournament] = useState({
    ...data,
    homescreenMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713844467/slowtempo-softrock-intro.mp3",
    rewards: [],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  });
  const [adding, setAdding] = useState(false);
  const [imageLibrary, setImageLibrary] = useState();

  const createTournament = async () => {
    setAdding(true);
    const _myGames = context.profile?.myGames || [];
    const _uid = Date.now();
    _myGames.push(_uid);
    await setDoc(doc(firestore, "tournaments", _uid.toString()), {
      ...tournament,
      isActive: true,
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
        className="overflow-hidden h-[80%] bg-[#111] w-[80%] border-2 border-cyan-400 rounded-2xl flex flex-col"
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
            <CreateDesign
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
            <CreateMarketing
              tournament={tournament}
              setTournament={setTournament}
            />
          )}
          {stage === 3 && (
            <CreateRewards
              tournament={tournament}
              setTournament={setTournament}
            />
          )}
          {stage === 4 && (
            <CreateAdvanced
              tournament={tournament}
              setTournament={setTournament}
            />
          )}
          {stage === 5 && (
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
