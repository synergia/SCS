const keyboard = require('keyboardjs');
// var stopwatch = require('simple-stopwatch');
let inverse = require('./inverse');

exports = module.exports = function(steerage) {
    // let steerage = require('./steerage.js');

    var intervalRight;
    var intervalLeft;
    var intervalForward;

    // let propulsions = store.getters.pins.propulsions;
    // let logics = store.getters.pins.logics;
    // let servos = store.getters.pins.logics;

    // let pin0 = pinsWithPWM[0].num;
    // let pin1 = pinsWithPWM[1].num;

    // FORWARD
    keyboard.bind('up', function(e) {
        var t = 1;
        e.preventRepeat();
        console.log('KEY UP');
        intervalForward = setInterval(function() {
            steerage.forward(t, intervalForward);
            console.log("intervalForward", t);
            t++;
        }, 50);

    }, function(e) {
        clearInterval(intervalForward);
        steerage.softStop();
    });

    // BACKWARD
    keyboard.bind('down', function(e) {
        var t = 1;
        e.preventRepeat();
        console.log('KEY DOWN');
        intervalForward = setInterval(function() {
            steerage.backward(t, intervalForward);
            console.log("intervalForward", t);
            t++;
        }, 50);

    }, function(e) {
        clearInterval(intervalForward);
        steerage.softStop();
    });

    // BACKWARD
    // keyboard.bind('down', function(e) {
    //     e.preventRepeat();
    //     steerage.backward(socket, dutycycles);
    //     console.log('BACKWARD:', inverse(dutycycles[0].dutycycle), inverse(dutycycles[1].dutycycle));
    //
    // }, function(e) {
    //     steerage.softStop(socket);
    // });

    // INCREMENT DUTYCYCLE
    keyboard.bind('a', function(e) {
        steerage.accelerate();
    });

    // DECREMENT DUTYCYCLE
    keyboard.bind('z', function(e) {
        steerage.decelerate();
    });

    // EMERGENCY STOP
    keyboard.bind('space', function(e) {
        steerage.hardStop();
        clearInterval(intervalForward);
        console.log('KEY SPACE');
    });

    // UNBLOCK
    keyboard.bind('enter', function(e) {
        steerage.ready(socket, dirs);
        console.log('READY TO FUN? GO!');
    });

    // MAKE KEY COMBO! up-right up-left etc.

    // TURN LEFT
    keyboard.bind('left', function(e) {
        var i = 1;
        e.preventRepeat();
        console.log('TURN LEFT');
        intervalLeft = setInterval(function() {
            steerage.left(i, intervalLeft);
            i++;
        }, 50);
    }, function(e) {
        steerage.softStop();
        // Go back to default position
        steerage.default(intervalLeft);
    });

    // TURN RIGHT
    keyboard.bind('right', function(e) {
        var i = 1;
        e.preventRepeat();
        console.log('TURN RIGHT');
        intervalRight = setInterval(function() {
            steerage.right(i, intervalRight);
            i++;
        }, 50);

    }, function(e) {
        steerage.softStop();
        // Go back to default position
        steerage.default(intervalRight);

    });
};
