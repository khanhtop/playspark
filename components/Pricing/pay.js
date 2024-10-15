import { PrismicRichText } from "@prismicio/react";
import { useMemo } from "react";
import clsx from "clsx";
import { Badge } from "flowbite-react";
import checkImgWhite from "/public/images/check_white.png";
import checkImgBlack from "/public/images/check_black.png";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Pay({ page }) {
  const router = useRouter();
  return (
    <div className=" pt-[154px] pb-10 bg-white ">
      <div className=" flex flex-col items-center justify-center gap-10">
        <h1 className="text-[54px] font-bold text-center -tracking-[3px] leading-[60px] whitespace-nowrap">
          {page.pay_title}
        </h1>
        <div className="text-[22px] text-center items-center justify-center px-5 lg:max-w-full max-w-[365px] ">
          <PrismicRichText field={page.pay_text} />
        </div>
        <div className="flex lg:flex-row  flex-col items-end gap-10 lg:px-0 px-10 ">
          {page.pay_blog?.map((item, key) => {
            return <Blog item={item} page={page} key={key} />;
          })}
          <div className=" lg:hidden block max-w-full w-full mx-auto">
            <div className="  flex flex-col items-center justify-center gap-3 bg-gradient-to-l from-liner to-white border rounded-[30px] shadow-xl shadow-grey py-5 ">
              <h1 className="font-bold text-[40px] font-roboto">
                {page.enterprise_title}
              </h1>
              <p className=" text-[18px] text-[#6F6C90]">
                {page.enterprise_text}
              </p>
              <button
                className=" border rounded-[30px] bg-black text-white px-[28px] py-[10px]"
                onClick={() => router.push("/feature")}
              >
                {page.enterprise_button}
              </button>
            </div>
          </div>
        </div>
        <div className=" hidden lg:block max-w-full w-[1200px] mx-auto px-11 ">
          <div className="flex flex-col items-center justify-center  bg-gradient-to-l from-liner to-white border rounded-[30px] shadow-xl shadow-grey py-5">
            <div className="max-w-[300px] mx-auto flex flex-col items-center gap-3">
              <h1 className="font-bold text-[40px] font-roboto">
                {page.enterprise_title}
              </h1>
              <p className=" text-[18px] text-[#6F6C90]">
                {page.enterprise_text}
              </p>
              <button
                className=" border rounded-[30px] bg-black text-white lg:px-[84px] py-[10px]"
                onClick={() => router.push("/feature")}
              >
                {page.enterprise_button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Blog = ({ item, page }) => {
  let className;
  let buttonStyle;
  let text_list;
  let imageUrl;

    if (item.size == "small") {
      className = "h-[581px] bg-white text-black";
      buttonStyle = "text-white bg-black";
      text_list = page.small_list;
      imageUrl = checkImgBlack.src;
    } else if (item.size == "medium") {
      className = "h-[640px] bg-black text-white";
      buttonStyle = "text-black bg-free";
      text_list = page.medium_list;
      imageUrl = checkImgWhite.src;
    } else {
      className = "h-[730px] bg-white text-black";
      buttonStyle = "text-white bg-black";
      text_list = page.large_list;
      imageUrl = checkImgBlack.src;
    }

    const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger animation when 20% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controls.start({ y: -100, opacity: 0 });
    }
  }, [controls, inView]);

  return (
    <div
      className={clsx(
        " flex flex-col lg:w-1/3 max-w-[351px]  justify-start shadow-xl shadow-grey border rounded-[24px] gap-5 px-[31px] pt-10 ",
        className
      )}
    >
      <motion.div
      ref={ref}
      initial={{ y: -100, opacity: 0 }}
      animate={controls}
      className="flex flex-col gap-5"
    >
      <div className="flex justify-between ">
        <h1 className="font-bold text-[18px] text-[#6F6C90] text-left font-roboto">
          {item.title}
        </h1>
        {item.pay_badge ? (
          <Badge className="  border-[#999999] text-[13px] px-[13px] border rounded-[10px] text-right  bg-clip-text text-transparent bg-gradient-to-r from-[#DD7DFF] via-[#8BCB92] to-[#3BFFFF]">
            {item.pay_badge}
          </Badge>
        ) : (
          ""
        )}
      </div>

      {item.price ? (
        <div>
          {" "}
          <span className="text-[54px] font-bold font-roboto">
            {item.price}
          </span>{" "}
          <span className="font-bold text-[18px] text-[#6F6C90] font-roboto">
            /monthly
          </span>
        </div>
      ) : (
        <div>
          <p className="font-bold text-[54px] tracking-[-3px] leading-[60px] whitespace-nowrap">
            Pay per play
          </p>
        </div>
      )}
      <button
        className={clsx(
          "w-[271px] mx-auto border rounded-[30px] py-[10px] px-[64px]",
          buttonStyle
        )}
      >
        {item.button_text}
      </button>
      <p className="font-bold text-[14px]">{item.list_text}</p>
      
      <div className="flex flex-col justify-center items-start gap-3">
        {text_list?.map((item, key) => {
          return (
            <div
              key={key}
              className="text-[14px] flex flex-row items-center gap-2"
            >
              <img src={imageUrl} className="" />
              <div>
                <h1 className="font-bold ">{item.title}</h1>
                <p className="">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      </motion.div>
    </div>
  );
};
