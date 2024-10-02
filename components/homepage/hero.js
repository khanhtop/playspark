import { ArrowPathIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Hero({ page }) {
  const router = useRouter();
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
    <div
      // style={{ backgroundImage: `url(${page.hero_background_image.url})` }}
      className="min-h-[900px] bg-cover flex  bg-gradient-to-t from-back to-white"
    >
      <div className="flex flex-col lg:flex-row text-black bg-cover px-11 md:flex-col lg:px-40 pt-20  lg:gap-8 bg-black/0 items-center">
        <div className="flex flex-col items-center  lg:items-start justify-center flex-1 text-center lg:text-left gap-7 w-2/3">
          <h1 className=" lg:text-[90px] text-[48px] font-bold ">
            {page.hero_title_text}
          </h1>
          <h1 className="text-xl lg:text-2xl font-light lg:max-w-[500px] mt-4">
            {page.hero_subtext}
          </h1>
          <button
            onClick={() => router.push("/admin")}
            className="bg-free px-6 py-3 rounded-full mt-4 font-bold text-xl lg:text-2xl"
          >
            Start Creating Your Game
          </button>
        </div>
        <div className=" flex items-center justify-center lg:justify-start pt-11 mb-12 lg:mb-0 w-full  lg:w-1/3">
          <img
          src={page.hero_image.url}
          className=" lg:w-96 h-auto"
        />
        </div>
      </div>
    </div>
  );
}
