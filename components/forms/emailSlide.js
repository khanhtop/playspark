import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";
import Input from "./input";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import { incrementOptInCount } from "@/helpers/api";

export default function EmailSlide({ data }) {
  const context = useAppContext();
  const [opacity, setOpacity] = useState(0);
  const [height, setHeight] = useState(false);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpacity(1);
    setHeight(true);
  }, []);

  useEffect(() => {
    if (context?.loggedIn?.email) setEmail(context?.loggedIn?.email);
  }, [context?.loggedIn]);

  const submitToList = async () => {
    setLoading(true);
    await setDoc(
      doc(firestore, "users", data.ownerId, "emails", email),
      {
        consented: true,
      },
      { merge: true }
    );
    await incrementOptInCount(data.tournamentId);
    context.setHasSubscribedToList(true);
    setLoading(false);
  };

  if (!data.captureEmail) return <div />;

  return (
    <div
      style={{
        opacity: opacity,
        transition: "0.5s opacity",
      }}
      className="fixed top-0 left-0 bg-black/95 h-full w-full z-30"
    >
      <div
        style={{ bottom: height ? 0 : "-75vh", transition: "0.5s bottom" }}
        className="absolute h-3/4 px-4 w-full bg-white rounded-tl-2xl rounded-tr-2xl flex flex-col items-center"
      >
        <img
          src={data.brandLogo ?? "/branding/logo2.png"}
          className="w-3/4 max-w-[200px] pt-4 pb-4"
        />
        <h3 className="px-4 text-sm text-center w-full">
          {data.customEmailText ??
            `
          ${data?.companyName ? data.companyName : "The sponsor"} would like to
          send you updates and information through email, would you like to be
          included?`}
        </h3>
        <div className="flex w-full portrait:flex-col lg:flex-col gap-4 justify-center items-center">
          {!context?.loggedIn?.email && (
            <div className="w-full max-w-[360px] flex flex-col items-center mt-6">
              {/* <p className="w-full text-xs ml-8 mb-1">Enter Email Address</p> */}
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="h-12 w-full bg-[#DDD] rounded-full px-6"
              ></input>
            </div>
          )}
          <div className="w-full max-w-[360px] flex portrait:flex-col gap-4 mt-6">
            <button
              disabled={loading}
              onClick={() => submitToList()}
              className="bg-cyan-400 w-full h-12 rounded-full text-xl font-bold flex justify-center items-center"
            >
              {loading ? (
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Yes Please"
              )}
            </button>
            <button
              onClick={() => context.setHasSubscribedToList(true)}
              disabled={loading}
              className="bg-[#DDD] w-full h-12 rounded-full text-xl"
            >
              No Thanks
            </button>
          </div>
        </div>
        <p className="text-xs mt-2">
          By opting in, you are agreeing to our{" "}
          <a
            target="__blank"
            className="text-cyan-500 underline"
            href={`/terms?companyName=${
              context?.profile?.companyName ?? "PlaySpark"
            }`}
          >
            Terms and Conditions
          </a>
        </p>
      </div>
    </div>
  );
}
