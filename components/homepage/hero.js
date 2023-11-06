import { ArrowPathIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Hero() {
  const [reveal, setReveal] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const addToList = async () => {
    if (email.length < 6 || !email.includes("@")) {
      alert("Please ensure the email address is correctly formatted");
      return;
    }
    setLoading(true);
    const formatted = email.toLowerCase().trim();
    await fetch("/api/addToHubspot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formatted,
      }),
    });
    setLoading(false);
    setEmail("");
    setReveal(false);
    alert("Email address has been added!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[url('/homepage/hero.png')] bg-cover">
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#000123]/90">
        <div className="max-w-[50%] relative z-0">
          <img
            src="/homepage/star.png"
            className="absolute w-10 lg:w-24 bottom-[40%] -left-12 md:-left-24 -z-1"
          />
          <img
            src="/homepage/1up.png"
            className="absolute w-16 lg:w-36 bottom-[80%] -right-16 lg:-right-40 z-10"
          />
          <h1 className="font-anton text-[40px] leading-[45px] lg:text-[120px] lg:leading-[140px] text-center mb-4 md:mb-8">
            <span className="text-cyan-500">Level Up</span>
            {` `} Your Fan Activation
          </h1>
        </div>

        <h3 className="max-w-[60%] font-octolight text-sm md:text-3xl">
          Plug and play rewarded mobile games that generate higher acquisition,
          retention and advertising revenue for sports media, sports team and
          athlete platforms.
        </h3>
        {reveal ? (
          <div className="flex h-12 mt-8">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeHolder="Enter Email"
              className="flex-1 h-full px-6 rounded-tl-full rounded-bl-full text-black"
            />

            <button
              disabled={loading}
              onClick={() => addToList()}
              className="flex items-center justify-center w-24 bg-cyan-400 hover:bg-sky-900 hover:text-white  transition text-black py-2 uppercase font-bold tracking-wide rounded-tr-full rounded-br-full h-full"
            >
              {!loading ? (
                <p className="text-sm">Submit</p>
              ) : (
                <ArrowPathIcon className="animate-spin h-6 w-6 text-white" />
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setReveal(true)}
            className="font-anton text-xl bg-cyan-500 px-8 py-2 rounded-full flex items-center justify-center gap-4 mt-8"
          >
            Join The Waitlist
            <ArrowRightCircleIcon className="h-8 w-8" />
          </button>
        )}
      </div>
    </div>
  );
}
