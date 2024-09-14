import { Dropdown, Label } from "flowbite-react";

export default function FontPicker({ tournament, setTournament }) {
  const availableFonts = [
    "Play",
    "Kanit",
    "Bebas Neue",
    "Dosis",
    "Anton",
    "Exo 2",
    "Lobster",
    "Lexend Zetta",
    "Teko",
    "Prompt",
    "Comfortaa",
    "VT323",
  ];

  return (
    <>
      <Label className="text-black/50 -mb-2">
        Display Font (used primarily for heading, buttons and CTA's)
      </Label>
      <Dropdown
        color="dark"
        label={tournament.font}
        theme={{
          floating: {
            target: "w-72 bg-indigo-600 enabled:hover:bg-indigo-700",
          },
        }}
      >
        {availableFonts.map((item, key) => (
          <Dropdown.Item
            onClick={() => setTournament({ ...tournament, font: item })}
            value={item}
            key={key}
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </>
  );
}
