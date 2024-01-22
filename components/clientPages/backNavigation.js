import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function BackNavigation({ title, onBackNav }) {
  const router = useRouter();
  return (
    <div onClick={onBackNav} className="flex font-octo items-center gap-2 py-2">
      <ChevronLeftIcon className="h-10 w-10 ml-4" />
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}
