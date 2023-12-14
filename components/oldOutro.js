import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAppContext } from "@/helpers/store";
import Leaderboard from "./dash/leaderboard";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import BannerAd from "./advertising/bannerAd";
import Text from "./ui/text";
import UIButton from "./ui/button";
import EmailSlide from "./forms/emailSlide";
import { WinModal } from "./ui/modalTypes";
import ShareButton from "./ui/shareButton";

export default function OldOutro({
  score,
  setStage,
  data,
  leaderboard,
  prevBest,
  onReset,
}) {
  const context = useAppContext();
  console.log("PREV", prevBest);

  const selectStage = () => {
    const possibleRouting = [];
    if (data.demo) return 1;
    if (data.sponsoredVideo && !context.hasSeenVideo) possibleRouting.push(3);
    if (data.survey && !context.hasSeenSurvey) possibleRouting.push(4);
    if (data.playableAd) possibleRouting.push(5);
    if (possibleRouting.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleRouting.length);
      return possibleRouting[randomIndex];
    } else {
      return 1;
    }
  };

  return (
    <div className="bg-[#222] h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-2xl text-black font-light h-[80%] portrait:h-[90%] w-[90%] relative flex items-center justify-start flex-col">
        {!context.hasSubscribedToList && <EmailSlide data={data} />}

        <div
          style={{ backgroundColor: data.primaryColor }}
          className="text-white absolute w-[80%] h-12 border-2 border-white left-[10%] -mt-4 rounded-full flex items-center justify-center z-10"
        >
          <p className="font-octo text-2xl">Game Over</p>
        </div>

        <div className="overflow-y-scroll h-full w-full flex portrait:flex-col portrait:items-center pt-12 pb-8">
          <div className="min-w-[300px] flex flex-col items-center">
            <Text {...data} className="font-bold text-sm w-full text-center">
              Your Score
            </Text>

            <Text
              {...data}
              style={{ color: data.primaryColor }}
              className="text-4xl mb-1 font-light"
            >
              {score}
            </Text>
            <ShareButton data={data} score={score} />
            {prevBest && (
              <p className="font-octo">
                Personal Best: {score > prevBest ? score : prevBest} ( Rank{" "}
                {leaderboard.findIndex(
                  (a) => a.uid === context?.loggedIn?.uid
                ) + 1}{" "}
                / {leaderboard.length})
              </p>
            )}
            {score > 0 && score > prevBest && (
              <Ranking
                pos={
                  leaderboard.findIndex(
                    (a) => a.uid === context?.loggedIn?.uid
                  ) + 1
                }
                best={leaderboard.length}
                uid={context?.loggedIn?.uid}
                data={data}
              />
            )}

            <button
              className="font-octo text-2xl"
              onClick={() => {
                context.setModal({
                  title: "Leaderboard",
                  onClose: () => {
                    context.setModal();
                  },
                  contents: (
                    <Leaderboard
                      gameData={data}
                      data={leaderboard}
                      primaryColor={data.primaryColor}
                      textColor={data.textColor}
                    />
                  ),
                });
              }}
            >
              View Leaderboard
            </button>
            <div className="flex w-[80%] flex-col portrait:hidden">
              <UIButton
                text="Revive"
                {...data}
                onClick={() => setStage(selectStage())}
                className="h-8 text-xs rounded-full mt-0"
              />
              <UIButton
                text="Restart"
                {...data}
                onClick={() => onReset()}
                className="h-8 text-xs rounded-full mt-2"
              />
            </div>
          </div>
          <button
            className="font-octo text-2xl"
            onClick={() => {
              context.setModal({
                title: "Leaderboard",
                onClose: () => {
                  context.setModal();
                },
                contents: <SignUp data={data} />,
              });
            }}
          >
            View O
          </button>
          <div className="h-4" />
          {!context?.loggedIn?.uid && <SignUp data={data} />}
          <div className="text-white mt-4 landscape:hidden">
            {!context?.loggedIn?.uid && (
              <p className="text-black/60 text-center">OR</p>
            )}
            <div className="flex flex-col">
              <UIButton
                text="Revive"
                {...data}
                onClick={() => setStage(selectStage())}
                className="h-12  rounded-full mt-4"
              />
              <UIButton
                text="Restart"
                {...data}
                onClick={() => onReset()}
                className="h-12 rounded-full mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ranking({ pos, best, uid, data }) {
  return (
    <div className="flex mb-4 mt-2 items-center">
      <p className="text-center flex-1 text-xs">
        {uid ? "You Ranked" : "You Could Be Ranked"}
      </p>
      <img
        src="/ui/cup.png"
        className="animate-bounce h-12 w-12 object-contain"
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Text {...data} className="text-2xl">
          # {pos}{" "}
        </Text>
        <Text {...data} className="flex-1 text-center text-xs">
          of {best}
        </Text>
      </div>
    </div>
  );
}

