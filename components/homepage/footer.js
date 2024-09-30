import Icon1 from "../../public/images/social-icons/1.png";
import Icon2 from "../../public/images/social-icons/2.png";
import Icon3 from "../../public/images/social-icons/3.png";
import Icon4 from "../../public/images/social-icons/4.png";
import Icon5 from "../../public/images/social-icons/5.png";
import Icon6 from "../../public/images/social-icons/6.png";

export default function Footer() {
  return (
    <div className="bg-[#484A4A] px-5 pt-10 flex justify-center font-light">
      <div className="w-full max-w-[1400px] max-h-[238px] pb-10 px-5 flex flex-row">
        <div className="w-1/2 flex flex-col items-start justify-start">
          <img
            src="/ui/logo.png"
            className="h-full max-h-24 -mt-4 mb-1 -mx-4 "
          />
          <p className="text-white text-[14px] max-w-[240px]">
            We level up your brand marketing with white-labelled arcade games
            and playable ads.
          </p>
          <div className="flex-none h-7"></div>
          <div className="flex flex-row gap-3">
            <img src={Icon1.src} className="w-6 h-6" />
            <img src={Icon2.src} className="w-6 h-6" />
            <img src={Icon3.src} className="w-6 h-6" />
            <img src={Icon4.src} className="w-6 h-6" />
            <img src={Icon5.src} className="w-6 h-6" />
            <img src={Icon6.src} className="w-6 h-6" />
          </div>
        </div>
        <div className="w-1/2 flex flex-row-reverse gap-12 items-start justify-start pr-5  pt-5  text-white text-[14px]">
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-bold ">Legal</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Security</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-bold ">Resource</p>
            <p>Case Studies</p>
            <p>Docs</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-bold ">company</p>
            <p>About</p>
            <p>Blog</p>
            <p>Contact</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="font-bold ">Products</p>
            <p>Feature</p>
            <p>FAQ</p>
            <p>Pricing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
