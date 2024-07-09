import SignUp from "@/components/forms/signUp";
import GameButton from "@/components/uiv2/gameButton";
import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function IntroModal({ data }) {
  const context = useAppContext();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const agree = async () => {
    setLoading(true);
    if (context?.loggedIn?.uid) {
      await updateDoc(doc(firestore, "users", context?.loggedIn?.uid), {
        termsAgreed: data.tournamentId ? arrayUnion(data.tournamentId) : "demo",
      });
    }

    setLoading(false);
    data.onClose();
  };

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full overflow-y-scroll">
      <div className="flex justify-center">
        {data.brandLogo && <img src={data.brandLogo} className="max-h-20" />}
      </div>
      <div className="flex items-center flex-col">
        <div className="max-w-[360px] flex flex-col">
          <IntroRow
            text="PLAY"
            description={
              data.instructions ||
              "Go for the high score and compete on the leaderboard!"
            }
          />
          <IntroRow text="EARN" description="Earn and collect in-game items" />
          <IntroRow text="WIN" description="Win great prizes!" />
        </div>
        <div className="flex max-w-[350px] my-4">
          <input
            value={checked}
            onChange={() => setChecked(!checked)}
            type="checkbox"
            className="scale-[200%] mt-1"
          />
          <p className="text-sm ml-8 text-black">
            By checking this box, I agree to the contest's{" "}
            <span
              className="underline cursor-pointer"
              onClick={() =>
                data.onLegalClick({
                  title: "Terms",
                  url: "https://drive.google.com/file/d/1H0wpj8pEn1LuZLtq7MjS2PLjEV6FPYzw/preview",
                })
              }
            >
              terms and conditions
            </span>
            ,{" "}
            <span
              className="underline cursor-pointer"
              onClick={() =>
                data.onLegalClick({
                  title: "Terms",
                  isTermsOfUse: true,
                  url: "https://drive.google.com/file/d/1H0wpj8pEn1LuZLtq7MjS2PLjEV6FPYzw/preview",
                })
              }
            >
              terms of use
            </span>{" "}
            and{" "}
            <span
              className="underline cursor-pointer"
              onClick={() =>
                data.onLegalClick({
                  title: "Privacy",
                  url: "https://drive.google.com/file/d/1nD9gqFa1hE10HPhpYtKLlO2saQpqXoD2/preview",
                })
              }
            >
              privacy policy
            </span>
            .
          </p>
        </div>
        <div className="mt-4">
          <GameButton
            disabled={!checked}
            isLoading={loading}
            onClick={() => agree()}
            bgColor={data.primaryColor}
            textColor={data.textColor}
            theme={data?.theme}
          >
            {loading ? (
              <ArrowPathIcon className="h-8 animate-spin" />
            ) : (
              "Continue"
            )}
          </GameButton>
        </div>
      </div>
    </div>
  );
}

function IntroRow({ text, description }) {
  return (
    <div className="flex gap-4 items-center h-20">
      <div className="w-[70px] flex items-start mt-1 flex-shrink-0">
        <div className="bg-orange-400 px-2 rounded-lg">
          <p className="text-xl font-titan font-light text-black">{text}</p>
        </div>
      </div>

      <p className="text-base font-octo text-light text-black/60 line-clamp-3">
        {description}
      </p>
    </div>
  );
}
