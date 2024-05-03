import { useAppContext } from "@/helpers/store";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function ModalSettings({ data }) {
  const context = useAppContext();
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4">
      <ToggleRow
        title="Background Music"
        parameter={context?.settings?.bgm}
        changeKey="bgm"
      />
      <ToggleRow
        title="Sound Effects"
        parameter={context?.settings?.soundFx}
        changeKey="soundFx"
      />
    </div>
  );
}

function ToggleRow({ parameter, changeKey, title }) {
  const context = useAppContext();
  return (
    <div className="flex gap-2 text-black/60 font-light font-octo text-xl">
      <Toggle
        checked={parameter}
        onChange={() =>
          context.setSettings({
            ...context.settings,
            [changeKey]: !context.settings[changeKey],
          })
        }
      />
      <p>{title}</p>
    </div>
  );
}
