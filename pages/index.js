import { useState } from "react";
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import MuxPlayer from "@mux/mux-player-react";

export default function Home() {
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
    <>
      <div className="flex flex-col justify-center">
        <div className="bg-gradient-to-b from-white to-indigo-500  h-screen w-screen  flex w-full max-w-[1200px] px-4 md:px-12 gap-2">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start">
            <img className="-my-[10%] -mx-[8%] " src="/branding/logo.png" />
            <h3 className="text-2xl md:text-6xl text-white font-bold">
              SPORTS ADVERTISING
            </h3>
            <h3 className="text-3xl md:text-6xl text-white font-bold mb-8 ">
              SUPERCHARGED
            </h3>
            <h5 className="md:text-xl text-white/60 font-extralight text-center md:text-left">
              Dynamic playable ads that generate a higher ROI and engagement for
              your sports media website or app.
            </h5>
            {reveal ? (
              <div className="flex h-10 mt-8">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeHolder="Enter Email"
                  className="flex-1 h-full px-3 rounded-tl-lg rounded-bl-lg"
                />

                <button
                  disabled={loading}
                  onClick={() => addToList()}
                  className="flex items-center justify-center w-24 bg-purple-500 hover:bg-purple-700 transition text-white py-2 uppercase font-bold tracking-wide rounded-tr-lg rounded-br-lg h-full"
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
                className="bg-purple-600 hover:bg-purple-700 transition w-[220px] md:w-[300px] text-white py-2 uppercase font-bold tracking-wide rounded-lg mt-8"
              >
                Join Waitlist
              </button>
            )}
          </div>
          <div className="hidden w-[400px] md:flex items-center">
            <img src="/branding/header-image.png" />
          </div>
        </div>
        <div className="bg-indigo-500 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl uppercase text-white">Learn More</h1>
            <div className="flex gap-2">
              <p className="text-white/75">Watch our introductory video</p>
              <ChevronDownIcon className="h-6 w-6 animate-bounce text-white/75" />
            </div>
          </div>

          <MuxPlayer
            playbackId="jes2JpY021gTDjtGdbxMMUq6BjSgcdJXjdMJ7CcFmb2Q"
            className="mt-4"
            // metadata={{
            //   video_id: "video-id-123456",
            //   video_title: "Bick Buck Bunny",
            //   viewer_user_id: "user-id-bc-789",
            // }}
            streamType="on-demand"
          />
        </div>
        <div className="text-white py-12 bg-indigo-500 flex flex-col items-center">
          <p>(c) PlaySpark 2023</p>
        </div>
      </div>
    </>
  );
}
