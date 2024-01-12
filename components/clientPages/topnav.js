import {
  CurrencyDollarIcon,
  PlayIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

export default function TopNav({ data, context, totalScore }) {
  return (
    <div
      style={{ backgroundColor: data.primaryColor ?? "#222" }}
      className={`h-20 w-full flex py-4 px-4`}
    >
      <img src={data?.brandLogo} className="h-full" />
      <div className="h-full flex-1 flex">
        {context?.loggedIn?.uid ? (
          <div className="h-full flex-1 justify-end flex items-center gap-4">
            <Pill value={8000} Icon={CurrencyDollarIcon} />
            <Pill value={totalScore} Icon={TrophyIcon} />
            <Avatar name={data?.companyName} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

function Avatar({ name }) {
  return (
    <div className="border-2 border-white h-10 cursor-pointer hover:opacity-80 transition aspect-square bg-[#666] rounded-full flex items-center justify-center">
      <p className="text-white font-octo text-2xl">{name?.substring(0, 1)}</p>
    </div>
  );
}

function Pill({ value, Icon }) {
  return (
    <div className="text-white border-2 border-white rounded-full gap-2 h-10 py-1 bg-red-500 flex items-center px-4">
      <Icon className="h-full" />
      <p className="font-octo text-2xl">{value}</p>
    </div>
  );
}
