import Phaser from 'phaser';

let w: number, h: number, mW: number, mH: number, ballR: number, playerR: number, aiR: number, scr: number, goalH: number, sideW: number, boundW: number, boundH: number, ballVY: number, ballVX: number, collW: number, scrW: number, scrH: number, heartR: number;

export default class MainScene extends Phaser.Scene {
    public static instance: MainScene;
    private ball!: Phaser.Physics.Arcade.Image;
    private player!: Phaser.Physics.Arcade.Image;
    private ai!: Phaser.Physics.Arcade.Image;

    constructor() {
        super();
        MainScene.instance = this;
    }

    preload() {
        this.load.image('ball', '/pong/assets/min/ball.png');
        this.load.image('peck', '/pong/assets/min/peck.png');
        this.load.image('bg', '/pong/assets/min/bg.png');
        //this.load.image('bgGls', '/pong/assets/min/bgGoals.png');
        this.load.image('heart', '/pong/assets/min/heart.png');
        this.load.image('score', '/pong/assets/min/score.png');

        this.load.audio('bg', '/pong/assets/min/sfx/bgNoise.ogg');
        this.load.audio('whistle', '/pong/assets/min/sfx/whistle.ogg');
        this.load.audio('ballHit', '/pong/assets/min/sfx/ballHit.ogg');
        this.load.audio('goal', '/pong/assets/min/sfx/goal.ogg');
        this.load.audio('lost', '/pong/assets/min/sfx/lost.ogg');
        this.load.audio('final', '/pong/assets/min/sfx/final.ogg');

        w = this.game.canvas.clientWidth;
        h = this.game.canvas.clientHeight;
        ballR = w * 0.1;
        playerR = w * 0.175;
        aiR = w * 0.175;
        scr = h * 0.08;
        mW = w / 2;
        mH = ((h - scr) / 2) + scr;
        goalH = h * 0.1;
        sideW = w * 0.08;
        boundW = w - 2 * sideW;
        boundH = h - scr - 2 * goalH;
        ballVY = h * 0.5;
        ballVX = w * 0.75;
        collW = w * 0.2;
        scrW = w * 0.175;
        scrH = scrW / 1.614;
        heartR = w * 0.0625;
    }

    // 400 800

    private gr: Phaser.Physics.Arcade.StaticGroup;

    private whistle: any;
    private ballHit: any;
    private final: any;
    private goal: any;
    private lost: any;

