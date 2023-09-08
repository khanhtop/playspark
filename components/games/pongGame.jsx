import Phaser from 'phaser';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import MainScene from './mainScene';
const PongClientComponent = ({ handleScore }, ref) => {
    const [hasRendered, setHasRendered] = useState(false);
    const memoizedHasRendered = useMemo(() => hasRendered, [hasRendered]);
    let scene;

    const initGame = (lives) => {
        if (scene) {
            scene.initGame(lives);
        }
    }

    useImperativeHandle(ref, () => ({
        initGame: initGame,
    }));

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
                scene = game.scene.scenes[0];
                scene.setScoreHandle(handleScore);
            });

            console.log('game setup');

            return () => {
                //console.log('destroyed');
                //game.destroy(true);
            };
        }
    }, [memoizedHasRendered]);

    return <div id="game" className={`w-full flex-grow justify-center items-center`}> </div>
}

export default forwardRef(PongClientComponent);
