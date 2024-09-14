import {
  ArrowLeftCircleIcon,
  ArrowPathIcon,
  ArrowRightCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";

export default function CreateNavigator({
  stages,
  stage,
  onNavigate,
  isAdding,
  onComplete,
}) {
  return (
    <div className="bg-white border-t-2 h-16 flex items-center pl-4 justify-between text-black">
      {stage > 0 ? (
        <div
          onClick={() => !isAdding && onNavigate(stage - 1)}
          className="flex gap-2 text-black pr-4 group cursor-pointer items-center"
        >
          <h1 className="text-sm font-light underline cursor-pointer">Back</h1>
        </div>
      ) : (
        <div className="flex-1" />
      )}
      {stage < stages.length - 1 ? (
        <Button
          onClick={() => !isAdding && onNavigate(stage + 1)}
          className="bg-green-400 enabled:hover:bg-green-500 flex gap-2 text-white group cursor-pointer items-center mr-4"
        >
          Continue To {stages[stage + 1]}
        </Button>
      ) : (
        <Button
          onClick={() => onComplete()}
          isProcessing={isAdding}
          disabled={isAdding}
          className="bg-green-400 enabled:hover:bg-green-500 flex gap-2 text-white mr-4 group cursor-pointer items-center"
        >
          Approve
        </Button>
      )}
    </div>
  );
}
