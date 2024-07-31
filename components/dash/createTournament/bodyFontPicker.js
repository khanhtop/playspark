export default function BodyFontPicker({ tournament, setTournament }) {
  return (
    <>
      <p className="text-xs text-white/70 mt-4 mb-1">
        Primary Font (used for most text, should be readable)
      </p>
      <select
        className="bg-white/5 appearance-none px-4 text-white w-full h-10"
        value={tournament.bodyFont}
        onChange={(e) =>
          setTournament({ ...tournament, bodyFont: e.target.value })
        }
      >
        <option value="Roboto">Roboto</option>
        <option default value="Lato">
          Lato
        </option>
        <option default value="Open Sans">
          Open Sans
        </option>
        <option default value="DM Sans">
          DM Sans
        </option>
        <option default value="Josefin Sans">
          Josefin Sans
        </option>
        <option default value="Merriweather">
          Merriweather
        </option>
        <option default value="Lora">
          Lora
        </option>
        <option default value="Playfair Display">
          Playfair Display
        </option>
        <option default value="Poppins">
          Poppins
        </option>
        <option default value="Noto Sans">
          Noto Sans
        </option>
        <option default value="Raleway">
          Raleway
        </option>
        <option default value="Ubuntu">
          Ubuntu
        </option>
        <option default value="Source Code Pro">
          Source Code Pro
        </option>
      </select>
    </>
  );
}
