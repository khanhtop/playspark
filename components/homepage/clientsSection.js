import ClientBlog from "../forms/client_blog"
export default function ClientSection ({page}) {
    console.log(page)
    return (
        <div className=" flex flex-col items-center justify-center text-black bg-white py-10 relative">
            <button className="border border-black rounded-xl px-3 py-2 mt-[59px]"  >{page.client_button}</button>
            <h1 className="text-[54px] font-bold my-5 ">
                {page.client_title}
            </h1>
            <div className="w-full">
                <div className="w-full h-80 absolute z-10 bg-gradient-to-b from-white to-transparent"></div>
                <div className="grid grid-cols-3 gap-5 max-w-[1200px]  mx-auto ">
                    {page.client_blog?.map((item, key)=> {
                        return <ClientBlog item={item} key={key} />
                    })}
                </div>
            </div>
           
        </div>
    )
}