import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <div className="z-20 fixed top-0 left-0 w-full h-24 text-black hidden lg:flex items-center justify-between px-8 bg-white/100 backdrop-blur">
        <img src="/ui/logo.png" className="h-full" />
        <div className="flex gap-4 font-bold">
          <Link className="hover:text-sky-600" href="/">
            Home
          </Link>
          <Link href="#">Products</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Case Studies</Link>
          <Link href="#">Blog</Link>
        </div>
        <button
          onClick={() => router.push("/admin")}
          className="bg-sky-500 px-4 py-2 text-white rounded-lg"
        >
          Free Demo
        </button>
      </div>
      <div
        style={{
          height: navOpen ? 300 : 60,
          transition: "0.25s height ease-in-out",
        }}
        className="z-20 fixed top-0 left-0 w-full text-black flex flex-col overflow-hidden lg:hidden  px-8 bg-white/100 backdrop-blur"
      >
        <div className="h-16 flex items-center justify-between w-full">
          <img src="/ui/logo.png" className="h-full" />
          {navOpen ? (
            <XMarkIcon
              onClick={() => setNavOpen(false)}
              className="h-12 w-12 text-black"
            />
          ) : (
            <Bars3Icon
              onClick={() => setNavOpen(true)}
              className="h-12 w-12 text-black"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 font-bold mt-2 px-3">
          <Link
            onClick={() => setNavOpen(false)}
            className="hover:text-sky-600"
            href="/"
          >
            Home
          </Link>
          <Link onClick={() => setNavOpen(false)} href="#">
            Products
          </Link>
          <Link onClick={() => setNavOpen(false)} href="#">
            Pricing
          </Link>
          <Link onClick={() => setNavOpen(false)} href="#">
            Case Studies
          </Link>
          <Link onClick={() => setNavOpen(false)} href="#">
            Blog
          </Link>
          <button
            onClick={() => {
              router.push("/admin");
              setNavOpen(false);
            }}
            className="mt-2 bg-sky-500 px-4 py-2 text-white rounded-lg"
          >
            Free Demo
          </button>
        </div>
      </div>
    </>
  );
}
