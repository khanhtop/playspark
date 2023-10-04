import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function GameCard({
  game,
  onDemo,
  onAdd,
  added,
  buttonText,
  saving,
}) {
  console.log(game);
  return (
    <div className="bg-[#000] rounded-lg text-white basis-[300px] p-4">
      <h3 className="text-lg">{game.name}</h3>
      <h5 className="text-xs mb-4 text-white/75 h-[80px] overflow-ellipsis">
        {game.description}
      </h5>
      <img src={`/screenshots/${game.screenshot}`} className="rounded-md" />
      <div className="flex gap-2 text-sm">
        <button
          onClick={() => onAdd()}
          disabled={added || saving}
          className={`w-full ${
            added || saving ? "bg-gray-500" : "bg-cyan-400 hover:bg-cyan-600"
          } text-white rounded-md mt-4 py-3 transition flex items-center justify-center`}
        >
          {saving ? (
            <ArrowPathIcon className="text-white h-5 w-5 animate-spin" />
          ) : added ? (
            "Already Added"
          ) : (
            buttonText
          )}
        </button>
        <button
          onClick={() => onDemo()}
          className="w-[100px] bg-cyan-400 text-white rounded-md mt-4 py-3  hover:bg-cyan-600 transition"
        >
          Demo
        </button>
      </div>
    </div>
  );
}
