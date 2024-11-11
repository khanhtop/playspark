import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import header_logo from "/public/images/header_logo.png";

export default function Navbar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const isCurrent = (route) => {
    return router.pathname === route;
  };

  return (
    <div className="w-full">
      <div className="z-20 fixed top-0 left-0 w-full  bg-white/90 backdrop-blur ">
        <div className=" mx-auto h-[80px] max-w-[1200px] text-black hidden lg:flex items-center justify-between  px-10">
          <img
            src={header_logo.src}
            className="h-full cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="flex items-center justify-center gap-6 ">
            <Link
              className={`${
                isCurrent("/") ? "text-sky-600" : "text-[#666666]"
              } hover:text-sky-600`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`${
                isCurrent("/products") ? "text-sky-600" : "text-[#666666]"
              } hover:text-sky-600`}
              href="/products"
            >
              Products
            </Link>
            <Link
              className={`${
                isCurrent("/pricing") ? "text-sky-600" : "text-[#666666]"
              } hover:text-sky-600`}
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className={`${
                isCurrent("/case-studies") ? "text-sky-600" : "text-[#666666]"
              } hover:text-sky-600`}
              href="/case-studies"
            >
              Case Studies
            </Link>
            <Link
              className={`${
                isCurrent("/blog") ? "text-sky-600" : "text-[#666666]"
              } hover:text-sky-600`}
              href="/blog"
            >
              Blog
            </Link>
            <button
              className="bg-free px-4 py-2  text-black font-bold rounded-lg "
              onClick={() => router.push("/admin")}
            >
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
      </div>
      <div
        style={{
          height: navOpen ? 350 : 100,
          transition: "0.25s height ease-in-out",
        }}
        className="z-20 fixed top-0 left-0 w-full mx-auto text-black flex flex-col overflow-hidden lg:hidden  bg-white/100 backdrop-blur"
      >
        <div className="h-17 flex items-center justify-between w-full mx-auto px-5">
          <img
            src={header_logo.src}
            className=" h-full cursor-pointer"
            onClick={() => router.push("/admin")}
          />
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
        <div className="flex flex-col gap-2   px-3">
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
            Get for free
          </button>
        </div>
      </div>
    </div>
  );
}
