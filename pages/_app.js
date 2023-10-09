import { AppWrapper } from "@/helpers/store";
import "@/styles/globals.css";
import localFont from "@next/font/local";

const titan = localFont({
  src: [
    {
      path: "../public/fonts/TitanOne-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-titan",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${titan.variable} font-sans`}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </main>
  );
}
