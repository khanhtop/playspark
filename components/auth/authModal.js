import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";
import { auth } from "@/helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function AuthModal({ action, closeModal, user }) {
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
        closeModal();
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
        closeModal();
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const forgot = () => {
    setLoading(true);
    if (email.length < 3 || !email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      alert(
        "A link has been sent to your email address, please ensure you check your spam folder if you cannot find it. "
      );
      closeModal();
      setLoading(false);
    });
  };

  // Requires Auth
  return (
    <div
      onClick={closeModal}
      className="h-screen w-screen fixed top-0 left-0 bg-black/10 backdrop-blur flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: user?.primaryColor,
          borderColor: user.accentColor,
          color: user.textColor,
        }}
        className="border-2 w-[90%] max-w-[500px] max-h-[90%] rounded-xl overflow-y-scroll "
      >
        <div className="h-full w-full flex items-center justify-center flex-col gap-2  pb-8">
          <div className="w-full flex flex-col flex-1 items-center gap-2 lg:px-8  h-full justify-start">
            <img className="h-[80px]" src={user.brandLogo} />
            <h1 className="text-xl text-white font-octo">
              {authState === "login" ? "Login" : "Sign Up"}
            </h1>

            <div className="flex flex-col  w-full px-8 lg:px-12">
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
                <StyledButton
                  user={user}
                  isLoading={loading}
                  onClick={() => login()}
                >
                  Login
                </StyledButton>
              )}
              {authState === "register" && (
                <StyledButton
                  user={user}
                  isLoading={loading}
                  onClick={() => register()}
                >
                  Register
                </StyledButton>
              )}
              {authState === "forgot" && (
                <StyledButton
                  reduceTop
                  user={user}
                  isLoading={loading}
                  onClick={() => forgot()}
                >
                  Send Reset Link
                </StyledButton>
              )}
            </div>
            {authState !== "forgot" && (
              <div className="flex gap-2">
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
            )}
            {authState !== "forgot" ? (
              <div className="flex gap-2 -mt-1 text-xs cursor-pointer">
                <p onClick={() => setAuthState("forgot")}>
                  Forgotten your password?
                </p>
              </div>
            ) : (
              <div className="flex gap-2 mt-1 text-xs cursor-pointer">
                <p onClick={() => setAuthState("login")}>Back</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabeledInput({ onChange, secure, label, placeholder }) {
  return (
    <div className="mt-4">
      <p className="ml-1 mb-2 font-slab font-extralight text-xs uppercase">
        {label}
      </p>
      <input
        className="font-slab w-full bg-black/5 bg-black/40 rounded-lg pb-3 pt-3 px-4"
        type={secure ? "password" : "text"}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function StyledButton({ onClick, children, isLoading, user, reduceTop }) {
  return (
    <button
      disabled={isLoading}
      style={{
        backgroundColor: user.accentColor,
        textColor: user.textColor,
        borderColor: user.accentColor,
        opacity: isLoading ? 0.3 : 1,
      }}
      className={`${
        isLoading ? "cursor-wait" : "hover:opacity-90 transition"
      }  border-2 rounded-xl text-xl font-slab py-4 ${
        reduceTop ? "mt-2" : "mt-12"
      }  gap-2 flex items-center justify-center`}
      onClick={onClick}
    >
      {isLoading && (
        <ArrowPathIcon className="animate-spin h-6 w-6 text-black" />
      )}
      <span>{isLoading ? "Thinking..." : children}</span>
    </button>
  );
}
