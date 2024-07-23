import { useAppContext } from "@/helpers/store";
import Swal from "sweetalert2";

export default function ChallengeButton({ userData, onChallengeButtonClick }) {
  const context = useAppContext();
  if (!context?.loggedIn?.uid) return <div />;

  const { client } = userData;
  const xpSteal = Math.floor(userData?.dataByClient[client.id]?.xp / 10);

  const isNotAbleToBattle = () => {
    console.log(context.profile);
    if (
      !context?.profile?.dataByClient?.[client.id]?.xp ||
      context?.profile?.dataByClient?.[client.id]?.xp < 10
    ) {
      return "You do not have enough XP to start this battle, try earning at least 10 XP first and then start the battle!";
    } else if (xpSteal < 1) {
      return (
        userData.companyName +
        " does not have enough XP for you to battle them!"
      );
    }
    return false;
  };

  const handleChallengeButtonClick = () => {
    const error = isNotAbleToBattle();
    if (error) {
      Swal.fire({
        title: "Oops",
        text: error,
        icon: "error",
        confirmButtonColor: client?.accentColor,
      });
      return;
    } else {
      onChallengeButtonClick();
    }
  };

  return (
    <div className="flex-1 flex justify-end mt-4">
      <div
        onClick={handleChallengeButtonClick}
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
