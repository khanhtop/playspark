import { useAppContext } from "@/helpers/store";

export default function AccountInfo({ data, totalXp, totalCoins }) {
  const context = useAppContext();
  if (context.loggedIn?.uid)
    return (
      <div
        style={{ color: data.textColor }}
        className="flex px-4 py-8 font-octo items-center"
      >
        <div className="px-2 flex flex-col md:flex-row gap-2 md:gap-4 flex-1 justify-center md:justify-start items-start md:items-center">
          <div
            style={{ borderColor: data.accentColor }}
            className="h-[50px] md:h-[80px] border-4 aspect-square flex items-center justify-center rounded-full"
          >
            <div>
              <p className="text-[30px] md:text-[60px] font-octo uppercase">
                {data?.companyName?.substring(0, 1)}
              </p>
            </div>
          </div>
          <p className="font-octo md:text-2xl text-center uppercase">
            {data.companyName}
          </p>
        </div>
        <ParameterBox title="XP" value={totalXp} image="/clientPages/xp.png" />
        <ParameterBox
          title="Tokens"
          value={totalCoins}
          image="/clientPages/coins.png"
        />
      </div>
    );
}

function ParameterBox({ image, title, value, item }) {
  return (
    <div className="flex items-center gap-2 ml-6">
      <img src={image} className="h-10 md:h-16" />
      <div>
        <p className="md:text-lg opacity-70">{title}</p>
        <p className="md:text-3xl">{value}</p>
      </div>
    </div>
  );
}
