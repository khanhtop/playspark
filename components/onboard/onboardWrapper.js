import { useAppContext } from "@/helpers/store";
import { useState, useEffect } from "react";
import Input from "../forms/input";
import CardSelect from "./cardSelect";
import {
  ListBulletIcon,
  PlayCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { setDocument } from "@/helpers/firebaseApi";

export default function OnboardWrapper({ children }) {
  const context = useAppContext();
  const [stage, setStage] = useState(0);

  // Params
  const [companyName, setCompanyName] = useState("");
  const [purpose, setPurpose] = useState(0);

  // Methods

  const saveProfile = async () => {
    await setDocument("users", context.loggedIn?.uid, {
      tier: 0,
      companyName: companyName,
      purpose: purpose,
      hasOnboarded: true,
    });
    // await setDoc(doc(firestore, "users", context.loggedIn?.uid), {
    //   tier: 0,
    //   companyName: companyName,
    //   purpose: purpose,
    //   hasOnboarded: true,
    // });
  };

  if (!context.profile) {
    return <div className="h-screen w-screen bg-black" />;
  } else if (context?.profile?.hasOnboarded) {
    return children;
  } else {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
        {stage === 0 ? (
          <InnerWrap
            continueWhen={companyName?.length > 2}
            onContinue={() => setStage(1)}
            text="Get started by telling us your company name."
          >
            <Input
              value={companyName}
              placeHolder="Company Name"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </InnerWrap>
        ) : stage === 1 ? (
          <InnerWrap
            continueWhen={companyName?.length > 2}
            onContinue={() => saveProfile()}
            text="What are you primarily using PlaySpark for?"
          >
            <CardSelect
              setSelected={(a) => setPurpose(a)}
              selected={purpose}
              options={[
                {
                  text: "Create Custom Rewarded Video Ads",
                  icon: <ListBulletIcon />,
                },
                {
                  text: "Show Playable Ads On My Website",
                  icon: <PlayCircleIcon />,
                },
                {
                  text: "Show Playable and Video Ads On My Website",
                  icon: <PlayIcon />,
                },
              ]}
            />
          </InnerWrap>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function InnerWrap({ children, text, continueWhen, onContinue }) {
  return (
    <div className="w-1/2 text-white flex flex-col items-center">
      <img
        src="/branding/logo2.png"
        className="w-full max-w-[400px] -my-[50px]"
      />
      <p className="mt-2 mb-6 text-sm text-white/80 max-w-[300px]">{text}</p>
      {children}
      <button
        onClick={onContinue}
        disabled={!continueWhen}
        className={`rounded-md font-bold ${
          continueWhen
            ? "bg-cyan-300 text-black"
            : "bg-cyan-300/50 text-black/50"
        }  px-4 py-2 mt-6`}
      >
        Continue
      </button>
    </div>
  );
}
