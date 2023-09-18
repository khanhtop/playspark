import { games } from "@/helpers/games";
import { useState } from "react";

export default function MarketPlace({}) {
    const [demo, setDemo] = useState()
    return (
        <div className="flex">
            {games.map((item, key) => (
                <Game game={item} onDemo={() => setDemo(item.id)}/>
            ))}
            {demo &&
            <div onClick={() => setDemo()} className="absolute top-0 left-0 h-screen w-screen bg-black/95 z-10 flex items-center justify-center">
                <iframe src={`/ad/${demo}`} className="h-[884px] w-[500px]"/>
            </div>
            }
        </div>
    )
}

function Game({game, onDemo}) {
    return (
        <div className="bg-[#000] rounded-lg text-white basis-[300px] p-4">
            <h3 className="text-lg">{game.name}</h3>
            <h5 className="text-xs mb-4 text-white/75">{game.description}</h5>
            <img src={`/screenshots/${game.screenshot}`} className="rounded-md"/>
            <div className="flex gap-2 text-sm">
            <button className="w-full bg-cyan-400 text-white rounded-md mt-4 py-3 hover:bg-cyan-600 transition">Add To My Games</button>
            <button onClick={() => onDemo()} className="w-[100px] bg-cyan-400 text-white rounded-md mt-4 py-3  hover:bg-cyan-600 transition">Demo</button>
            </div>
            
        </div>
    )
}