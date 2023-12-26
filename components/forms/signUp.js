import {
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import UIButton from "../ui/button";
import { useAppContext } from "@/helpers/store";

export default function SignUp({ data, closeDialog }) {
  const context = useAppContext();
  const [phase, setPhase] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        await verifyUserTracked(user.user.uid);
        closeDialog();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  const signUp = async () => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        await setDoc(
          doc(firestore, "users", user.user.uid),
          {
            email: email,
            uid: user.user.uid,
            companyName: name,
          },
          { merge: true }
        );
        await verifyUserTracked(user.user.id, true);
        closeDialog();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  const verifyUserTracked = async (id, withName) => {
    if (withName) {
      await setDoc(
        doc(firestore, "users", data.ownerId, "users", email),
        {
          active: true,
          name: name,
          id: id ?? "",
        },
        { merge: true }
      );
      return;
    } else {
      await setDoc(
        doc(firestore, "users", data.ownerId, "users", email),
        {
          active: true,
          id: id ?? "",
        },
        { merge: true }
      );
      return;
    }
  };

  return (
    <div className="flex-1 pb-8 w-full h-full flex rounded-2xl   flex-col items-center justify-center relative ">
      {loading && (
        <div className="absolute h-full w-full bg-white/90 flex items-center justify-center z-30">
          <ArrowPathIcon className="h-12 w-12 animate-spin" />
        </div>
      )}
      <div className="py-4 h-full w-full text-black top-0 left-0 w-full h-full flex flex-col items-center">
        {/* Loading */}

        {/* Tabs */}
        <div className="w-full flex px-8 mb-4">
          <p
            onClick={() => setPhase("login")}
            className={`${
              phase === "login" ? "text-black" : "text-black/20"
            } flex-1 text-center cursor-pointer font-octo text-xl`}
          >
            Login
          </p>
          <p
            onClick={() => setPhase("signup")}
            className={`${
              phase === "signup" ? "text-black" : "text-black/20"
            } flex-1 text-center cursor-pointer font-octo text-xl`}
          >
            Sign Up
          </p>
        </div>
        {/* Form */}
        <div
          className={`flex ${
            data.landscape ? "flex-row" : "flex-col"
          } w-full h-full overflow-y-scroll`}
        >
          <div
            className={`${
              data.landscape && "flex-1"
            } flex flex-col items-center`}
          >
            <input
              className="bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg  w-[90%]"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {phase !== "forgot" && (
              <input
                className="bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg  w-[90%]"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>
          <div className="flex-1  flex flex-col items-center">
            {phase === "signup" && (
              <input
                className="bg-gray-200 px-2 py-2 mt-2 font-sans rounded-lg w-[90%]"
                placeholder="User Name"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {/* {error && (
            <p className="text-[10px] mt-2 text-red-500 font-bold">{error}</p>
          )} */}

            <UIButton
              {...data}
              text={
                phase === "signup"
                  ? "Sign Up"
                  : phase === "forgot"
                  ? "Send Link"
                  : "Login"
              }
              onClick={() =>
                phase === "signup"
                  ? signUp()
                  : phase === "forgot"
                  ? null
                  : signIn()
              }
              className="mt-2 rounded-full text-white font-normal rounded-xl w-[90%] h-[40px] text-[15px]"
            ></UIButton>
            {phase === "login" && (
              <button
                onClick={() => setPhase("forgot")}
                className="h-10 mt-2 flex items-center bg-black/20 w-[90%] rounded-xl justify-center"
              >
                <p>Forgot Password?</p>
              </button>
            )}
            {phase === "forgot" && (
              <button
                onClick={() => setPhase("login")}
                className="h-10 mt-2 flex items-center bg-black/20 w-[90%] rounded-xl justify-center"
              >
                <p>Back</p>
              </button>
            )}
          </div>
        </div>
        <p className="text-xs mt-2">
          By signing up, you are agreeing to our{" "}
          <a
            target="__blank"
            className="text-cyan-500 underline"
            href={`/terms?companyName=${
              context?.profile?.companyName ?? "PlaySpark"
            }`}
          >
            Terms and Conditions
          </a>
          <span className="mx-1">and</span>
          <a
            target="__blank"
            className="text-cyan-500 underline"
            href={`/privacy`}
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
