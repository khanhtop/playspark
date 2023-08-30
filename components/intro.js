export default function Intro({ data }) {
  return (
    <div className="h-full w-full flex">
      <img
        src={data?.backgroundImage}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="text-white items-center justify-center absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/90 to-black/50 flex flex-col p-8">
        <h1 className="text-2xl mb-4 animate-bounce">{data?.gameName}</h1>
        <button
          onClick={() => alert("This will load the game")}
          style={{
            backgroundColor: data?.primaryColor,
            color: data?.textColor,
          }}
          className="h-12 w-[200px] rounded-lg hover:scale-105 transition"
        >
          Start
        </button>
      </div>
    </div>
  );
}
