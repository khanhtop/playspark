

export default function Game({page}) {
    console.log(page)
    return (
        <div className="w-full relative">
            <img src={page.demo_background.url} className="w-full -z-10 absolute h-[700px]"  />
            <div className="max-h-[700px] flex flex-row items-center justify-center py-[89px]">
                <div className="flex flex-col justify-center place-items-center gap-10 w-1/2">
                    <h1 className="text-[54px] font-bold  ">{page.your_game_title}</h1>
                    <p className="text-[22px] max-w-[629px] mx-auto text-center px-10" >{page.your_game_text}</p>
                    <button className="border rounded-[30px] px-[50px] py-[18px] text-[16px]" >Play A Demo Game</button>
                </div>
                <div className="w-1/2 flex justify-center">
                    <img src={page.your_game_image.url} />
                </div>
            </div>
        </div>
    )
}