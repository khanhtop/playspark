import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";
import { auth } from "@/helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function AuthWrapper({ children, action }) {
  const context = useAppContext();
  const [authState, setAuthState] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  useEffect(() => {
    if (action) setAuthState(action);
  }, [action]);

  useEffect(() => {
    setError();
  }, [email, password]);

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const register = () => {
    setLoading(true);
    if (password !== confirm) {
      setError("Your password and confirm password do not match.");
      setLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  // Loading
  if (!context.isAuthed) {
    return <div className="h-screen w-screen bg-white" />;
  }

  // Logged In
  if (context.isAuthed && context.loggedIn) {
    return children;
  }

  // Requires Auth
  if (context.isAuthed && !context.loggedIn) {
    return (
      <>
        <div className="absolute top-0 h-screen w-screen text-gray-600 flex items-center justify-center flex-col gap-2">
          <div className="flex flex-row h-full w-full">
            <div className="flex-1 hidden lg:block ">
              <div className="bg-gradient-to-b from-black/95 to-black/80 h-full w-full flex items-center justify-center text-white flex-col">
                <img src="/branding/logo2.png" className="h-24" />
                <p className="text-2xl font-slab max-w-[60%] text-center font-light leading-[25px]">
                  Enter your email address and password to create an account or
                  sign in.
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-1 items-center gap-2 lg:px-8 bg-black/100 h-full justify-center">
              <div className="xs:text-xl lg:text-3xl flex gap-8 w-full px-8 lg:px-12 font-slab">
                <p
                  className={`${
                    authState === "register" ? "text-cyan-300" : "text-white/50"
                  } cursor-pointer hover:text-white transition`}
                  onClick={() => setAuthState("register")}
                >
                  Sign Up
                </p>
                <p
                  className={`${
                    authState === "login" ? "text-cyan-300" : "text-white/30"
                  } cursor-pointer hover:text-white transition`}
                  onClick={() => setAuthState("login")}
                >
                  Log In
                </p>
              </div>
              <div className="flex flex-col h-[400px] w-full px-8 lg:px-12">
                <LabeledInput
                  label="Email Address"
                  className="bg-white/10"
                  placeholder="Enter Email"
                  onChange={(a) => setEmail(a)}
                />
                {authState !== "forgot" && (
                  <LabeledInput
                    className="bg-black/10"
                    label="Password"
                    secure={true}
                    placeholder="Enter Password"
                    onChange={(a) => setPassword(a)}
                  />
                )}
                {authState === "register" && (
                  <LabeledInput
                    className="bg-black/10"
                    label="Confirm"
                    secure={true}
                    placeholder="Enter Password"
                    onChange={(a) => setConfirm(a)}
                  />
                )}
                {error && <p className="text-xs text-white/50 mt-6">{error}</p>}
                <div className="h-1" />
                {authState === "login" && (
                  <StyledButton isLoading={loading} onClick={() => login()}>
                    Login
                  </StyledButton>
                )}
                {authState === "register" && (
                  <StyledButton isLoading={loading} onClick={() => register()}>
                    Register
                  </StyledButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function LabeledInput({ onChange, secure, label, placeholder }) {
  return (
    <div className="mt-8">
      <p className="ml-3 font-slab text-white font-extralight text-xs uppercase">
        {label}
      </p>
      <input
        className="font-slab w-full bg-transparent border-b-[1px] border-b-white/30 pb-3 pt-3 text-white px-4"
        type={secure ? "password" : "text"}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function StyledButton({ onClick, children, isLoading }) {
  return (
    <button
      disabled={isLoading}
      className={`${
        isLoading
          ? "bg-cyan-300/50 cursor-wait text-black/30"
          : "bg-cyan-300 hover:bg-sky-900 hover:text-white text-black hover:opacity-90 transition"
      }   font-extrabold text-xl font-slab py-4 mt-12 gap-2 flex items-center justify-center`}
      onClick={onClick}
    >
      {isLoading && (
        <ArrowPathIcon className="animate-spin h-6 w-6 text-black" />
      )}
      <span>{isLoading ? "Thinking..." : children}</span>
    </button>
  );
}
