/* global C, SAT */

// Aliases
var V = SAT.Vector;

C.collisions = {
    //Properties
    response: undefined,
    planePolygon: [
        new V(4, 128),
        new V(192, 8),
        new V(332, 68),
        new V(264, 201),
        new V(99, 212)
    ],
    balloonPolygon: [
        new V(10, 0),
        new V(20, 0),
        new V(20, 75),
        new V(30, 75)
    ],
    // Get plane box
    getPlaneBox: function (plane) {
        return new SAT.Box(new SAT.Vector(plane.x, plane.y), 356, 222).toPolygon();
    },
    // Get plane polygon
    getPlanePolygon: function (plane) {
        return new SAT.Polygon(new V(plane.x, plane.y), this.planePolygon);
    },
    // Get balloonn polygon
    getBalloonPolygon: function (balloon) {
        return new SAT.Polygon(new V(balloon.x, balloon.y), this.balloonPolygon);
    },
    // Get balloon circle
    getBalloonCircle: function (balloon) {
        return new SAT.Circle(new V(balloon.x, balloon.y - 35), 40);
    },
    // Get bird circle
    getBirdCircle: function () {
        return new SAT.Circle(new V(C.sprites.bird.x + 40, C.sprites.bird.y + 60), 38);
    },
    // Detect bird/plane collision
    birdPlane: function (plane) {
        return SAT.testPolygonCircle(this.getPlanePolygon(plane), this.getBirdCircle(), this.response);
    },
    // Detect bird/balloon circle collision
    birdBalloonCircle: function (balloon) {
        return SAT.pointInCircle(new V(C.sprites.bird.x + 133, C.sprites.bird.y + 83), this.getBalloonCircle(balloon), this.response);
    },
    // Detect bird/balloon polygon collision
    birdBalloonPolygon: function (balloon) {
        return SAT.pointInPolygon(new V(C.sprites.bird.x + 133, C.sprites.bird.y + 83), this.getBalloonPolygon(balloon), this.response);
    },
    // Check for free place for plane
    freeOfPlane: function (plane) {
        for (var i = 0; i < C.nbrPlanes; ++i) {
            if ((C.sprites.planes[i].state && SAT.testPolygonPolygon(this.getPlaneBox(C.sprites.planes[i]), this.getPlaneBox(plane), this.response))) {
                return false;
            }
        }
        return true;
    }
};