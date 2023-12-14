import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import UIButton from "../ui/button";

export default function SignUp({ data }) {
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
    <div className="flex-1 pb-8 w-full h-full overflow-y-scroll flex rounded-2xl   flex-col items-center justify-center relative ">
      {stage === 0 && (
        <div className=" px-4 text-white top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="flex text-black items-center justify-center gap-4">
            <InformationCircleIcon
              style={{ color: data.primaryColor }}
              className="h-12 w-12"
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
