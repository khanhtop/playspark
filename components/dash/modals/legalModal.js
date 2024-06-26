import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { doc, setDoc } from "firebase/firestore";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function LegalModal({ data }) {
  const context = useAppContext();
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full">
      <iframe src={data.url} className="h-full rounded" />
    </div>
  );
}
