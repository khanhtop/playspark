export default function Leaderboard({ data }) {
  return (
    <div className="py-4 h-full w-full text-black top-0 left-0 w-full h-full flex flex-col items-center">
      {data.map((item, key) => (
        <div key={key}>
          <p>
            {key + 1}: {item.name} {item.score}
          </p>
        </div>
      ))}
    </div>
  );
}