    create() {
        this.sound.add('bg').setLoop(true).play();
        this.whistle = this.sound.add('whistle');
        this.ballHit = this.sound.add('ballHit');
        this.final = this.sound.add('final');
        this.goal = this.sound.add('goal');
        this.lost = this.sound.add('lost');

        this.physics.world.setBounds(sideW, scr + goalH, boundW, boundH, true, true, false, false);
        this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(w, h);
        //this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(w, h);

        this.add.image(mW, 37, 'score').setDisplaySize(scrW, scrH);
        this.ball = this.physics.add
            .image(mW, mH, 'ball')
            .setAlpha(0.85)
            .setDisplaySize(ballR, ballR)
            .setCircle(this.textures.get('ball').getSourceImage().width / 2)
            .setCollideWorldBounds(true)
            .setBounce(1, 1)
        this.player = this.physics.add.image(mW, h - goalH - playerR / 2, 'peck').setTint(0x0000ff).setAlpha(0.75).setDisplaySize(playerR, playerR).setCircle(this.textures.get('peck').getSourceImage().width / 2).setCollideWorldBounds(true).setPushable(false);
        this.ai = this.physics.add.image(mW, scr + goalH + playerR / 2, 'peck').setTint(0xff0000).setAlpha(0.75).setDisplaySize(playerR, playerR).setCircle(this.textures.get('peck').getSourceImage().width / 2).setCollideWorldBounds(true).setPushable(false);

        this.gr = this.physics.add.staticGroup();

        (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image).setSize(collW, goalH).setOrigin(0).setPosition(sideW, scr).setVisible(false);
        (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image).setSize(collW, goalH).setOrigin(0).setPosition(w - sideW - collW, scr).setVisible(false);
        (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image).setSize(collW, goalH).setOrigin(0).setPosition(sideW, h - goalH).setVisible(false);
        (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image).setSize(collW, goalH).setOrigin(0).setPosition(w - sideW - collW, h - goalH).setVisible(false);

        this.gr.refresh();

        //this.physics.add.collider(this.player, gr);
        //this.physics.add.collider(this.ai, gr);

        this.player.setInteractive();
        //(this.player as any).setDraggable(true);
        this.input.setDraggable(this.player);

        this.player.on('pointerdown', function(pointer) {
            // Update the goal position when the mouse button is pressed
            this.goalXPos = Phaser.Math.Clamp(pointer.x, sideW + playerR / 2, w - sideW - playerR / 2);
            this.goalYPos = Phaser.Math.Clamp(pointer.y, mH + playerR / 2, h - goalH - playerR / 2);
            this.isDragging = true;
        }, this);

        this.player.on('drag', function(pointer, dragX, dragY) {
            // Update the goal position when the mouse is moving
            this.goalXPos = Phaser.Math.Clamp(dragX, sideW + playerR / 2, w - sideW - playerR / 2);
            this.goalYPos = Phaser.Math.Clamp(dragY, mH + playerR / 2, h - goalH - playerR / 2);
        }, this);

        this.player.on('pointerup', function() {
            // Stop dragging and stop the player
            this.isDragging = false;
            this.player.setVelocity(0, 0);
        }, this);

        this.scoreText = this.add.text(mW + 2, 36, '0000', {
            fontFamily: 'enhanced_led_board-7',
            fontSize: '26px',
            color: '#ffffff',
        }).setOrigin(0.5, 0.5);

        this.goalTxt = this.add.text(mW, mH - 52, 'GOAL!', {
            fontFamily: 'TitanOne-Regular',
            fontSize: '76px',
            color: '#345e8e',
            stroke: '#ffffff',
            strokeThickness: 10
        }).setOrigin(0.5, 0.5);

        this.addedScrTxt = this.add.text(mW, mH + 26, '+100', {
            fontFamily: 'TitanOne-Regular',
            fontSize: '76px',
            color: '#ffffff',
            stroke: '#345e8e',
            strokeThickness: 10
        }).setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: this.ball,
            duration: 50000,
            rotation: 360,
            repeat: -1
        });

        this.cameras.main.fadeIn(1200);

        /*
        const ballFx = this.ball.postFX.addBloom(0xffffff, 0, 0, 0, 1);

        const ballFXTween = this.tweens.add({
            targets: ballFx,
            blurStrength: 5,
            yoyo: true,
            duration: 200,
            paused: true,
            onComplete: () => {
                ballFXTween.restart();
                ballFXTween.pause();
            }
        });
        */

        this.physics.add.collider(this.player, this.ball, () => {
            this.touches++;
            if (!this.ballHit.isPlaying)
                this.ballHit.play();
        }, null, this);
        this.physics.add.collider(this.ai, this.ball, () => {
            if (!this.ballHit.isPlaying)
                this.ballHit.play();
        }, null, this);
        this.physics.add.collider(this.ball, this.gr, () => {
            if (!this.ballHit.isPlaying)
                this.ballHit.play();
        });

        //this.cameras.main.postFX.addBloom(0xffffff, 1, 1, 10, 0.5);
        //this.cameras.main.postFX.addBokeh(0.1, 0.5, 0.05);
        //this.cameras.main.postFX.addTiltShift(0.5, 0.25, 0.0015, 0.05, 0.05, 1);
        this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
        this.cameras.main.postFX.addColorMatrix().contrast(1.25).polaroid().brightness(0.9);
        this.ball.preFX.addShadow();
        this.player.preFX.addShadow();
        this.ai.preFX.addShadow();
        //this.cameras.main.postFX.addGlow();

        this.ball.setMaxVelocity(ballVX * 3, ballVY * 3);

        this.initGame();
    }

    private ballDir: number = 1;
    private hearts = [];
    private scoreNum = 0;
    private scoreText: Phaser.GameObjects.Text;
    private goalTxt: Phaser.GameObjects.Text;
    private addedScrTxt: Phaser.GameObjects.Text;

    private scoreHandler;

    public setScoreHandle(handleScore: any) {
        this.scoreHandler = handleScore;
    }

    public initGame(lives = 3) {
        this.goalTxt.setVisible(false);
        this.addedScrTxt.setVisible(false);

        this.player.setPosition(mW, h - goalH - playerR / 2);
        this.ai.setPosition(mW, scr + goalH + playerR / 2);
        this.scoreNum = 0;
        this.ballDir = 1;
        this.scoreText.text = '0000';
        this.hearts.forEach((h) => h.destroy);
        this.hearts.length = 0;
        for (let i = 0; i < lives; i++) {
            const heart = this.add.image(
                w - 30 - i * 40,
                30,
                'heart'
            ).setDisplaySize(heartR, heartR);
            this.hearts.push(heart);
        }
        this.ball.setAlpha(0.5);
        this.ball.setCircle(0.1);

        this.touches = 0;
        this.scored = false;
        this.isDragging = false;

        this.patrolAiSpeed = 75;
        this.defenceAiSpeed = 250;
        this.aiSpeed = 250;
        this.aiSize = 1;


        this.aiIsMoving = false;
        this.aiMoveTime = 0;
        this.aiTargetX = 0;
        this.aiTargetY = 0;

        setTimeout(() => this.startRound(), 2500);
    }

    loseGame() {
        this.cameras.main.fadeOut(1000);
        this.final.play();
        this.scoreHandler(this.scoreNum);
        // game is lost
        //this.initGame();
    }

    loseLife(): boolean {
        if (this.hearts.length > 0) {
            this.hearts.pop().destroy();
            // Handle life loss logic here

            if (this.hearts.length === 0) {
                // Game lost
                this.loseGame();
                return true;
            }
            return false;
        }
    }

    startRound() {
        //this.player.setPosition(mW, h - goalH - playerR / 2);
        //this.ai.setPosition(mW, scr + goalH + playerR / 2);
        this.ball.setPosition(mW, mH);
        const dirX = Math.random() > 0.5 ? 1 : -1;
        this.ballDir *= -1;
        this.ball.setVelocity(dirX * ballVX, ballVY * this.ballDir);
        this.whistle.play();
        this.scored = false;
        //this.player.setVelocity(0, 0);
        //this.goalXPos = this.player.x;
        //this.goalYPos = this.player.y;
        //this.isDragging = false;
        this.touches = 0;

        this.ball.setImmovable(false);
        this.ball.setAlpha(1);
        this.goalTxt.setVisible(false);
        this.addedScrTxt.setVisible(false);
        this.ball.setCircle(this.textures.get('ball').getSourceImage().width / 2)
    }

    score(which = 0) {
        this.scored = true;

        //this.cameras.main.fadeIn(1000);
        this.ball.setVelocity(0, 0);
        setTimeout(() => {
            this.ball.setPosition(mW, mH);
            this.ball.setImmovable(true);
        }, 10);

        this.ball.setAlpha(0.5);
        this.ball.setCircle(0.1);

        let lost = false;
        if (which === 1) {
            lost = this.loseLife();
            this.lost.play();
            //this.cameras.main.flash(50);
            this.cameras.main.shake(30, 0.01);
        }
        else if (which === 0) {
            this.scoreNum += 100;
            this.goal.play();
            this.scoreText.text = this.scoreNum.toString().padStart(4, '0');
            this.goalTxt.text = this.touches === 1 ? 'COMBO HIT!' : 'GOAL!';
            this.addedScrTxt.text = this.touches === 1 ? '+200' : '+100';

            if (this.touches === 1) {
                //this.cameras.main.flash(50);
                this.cameras.main.shake(40, 0.02);
            }
            else {
                //this.cameras.main.flash(30);
                this.cameras.main.shake(25, 0.01);
            }

            this.changeAI(this.scoreNum / 100);

            this.goalTxt.setVisible(true);
            this.addedScrTxt.setVisible(true);
        }

        if (!lost)
            setTimeout(() => this.startRound(), 2500);
        //this.startRound();
    }

    private touches = 0;
    private scored = false;
    private goalXPos: number;
    private goalYPos: number;
    private isDragging = false;

    private patrolAiSpeed = 75;
    private defenceAiSpeed = 250;
    private aiSpeed = 250;
    private aiSize = 1;

    changeAI(score: number) {
        if (score === 1) {
            this.aiSpeed += 50; // Increase speed
            this.defenceAiSpeed += 50; // Increase speed
            this.patrolAiSpeed += 25; // Increase speed
        } else if (score === 3) {
            this.aiSpeed += 25; // Increase speed
            this.defenceAiSpeed += 25; // Increase speed
            this.patrolAiSpeed += 10;
        } else if (score === 5) {
            this.aiSize += 0.1; // Increase size by 10%
            this.ai.setDisplaySize(aiR * this.aiSize, aiR * this.aiSize); // Update the visual size
            //this.ai.setCircle(this.aiSize / 2); // Update the physics body size
        } else if (score === 7) {
            this.aiSize += 0.2; // Increase size by 20%
            this.ai.setDisplaySize(aiR * this.aiSize, aiR * this.aiSize); // Update the visual size
            //this.ai.setCircle(this.aiSize / 2); // Update the physics body size
        }
    }


    aiSetTargetPos(x: number, y: number, speed: number) {
        // Clamp the target position to ensure it's within bounds
        x = Phaser.Math.Clamp(x, sideW + (aiR * this.aiSize) / 2, w - sideW - (aiR * this.aiSize) / 2);
        y = Phaser.Math.Clamp(y, scr + goalH + (aiR * this.aiSize) / 2, mH - (aiR * this.aiSize) / 2);

        this.aiTargetX = x;
        this.aiTargetY = y;
        // Calculate the distance to the target
        const dx = x - this.ai.x;
        const dy = y - this.ai.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the velocity based on the distance to the target
        const maxDistance = 50; // Adjust this value as needed
        const velocity = speed * distance / maxDistance;

        // Calculate the direction towards the target
        const angle = Math.atan2(dy, dx);

        // Calculate the velocity components
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        // Set the AI's velocity
        this.ai.setVelocity(vx, vy);
    }

    private aiIsMoving = false;
    private aiMoveTime = 0;
    private aiTargetX = 0;
    private aiTargetY = 0;

    aiUpdate(time, delta) {

        if (this.ball.y <= scr + goalH + (aiR * this.aiSize) / 2 + 10) {
            // The ball is touching the gr static group, so the AI should defend the goal
            const dirX = this.ball.x < mW ? -50 : 50;
            const x = mW + dirX;
            const y = (this.ball.y < mH) ? this.ball.y : mH - (aiR * this.aiSize) / 2;
            this.aiSetTargetPos(x, y, this.defenceAiSpeed); // Adjust the speed as needed
        }
        else if (this.ball.y < mH && this.ball.alpha !== 0.5) {
            // The ball is on the AI's side of the field, so the AI should chase the ball
            this.aiSetTargetPos(this.ball.x, this.ball.y, this.aiSpeed); // Adjust the speed as needed
        }
        else {
            // The ball is on the player's side of the field, so the AI should wander randomly
            const dx = this.aiTargetX - this.ai.x;
            const dy = this.aiTargetY - this.ai.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) { // Adjust the threshold as needed
                // The AI has arrived at its target position, so generate a new target position
                const x = Phaser.Math.Between(mW - 100, mW + 100);
                const y = Phaser.Math.Between(scr + goalH + (aiR * this.aiSize) / 2, scr + goalH + 50 + (aiR * this.aiSize) / 2);
                this.aiSetTargetPos(x, y, this.patrolAiSpeed); // Adjust the speed as needed
            }
        }
    }

    update(time, delta) {

        this.aiUpdate(time, delta);

        if (this.isDragging) {
            this.goalXPos = Phaser.Math.Clamp(this.goalXPos, sideW + playerR / 2, w - sideW - playerR / 2);
            this.goalYPos = Phaser.Math.Clamp(this.goalYPos, mH + playerR / 2, h - goalH - playerR / 2);

            const dx = this.goalXPos - this.player.x;
            const dy = this.goalYPos - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Calculate the velocity based on the distance to the target
            const playerSpeed = 1050; // Adjust the speed as needed
            const maxDistance = 45; // Adjust the speed as needed
            const velocity = playerSpeed * distance / maxDistance;

            // Calculate the direction towards the goal
            const angle = Math.atan2(dy, dx);

            // Calculate the velocity components
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            // Set the player's velocity
            this.player.setVelocity(vx, vy);
        }


        if (this.scored) return;

        if (this.ball.y >= h - goalH + ballR / 2)
            this.score(1);
        else if (this.ball.y <= goalH + ballR / 2)
            this.score();
    }
}
