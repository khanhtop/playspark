import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";
import { auth, logout } from "@/helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { setDoc } from "firebase/firestore";

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

 if (context.isAuthed && context.loggedIn && !context?.profile?.isAdmin) {
    return (
      <div className="bg-black h-screen w-screen text-white font-octo flex items-center justify-center flex-col">
        <h1 className="text-xl mb-4">
          You do not have permissions to access this page.
        </h1>
        <button
          onClick={() => logout()}
          className="bg-cyan-500 px-8 py-2 rounded-xl text-xl"
        >
          Logout
        </button>
      </div>
    );
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
          <div className="flex flex-row-reverse h-full w-full">
            <div className="flex-1 hidden lg:block ">
              <div className="bg-[#1A202C] h-full px-24 w-full flex items-center justify-center text-white flex-col">
                <img src="/homepage/carousel1.png" className="w-full" />
              </div>
            </div>
            <div className="flex flex-col flex-1 max-w-[500px] items-center gap-2 lg:px-8 bg-[#364153] h-full justify-center">
              <img className="h-[120px]" src="/branding/block-color.png" />
              <h1 className="text-xl text-white">
                {authState === "login" ? "Login" : "Sign Up"}
              </h1>

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
              <div className="text-white flex gap-2">
                <p>
                  {authState === "register"
                    ? "Already have an account?"
                    : "Don't have an account"}
                </p>
                <p
                  onClick={() =>
                    setAuthState(authState === "login" ? "register" : "login")
                  }
                  className="text-cyan-400 cursor-pointer"
                >
                  {authState === "register" ? "Login" : "Sign Up"}
                </p>
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
    <div className="mt-4">
      <p className="ml-1 mb-2 font-slab text-white font-extralight text-xs uppercase">
        {label}
      </p>
      <input
        className="font-slab w-full bg-transparent bg-black/40 rounded-lg pb-3 pt-3 text-white px-4"
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
          : "bg-[#38DBFF] hover:opacity-70 hover:text-white text-white hover:opacity-90 transition"
      }   rounded-xl text-xl font-slab py-4 mt-12 gap-2 flex items-center justify-center`}
      onClick={onClick}
    >
      {isLoading && (
        <ArrowPathIcon className="animate-spin h-6 w-6 text-black" />
      )}
      <span>{isLoading ? "Thinking..." : children}</span>
    </button>
  );
}
