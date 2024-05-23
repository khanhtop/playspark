import { AppWrapper } from "@/helpers/store";
import "@/styles/globals.css";
import localFont from "@next/font/local";
import { Roboto, Tilt_Neon, VT323, Play } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const titan = localFont({
  src: [
    {
      path: "../public/fonts/TitanOne-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-titan",
});

const anton = localFont({
  src: [
    {
      path: "../public/fonts/anton.ttf",
      weight: "400",
    },
  ],
  variable: "--font-anton",
});

// const octomed = localFont({
//   src: [
//     {
//       path: "../public/fonts/octomed.ttf",
//       weight: "400",
//     },
//   ],
//   variable: "--font-octo",
// });

const octomed = Play({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-octo",
  display: "swap",
});

const octolight = Play({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-octolight",
  display: "swap",
});

// const octolight = localFont({
//   src: [
//     {
//       path: "../public/fonts/octolight.ttf",
//       weight: "400",
//     },
//   ],
//   variable: "--font-octolight",
// });

// const pixel = localFont({
//   src: [
//     {
//       path: "../public/fonts/Gamer.ttf",
//       weight: "400",
//     },
//   ],
//   variable: "--font-pixel",
// });

const pixel = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const tiltneon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tilt-neon",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.asPath;
  useEffect(() => {
    // alert(path);
    if (path) {
      const manifestElement = document.getElementById("manifest");
      const manifestString = JSON.stringify({
        ...manifest,
        start_url: `/${path}`,
      });
      manifestElement?.setAttribute(
        "href",
        "data:application/json;charset=utf-8," +
          encodeURIComponent(manifestString)
      );
    }
  }, [path]);

  return (
    <main
      className={`${titan.variable} ${roboto.variable} ${tiltneon.variable} ${pixel.variable} ${anton.variable} ${octomed.variable} ${octolight.variable} font-sans font-roboto`}
    >
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </main>
  );
}
