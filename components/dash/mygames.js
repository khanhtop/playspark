import { games } from "@/helpers/games";
import { useState } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";

export default function MyGames({}) {
    const context = useAppContext()
    const [demo, setDemo] = useState()
    const [link, setLink] = useState()

    const showEmbedCode = (id) => {
        setLink(`<iframe src="https://playspark.co/ad/` + id + ` class="h-[663px] w-[375px]"/>`)
    }

    return (
        <div className="flex">
            {context.profile.myGames.map((item, key) => (
                <GameCard onAdd={() => showEmbedCode(games[item].id)} buttonText="Get Embed Code" game={games[item]} onDemo={() => setDemo(games[item].id)}/>
            ))}
            {demo &&
            <div onClick={() => setDemo()} className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center">
                <iframe src={`/ad/${demo}`} className="h-[663px] w-[375px]"/>
            </div>
            }
            {link &&
            <div onClick={() => setLink()} className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center">
                <div onClick={(e) => e.stopPropagation()} className="rounded-lg px-4 w-[90%] max-w-[500px] h-[100px] bg-white flex items-center justify-center">
                    <div className="rounded-full bg-gray-200 flex w-full overflow-hidden">
                        <input className="bg-transparent flex-1 text-xs px-4" value={link}/>
                        <button className="w-24 hover:bg-gray-300">Copy</button>
                    </div>
                </div>
               
            </div>
            }
        </div>
    )
}

