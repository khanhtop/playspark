import { achievements } from "@/helpers/achievements";

export default function Achievements({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-36">
      {achievements
        .filter((item) => data?.[item.factor] >= item.target)
        ?.map((item, key) => (
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
    <div className="flex h-36 items-center justify-center">
      <img className={`h-32`} src={image} />
    </div>
  );
}
