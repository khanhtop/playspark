export default function Outro({ score, setStage, data }) {
  return (
    <div
      style={{ backgroundColor: data.primaryColor, color: data.textColor }}
      className="h-full w-full relative flex items-center justify-center flex-col"
    >
      <h1>SCORE: {score}</h1>
      <p>Still Work In Progress</p>
      <button
        onClick={() => setStage(0)}
        style={{ borderColor: data.textColor, borderWidth: 2 }}
        className="w-48 h-12 rounded-md mt-4"
      >
        Play Again
      </button>
    </div>
  );
}
