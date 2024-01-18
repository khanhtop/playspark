import ClientGameCard from "./gameCard";

export default function HorizontalGamesScroll({ data, user, label, first }) {
  if (data.length > 0) {
    return (
      <div
        className={`${first ? "pt-8" : "pt-0"} font-octo text-3xl`}
        style={{ backgroundColor: user.primaryColor, color: user.textColor }}
      >
        <h1 className="px-6 mb-2 tracking-wider">{label}</h1>
        <div className="overflow-x-scroll">
          <div className="flex items-center gap-8 pt-2 pb-12 px-6">
            {data?.map((item, key) => (
              <ClientGameCard data={user} item={item} key={item.tournamentId} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
