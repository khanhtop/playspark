

export default function Game({page}) {
    console.log(page)
    return (
        <div className="lg:relative bg-gradient-to-t from-liner to-white lg:bg-none">
            <div>
            <img src={page.demo_background.url} className="w-full -z-10 lg:absolute h-[700px] lg:block hidden"  />
            <div className="max-h-auto lg:max-h-[700px] flex flex-col lg:flex-row items-center justify-center py-[64px] gap-10 max-w-[1200px] mx-auto">
                <div className="flex flex-col justify-center items-center gap-10 w-full lg:px-5 lg:w-1/2">
                    <h1 className="lg:text-[54px] text-[48px] font-bold text-center lg:px-5 px-10 lg:max-w-full max-w-[350px]  lg:-tracking-widest -tracking-normal  font-roboto ">{page.your_game_title}</h1>
                    <p className="text-[22px] lg:max-w-[629px] max-w-[351px] mx-auto text-center px-9 lg:px-0" >{page.your_game_text}</p>
                    <button className=" rounded-[30px] px-[50px] py-[18px] text-[16px] bg-free text-black hidden lg:block" >Play A Demo Game</button>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img src={page.your_game_image.url} />
                </div>
                <button className=" rounded-[30px] px-[50px] py-[18px] text-[16px]  text-black bg-free  lg:hidden block" >Play A Demo Game</button>
            </div>
            </div>
           
        </div>
    )
}