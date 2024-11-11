import { useMemo } from "react";
import CreateNavigator from "./createNavigator";
import CreatePreview from "./createPreview";

export default function CreateWrapper({
  tournament,
  children,
  stages,
  stage,
  onNavigate,
  isAdding,
  onComplete,
  disableSteps,
}) {
  const currentStage = useMemo(() => {}, [stage]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-center px-4 border-b-2">
        <ProgressBar
          stages={stages}
          currentStage={stage}
          onNavigate={onNavigate}
          disableSteps={disableSteps}
        />
      </div>
      <div className="flex-1 p-4 flex overflow-y-scroll ">
        <div className="flex-1 w-full">
          {children}
          <div className="h-8" />
        </div>
        {/* {(stage === 0 || stage === 5) && (
          <CreatePreview tournament={tournament} />
        )} */}
      </div>
      <CreateNavigator
        stages={stages}
        stage={stage}
        onNavigate={onNavigate}
        isAdding={isAdding}
        onComplete={onComplete}
      />
    </div>
  );
}

function ProgressBar({ stages, currentStage, onNavigate, disableSteps }) {
  return (
    <div className="flex w-full justify-between text-xs relative">
      <div className="absolute h-[2px] top-[10px] bg-[#DDD] w-full" />
      {stages.map((item, key) => {
        if (!disableSteps || !disableSteps.includes(key))
          return (
            <div
              onClick={() => onNavigate(key)}
              className={`${
                currentStage + 1 > key
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-200 text-white"
              } w-32 transition hover:bg-indigo-600 cursor-pointer flex items-center justify-center py-1 rounded-md z-10`}
              key={key}
            >
              {item}
            </div>
          );
      })}
    </div>
  );
}
