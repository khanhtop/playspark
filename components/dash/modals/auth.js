import SignUp from "@/components/forms/signUp";
import { useAppContext } from "@/helpers/store";

export default function ModalAuth({ data }) {
  const context = useAppContext();
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full">
      <SignUp data={data} closeDialog={() => data.onClose()} />
    </div>
  );
}
