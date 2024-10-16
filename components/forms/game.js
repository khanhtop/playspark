import { useRouter } from "next/router";
export default function Game({ page }) {
  const router = useRouter();
  return (
    <div className="  text-black bg-gradient-to-t from-liner to-white pt-[132px] ">
      <div className="flex flex-col gap-5 max-w-[520px] mx-auto items-center justify-center">
        <h1 className="font-bold lg:text-[54px] text-[36px] lg:leading-[60px] leading-[32px] text-center px-5 lg:px-0 font-roboto -tracking-wider">
          Create your game for free today
        </h1>
        <p className="text-[16px]  px-10 mx-auto text-center leading-[23px]">
          Elevate your marketing outcomes with branded mobile games and playable
          ads. Create, test and iterate for free and then enjoy low cost games
          that deliver amazing ROI.
        </p>
        <button className="bg-free px-4 py-2 my-10 text-black rounded-[30px]"
        onClick={() => router.push("/admin")}
        >
          Sign Up Free
        </button>
      </div>
    </div>
  );
}
