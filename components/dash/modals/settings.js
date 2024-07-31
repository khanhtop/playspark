import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { doc, setDoc } from "firebase/firestore";
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

  const updateFirebase = async () => {
    context.setSettings({
      ...context.settings,
      [changeKey]: !context.settings[changeKey],
    });
    if (context.loggedIn?.uid) {
      await setDoc(
        doc(firestore, "users", context.loggedIn.uid),
        {
          gameConfig: {
            ...context.settings,
            [changeKey]: !context.settings[changeKey],
          },
        },
        { merge: true }
      );
    }
  };

  return (
    <div className={`flex items-center gap-2 text-black/60`}>
      <Toggle checked={parameter} onChange={() => updateFirebase()} />
      <p className={`primary-font text-sm mt-1 ml-1`}>{title}</p>
    </div>
  );
}
