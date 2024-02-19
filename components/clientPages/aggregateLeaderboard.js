export default function AggregateLeaderboard({ lb, user }) {
  console.log(lb);
  return (
    <div className="w-full flex flex-col gap-2">
      {lb
        ?.filter((z) => z.currentXp !== 0)
        ?.sort((a, b) => b.currentXp - a.currentXp)
        ?.map((item, key) => (
          <Rank user={user} item={item} key={key} pos={key + 1} />
        ))}
    </div>
  );
}

function Rank({ item, pos, user }) {
  return (
    <div
      className={`${
        item.mine ? "bg-white/20" : "bg-white/5"
      } w-full h-16 font-octo text-2xl px-8 flex items-center gap-4`}
    >
      <div
        style={{ borderColor: user?.accentColor }}
        className="border-2 rounded-full h-10 w-10 flex items-center justify-center"
      >
        <p>{pos}</p>
      </div>
      <div className="flex-1">
        <p>{item.companyName || "No Name"}</p>
      </div>
      <div className="flex gap-2">
        <img src="/clientPages/xp.png" className="h-8" />
        <p>{item.currentXp}</p>
      </div>
    </div>
  );
}
