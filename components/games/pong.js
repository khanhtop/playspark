import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

const PongClientComponent = dynamic(() => import('./pongGame'), {
    ssr: false,
});

export default function Pong({ data }) {
    const childRef = React.useRef();

    const callInitGame = () => {
        console.log('childRef.current', childRef.current);
        if (childRef.current && typeof childRef.current.initGame === 'function') {
            childRef.current.initGame(5);
        }
    }


    useEffect(() => {
        console.log("Pong Loaded");
        console.log('childRef:', childRef);
    }, []);
    return (
        <div
            style={{ backgroundColor: data?.primaryColor, color: data?.textColor, width: '500px', height: '884px' }}
            className={`aspect-w-9 aspect-h-19 h-full w-auto relative flex flex-col`}
        >
            <div style={{ fontFamily: 'enhanced_led_board-7', visibility: 'hidden', height: '0px', width: '0px' }}>.</div>
            <div style={{ fontFamily: 'TitanOne-Regular', visibility: 'hidden', height: '0px', width: '0px' }}>.</div>
            <div className="w-full h-24 bg-white/20 flex items-center justify-center">
                <p>Branding Banner Goes Here</p>
                <button onClick={callInitGame}>Restart with reward</button>
            </div>
            <PongClientComponent ref={childRef} handleScore={(score) => alert("YOU WON: " + score)} />
        </div>
    );
}
