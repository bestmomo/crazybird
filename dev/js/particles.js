/* global PIXI, C */

C.particles = {
    // properties
    birdParticles: undefined,
    planeParticles: undefined,
    setParticles: function () {
        this.birdParticles = new cloudkid.Emitter(
                C.stage,
                [PIXI.Texture.fromFrame('birdParticle.png')],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0.38
                    },
                    "scale": {
                        "start": 2.3,
                        "end": 2.3,
                        "minimumScaleMultiplier": 1.96
                    },
                    "color": {
                        "start": "#ffffff",
                        "end": "#ffffff"
                    },
                    "speed": {
                        "start": 200,
                        "end": 200
                    },
                    "acceleration": {
                        "x": 4,
                        "y": 8
                    },
                    "startRotation": {
                        "min": 50,
                        "max": 360
                    },
                    "rotationSpeed": {
                        "min": 0,
                        "max": 3
                    },
                    "lifetime": {
                        "min": 0.63,
                        "max": 0.76
                    },
                    "blendMode": "normal",
                    "frequency": 0.023,
                    "emitterLifetime": 0.7,
                    "maxParticles": 30,
                    "pos": {
                        "x": 0,
                        "y": 0
                    },
                    "addAtBack": false,
                    "spawnType": "circle",
                    "spawnCircle": {
                        "x": 0,
                        "y": 0,
                        "r": 40
                    }
                }
        );
        this.birdParticles.emit = false;
        this.planeParticles = new cloudkid.Emitter(
                C.stage,
                [PIXI.Texture.fromFrame('planeParticle.png')],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0.38
                    },
                    "scale": {
                        "start": 1,
                        "end": 1,
                        "minimumScaleMultiplier": 2
                    },
                    "color": {
                        "start": "#ffffff",
                        "end": "#ffffff"
                    },
                    "speed": {
                        "start": 200,
                        "end": 200
                    },
                    "acceleration": {
                        "x": 8,
                        "y": 15
                    },
                    "startRotation": {
                        "min": 50,
                        "max": 360
                    },
                    "rotationSpeed": {
                        "min": 0,
                        "max": 11
                    },
                    "lifetime": {
                        "min": 0.63,
                        "max": 0.96
                    },
                    "blendMode": "normal",
                    "frequency": 0.028,
                    "emitterLifetime": 1,
                    "maxParticles": 1000,
                    "pos": {
                        "x": 0,
                        "y": 0
                    },
                    "addAtBack": false,
                    "spawnType": "circle",
                    "spawnCircle": {
                        "x": 0,
                        "y": 0,
                        "r": 40
                    }
                }
        );
        this.planeParticles.emit = false;
    }

};


