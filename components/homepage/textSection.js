import { ArrowDownIcon } from "@heroicons/react/24/solid";

export default function TextSection() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-16 md:py-0">
      <div className="max-w-[1200px] flex-1 w-full text-left px-12 md:py-24">
        <h1 className="font-anton text-[36px] leading-[44px] md:text-[100px] md:leading-[110px] max-w-[50%] mb-8">
          Unleash The Power Of {` `}
          <span className="text-cyan-500">Mobile Gaming</span>
        </h1>
        <h3 className="md:text-2xl max-w-[60%] font-octolight">
          Are you looking for an innovative way to captivate your audience,
          boost brand engagement, and drive revenue? Look no further! Leverage
          rewarded mobile gaming as a powerful tool to engage and retain users
          like never before.
        </h3>
      </div>
      <div className="h-36 w-full flex items-center justify-center">
        <ArrowDownIcon className="animate-bounce text-cyan-500 h-12 w-12" />
      </div>
    </div>
  );
}
