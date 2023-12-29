import { TwitterPicker } from "react-color";

export default function CreateColorPicker({ value, onSelect, label }) {
  return (
    <div className="mt-4">
      <p className="text-xs text-white/70 mb-4 text-white">{label}</p>
      <TwitterPicker color={value} onChangeComplete={onSelect} />
    </div>
  );
}
