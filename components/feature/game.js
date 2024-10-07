export default function Game({ page }) {
  console.log(page);
  return (
    <div className="w-full lg:relative bg-gradient-to-t from-liner to-white lg:bg-none">
      <img
        src={page.demo_background.url}
        className="w-full -z-10 lg:absolute h-[700px] lg:block hidden"
      />
      <div className="max-h-auto lg:max-h-[700px] flex flex-col lg:flex-row items-center justify-center py-[89px] gap-10">
        <div className="flex flex-col justify-center items-center gap-10 w-1/2">
          <h1 className="lg:text-[54px] text-[48px] font-bold  text-center ">
            {page.your_game_title}
          </h1>
          <p className="text-[22px] max-w-[629px] mx-auto text-center ">
            {page.your_game_text}
          </p>
          <button className=" rounded-[30px] px-[50px] py-[18px] text-[16px] bg-[#2FE5A7] hidden lg:block">
            Play A Demo Game
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={page.your_game_image.url} />
        </div>
        <button className=" rounded-[30px] px-[50px] py-[18px] text-[16px] bg-[#2FE5A7] lg:hidden block">
          Play A Demo Game
        </button>
      </div>
    </div>
  );
}
