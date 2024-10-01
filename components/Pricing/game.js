export default function Game({ page }) {
  
  return (
    <div className="  text-black bg-gradient-to-t from-liner to-white pt-[132px] ">
      <div className="flex flex-col items-center justify-center gap-5 max-w-[540px] mx-auto">
        <h1 className="font-bold text-[54px] text-center">{page.game_title}</h1>
        <p className="text-[16px]  px-12 mx-auto text-center">{page.game_text}</p>
        <button className="bg-black px-4 py-2 my-10 text-white rounded-lg ">
          {page.game_button}
        </button>
      </div>
     
    </div>
  );
}
