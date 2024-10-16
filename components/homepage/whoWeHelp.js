import { PrismicRichText } from "@prismicio/react";
import selectImage from "../../public/images/select.png";
import Slider from "./slider";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function WhoWeHelp({ page }) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col bg-white from-blue-500/0 to-blue-500/10 items-center justify-center text-black pt-[90px]  px-0 lg:px-4">
      <div className="text-center flex flex-col items-center mx-auto gap-5 pb-[60px] max-w-full ">
        <button className="max-w-[226px] mx-auto text-center text-[13px] font-medium rounded-[10px] border border-[#E9E9E9] border-1 px-[10px] py-1 ">
          {page.level_sub_title}
        </button>
        <h1 className="lg:text-[54px] text-[48px] font-bold w-full -tracking-widest leading-[40px] lg:leading-[60px] whitespace-nowrap px-2 font-roboto ">
          {page.level_title}
        </h1>
        <p className="text-[22px] my-4 mb-10 text-center lg:max-w-[535px]  max-w-[358px] mx-auto text-subtitle">
          {page.level_text}
        </p>
        <div className="lg:hidden block max-w-[430px] mx-auto">
          <Slider items={page.level_group} />
        </div>

        {page.level_group?.map((item, key) => {
          return <Blog item={item} key={key} />;
        })}
      </div>
    </div>
  );
}

const Blog = ({ item }) => {
  const router = useRouter();
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
    <motion.div
      ref={ref}
      initial={{ y: -100, opacity: 0 }}
      animate={controls}
      className="mx-auto max-w-[924px] lg:block hidden"
    >
      <div>
        <div className=" flex flex-col-reverse lg:flex-row gap-5  shadow-xl shadow-grey border rounded-[10px] py-10">
          <div className="lg:w-1/2  w-full flex flex-col gap-10 items-center justify-center  ">
            <h1 className=" font-bold text-2xl px-10">{item.title}</h1>
            <div className=" flex flex-col gap-8 text-start text-[16px] px-3">
              <div className=" flex flex-row gap-1 justify-center items-center">
                {item.text_1[0] && <SelectImg />}
                <PrismicRichText field={item.text_1} />
              </div>
              <div className=" flex flex-row gap-1 justify-center items-center">
                {item.text_2[0] && <SelectImg />}
                <PrismicRichText field={item.text_2} />
              </div>
              <div className=" flex flex-row gap-1 justify-center items-center">
                {item.text_3[0] && <SelectImg />}
                <PrismicRichText field={item.text_3} />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img src={item.image.url} className="w-[232px] h-[333px]" />
          </div>
        </div>
        <div className="h-32 py-10">
          {/* {item.button_text && (
          showButton(item.button_text)
        )} */}
          {item.button_text && (
            <button
              className="bg-free w-[232px] text-black rounded-[30px] py-3 px-3 "
              onClick={() => router.push(item.button_url)}
            >
              {item.button_text}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SelectImg = () => {
  return <img src={selectImage.src} />;
};

const showButton = (item) => {
  return (
    <button className="bg-free w-[232px] text-black rounded-[30px] py-3 px-3 ">
      {item}
    </button>
  );
};
