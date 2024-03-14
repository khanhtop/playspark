import { useAppContext } from "@/helpers/store";

export default function ChallengeButton({ userData, onChallengeButtonClick }) {
  const context = useAppContext();
  if (!context?.loggedIn?.uid) return <div />;

  const { client } = userData;
  const xpSteal = Math.floor(userData?.dataByClient[client.id]?.xp / 10);

  return (
    <div className="flex-1 flex justify-end mt-4">
      <div
        onClick={onChallengeButtonClick}
        style={{
          backgroundColor: client.accentColor,
          borderColor: client.accentColor,
          color: client.textColor,
        }}
        className="cursor-pointer hover:opacity-80 transition rounded-2xl px-4 py-4 flex flex-col items-center justify-center"
      >
        <p className="uppercase font-octo text-xl">
          Battle {userData.companyName}
        </p>
        <p className="uppercase opacity-80">Steal {xpSteal}XP if you win!</p>
      </div>
    </div>
  );
}
