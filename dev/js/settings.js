/* global PIXI, C, Element */

C.settings = {
    init: function() {
        if (window.innerWidth < window.innerHeight) {
            C.sprites.loading.text = 'Set landscape please...';
            C.state = C.settings.landscape;
        } else {
            C.state = undefined; 
            C.settings.fullScreen();
        }        
    },
    // Check landscape
    landscape: function () {
        if (window.innerWidth > window.innerHeight) {
            C.state = undefined;
            C.settings.fullScreen();
        }
    },
    // Set full screen
    fullScreen: function () {
        C.sprites.loading.text = 'Touch me for full screen';
        C.sprites.loading.interactive = true;
        C.sprites.loading.buttonMode = true;
        C.sprites.loading.mousedown = this.setFullScreen;
        C.sprites.loading.touchstart = this.setFullScreen;
    },
    setFullScreen: function () {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        C.stage.removeChild(C.sprites.loading);
        
        C.sprites.title.visible = true;
        C.sprites.play.visible = true;
        C.sprites.help.visible = true;
        C.highScoreText.visible = true;
        C.sprites.sky.visible = true;
        C.sprites.land.visible = true;
        
        C.state = C.menu.show;
    }
};




