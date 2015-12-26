/* global PIXI, C */

C.load = {
    // Initialisations
    init: function () {

        // Music and sounds
        new Howl({
            urls: ['assets/background.mp3'],
            // I Can See DNA in the Sky by Skill_Borrower (c) 2015 Licensed under a Creative Commons Attribution Noncommercial  (3.0) license. http://ccmixter.org/files/Skill_Borrower/49504 
            autoplay: true,
            loop: true,
            volume: 0.3
        });
        C.sounds.balloon = new Howl({
            urls: ['assets/balloon.mp3'],
            volume: 0.6
        });
        C.sounds.crashBird = new Howl({
            urls: ['assets/crash.mp3'],
            volume: 0.6
        });
        C.sounds.crashPlane = new Howl({
            urls: ['assets/crashplane.mp3'],
            volume: 0.6
        });
        C.sounds.life = new Howl({
            urls: ['assets/life.mp3'],
            volume: 0.8
        });

        // Init local storage
        if (localStorage.getItem('highScore') === null) {
            localStorage.setItem('highScore', 0);
        }
        
        // Loader
        var loader = PIXI.loader
                .add('sky', 'assets/sky.jpg')
                .add('land', 'assets/land.png')
                .add('assets/sprites.json')
                .once('complete', function () {
                    C.load.setup(loader);
                    C.settings.init();
                })
                .load();
    },
    setup: function (loader) {
        
        // Set particles
        C.particles.setParticles();
        
        // Sky
        C.sprites.sky = new PIXI.extras.TilingSprite(loader.resources.sky.texture, C.renderer.width, C.renderer.height);
        C.sprites.sky.mousedown = C.play.onFlight;
        C.sprites.sky.tap = C.play.onFlight;
        this.setSprite(C.sprites.sky, 0, 0, 0, 0, false, true, false);

        // Land
        C.sprites.land = new PIXI.extras.TilingSprite(loader.resources.land.texture, C.renderer.width, C.renderer.height);
        C.sprites.land.mousedown = C.play.onFlight;
        C.sprites.land.tap = C.play.onFlight;
        this.setSprite(C.sprites.land, 0, 0, 0, 0, false, true, false);
        
        // Title
        C.sprites.title = new PIXI.Sprite(PIXI.Texture.fromFrame('title.png'));
        this.setSprite(C.sprites.title, C.renderer.width / 2, C.renderer.height / 3, 0.5, 0, false, false, false);

        // Play
        C.sprites.play = new PIXI.Sprite(PIXI.Texture.fromFrame('play.png'));
        C.sprites.play.mousedown = C.menu.onPlay;
        C.sprites.play.touchstart = C.menu.onPlay;
        this.setSprite(C.sprites.play, C.renderer.width / 2, C.renderer.height * 2 / 3, 0.5, 0, false, true, true);
        
        // Planes
        var planeTexture = PIXI.Texture.fromFrame('plane.png');
        for (var i = 0; i < C.nbrPlanes; ++i) {
            var id = new PIXI.Sprite(planeTexture);
            id.state = false;
            C.sprites.planes.push(id);
            this.setSprite(id, C.renderer.width, C.utils.getRandomInt(C.pannelHeight, C.renderer.height - 222), 0, 0, true, false, false);
        }

        // Balloons
        frames = [];
        frames.push(PIXI.Texture.fromFrame('balloon1.png'));
        frames.push(PIXI.Texture.fromFrame('balloon2.png'));
        frames.push(PIXI.Texture.fromFrame('balloon3.png'));
        frames.push(PIXI.Texture.fromFrame('balloon4.png'));
        for (var i = 0; i < C.nbrBalloons; ++i) {
            var id = new PIXI.extras.MovieClip(frames);
            id.state = false;
            id.animationSpeed = 0.25;
            id.loop = false;
            C.sprites.balloons.push(id);
            this.setSprite(id, C.renderer.width + 50, C.utils.getRandomInt(C.pannelHeight + 80, C.renderer.height - 75), 0.5, 0, true, false, false);
        }
                
        // Animated bird 
        var frames = [];
        frames.push(PIXI.Texture.fromFrame('bird2.png'));
        frames.push(PIXI.Texture.fromFrame('bird1.png'));
        C.sprites.bird = new PIXI.extras.MovieClip(frames);
        C.sprites.bird.position.set(C.renderer.width / 4, C.renderer.height / 2);
        C.sprites.bird.animationSpeed = 0.15;
        C.sprites.bird.vy = .1;
        C.sprites.bird.loop = false;
        C.sprites.bird.gotoAndStop(2);
        C.sprites.bird.play();
        C.sprites.bird.visible = false;
        C.stage.addChild(C.sprites.bird);
        
        // Help
        C.sprites.help = new PIXI.Sprite(PIXI.Texture.fromFrame('help.png'));
        C.sprites.help.mousedown = C.menu.onHelp;
        C.sprites.help.touchstart = C.menu.onHelp;
        this.setSprite(C.sprites.help, C.renderer.width / 6, C.renderer.height * 3 / 4, 0.5, -0.6, false, true, true);

        C.helpPannel = new PIXI.Graphics();
        C.helpPannel.beginFill(0x334477, 1);
        C.helpPannel.drawRoundedRect(C.renderer.width / 10, C.renderer.height / 10, C.renderer.width - C.renderer.width / 5, C.renderer.height - C.renderer.height / 3, 30);
        C.helpPannel.visible = false;
        C.helpPannel.interactive = true;
        C.helpPannel.buttonMode = true;
        C.helpPannel.mousedown = C.menu.onHideHelp;
        C.helpPannel.touchstart = C.menu.onHideHelp;        
        C.stage.addChild(C.helpPannel);

        // Help text
        C.helpMessage = new PIXI.Text(
                "- Click on \"Play\" to start.\n- Click on screen to make your bird flight.\n- You must burst the ballons and avoid the planes.\n- You go up of level when you have bursted 8 yellow balloons.\n- You gain a life if you burst a red balloon.\n- When you crash in a plane you lose a life if you have one or you die and the game is finished.",
                {
                    font: '44px Snippet',
                    fill: 'lightgrey',
                    stroke: '#ffffff',
                    lineHeight: 56,
                    strokeThickness: 3,
                    wordWrap: true,
                    wordWrapWidth: C.renderer.width - C.renderer.height / 2.4
                }
        );
        C.helpMessage.x = C.renderer.width / 8;
        C.helpMessage.y = C.renderer.height / 8;
        C.helpMessage.visible = false;
        C.stage.addChild(C.helpMessage);

        // Hight score text
        C.highScoreText = new PIXI.Text(
                "High score: " + localStorage.getItem('highScore'),
                {
                    font: 'bold 42px Snippet',
                    fill: 'lightgrey',
                    stroke: '#FFFFFF',
                    strokeThickness: 4
                }
        );
        C.highScoreText.x = 20;
        C.highScoreText.y = 20;
        C.highScoreText.visible = false;
        C.stage.addChild(C.highScoreText);
        
        // Pannel
        C.sprites.pannel = new PIXI.Graphics();
        C.sprites.pannel.lineStyle(C.pannelHeight, 0x334477, 1);
        C.sprites.pannel.moveTo(0, 0);
        C.sprites.pannel.y = C.pannelHeight / 2;
        C.sprites.pannel.lineTo(C.renderer.width, 0);
        C.sprites.pannel.visible = false;
        C.stage.addChild(C.sprites.pannel);
        
        // Message text
        C.messageText = new PIXI.Text(
            "Level: " + C.level + "  Balloons: " + C.balloonsDone + "  Lifes: " + C.lifes + "  Score: " + C.score,
            {
                font: '32px Snippet',
                fill: 'lightgrey',
                stroke: '#FFFFFF',
                strokeThickness: 4
            }
        );
        C.messageText.x = 10;
        C.messageText.visible = false;
        C.stage.addChild(C.messageText);

        // Game Over
        C.sprites.gameOver = new PIXI.Sprite(PIXI.Texture.fromFrame('gameover.png'));
        this.setSprite(C.sprites.gameOver, C.renderer.width / 2, C.renderer.height + 70, 0.5, 0, true, false, false);

        // Play Again
        C.sprites.playAgain = new PIXI.Sprite(PIXI.Texture.fromFrame('playagain.png'));
        C.sprites.playAgain.mousedown = C.end.onPlayAgain;
        C.sprites.playAgain.touchstart = C.end.onPlayAgain; 
        this.setSprite(C.sprites.playAgain, C.renderer.width / 2, C.renderer.height + 70, 0.5, 0, true, true, true);
        
    },
    setSprite: function (sprite, x, y, anchor, rotation, visible, interactive, buttonMode) {
        sprite.x = x;
        sprite.y = y;
        sprite.anchor.set(anchor);
        sprite.rotation = rotation;
        sprite.visible = visible;
        sprite.interactive = interactive;
        sprite.buttonMode = buttonMode;
        C.stage.addChild(sprite);
    }
};