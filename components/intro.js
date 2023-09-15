export default function Intro({ data, setStage }) {
  return (
    <div className="h-full w-full relative">
      <img
        src={data?.backgroundImage}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="text-white items-center justify-end absolute top-0 left-0 h-full w-full  flex flex-col p-8">
        <h1
          style={{
            backgroundColor: data?.primaryColor,
            borderColor: data?.textColor,
            borderWidth: 3,
          }}
          className="animate-pulse text-2xl mb-4 px-2 py-1 rounded-lg"
        >
          {data?.gameName}
        </h1>
        <button
          onClick={() => setStage(1)}
          style={{
            backgroundColor: data?.primaryColor,
            borderColor: data?.textColor,
            borderWidth: 3,
            color: data?.textColor,
          }}
          className="h-12 w-[200px] rounded-full hover:scale-105 transition"
        >
          Start
        </button>
      </div>
    </div>
  );
}
