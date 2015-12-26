/* global C */

C.utils = {
    // Random int helper
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    // Text refresh
    refreshText: function () {
        C.messageText.text = "Level: " + C.level + "  Balloons: " + C.balloonsDone + "  Lifes: " + C.lifes + "  Score: " + C.score;
    }
};


