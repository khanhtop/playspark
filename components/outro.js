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

export default function Outro({ score, setStage, data, leaderboard }) {
  const context = useAppContext();

  return (
    <div className="bg-white text-black font-light pt-4 h-full w-full relative flex items-center justify-start flex-col">
      <Text {...data} className="text-2xl mb-4 font-titan ">
        Game Over
      </Text>
      <Text {...data} className="font-bold text-sm font-titan">
        Your Score
      </Text>
      <Text
        {...data}
        style={{ color: data.primaryColor }}
        className="text-4xl mb-4 font-titan font-light"
      >
        {score}
      </Text>
      <Ranking
        pos={leaderboard.findIndex((a) => a.uid === context?.loggedIn?.uid) + 1}
        best={leaderboard.length}
        uid={context?.loggedIn?.uid}
        data={data}
      />
      {!context?.loggedIn?.uid && <SignUp data={data} />}
      {context?.loggedIn?.uid && (
        <Leaderboard
          gameData={data}
          data={leaderboard}
          primaryColor={data.primaryColor}
          textColor={data.textColor}
        />
      )}
      <div className="text-white mt-4">
        {!context?.loggedIn?.uid && (
          <p className="text-black/60 text-center">OR</p>
        )}

        <UIButton
          text="Play Again"
          {...data}
          onClick={() => setStage(3)}
          className="h-12 mb-48 rounded-full mt-4 font-titan"
        ></UIButton>
        <BannerAd size="small" position="bottom" delay={1000} />
      </div>
    </div>
  );
}

function Ranking({ pos, best, uid, data }) {
  return (
    <div className="flex mb-4 items-center">
      <p className="text-center flex-1 text-xs">
        {uid ? "You Ranked" : "You Could Be Ranked"}
      </p>
      <img
        src="/ui/cup.png"
        className="animate-bounce h-12 w-12 object-contain"
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Text {...data} className="text-2xl font-titan">
          # {pos}{" "}
        </Text>
        <Text {...data} className="flex-1 text-center text-xs font-titan">
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

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    setDoc(
      doc(firestore, "users", user.user.uid),
      {
        email: email,
        uid: user.user.uid,
        companyName: name,
      },
      { merge: true }
    );
  };

  return (
    <div className="border-2 h-[280px] w-[80%] border-black/30 flex rounded-2xl mx-4 bg-white flex-col items-center justify-center relative ">
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
              } flex-1 text-center cursor-pointer`}
            >
              Sign Up
            </p>
            <p
              onClick={() => setPhase("login")}
              className={`${
                phase === "login" ? "text-black" : "text-black/30"
              } flex-1 text-center cursor-pointer`}
            >
              Login
            </p>
          </div>
          {phase === "signup" && (
            <input
              className="bg-gray-200 px-2 py-2 mt-2 font-sans rounded-lg"
              placeholder="User Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            className="bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
