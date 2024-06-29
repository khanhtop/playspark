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
      style={{ backgroundImage: `url(${page.hero_background_image.url})` }}
      className="min-h-screen w-full flex flex-col lg:flex-row text-white bg-cover px-8 pt-20 lg:gap-8"
    >
      <div className="flex flex-col items-center lg:items-start justify-center flex-1 text-center lg:text-left gap-2">
        <h1 className="text-4xl xl:text-5xl font-bold">
          {page.hero_title_text}
        </h1>
        <h1 className="text-2xl xl:text-4xl font-light">{page.hero_subtext}</h1>
        <button className="bg-blue-500 px-6 py-3 rounded-full mt-4 font-bold text-xl lg:text-2xl">
          Start Creating Your Game
        </button>
      </div>
      <div className="flex flex-col items-center lg:items-start justify-center mb-12 lg:mb-0">
        <video className="rounded-xl" controls>
          <source src={page.hero_video?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
