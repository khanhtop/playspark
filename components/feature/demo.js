import { AspectRatio } from "@cloudinary/url-gen/qualifiers";
import { left } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { useRouter } from "next/router";

{
  /* <div style="position: relative; box-sizing: content-box; max-height: 80vh; max-height: 80svh; width: 100%; aspect-ratio: 1.935979513444302; padding: 40px 0 40px 0;">
<iframe src="https://app.supademo.com/embed/cm21dmk9l1pe113b3b9xs68g5?embed_v=2” loading="lazy” title="Playspark Demo” allow="clipboard-write” frameborder="0” webkitallowfullscreen="true” mozallowfullscreen="true” allowfullscreen 
style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">

</iframe></div> */
}

export default function Demo({ page }) {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-t from-liner to-white flex flex-col items-center justify-center pt-32 lg:pt-[300px] pb-[62px] gap-10">
      <div className="text-center lg:max-w-[668px] max-w-[351px] mx-auto ">
        <h1 className="lg:text-[54px] text-[48px] font-bold -tracking-wide font-roboto  lg:leading-[60px] leading-[40px] ">
          {page.demo_title}
        </h1>
        <p className="text-[22px] my-5 lg:px-2 px-5 text-subtitle">
          {page.demo_text}
        </p>
      </div>
      <div className=" relative box-content max-h-[80svh] w-[100%] lg:max-w-full  max-w-[430px] aspect-[1.935979513444302] ">
        <iframe
          src="https://app.supademo.com/embed/cm21dmk9l1pe113b3b9xs68g5?embed_v=2"
          loading="lazy"
          title="Playspark Demo"
          allow="clipboard-write"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          className="w-[100%] h-[100%] absolute top-0 left-0"
        ></iframe>
      </div>
      <button className="border rounded-[30px] bg-black text-white py-[10px] px-[15px]"
        onClick={() => router.push("/admin")}
      >
        Sign Up Free
      </button>
    </div>
  );
}
