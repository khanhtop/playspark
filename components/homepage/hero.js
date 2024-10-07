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
      className="lg:min-h-[710px] min-h-[1000px]  bg-cover flex  bg-gradient-to-t from-back to-white  "
    >
      <div className="flex flex-col md:flex-col lg:flex-row text-black bg-cover px-8 lg:px-12  lg:gap-8 bg-black/0 items-center">
        <div className="flex flex-col items-center  lg:items-start justify-center flex-1 text-center lg:text-left gap-6 lg:gap-7 min-w-[364px]  lg:w-2/3 pt-40 pb-32 ">
          <h1 className=" lg:text-[90px] text-[48px] font-bold leading-[48px] lg:leading-[90px] max-w-[606px] font-sans">
            {page.hero_title_text}
          </h1>
          <h1 className="text-xl lg:text-2xl font-light mt-4">
            {page.hero_subtext}
          </h1>
          <button
            onClick={() => router.push("/admin")}
            className="bg-free px-5 py-3 rounded-[30px] mt-4 font-medium text-[24px] lg:text-2xl"
          >
            Start Creating Your Game
          </button>
        </div>
        <div className=" flex items-center justify-start lg:justify-center pt-0 lg:pt-[107px] pb-0 lg:pb-[51px]   w-full lg:w-1/3">
          <img
          src={page.hero_image.url}
          className=" w-[369px] h-[552px] "
        />
        </div>
      </div>
    </div>
  );
}
