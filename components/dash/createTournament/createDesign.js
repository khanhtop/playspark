import Input from "@/components/forms/input";
import CreateColorPicker from "./createColorPicker";
import ImagePicker from "@/components/forms/imagePicker";
import { BrandingComponent } from "../unlocksWithTier";
import CreateAudioPicker from "./createAudioPicker";

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
        label="Primary Color"
        value={tournament.primaryColor}
        onSelect={(a) => {
          setTournament({ ...tournament, primaryColor: a.hex });
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
