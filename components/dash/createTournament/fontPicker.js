export default function FontPicker({ tournament, setTournament }) {
  return (
    <>
      <p className="text-xs text-white/70 mt-4 mb-1">Font</p>
      <select
        className="bg-white/5 appearance-none px-4 text-white w-full h-10"
        value={tournament.font}
        onChange={(e) => setTournament({ ...tournament, font: e.target.value })}
      >
        <option value="Play">Play</option>
        <option default value="Lobster">
          Lobster
        </option>
        <option default value="Lexend Zetta">
          Lexend Zetta
        </option>

        <option value="VT323">VT323</option>
      </select>
    </>
  );
}
