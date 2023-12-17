import { useAppContext } from "@/helpers/store";
import Text from "../ui/text";

export default function Leaderboard({
  gameData,
  data,
  primaryColor,
  textColor,
}) {
  const context = useAppContext();
  const position = data.findIndex((a) => a.uid === context?.loggedIn?.uid);
  const myRank = data.find((a) => a.uid === context?.loggedIn?.uid);
  const topSlice = data.slice(0, 3);

  return (
    <div className="py-4 h-full w-full overflow-y-scroll text-black top-0 left-0 w-full h-full flex flex-col items-center gap-2">
      {/* <RankTriangles data={data?.slice(0, 3)} /> */}
      {topSlice.map((item, key) => (
        <PositionRow
          item={item}
          key={key}
          gameData={gameData}
          index={key}
          topSlice={topSlice}
          isMine={item.uid === context.loggedIn?.uid}
        />
      ))}
      {Array(3 - (topSlice?.length > 3 ? 0 : topSlice?.length))
        .fill({
          name: "Unclaimed",
          score: "0",
        })
        ?.map((item, key) => (
          <PositionRow
            item={item}
            key={key}
            gameData={gameData}
            index={key + topSlice?.length}
            topSlice={topSlice}
          />
        ))}
      {position > 2 && (
        <PositionRow
          item={myRank}
          gameData={gameData}
          index={position}
          topSlice={topSlice}
          isMine={true}
        />
      )}
    </div>
  );
}

function PositionRow({ gameData, index, item, topSlice, isMine }) {
  return (
    <div
      style={{ backgroundColor: isMine ? gameData.primaryColor : "#EEE" }}
      className="flex w-full pl-2 pr-4 rounded-full py-1 gap-4 items-center"
    >
      <div
        style={{
          backgroundColor: isMine ? gameData.textColor : gameData.primaryColor,
          color: isMine ? gameData.primaryColor : gameData.textColor,
        }}
        className="w-12 h-6 rounded-full flex items-center justify-center"
      >
        <Text {...gameData} className="">
          {index + 1}
        </Text>
      </div>
      <p className="flex-1 font-octo text-lg">{item?.name}</p>
      <Text {...gameData} className="">
        {item?.score}
      </Text>
    </div>
  );
}
