export default function Hero({ page }) {
  return (
    <div className="lg:min-h-[612px] min-h-fit w-full bg-cover flex  bg-[#57F295] mt-20 lg:mt-0">
      <div className="max-full mx-auto flex-1 flex flex-col lg:flex-row text-black bg-cover px-[55px] pt-20 lg:gap-7 bg-black/0 items-center relative pb-10 max-w-[1200px]">
        <div className="flex flex-col items-center  lg:items-start justify-start flex-1 text-start lg:text-left gap-10 lg:w-1/2 w-full">
          <h1 className="lg:text-[64px] text-[54px] font-bold lg:-tracking-[4px] -tracking-[2px]">{page.hero_title}</h1>
          <h1 className="text-[22px] font-bold leading-[30px]  max-w-[480px] ">
            {page.hero_text_1}
          </h1>
          <h1 className="text-[22px] font-light max-w-[480px] mt-4">
            {page.hero_text_2}
          </h1>
        </div>
          <img
            src={page.hero_image.url}
            className="w-[496px] h-[364px] hidden lg:block absolute right-12 bottom-12"
          />
      </div>
    </div>
  );
}
