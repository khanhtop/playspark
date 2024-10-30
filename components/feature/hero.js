import { useRouter } from "next/router";

export default function Hero({ page }) {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-t from-[#50F8EE] to-white flex flex-col justify-center items-center pb-10 pt-40 gap-5 w-full mx-auto">
      <h1 className="lg:text-[54px] text-[48px]  max-w-[364px] lg:max-w-[800px] mx-auto text-center font-bold leading-[60px] font-roboto lg:-tracking-normal -tracking-wide">
        {page.hero_title}
      </h1>
      <p className="text-[22px] text-center lg:max-w-[535px] max-w-[364px] mx-auto px-2 leading-[30px]">
        {" "}
        {page.hero_text}
      </p>
      <img src={page.hero_image?.url} className="lg:max-w-[400px] lg:max-h-[400px] max-w-[300px] max-h-[300px]" />
      <div className="flex flex-col lg:flex-row gap-[30px]">
        <button
          className="bg-free text-black border rounded-[30px] px-[15px] py-[10px]"
          onClick={() => router.push("/admin")}
        >
          Get Started free
        </button>
        <button
          className="bg-white text-black border rounded-[30px] px-[15px] py-[10px]"
          onClick={() => router.push("/feature")}
        >
          Schedule Demo
        </button>
      </div>
    </div>
  );
}
