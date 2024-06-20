import SignUp from "@/components/forms/signUp";
import { useAppContext } from "@/helpers/store";

export default function IntroModal({ data }) {
  console.log(data);
  const context = useAppContext();
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full">
      <div className="flex justify-center">
        {data.brandLogo && <img src={data.brandLogo} className="max-h-20" />}
      </div>
      <div className="flex items-center flex-col">
        <div className="max-w-[250px] flex flex-col">
          <IntroRow text="PLAY" description="Fly through hoops" />
          <IntroRow text="EARN" description="Earn and collect in-game items" />
          <IntroRow text="WIN" description="Win great prizes!" />
        </div>
      </div>
    </div>
  );
}

function IntroRow({ text, description }) {
  return (
    <div className="flex gap-4 items-center h-12">
      <div className="w-[70px] flex items-start mt-1 flex-shrink-0">
        <div className="bg-orange-400 px-2 rounded-lg">
          <p className="text-xl font-titan font-light text-black">{text}</p>
        </div>
      </div>

      <p className="text-base font-octo text-light text-black/60 line-clamp-2">
        {description}
      </p>
    </div>
  );
}
