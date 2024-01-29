import { achievements } from "@/helpers/achievements";

export default function Achievements({ data }) {
  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-4">
      {achievements.map((item, key) => (
        <Achievement
          image={item.image}
          unlocked={data?.[item.factor] >= item.target}
          required={item.target}
          factor={item.factor}
        />
      ))}
    </div>
  );
}

function Achievement({ image, unlocked, required, factor }) {
  return (
    <div className="relative w-full aspect-square">
      <img
        className={`absolute ${unlocked ? "opacity-100" : "opacity-20"}`}
        src={image}
      />
      {!unlocked && (
        <div className="absolute h-full w-full flex items-center justify-center">
          <div className="text-sm bg-black/30 py-2 backdrop-blur max-w-[60%] text-center text-white font-octo px-4 rounded-xl">
            <p className="uppercase">
              Unlock with {required} {factor}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
