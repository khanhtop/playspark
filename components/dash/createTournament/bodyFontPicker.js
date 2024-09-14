import { Dropdown, Label } from "flowbite-react";

export default function BodyFontPicker({ tournament, setTournament }) {
  const availableFonts = [
    "Roboto",
    "Lato",
    "Open Sans",
    "DM Sans",
    "Josefin Sans",
    "Merriweather",
    "Lora",
    "Playfair Display",
    "Poppins",
    "Noto Sans",
    "Raleway",
    "Ubuntu",
    "Source Code Pro",
  ];

  return (
    <>
      <Label className="text-black/50 -mb-2">
        Primary Font (used for most text, should be readable)
      </Label>
      <Dropdown
        color="dark"
        label={tournament.bodyFont}
        theme={{
          floating: {
            target: "w-72 bg-indigo-600 enabled:hover:bg-indigo-700",
          },
        }}
      >
        {availableFonts.map((item, key) => (
          <Dropdown.Item
            onClick={() => setTournament({ ...tournament, bodyFont: item })}
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
