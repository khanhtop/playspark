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
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#151515] h-16 flex items-center px-4">
        <p className="text-white text-lg font-mono">{stages[stage]}</p>
      </div>
      <div className="flex-1 p-4 flex overflow-y-scroll">
        <div className="flex-1 pr-8">
          {children}
          <div className="h-8" />
        </div>
        {(stage === 0 || stage === 4) && (
          <CreatePreview tournament={tournament} />
        )}
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
