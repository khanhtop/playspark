import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function CreateNavigator({ stages, stage, onNavigate }) {
  return (
    <div className="bg-[#151515] h-16 flex items-center pl-4 justify-between">
      {stage > 0 ? (
        <div
          onClick={() => onNavigate(stage - 1)}
          className="flex gap-2 text-white pr-4 group cursor-pointer items-center"
        >
          <ArrowLeftCircleIcon className="h-7 w-6 text-white group-hover:text-cyan-400" />
          <h1 className="font-mono text-sm font-light">
            Back To {stages[stage - 1]}
          </h1>
        </div>
      ) : (
        <div className="flex-1" />
      )}
      {stage < stages.length - 1 ? (
        <div
          onClick={() => onNavigate(stage + 1)}
          className="flex gap-2 text-white pr-4 group cursor-pointer items-center"
        >
          <h1 className="font-mono text-sm font-light">
            Continue To {stages[stage + 1]}
          </h1>
          <ArrowRightCircleIcon className="h-7 w-6 text-white group-hover:text-cyan-400" />
        </div>
      ) : (
        <div
          onClick={() => onNavigate(stage + 1)}
          className="flex gap-2 text-white pr-4 group cursor-pointer items-center"
        >
          <h1 className="font-mono text-sm font-light">Approve</h1>
          <CheckCircleIcon className="h-7 w-6 text-green-400 group-hover:text-green-500" />
        </div>
      )}
    </div>
  );
}
