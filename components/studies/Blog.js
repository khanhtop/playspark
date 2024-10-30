import { useMemo } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Blog({ page }) {
  return (
    <div className="bg-gradient-to-b from-liner to-white pt-20 lg:pb-20">
      <div className="flex lg:flex-row  flex-col gap-[54px]  items-start justify-normal lg:px-[140px] max-w-[1200px] mx-auto">
        {page.studies_blog?.map((item, key) => {
          return <Element item={item} key={key} />;
        })}
      </div>
    </div>
  );
}

const Element = ({ item }) => {
  let className;

  if (item.button_text == "Read More") {
    className = "bg-[#2FE5A7] text-black";
  } else {
    className = " bg-[#364153] text-white";
  }
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger animation when 20% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controls.start({ x: -100, opacity: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={controls}
      className="lg:w-1/3 w-[290px] mx-auto flex flex-col justify-start items-center  py-5 max-h-[600px] gap-5"
    >
      <img src={item.image.url} className="w-full h-[270px]" />
      <div className="flex flex-col gap-5 items-start h-auto lg:h-[225px] w-full">
        <h1 className="font-bold text-[18px]">{item.title}</h1>
        <p className="text-[16px]">{item.text}</p>
      </div>
      <button
        className={clsx(
          " border rounded-[30px] px-[70px] py-[10px]",
          className
        )}
        onClick={() => {
          router.push(item.button_url);
        }}
      >
        {item.button_text}
      </button>
    </motion.div>
  );
};
