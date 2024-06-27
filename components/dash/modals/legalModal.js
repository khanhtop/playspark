import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";

export default function LegalModal({ data }) {
  const context = useAppContext();
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full">
      <iframe
        src={data.url}
        width="100%"
        height="100%"
        allow="autoplay"
        className="rounded-lg"
      ></iframe>
    </div>
  );
}
