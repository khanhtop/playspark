import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function BackNavigation({ title, onBackNav }) {
  const router = useRouter();
  return (
    <div
      onClick={onBackNav}
      className="flex font-octo bg-black/50 items-center gap-2 py-1"
    >
      <ChevronLeftIcon className="h-12 w-12 ml-4" />
      <h1 className="text-3xl">{title}</h1>
    </div>
  );
}
