export default function Hero({ page }) {
  return (
    <div className="lg:min-h-[610px] min-h-fit w-full bg-cover flex  bg-gradient-to-tr from-back to-white mt-20 lg:mt-0">
      <div className="max-w-[1200px] mx-auto flex-1 flex flex-col lg:flex-row text-black bg-cover px-[45px] lg:px-[55px] pt-[155px] lg:gap-8 bg-black/0 items-center">
        <div className="flex flex-col items-center  lg:items-start justify-start flex-1 text-center lg:text-left gap-7 lg:w-1/2 w-full">
          <h1 className="lg:text-[64px] text-[54px] font-bold lg:tracking-normal  -tracking-[3px] leading-[90px]">{page.hero_title}</h1>
          <h1 className="text-[22px] font-light max-w-[500px] leading-[30px] ">
            {page.hero_text_1}
          </h1>
          <h1 className="text-[22px] font-light max-w-[500px] mt-4 leading-[30px]" >
            {page.hero_text_2}
          </h1>
        </div>
        <div className=" flex items-start justify-start mb-12 lg:mb-0 w-1/2 h-0 lg:h-auto">
          <img
            src={page.hero_image.url}
            className=" hidden lg:block w-[496px] h-[364px] "
          />
        </div>
      </div>
    </div>
  );
}
