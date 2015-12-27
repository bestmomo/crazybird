/* global C, SAT */

C.end = {
    // Properties
    rotationStep: .01,
    on: function () {
        if (C.sprites.gameOver.y > C.renderer.height / 3) {
            C.sprites.gameOver.y -= 3;
            C.sprites.gameOver.rotation += C.end.rotationStep;
            if (C.sprites.gameOver.rotation > .15) {
                C.end.rotationStep = -.01;
            } else if (C.sprites.gameOver.rotation < -.15) {
                C.end.rotationStep = .01;
            }
        } else {
            C.sprites.gameOver.rotation = 0;
            if (C.sprites.playAgain.y > C.renderer.height * 2 / 3) {
                C.sprites.playAgain.y -= 4;
            }
        }
    },
    onPlayAgain: function() {
        // Reset variables
        C.state = C.play.on;
        C.sprites.gameOver.y = C.renderer.height + 70;
        C.sprites.playAgain.y = C.renderer.height + 70;
        C.level = 1;
        C.score = 0;

        // Set planes
        C.sprites.planes.forEach(function (e) {
            e.state = false;
            e.position.set(C.renderer.width, C.utils.getRandomInt(C.pannelHeight, C.renderer.height - 222));
        });

        // Set balloons
        C.sprites.balloons.forEach(function (e) {
            e.state = false;
            e.gotoAndStop(0);            
            e.position.set(C.renderer.width + 50, C.utils.getRandomInt(C.pannelHeight + 75, C.renderer.height - 75));
        });
        C.balloonsDone = 0;

        // Set bird
        C.sprites.bird.visible = true;
        C.sprites.bird.position.set(C.renderer.width / 4, C.renderer.height / 2);

        // Refresh text
        C.utils.refreshText();        
    }
};