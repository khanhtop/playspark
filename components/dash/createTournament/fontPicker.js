export default function FontPicker({ tournament, setTournament }) {
  return (
    <>
      <p className="text-xs text-white/70 mt-4 mb-1">
        Display Font (used primarily for heading, buttons and CTA's)
      </p>
      <select
        className="bg-white/5 appearance-none px-4 text-white w-full h-10"
        value={tournament.font}
        onChange={(e) => setTournament({ ...tournament, font: e.target.value })}
      >
        <option value="Play">Play</option>
        <option default value="Kanit">
          Kanit
        </option>
        <option default value="Bebas Neue">
          Bebas Neue
        </option>
        <option default value="Dosis">
          Dosis
        </option>
        <option default value="Anton">
          Anton
        </option>
        <option default value="Exo 2">
          Exo 2
        </option>
        <option default value="Lobster">
          Lobster
        </option>
        <option default value="Lexend Zetta">
          Lexend Zetta
        </option>
        <option default value="Teko">
          Teko
        </option>
        <option default value="Prompt">
          Prompt
        </option>
        <option default value="Comfortaa">
          Comfortaa
        </option>
        <option value="VT323">VT323</option>
      </select>
    </>
  );
}
