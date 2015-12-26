
var CRAZYBIRD = CRAZYBIRD || {
    // Properties
    state: undefined,
    stage: undefined,
    renderer: undefined,
    pannelHeight: 40,
    sounds : {
        balloon: undefined,
        crash: undefined,
        crashPlane: undefined,
        life: undefined        
    },
    sprites: {
        loading : undefined,
        sky: undefined,
        land: undefined,
        title: undefined,
        play: undefined,
        help: undefined,
        bird: undefined,
        pannel: undefined,
        planes: [],
        balloons: [],
        gameOver: undefined,
        playAgain: undefined
    },
    helpPannel: undefined,
    helpMessage: undefined,
    highScoreText: undefined,
    messageText: undefined,
    nbrPlanes: 3,
    nbrBalloons: 2,
    elapsed: Date.now(),
    level: 1,
    balloonsDone: 0,
    maxBalloons: 8,
    lifes: 0,
    score: 0,
    speed: 5,
    // Game loop
    gameLoop: function () {
        requestAnimationFrame(C.gameLoop);
        if (typeof C.state !== 'undefined') {
            C.state();
            // For particle emitter
            var now = Date.now();
            C.particles.birdParticles.update((now - C.elapsed) * 0.001);
            C.particles.planeParticles.update((now - C.elapsed) * 0.001);
            C.elapsed = now;
        }
        C.renderer.render(C.stage);
    }
};
var C = CRAZYBIRD;


