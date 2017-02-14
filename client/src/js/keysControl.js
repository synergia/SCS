const keyboard = require('keyboardjs');
// var stopwatch = require('simple-stopwatch');
let inverse = require('./inverse');

exports = module.exports = function() {
    let steerage = require('./steerage.js');

    // let propulsions = store.getters.pins.propulsions;
    // let logics = store.getters.pins.logics;
    // let servos = store.getters.pins.logics;

    // let pin0 = pinsWithPWM[0].num;
    // let pin1 = pinsWithPWM[1].num;

    // FORWARD
    keyboard.bind('up', function(e) {
        e.preventRepeat();
        steerage.forward(socket, dutycycles);
        console.log('FORWARD:', inverse(dutycycles[0].dutycycle), inverse(dutycycles[1].dutycycle));

    }, function(e) {
        steerage.softStop(socket, dutycycles);
    });

    // BACKWARD
    keyboard.bind('down', function(e) {
        e.preventRepeat();
        steerage.backward(socket, dutycycles);
        console.log('BACKWARD:', inverse(dutycycles[0].dutycycle), inverse(dutycycles[1].dutycycle));

    }, function(e) {
        steerage.softStop(socket);
    });

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
        steerage.hardStop(socket, dirs);
        console.log('STOP');
    });

    // UNBLOCK
    keyboard.bind('enter', function(e) {
        steerage.ready(socket, dirs);
        console.log('READY TO FUN? GO!');
    });

    // MAKE KEY COMBO! up-right up-left etc.

    // TURN LEFT
    keyboard.bind('left', function(e) {
        e.preventRepeat();
        steerage.left();
        console.log('TURN LEFT');
    }, function(e) {
        // steerage.softStop(socket);
    });

    // TURN RIGHT
    keyboard.bind('right', function(e) {
        e.preventRepeat();
        steerage.right();
        // console.log('TURN RIGHT', inverse(Math.floor(dutycycles[0].dutycycle * 0.5)));
    }, function(e) {
        // steerage.softStop(socket);
    });
};
