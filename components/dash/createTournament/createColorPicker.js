import { Label } from "flowbite-react";
import { TwitterPicker } from "react-color";

export default function CreateColorPicker({ value, onSelect, label }) {
  return (
    <div className="mt-2">
      <Label className="text-black/50">{label}</Label>
      <TwitterPicker
        className="mt-4"
        color={value}
        onChangeComplete={onSelect}
      />
    </div>
  );
}
