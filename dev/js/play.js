/* global C, SAT */

C.play = {
    on: function () {
        // Manage sky and land
        C.sprites.sky.tilePosition.x -= 1;
        C.sprites.land.tilePosition.x -= 2;

        // Manage planes collisions
        C.sprites.planes.forEach(function (e) {
            if (e.state) {
                if (C.collisions.birdPlane(e)) {
                    // Check lifes
                    if (C.lifes) {
                        C.sounds.crashPlane.play();
                        C.particles.planeParticles.updateOwnerPos(e.x + 180, e.y + 110);
                        C.particles.planeParticles.emit = true;
                        e.state = false;
                        e.position.set(C.renderer.width, C.utils.getRandomInt(C.pannelHeight, C.renderer.height - 222));
                        --C.lifes;
                        C.score += 10;
                        C.utils.refreshText();
                    } else {
                        // Bird crash and end game
                        C.sounds.crashBird.play();
                        C.particles.birdParticles.updateOwnerPos(C.sprites.bird.x + 68, C.sprites.bird.y + 60);
                        C.particles.birdParticles.emit = true;
                        C.sprites.bird.visible = false;
                        if (C.score > localStorage.getItem('highScore')) {
                            localStorage.setItem('highScore', C.score);
                        }
                        C.state = C.end.on;
                    }
                }
            }
        });

        // Manage balloons collisions
        C.sprites.balloons.forEach(function (e) {
            if (e.state === 1) {
                if (C.collisions.birdBalloonCircle(e)) {
                    // Check life balloon
                    if (e.life) {
                        C.sounds.life.play();
                        ++C.lifes;
                    } else {
                        C.sounds.balloon.play();
                        ++C.balloonsDone;
                        if (C.balloonsDone === C.maxBalloons) {
                            C.balloonsDone = 0;
                            ++C.level;
                        }
                    }
                    ++C.score;
                    e.state = 2;
                    e.play();
                    C.utils.refreshText();
                } else if (C.collisions.birdBalloonPolygon(e)) {
                    e.rotation = -0.5;
                }
            }
        });

        // Move bird
        var newY = C.sprites.bird.y - C.sprites.bird.vy;
        if (newY < C.pannelHeight + 1) {
            // Top collision
            C.sprites.bird.vy = .1;
            C.sprites.bird.y += C.sprites.bird.vy;
        } else if (newY > C.renderer.height - 120) {
            // Bottom collision
            C.sprites.bird.vy = 0;
        } else {
            // Casual flight
            C.sprites.bird.y = newY;
            C.sprites.bird.vy -= 0.07;
        }

        // Move planes
        C.sprites.planes.forEach(function (e) {
            if (e.state) {
                e.x -= C.speed + C.level * 2;
                if (e.x < -356) {
                    e.state = false;
                    e.x = C.renderer.width;
                    e.y = C.utils.getRandomInt(C.pannelHeight, C.renderer.height - 222);
                }
            }
        });

        // Move balloons 
        C.sprites.balloons.forEach(function (e) {
            if (e.state) {
                e.x -= (C.speed + C.level * 2) / 2;
                if (e.rotation < 0) {
                    e.rotation += .004;
                }
                if (e.state === 2) {
                    e.y += 5;
                }
                if (e.x < -50 || e.y > C.stageHeight + 80) {
                    e.state = false;
                    e.rotation = 0;
                    e.gotoAndStop(0);
                    e.position.set(C.renderer.width + 50, C.utils.getRandomInt(C.pannelHeight + 80, C.renderer.height - 75));
                }
            }
        });

        // Check less than 2 planes in right section
        var n = 0;
        for (var i = 0; i < C.nbrPlanes; ++i) {
            if (C.sprites.planes[i].state && C.sprites.planes[i].x > C.renderer.width - 400) {
                ++n;
            }
        }
        // Manage planes
        if (n < 2) {
            C.sprites.planes.forEach(function (e) {
                if (!e.state) {
                    if (C.utils.getRandomInt(0, 200 - C.level * 10) === 50) {
                        // Check for free place
                        while (!C.collisions.freeOfPlane(e)) {
                            e.y += 1;
                            // Check stage limit
                            if (e.y > C.renderer.height - 222) {
                                e.y = C.pannelHeight;
                            }
                        }
                        e.state = true;
                    }
                }
            });
        }

        // Manage balloons
        C.sprites.balloons.forEach(function (e) {
            if (!e.state) {
                if (C.utils.getRandomInt(0, 200 - C.level * 10) === 50) {
                    if (C.utils.getRandomInt(0, 10) === 5) {
                        e.tint = 0xff0000;
                        e.life = true;
                    } else {
                        e.tint = 0xffff00;
                        e.life = false;
                    }
                    e.state = 1;
                }
            }
        });

    },
    onFlight: function () {
        C.sprites.bird.vy += 2.4;
        C.sprites.bird.gotoAndPlay(0);
    }
};