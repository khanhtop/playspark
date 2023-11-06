import { ArrowDownIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function PaySection() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="max-w-[1200px] flex-1 w-full flex flex-col items-center justify-center text-center px-12 py-24">
        <h1 className="font-anton text-[30px] leading-[35px] md:text-[80px] md:leading-[90px] max-w-[50%] mb-8">
          Pay As {` `}
          <span className="text-cyan-400">You Grow</span>
        </h1>
        <h3 className="md:text-3xl mb-4 max-w-[60%] font-octo">
          Start your rewarded game journey for as little as $99. Choose from a
          number of options that scale as you grow.
        </h3>
        <h3 className="md:text-2xl max-w-[60%] font-octolight">
          Start as low as $99 to launch a branded game with integrated rewards.
        </h3>
        <h3 className="md:text-2xl max-w-[60%] font-octolight">
          Start generating revenue immediately through in-game rewarded
          advertising.
        </h3>
        <button
          // onClick={() => router.push("/admin")}
          className="bg-cyan-400 px-8 py-2 rounded-full flex items-center gap-4 mt-8 font-octo md:text-3xl text-black"
        >
          LAUNCH YOUR GAME
        </button>
      </div>
    </div>
  );
}
