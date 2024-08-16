import Input from "@/components/forms/input";
import CreateColorPicker from "./createColorPicker";
import ImagePicker from "@/components/forms/imagePicker";
import { BrandingComponent } from "../unlocksWithTier";
import CreateAudioPicker from "./createAudioPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FontPicker from "./fontPicker";
import BodyFontPicker from "./bodyFontPicker";

export default function CreateDesign({ tournament, setTournament }) {
  return (
    <>
      <Input
        label="Tournament Name"
        className="bg-white/5 w-full py-2 mb-4 text-white"
        placeHolder={tournament.name}
        value={tournament.name}
        labelColor="text-white/70"
        onChange={(e) => setTournament({ ...tournament, name: e.target.value })}
      />
      <Input
        label="Tournament Description"
        className="bg-white/5 w-full py-2 text-white"
        placeHolder={tournament.description}
        value={tournament.description}
        labelColor="text-white/70"
        onChange={(e) =>
          setTournament({ ...tournament, description: e.target.value })
        }
      />
      <p className="text-xs text-white/70 mt-4 mb-1">Theme</p>
      <select
        className="bg-white/5 appearance-none px-4 text-white w-full h-10"
        onChange={(e) =>
          setTournament({ ...tournament, theme: e.target.value })
        }
      >
        <option default value="default">
          Default
        </option>
        <option value="pixel">Pixel</option>
        <option value="neon">Neon</option>
      </select>
      <FontPicker tournament={tournament} setTournament={setTournament} />
      <BodyFontPicker tournament={tournament} setTournament={setTournament} />
      <div className="my-4">
        <p className="text-xs text-white/70 mt-4 mb-1">Tournament End Date</p>
        <div className="flex gap-2">
          {tournament?.endDate !== null && (
            <DatePicker
              showTimeSelect
              className={`bg-transparent text-white ${
                tournament?.endDate === null
                  ? "border-cyan-500/20 text-white/20"
                  : "border-cyan-500 text-white/100"
              } border-2 rounded-md px-2 py-1`}
              selected={tournament?.endDate || new Date()}
              onChange={(date) =>
                setTournament({ ...tournament, endDate: date })
              }
            />
          )}
          <button
            onClick={() => {
              if (tournament?.endDate === null) {
                setTournament({
                  ...tournament,
                  endDate: new Date(
                    new Date().setMonth(new Date().getMonth() + 3)
                  ),
                });
              } else {
                setTournament({ ...tournament, endDate: null });
              }
            }}
            className="text-white/50 underline"
          >
            {tournament?.endDate === null ? "Add End Date" : "No End Date"}
          </button>
        </div>
      </div>

      <div className="my-2">
        <p className="text-xs text-white/70 mt-0 mb-1">Tournament Credit Cap</p>
        <div className="flex gap-2">
          {tournament?.creditCap && tournament?.creditCap !== 0 && (
            <Input
              type="number"
              className="bg-white/5 w-full py-2 text-white"
              placeHolder={tournament.creditCap}
              value={tournament.creditCap || 1000}
              labelColor="text-white/70"
              onChange={(e) =>
                setTournament({
                  ...tournament,
                  creditCap: parseInt(e.target.value) || 0,
                })
              }
            />
          )}
          <button
            onClick={() => {
              if (tournament?.creditCap === 0 || !tournament?.creditCap) {
                setTournament({
                  ...tournament,
                  creditCap: 1000,
                });
              } else {
                setTournament({ ...tournament, creditCap: 0 });
              }
            }}
            className="text-white/50 underline"
          >
            {!tournament?.creditCap || tournament?.creditCap === 0
              ? "Add Credits Cap"
              : "No Credits Cap"}
          </button>
        </div>
      </div>

      <BrandingComponent>
        <div className="mt-4">
          <ImagePicker
            cover
            id="bg-image"
            width={tournament.landscape ? 400 : 200}
            height={tournament.landscape ? 200 : 400}
            label="Background Image (Aim for 800px x 1600px)"
            image={tournament.backgroundImage}
            onChange={(url) => {
              setTournament({ ...tournament, backgroundImage: url });
            }}
          />
        </div>
      </BrandingComponent>
      <BrandingComponent>
        <div className="mt-4">
          <ImagePicker
            cover
            id="game-icon"
            width={200}
            height={200}
            label="Game Icon (Aim For 500 x 500px Square)"
            image={tournament.gameIcon || tournament.backgroundImage}
            onChange={(url) => {
              setTournament({ ...tournament, gameIcon: url });
            }}
          />
        </div>
      </BrandingComponent>
      <CreateColorPicker
        label="Primary Color (For Headers and Primary Elements)"
        value={tournament.primaryColor}
        onSelect={(a) => {
          setTournament({ ...tournament, primaryColor: a.hex });
        }}
      />
      <CreateColorPicker
        label="Secondary Color (Used for some buttons and UI aspects)"
        value={tournament.secondaryColor || "#000000"}
        onSelect={(a) => {
          setTournament({ ...tournament, secondaryColor: a.hex });
        }}
      />
      <CreateColorPicker
        label="Accent Color (Used as an accent in areas that need it)"
        value={tournament.accentColor || "#000000"}
        onSelect={(a) => {
          setTournament({ ...tournament, accentColor: a.hex });
        }}
      />
      <CreateColorPicker
        label="Text Color"
        value={tournament.textColor}
        onSelect={(a) => {
          setTournament({ ...tournament, textColor: a.hex });
        }}
      />
      <div className="h-4" />
      <CreateAudioPicker
        dimension="homescreenMusic"
        gameTag={"homescreen-bgm"}
        title={`Homescreen Music`}
        selected={tournament.homescreenMusic}
        updateAudio={(a) => {
          setTournament({ ...tournament, homescreenMusic: a });
        }}
      />
    </>
  );
}
