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
        theme={data.theme}
      />
      <ToggleRow
        title="Sound Effects"
        parameter={context?.settings?.soundFx}
        changeKey="soundFx"
        theme={data.theme}
      />
      <ToggleRow
        title="Game Notifications"
        parameter={context?.settings?.notifications}
        changeKey="notifications"
        theme={data.theme}
      />
    </div>
  );
}

function ToggleRow({ parameter, changeKey, title, theme }) {
  const context = useAppContext();
  return (
    <div className={`flex gap-2 text-black/60`}>
      <Toggle
        checked={parameter}
        onChange={() =>
          context.setSettings({
            ...context.settings,
            [changeKey]: !context.settings[changeKey],
          })
        }
      />
      <p
        className={`${
          theme === "pixel"
            ? "font-pixel text-2xl -mt-[5px]"
            : theme === "default"
            ? "font-light font-octo text-xl"
            : "font-neon font-octo text-xl"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
