import { useAppContext } from "@/helpers/store";
import ClientPageWrapper from "../clientPageWrapper";
import { groupPrizes } from "@/helpers/rewards";

export default function ClientPrizes({ user, prizes, setScreen }) {
  const context = useAppContext();
  return (
    <ClientPageWrapper
      withBackNav="Prizes"
      onBackNav={() => setScreen("home")}
      user={user}
    >
      <div className="px-8 py-4 text-xl flex flex-col gap-2">
        {groupPrizes(prizes)?.map((item, key) => (
          <PrizeRow item={item} key={key} user={user} />
        ))}
      </div>
    </ClientPageWrapper>
  );
}

function PrizeRow({ item, user }) {
  return (
    <div
      style={{
        backgroundColor: user?.primaryColor,
        borderColor: user?.accentColor,
        color: user?.textColor,
      }}
      className="border-2 p-4 rounded-xl flex gap-2 md:gap-6 flex-col md:flex-row"
    >
      <img
        src={item.image}
        className="w-24 md:h-24 md:object-cover md:rounded-full"
      />

      <div className="flex-1">
        <p className="text-base">{item.name}</p>
        <p className="opacity-60 text-sm">{item.description}</p>
      </div>
      <div className="flex justify-end items-start">
        <div
          style={{
            backgroundColor: user?.accentColor,
            color: user?.primaryColor,
          }}
          className="px-2 text-sm py-1 rounded-full"
        >
          <p>Active</p>
        </div>
      </div>
    </div>
  );
}
