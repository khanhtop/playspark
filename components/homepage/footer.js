export default function Footer() {
  return (
    <div className="bg-[#000e44] px-8 pt-32 flex justify-center font-light">
      <div className="w-full max-w-[1000px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <Column
            title="About Us"
            content={
              <div>
                <img
                  src="/ui/logo.png"
                  className="h-full max-h-24 -mt-4 -mb-4 -mx-4 contrast-50"
                />
                <p className="text-white leading-[40px] text-lg font-extralight">
                  PlaySpark is changing the game for how brands connect with
                  users and how publishers amplify their revenue streams,
                  through incentivised gameplay solutions.
                </p>
              </div>
            }
          />
          <Column
            title="Quick Links"
            content={
              <div className="flex flex-col">
                <a
                  href="/"
                  className="text-white leading-[40px] text-lg font-extralight"
                >
                  About Us
                </a>
                <a
                  href="/case-studies"
                  className="text-white leading-[40px] text-lg font-extralight"
                >
                  Case Studies
                </a>
                <a
                  href="#"
                  className="text-white leading-[40px] text-lg font-extralight"
                >
                  Privacy Policy
                </a>
                <a
                  href="/pricing"
                  className="text-white leading-[40px] text-lg font-extralight"
                >
                  Products & Pricing
                </a>
                <a
                  href="#"
                  className="text-white leading-[40px] text-lg font-extralight"
                >
                  Blog
                </a>
              </div>
            }
          />
          <Column
            title="Newsletter"
            content={
              <div>
                <input
                  className="h-10 w-full rounded-lg px-4 text-black"
                  placeholder="Email Address"
                />
                <button className="bg-sky-500 rounded-lg px-8 py-2 mt-2 text-white font-bold">
                  Join Now
                </button>
              </div>
            }
          />
        </div>
        <div className="py-8 text-white border-t-[1px] border-t-white/10 flex justify-between">
          <div>
            <p>Copyright © 2024 SparkUp Studios.</p>
          </div>
          <div className="flex gap-8">
            <p className="border-r-[1px] pr-8 border-r-white/10">
              Cookies Policy
            </p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({ title, content }) {
  return (
    <div>
      <div className="pb-4 border-b-[1px] border-b-white/10">
        <h1 className="text-white text-2xl uppercase">{title}</h1>
      </div>
      <div className="py-12">{content}</div>
    </div>
  );
}
