import ClientGameCard from "./gameCard";

export default function HorizontalGamesScroll({ data, user, label }) {
  if (data.length > 0) {
    return (
      <div
        className="px-4 py-4 font-octo text-3xl"
        style={{ backgroundColor: user.primaryColor, color: user.textColor }}
      >
        <h1 className="mb-2">{label}</h1>
        <div className="overflow-x-scroll">
          <div className="flex items-center gap-4 py-2">
            {data?.map((item, key) => (
              <ClientGameCard item={item} key={item.tournamentId} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
