import Input from "@/components/forms/input";
import CreateColorPicker from "./createColorPicker";
import ImagePicker from "@/components/forms/imagePicker";
import { BrandingComponent } from "../unlocksWithTier";
import CreateAudioPicker from "./createAudioPicker";
import "react-datepicker/dist/react-datepicker.css";
import FontPicker from "./fontPicker";
import BodyFontPicker from "./bodyFontPicker";
import { Card, Datepicker, Dropdown, Label, TextInput } from "flowbite-react";
import CreatePreview from "./createPreview";
import ReimagePicker from "@/components/reimage/reimagePicker";

export default function CreateDesign({ tournament, setTournament }) {
  console.log(tournament);
  return (
    <div className="flex items-start gap-4">
      <div className="flex-1 flex flex-col gap-4">
        <Card className="flex-1">
          <h1 className="font-extrabold text-black/80">
            Basic Game Information
          </h1>
          <Label className="text-black/50 -mb-2">Tournament Name</Label>
          <TextInput
            color="light"
            placeHolder={tournament.name}
            value={tournament.name}
            onChange={(e) =>
              setTournament({ ...tournament, name: e.target.value })
            }
          />
          <Label className="text-black/50 -mb-2">Tournament Description</Label>
          <TextInput
            color="light"
            placeHolder={tournament.description}
            value={tournament.description}
            onChange={(e) =>
              setTournament({ ...tournament, description: e.target.value })
            }
          />
          <div className="my-4">
            <Label className="text-black/50 -mb-2">Tournament End Date</Label>
            <div className="flex gap-2">
              {tournament?.endDate !== null && (
                <Datepicker
                  className=""
                  value={tournament.endDate}
                  onSelectedDateChanged={(date) =>
                    setTournament({ ...tournament, endDate: date })
                  }
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
                className={`${
                  tournament?.endDate === null ? "mt-2" : "ml-2"
                } text-black/50 underline`}
              >
                {tournament?.endDate === null ? "Add End Date" : "No End Date"}
              </button>
            </div>
          </div>
        </Card>
        <Card>
          <h1 className="font-extrabold text-black/80">Fonts & Colors</h1>
          <Label className="text-black/50 -mb-2">Theme</Label>
          <Dropdown
            theme={{
              floating: {
                target: "w-72 bg-indigo-600 enabled:hover:bg-indigo-700",
              },
            }}
            label={
              tournament.theme?.substring(0, 1)?.toUpperCase() +
                tournament.theme?.substring(1, 9) || "Default"
            }
            color="dark"
          >
            <Dropdown.Item
              onClick={() => setTournament({ ...tournament, theme: "default" })}
              default
              value="default"
            >
              Default
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTournament({ ...tournament, theme: "pixel" })}
              value="pixel"
            >
              Pixel
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setTournament({ ...tournament, theme: "neon" })}
              value="neon"
            >
              Neon
            </Dropdown.Item>
          </Dropdown>
          <FontPicker tournament={tournament} setTournament={setTournament} />
          <BodyFontPicker
            tournament={tournament}
            setTournament={setTournament}
          />
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
          <Label className="text-black/50 -mb-2">Background Image</Label>
          <ReimagePicker
            id="backgroundImagePicker"
            file={tournament.backgroundImage}
            setFile={(url) => {
              setTournament({ ...tournament, backgroundImage: url });
            }}
            aspectRatio={0.6}
          />
          <Label className="text-black/50 -mb-2">Game Icon</Label>
          <ReimagePicker
            id="gameIconPicker"
            file={tournament.gameIcon}
            setFile={(url) => {
              setTournament({ ...tournament, gameIcon: url });
            }}
            aspectRatio={1}
          />
        </Card>
        <Card>
          <h1 className="font-extrabold text-black/80">Homescreen Music</h1>
          <CreateAudioPicker
            dimension="homescreenMusic"
            gameTag={"homescreen-bgm"}
            title={`Homescreen Music`}
            selected={tournament.homescreenMusic}
            updateAudio={(a) => {
              setTournament({ ...tournament, homescreenMusic: a });
            }}
          />
        </Card>
      </div>
      <CreatePreview tournament={tournament} />
    </div>
  );

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
      =
    </>
  );
}
