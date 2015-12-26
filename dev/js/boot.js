/* global PIXI, C */

C.boot = {
    // Properties
    dimensions: {
        width: 1366,
        height: 768
    },
    // Initialisations
    init: function () {

        // Resize event
        window.onresize = function () {
            C.boot.setDimensions();
        };

        // Pixi init
        C.renderer = PIXI.autoDetectRenderer(this.dimensions.width, this.dimensions.height);
        this.setDimensions();
        document.body.appendChild(C.renderer.view);
        C.stage = new PIXI.Container();

        // Load google font
        window.WebFontConfig = {
            google: {
                families: ['Snippet']
            },
            active: function () {
                C.boot.setup();
            }
        };

        // Include web-font loader script
        (function () {
            var wf = document.createElement("script");
            wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
                    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.async = 'true';
            document.head.appendChild(wf);
        })();

        C.gameLoop();
    },
    setup: function () {

        var style = {
            font: 'bold italic 72px Snippet',
            fill: '#dddd42',
            stroke: '#aaaa20',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#888800',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4
        };

        // Set loading text
        C.sprites.loading = new PIXI.Text('Loading...', style);
        C.sprites.loading.anchor.set(0.5);
        C.sprites.loading.position.set(C.renderer.width / 2, C.renderer.height / 2);
        C.stage.addChild(C.sprites.loading);
        
        C.load.init();

    },
    setDimensions: function () {
        C.renderer.view.style.width = window.innerWidth + "px";
        C.renderer.view.style.height = window.innerHeight + "px";
    }
};


