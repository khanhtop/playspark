

export default function Demo({page}){
    return (
        <div className="bg-gradient-to-t from-liner to-white flex flex-col items-center justify-center pt-24 lg:pt-[250px] pb-[62px] gap-10">
            <div className="text-center lg:max-w-[668px] max-w-[351px] mx-auto ">
                <h1 className="lg:text-[54px] text-[48px] font-bold -tracking-[3px] lg:tracking-normal ">{page.demo_title}</h1>
                <p className="text-[22px] my-5 lg:px-2 px-5">{page.demo_text}</p>
            </div>
            <img src={page.demo_image.url} className=" max-w-[351px] lg:max-w-full mx-auto " />
            <button className="border rounded-[30px] bg-black text-white py-[10px] px-[15px]">Sign Up Free</button>
        </div>
    )
}