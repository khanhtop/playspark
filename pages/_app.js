import { AppWrapper } from "@/helpers/store";
import "@/styles/globals.css";
import localFont from "@next/font/local";
import { Roboto } from "next/font/google";

const titan = localFont({
  src: [
    {
      path: "../public/fonts/TitanOne-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-titan",
});

const pixel = localFont({
  src: [
    {
      path: "../public/fonts/Gamer.ttf",
      weight: "400",
    },
  ],
  variable: "--font-pixel",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`${titan.variable} ${roboto.variable} ${pixel.variable} font-sans font-roboto`}
    >
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </main>
  );
}
