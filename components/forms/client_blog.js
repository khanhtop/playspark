
export default function ClientBlog ({item}) {
    return (
        <div className="max-w-[325px] h-[257px] shadow-xl shadow-grey border rounded-[10px] flex flex-col gap-5 p-10 ">
            <p className="text-start">{item.text}</p>
            <div className="flex flex-row items-center justify-start gap-4">
                <img src={item.image.url} />
                <div className="flex flex-col justify-center items-start text-[16px] ">
                    <p className="font-bold ">{item.name}</p>
                    <p className=""> {item.nick}</p>
                </div>
            </div>
        </div>
    )
}