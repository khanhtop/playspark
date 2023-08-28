import { useState } from "react";

export default function Home() {
  const [reveal, setReveal] = useState(false);

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-white to-blue-500 flex justify-center">
      <div className="flex w-full max-w-[1200px] px-4 md:px-12 gap-2">
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
                placeHolder="Enter Email"
                className="flex-1 h-full px-3 rounded-tl-lg rounded-bl-lg"
              />
              <button
                onClick={() => setReveal(true)}
                className="w-24 bg-purple-500 hover:bg-purple-700 transition text-white py-2 uppercase font-bold tracking-wide rounded-tr-lg rounded-br-lg h-full"
              >
                Submit
              </button>
            </div>
          ) : (
            <button
              onClick={() => setReveal(true)}
              className="bg-purple-500 hover:bg-purple-700 transition w-[220px] md:w-[300px] text-white py-2 uppercase font-bold tracking-wide rounded-lg mt-8"
            >
              Join Waitlist
            </button>
          )}
        </div>
        <div className="hidden w-[400px] md:flex items-center">
          <img src="/branding/header-image.png" />
        </div>
      </div>
    </div>
  );
}
