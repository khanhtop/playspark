import { useRouter } from "next/router";

export default function PricingSection({ page }) {
  const router = useRouter();
  return (
    <div className="flex flex-col lg:flex-row bg-white text-black items-center justify-center py-12 gap-12">
      <div className="max-w-[300px] flex flex-col">
        <h1 className="text-5xl lg:text-left font-bold">
          {page.pricing_title}
        </h1>
        <p className="lg:text-left mt-4 text-lg font-extralight">
          {page.pricing_text}
        </p>
        <button
          onClick={() => router.push("/pricing")}
          className="bg-lime-600 text-white rounded-full mt-6 px-5 py-2 text-xl cursor-pointer"
        >
          View Pricing
        </button>
      </div>
      <div className="">
        <img
          src={page.pricing_image?.url}
          className="max-h-[300px] lg:max-h-[400px]"
        />
      </div>
    </div>
  );
}
