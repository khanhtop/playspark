import Text from "../ui/text";

export default function Ranking({ pos, best, uid, data }) {
  return (
    <div className="flex mb-4 mt-2 items-center">
      <p className="text-center flex-1 text-xs">
        {uid ? "You Ranked" : "You Could Be Ranked"}
      </p>
      <img
        src="/ui/cup.png"
        className="animate-bounce h-12 w-12 object-contain"
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Text {...data} className="text-2xl">
          # {pos}{" "}
        </Text>
        <Text {...data} className="flex-1 text-center text-xs">
          of {best}
        </Text>
      </div>
    </div>
  );
}