function SignUp({ data }) {
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        verifyUserTracked(user.user.uid);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const signUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setDoc(
          doc(firestore, "users", user.user.uid),
          {
            email: email,
            uid: user.user.uid,
            companyName: name,
          },
          { merge: true }
        );
        verifyUserTracked(user.user.id, true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const verifyUserTracked = async (id, withName) => {
    if (withName) {
      setDoc(
        doc(firestore, "users", data.ownerId, "users", email),
        {
          active: true,
          name: name,
          id: id ?? "",
        },
        { merge: true }
      );
    } else {
      setDoc(
        doc(firestore, "users", data.ownerId, "users", email),
        {
          active: true,
          id: id ?? "",
        },
        { merge: true }
      );
    }
  };

  return (
    <div className="border-2 flex-1 pb-8 w-[80%] h-full overflow-y-scroll border-black/30 flex rounded-2xl mx-4 bg-white flex-col items-center justify-center relative ">
      {stage === 0 && (
        <div className=" px-4 text-white top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="flex text-black items-center justify-center gap-4">
            <InformationCircleIcon
              style={{ color: data.primaryColor }}
              className="h-24 w-24"
            />
            <p className="text-xs flex-12">
              Sign up or login to get your score on the leaderboard and access
              prizes.
            </p>
          </div>

          <UIButton
            {...data}
            text="Start"
            small
            onClick={() => setStage(1)}
            style={{
              backgroundColor: data.primaryColor,
              color: data.textColor,
              fontSize: 12,
            }}
            className="mt-4 rounded-full text-white text-lg"
          ></UIButton>
        </div>
      )}
      {stage === 1 && (
        <div className="py-4 h-full w-full text-black top-0 left-0 w-full h-full flex flex-col items-center">
          <div className="w-full flex px-8 mb-4">
            <p
              onClick={() => setPhase("signup")}
              className={`${
                phase === "signup" ? "text-black" : "text-black/30"
              } flex-1 text-center cursor-pointer font-octo text-xl`}
            >
              Sign Up
            </p>
            <p
              onClick={() => setPhase("login")}
              className={`${
                phase === "login" ? "text-black" : "text-black/30"
              } flex-1 text-center cursor-pointer font-octo text-xl`}
            >
              Login
            </p>
          </div>
          {phase === "signup" && (
            <input
              className="bg-gray-200 px-2 py-2 mt-2 font-sans rounded-lg w-[80%]"
              placeholder="User Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            className="bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg  w-[80%]"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg  w-[80%]"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-[10px] mt-2 text-red-500 font-bold">{error}</p>
          )}

          <UIButton
            {...data}
            text={phase === "signup" ? "Sign Up" : "Login"}
            onClick={() => (phase === "signup" ? signUp() : signIn())}
            className="mt-4 rounded-full text-white"
          ></UIButton>
        </div>
      )}
    </div>
  );
}
