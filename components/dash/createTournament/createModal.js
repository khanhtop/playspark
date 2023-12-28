import {
  ArrowRightCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import CreateWrapper from "./createWrapper";
import CreateNavigator from "./createNavigator";
import CreateColorPicker from "./createColorPicker";
import CreatePreview from "./createPreview";
import Input from "@/components/forms/input";
import CreateDesign from "./createDesign";
import CreateMarketing from "./createMarketing";
import CreateSummary from "./createSummary";

export default function CreateModal({ data, hide }) {
  const stages = ["Design", "Game Configuration", "Marketing", "Summary"];
  const [stage, setStage] = useState(0);
  const [tournament, setTournament] = useState({ ...data });

  console.log(tournament);

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
        >
          {stage === 0 && (
            <CreateDesign
              tournament={tournament}
              setTournament={setTournament}
            />
          )}
          {stage === 2 && (
            <CreateMarketing
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
