

export default function Demo({page}){
    return (
        <div className="bg-gradient-to-t from-liner to-white flex flex-col items-center justify-center pt-[250px] pb-[62px] gap-10">
            <div className="text-center max-w-[668px] mx-auto ">
                <h1 className="text-[54px] font-bold ">{page.demo_title}</h1>
                <p className="text-[22px] my-5">{page.demo_text}</p>
            </div>
            <img src={page.demo_image.url} />
            <button className="border rounded-[10px] bg-black text-white py-[10px] px-[15px]">Sign Up Free</button>
        </div>
    )
}