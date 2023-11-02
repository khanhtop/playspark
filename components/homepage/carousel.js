import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    console.log(activeIndex);
    setActiveIndex(swiper.activeIndex);
  };
  return (
    <div className="flex flex-col justify-center h-screen">
      <div>
        <Swiper
          className=""
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{
            clickable: true, // Enable clickable pagination dots
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            },
          }}
        >
          <SwiperSlide>
            <Slide
              img="/homepage/carousel4.png"
              heading="HOOK IN YOUR AUDIENCE"
              subtext="Immerse your fans in captivating gaming experiences themed your brand.
          Our custom-branded rewarded mobile games create an unparalleled
          connection, keeping fans hooked and entertained deeper and longer."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              img="/homepage/carousel2.png"
              heading="DRIVE USER GROWTH"
              subtext="Use our in-built reward modules to
incentivise positive user behaviour
within your branded games. 
Reward them with in game coins,
power ups and your own product
collectibles for social shares,
surveys, referrals, website views and
much more to attract new
consumers, drive retention or
brand recall."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              img="/homepage/carousel3.png"
              heading="AMPLIFY LOYALTY"
              subtext="With consumers 4.7X more likely to
purchase a product when being
rewarded for their time, use
rewarded gaming to drive sales.
Place your own or sponsor items
within your games including product
discounts or VIP experiences to
generate higher consumer intent
and loyalty."
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

function Slide({ heading, subtext, img }) {
  return (
    <div className="w-screen px-8 md:py-8 pb-4 md:pb-12">
      <div className="w-full md:h-[calc(100vh/1.4)] max-h-[800px] rounded-xl bg-cyan-100/5 flex flex-col md:flex-row gap-8 justify-center items-center px-[5%]">
        <div className="md:flex-1 h-auto md:h-full max-h-full flex items-center justify-center">
          <img src={img} className="h-60 md:h-2/3" />
        </div>
        <div className="md:flex-1 mb-8">
          <h1 className="font-octo text-cyan-400 md:text-[40px] md:text-left mb-2">
            {heading}
          </h1>
          <h1 className="font-octolight text-white md:text-[30px] md:text-left ">
            {subtext}
          </h1>
        </div>
      </div>
    </div>
  );
}
