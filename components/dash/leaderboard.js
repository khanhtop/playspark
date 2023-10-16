import Text from "../ui/text";

export default function Leaderboard({
  gameData,
  data,
  primaryColor,
  textColor,
}) {
  return (
    <div className="py-4 h-full w-full overflow-y-scroll text-black top-0 left-0 w-full h-full flex flex-col items-center gap-2">
      {data.map((item, key) => (
        <div key={key} className="flex w-full px-8 gap-4 items-center">
          <div
            style={{ backgroundColor: primaryColor }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          >
            <Text {...gameData} className="font-titan">
              {key + 1}
            </Text>
          </div>
          <p className="flex-1">{item.name}</p>
          <Text {...gameData} className="font-bold font-titan">
            {item.score}
          </Text>
        </div>
      ))}
    </div>
  );
}
