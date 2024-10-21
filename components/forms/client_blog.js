
export default function ClientBlog ({item}) {
    return (
        <div className="max-w-[325px]  shadow-xl shadow-grey border rounded-[10px] flex flex-col items-start justify-center gap-2 p-5 ">
            <p className="text-start  ">{item.text}</p>
            <div className="flex flex-row items-center justify-start h-1/3 gap-4">
                <img src={item.image.url} className="justify-start w-[50px] h-[50px]" />
                <div className="flex flex-col justify-center items-center text-[16px] ">
                    <p className="font-bold ">{item.name}</p>
                    <p className=""> {item.nick}</p>
                </div>
            </div>
        </div>
    )
}