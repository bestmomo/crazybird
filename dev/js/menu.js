/* global PIXI, C */

C.menu = {
    
    // Properties
    scaleStep: 0.01,
    
    show: function () {
        C.sprites.title.scale.x += this.menu.scaleStep;
        C.sprites.title.scale.y += this.menu.scaleStep;
        if (C.sprites.title.scale.x > 1.1) {
            this.menu.scaleStep = -.01;
        } else if (C.sprites.title.scale.x < .9) {
            this.menu.scaleStep = .01;
        }
    },
    
    // Help event
    onHelp: function () {
        C.helpPannel.visible = true;
        C.helpMessage.visible = true;
    },
    
    // Hide help event
    onHideHelp: function () {
        C.helpPannel.visible = false;
        C.helpMessage.visible = false;
    },
    
    // Play event
    onPlay: function () {
        C.sprites.title.visible = false;
        C.sprites.play.visible = false;
        C.sprites.help.visible = false;
        C.highScoreText.visible = false;
        C.sprites.bird.visible = true;
        C.messageText.visible = true;
        C.sprites.pannel.visible = true;
        C.state = C.play.on;
    }
};