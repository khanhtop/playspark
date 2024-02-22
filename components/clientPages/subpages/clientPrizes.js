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
      className="border-2 p-4 rounded-xl flex gap-4"
    >
      <div className="h-28 rounded-2xl overflow-hidden">
        <img src={item.image} className="h-full scale-110" />
      </div>

      <div className="flex-1">
        <p>{item.name}</p>
        <p className="opacity-60">{item.description}</p>
      </div>
      <div>
        <div
          style={{
            backgroundColor: user?.accentColor,
            color: user?.primaryColor,
          }}
          className="px-4 py-1 rounded-full"
        >
          <p>Active</p>
        </div>
      </div>
    </div>
  );
}
