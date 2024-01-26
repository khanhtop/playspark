import {
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/helpers/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import UIButton from "../ui/button";
import { useAppContext } from "@/helpers/store";
import { loginEvent, signupEvent } from "@/helpers/events";

export default function SignUp({ data, closeDialog }) {
  const context = useAppContext();
  const [phase, setPhase] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [errorSource, setErrorSource] = useState({
    email: false,
    password: false,
    name: false,
  });
  const [loading, setLoading] = useState(false);

  const validateBasicPayload = () => {
    let errors = [];

    if (email.length < 6 || !email.includes("@")) {
      setErrorSource((prevErrorSource) => ({
        ...prevErrorSource,
        email: true,
      }));
      errors.push("your email address is valid");
    }

    if (phase !== "forgot" && password.length < 6) {
      setErrorSource((prevErrorSource) => ({
        ...prevErrorSource,
        password: true,
      }));
      errors.push("your password is at least 6 characters");
    }

    if (phase === "signup" && name.length < 3) {
      setErrorSource((prevErrorSource) => ({ ...prevErrorSource, name: true }));
      errors.push("you have entered your name");
    }

    if (errors.length > 0) {
      let errorMessage = "Please ensure that ";
      if (errors.length === 1) {
        errorMessage += errors[0];
      } else {
        errorMessage +=
          errors.slice(0, -1).join(", ") + " and " + errors[errors.length - 1];
      }

      alert(errorMessage);

      return false;
    } else {
      return true;
    }
  };

  const translateFirebaseErrorCode = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "User account is disabled";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/email-already-in-use":
        return "Email is already in use. Try another email or sign in.";
      case "auth/weak-password":
        return "Password is too weak. Choose a stronger password.";
      case "auth/operation-not-allowed":
        return "Operation not allowed. Please contact support.";
      case "auth/missing-verification-code":
        return "Missing verification code. Please check your email.";
      case "auth/expired-action-code":
        return "Expired action code. Please request a new one.";
      case "auth/invalid-action-code":
        return "Invalid action code. Please double-check the code.";
      case "auth/invalid-verification-code":
        return "Invalid verification code. Please double-check the code.";
      case "auth/requires-recent-login":
        return "Action requires recent login. Please sign in again.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const signIn = async () => {
    if (!validateBasicPayload()) return;
    setLoading(true);
    await signInWithEmailAndPassword(auth, email.trim(), password)
      .then(async (user) => {
        loginEvent(context);
        await verifyUserTracked(user.user.uid);
        closeDialog();
      })
      .catch((error) => {
        setLoading(false);
        alert(translateFirebaseErrorCode(error.code));
      });
  };

  const signUp = async () => {
    if (!validateBasicPayload()) return;
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email.trim(), password)
      .then(async (user) => {
        await setDoc(
          doc(firestore, "users", user.user.uid),
          {
            email: email.trim(),
            uid: user.user.uid,
            companyName: name,
          },
          { merge: true }
        );
        signupEvent(context);
        await verifyUserTracked(user.user.id, true);
        closeDialog();
      })
      .catch((error) => {
        setLoading(false);
        alert(translateFirebaseErrorCode(error.code));
      });
  };

  const verifyUserTracked = async (id, withName) => {
    if (withName) {
      await setDoc(
        doc(firestore, "users", data.ownerId, "users", email.trim()),
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
        doc(firestore, "users", data.ownerId, "users", email.trim()),
        {
          active: true,
          id: id ?? "",
        },
        { merge: true }
      );
      return;
    }
  };

  const forgotPassword = async () => {
    if (!validateBasicPayload()) return;
    setLoading(true);
    await sendPasswordResetEmail(auth, email.trim())
      .then(async (user) => {
        alert(
          "Please check your inbox and spam folders for password reset instructions"
        );
        closeDialog();
      })
      .catch((error) => {
        setLoading(false);
        alert(translateFirebaseErrorCode(error.code));
      });
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
        <div className="w-full flex px-20 mb-4">
          <p
            style={{
              backgroundColor:
                phase === "signup" ? data.primaryColor : "transparent",
            }}
            onClick={() => {
              setErrorSource({
                email: false,
                password: false,
                name: false,
              });
              setPhase("signup");
            }}
            className={`${
              phase === "signup" ? "text-white" : "text-black"
            } flex-1 py-2 text-center cursor-pointer font-octo text-xl`}
          >
            Sign Up
          </p>
          <p
            onClick={() => {
              setErrorSource({
                email: false,
                password: false,
                name: false,
              });
              setPhase("login");
            }}
            style={{
              backgroundColor:
                phase === "login" ? data.primaryColor : "transparent",
            }}
            className={`${
              phase === "login" ? "text-white" : "text-black"
            } flex-1 text-center py-2 cursor-pointer font-octo text-xl`}
          >
            Login
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
              className={`${
                errorSource.email ? "border-red-500/50" : "border-transparent"
              } border-2 bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg  w-[90%]`}
              placeholder="Email"
              onChange={(e) => {
                setErrorSource({ ...errorSource, email: false });
                setEmail(e.target.value);
              }}
            />
            {phase !== "forgot" && (
              <input
                className={`${
                  errorSource.password
                    ? "border-red-500/50"
                    : "border-transparent"
                } border-2 bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg  w-[90%]`}
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setErrorSource({ ...errorSource, password: false });
                  setPassword(e.target.value);
                }}
              />
            )}
          </div>
          <div className="flex-1  flex flex-col items-center">
            {phase === "signup" && (
              <input
                className={`${
                  errorSource.name ? "border-red-500/50" : "border-transparent"
                } border-2 bg-gray-200 px-2 py-2 mt-2 font-sans  rounded-lg  w-[90%]`}
                placeholder="User Name"
                onChange={(e) => {
                  setErrorSource({ ...errorSource, name: false });
                  setName(e.target.value);
                }}
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
                  ? forgotPassword()
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
