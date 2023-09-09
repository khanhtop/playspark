import Phaser from 'phaser';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import MainScene from './mainScene';

const PongClientComponent = forwardRef(({ handleScore }, ref) => {
    const [hasRendered, setHasRendered] = useState(false);
    const memoizedHasRendered = useMemo(() => hasRendered, [hasRendered]);
    let mainScene;

    useImperativeHandle(ref, () => ({
        initGame: (lives) => {
            mainScene.initGame(lives);
        },
    }), [mainScene]);

    useEffect(() => {
        if (!memoizedHasRendered) {
            setHasRendered(true);
            const config = {
                type: Phaser.AUTO,
                width: '100%',
                height: '100%',
                parent: 'game',
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0 },
                    },
                },
                scene: MainScene,
            };

            const game = new Phaser.Game(config);
            game.events.once('ready', () => {
                mainScene = game.scene.scenes[0];
                mainScene.setScoreHandle(handleScore);
            });

            console.log('game setup');

            return () => {
                //console.log('destroyed');
                //game.destroy(true);
            };
        }
    }, [memoizedHasRendered]);

    return <div id="game" className={`w-full flex-grow justify-center items-center`}> </div>
})

export default function MiddlePong({ handleScore, pongRef }) {
    return (
        <PongClientComponent handleScore={handleScore} ref={pongRef} />
    );
}
