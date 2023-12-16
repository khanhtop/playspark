import Text from "../ui/text";

export default function Leaderboard({
  gameData,
  data,
  primaryColor,
  textColor,
}) {
  console.log(data);
  return (
    <div className="py-4 h-full w-full overflow-y-scroll text-black top-0 left-0 w-full h-full flex flex-col items-center gap-2">
      {/* <RankTriangles data={data?.slice(0, 3)} /> */}
      {data?.length > 0 ? (
        data.map((item, key) => (
          <div key={key} className="flex w-full px-8 gap-4 items-center">
            <div
              style={{ backgroundColor: primaryColor }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            >
              <Text {...gameData} className="">
                {key + 1}
              </Text>
            </div>
            <p className="flex-1">{item.name}</p>
            <Text {...gameData} className="font-bold">
              {item.score}
            </Text>
          </div>
        ))
      ) : (
        <p>The Leaderboard Is Empty!</p>
      )}
    </div>
  );
}

function RankTriangles({ data }) {
  return (
    <div className="h-24 w-full flex mb-4 gap-1 max-w-[360px]">
      <Triangle data={data?.[1]} position={2} className="w-24 h-[80%]" />
      <Triangle data={data?.[0]} position={1} className="flex-1 h-full" />
      <Triangle data={data?.[2]} position={3} className="w-24 h-[80%]" />
    </div>
  );
}

function Triangle({ className, position, data }) {
  return (
    <div
      className={`relative ${className} font-octo text-lg bg-[#DDD] rounded-lg flex flex-col items-center justify-center`}
    >
      <div className="flex items-center justify-center font-octo text-white absolute -bottom-4 h-8 w-8 bg-cyan-500 rounded-full">
        {position}
      </div>
      <p>{data?.name ?? "?"}</p>
      <p>{data?.score ?? "-"}</p>
    </div>
  );
}
