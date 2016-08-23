const keyboard = require('keyboardjs');
// var stopwatch = require('simple-stopwatch');
let inverse = require('./inverse');
let steerage = require('./steerage.js');

exports = module.exports = function(socket, SCS) {
    let pinlist = SCS.pinlist;
    let dutycycles = SCS.dutycycles;

    let pinsWithPWM = pinlist.filter((pin) => pin.dutycycle !== undefined);

    // let pin0 = pinsWithPWM[0].num;
    // let pin1 = pinsWithPWM[1].num;

    // FORWARD
    keyboard.bind('up', function(e) {
        e.preventRepeat();
        steerage.forward(socket, dutycycles);
        console.log('FORWARD:', inverse(dutycycles[0].dutycycle), inverse(dutycycles[1].dutycycle));

    }, function(e) {
        steerage.softStop(socket);
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
        steerage.accelerate(dutycycles);
        // console.log(dutycycles[0].dutycycle, dutycycles[1].dutycycle);
    });

    // DECREMENT DUTYCYCLE
    keyboard.bind('z', function(e) {
        steerage.decelerate(dutycycles);
        // console.log(dutycycles[0].dutycycle, dutycycles[1].dutycycle);
    });

    // EMERGENCY STOP
    keyboard.bind('space', function(e) {
        e.preventRepeat();
        steerage.hardStop(socket);
        console.log('STOP');
    });

    // UNBLOCK
    keyboard.bind('enter', function(e) {
        e.preventRepeat();
        steerage.ready(socket);
        console.log('READY TO FUN? GO!');
    });

    // MAKE KEY COMBO! up-right up-left etc.

    // TURN LEFT
    keyboard.bind('left', function(e) {
        e.preventRepeat();
        steerage.left(socket, dutycycles);
        console.log('TURN LEFT', inverse(Math.floor(dutycycles[0].dutycycle * 0.5)));
    }, function(e) {
        steerage.softStop(socket);
    });

    // TURN RIGHT
    keyboard.bind('right', function(e) {
        e.preventRepeat();
        steerage.right(socket, dutycycles);
        console.log('TURN RIGHT', inverse(Math.floor(dutycycles[0].dutycycle * 0.5)));
    }, function(e) {
        steerage.softStop(socket);
    });
};
