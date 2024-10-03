import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import header_logo from "/public/images/header_logo.png";
import mobile_logo from "/public/images/mobile_logo.png";
import Icon from "/public/images/right.png";

export default function Navbar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const isCurrent = (route) => {
    return router.pathname === route;
  };

  return (
    <>
      <div className="z-20 fixed top-0 left-0 w-full h-[75px] text-black hidden lg:flex items-center justify-between px-16 bg-white/90 backdrop-blur">
        <img src={header_logo.src} className="h-full" />
        <div className="flex items-center justify-center gap-6 font-bold">
          <Link
            className={`${
              isCurrent("/") ? "text-sky-600" : "text-black"
            } hover:text-sky-600`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`${
              isCurrent("/products") ? "text-sky-600" : "text-black"
            } hover:text-sky-600`}
            href="/products"
          >
            Features
          </Link>
          <Link
            className={`${
              isCurrent("/pricing") ? "text-sky-600" : "text-black"
            } hover:text-sky-600`}
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className={`${
              isCurrent("/case-studies") ? "text-sky-600" : "text-black"
            } hover:text-sky-600`}
            href="/case-studies"
          >
            Case Studies
          </Link>
          <Link
            className={`${
              isCurrent("/blog") ? "text-sky-600" : "text-black"
            } hover:text-sky-600`}
            href="/blog"
          >
            Docs
          </Link>
          <button className="bg-free px-4 py-2  text-black rounded-lg">
            {" "}
            Get for free
          </button>
        </div>
        <button
          onClick={() => router.push("/admin")}
          className="bg-black px-4 py-2 text-white rounded-lg"
        >
          Login
        </button>
      </div>
      <div
        style={{
          height: navOpen ? 350 : 100,
          transition: "0.25s height ease-in-out",
        }}
        className="z-20 fixed top-0 left-0 w-full text-black flex flex-col overflow-hidden lg:hidden  bg-white/100 backdrop-blur"
      >
        <div className="w-full fixed bg-[#484A4A] h-[46px] flex flex-row items-center justify-center gap-3">
          <p className="text-white text-center ">View the complete Kit</p>{" "}
          <img src={Icon.src} className="w-[10px] h-[10px]" />
        </div>
        <div className="px-8">
          <div className="h-16 flex items-center justify-between w-full pt-20">
            <img src={mobile_logo.src} className="  w-10 h-10" />
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
          <div className="flex flex-col gap-2 font-bold mt-6 px-3">
            <Link
              onClick={() => setNavOpen(false)}
              className="hover:text-sky-600"
              href="/"
            >
              Home
            </Link>
            <Link onClick={() => setNavOpen(false)} href="/products">
              Products
            </Link>
            <Link onClick={() => setNavOpen(false)} href="/pricing">
              Pricing
            </Link>
            <Link onClick={() => setNavOpen(false)} href="/case-studies">
              Case Studies
            </Link>
            <Link onClick={() => setNavOpen(false)} href="/blog">
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
      </div>
    </>
  );
}
