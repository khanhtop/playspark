import { useState } from "react";
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Navbar from "@/components/nav/navbar";
import dynamic from "next/dynamic";
import Hero from "@/components/homepage/hero";
import Section from "@/components/homepage/section";
import TextSection from "@/components/homepage/textSection";
import PaySection from "@/components/homepage/paySection";
import Carousel from "@/components/homepage/carousel";
import GamifySection from "@/components/homepage/gamifySection";
import VideoSection from "@/components/homepage/videoSection";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

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
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <Navbar />

      <Section backgroundImage="icon.png">
        <Hero />
      </Section>
      <Section>
        <TextSection />
      </Section>
      <Section>
        <VideoSection />
      </Section>
      <Section>
        <Carousel />
      </Section>
      <Section>
        <GamifySection />
      </Section>
      <Section>
        <PaySection />
      </Section>

      {/* <div className="w-screen flex flex-col justify-center bg-gradient-to-b from-[#000] to-[#000]  items-center ">
        <div className="gap-8 h-screen w-screen  flex w-full max-w-[1200px] px-4 md:px-12 gap-2">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start">
            <img className="-my-[10%] -mx-[8%] " src="/branding/logo2.png" />
            <h3 className="text-2xl md:text-3xl lg:text-6xl text-white font-bold">
              SPORTS ADVERTISING
            </h3>
            <h3 className="text-3xl md:text-3xl lg:text-6xl text-white font-bold md:mb-8 mb-4 ">
              SUPERCHARGED
            </h3>
            <h5 className="md:text-xl text-white/60 font-extralight text-center md:text-left">
              Dynamic playable ads that generate a higher ROI and engagement for
              your sports media website or app.
            </h5>
            <MuxPlayer
              playbackId="jes2JpY021gTDjtGdbxMMUq6BjSgcdJXjdMJ7CcFmb2Q"
              className="mt-4 block md:hidden"
              metadata={{
                video_id: "video-id-123456",
                video_title: "Bick Buck Bunny",
                viewer_user_id: "user-id-bc-789",
              }}
              streamType="on-demand"
            />
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
                  className="flex items-center justify-center w-24 bg-cyan-300 hover:bg-sky-900 hover:text-white  transition text-black py-2 uppercase font-bold tracking-wide rounded-tr-lg rounded-br-lg h-full"
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
                className="bg-cyan-300 hover:bg-sky-900 hover:text-white transition w-[220px] md:w-[300px] text-black py-2 uppercase font-bold tracking-wide rounded-lg mt-8"
              >
                Join Waitlist
              </button>
            )}
          </div>
          <div className="hidden flex-1 md:flex items-center">
            <MuxPlayer
              playbackId="jes2JpY021gTDjtGdbxMMUq6BjSgcdJXjdMJ7CcFmb2Q"
              className="border-cyan-300 border-2 rounded-lg overflow-hidden"
              metadata={{
                video_id: "video-id-123456",
                video_title: "Bick Buck Bunny",
                viewer_user_id: "user-id-bc-789",
              }}
              streamType="on-demand"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
