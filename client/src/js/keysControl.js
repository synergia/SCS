const keyboard = require('keyboardjs');
// var stopwatch = require('simple-stopwatch');
let inverse = require('./inverse');

exports = module.exports = function(socket, SCS) {
    let pinlist = SCS.pinlist;
    let dutycycles = SCS.dutycycles;

    let pinsWithPWM = pinlist.filter((pin) => pin.dutycycle !== undefined);

    // let pin0 = pinsWithPWM[0].num;
    // let pin1 = pinsWithPWM[1].num;

    // FORWARD
    keyboard.bind('up', function(e) {
        socket.emit('pin:dutycycles', {
            '18': inverse(dutycycles['18']),
            '23': inverse(dutycycles['23'])
        });
        // Number of pins must be strings
        socket.emit('pin:write', {
            num: '24',
            value: 1
        });
        socket.emit('pin:write', {
            num: '27',
            value: 1
        });
        console.log('Run with:', dutycycles['18'], dutycycles['23']);


    }, function(e) {
        socket.emit('pin:dutycycles', {
            '18': inverse(0),
            '23': inverse(0)
        });
        // socket.emit('pin:write', {
        //     num: '24',
        //     value: 0
        // });
        // socket.emit('pin:write', {
        //     num: '27',
        //     value: 0
        // });
    });

    // INCREMENT DUTYCYCLE
    keyboard.bind('a', function(e) {
        ++dutycycles['18'];
        ++dutycycles['23'];
        if ((dutycycles['18'] || dutycycles['18']) >= 255) {
            dutycycles['18'] = 255;
            dutycycles['23'] = 255;
        } else if ((dutycycles['18'] || dutycycles['18']) <= 0) {
            dutycycles['18'] = 0;
            dutycycles['23'] = 0;
        }

        console.log(dutycycles['18'], dutycycles['23']);
    });
    // DECREMENT DUTYCYCLE

    keyboard.bind('z', function(e) {
        --dutycycles['18'];
        --dutycycles['23'];
        if ((dutycycles['18'] || dutycycles['18']) >= 255) {
            dutycycles['18'] = 255;
            dutycycles['23'] = 255;
        } else if ((dutycycles['18'] || dutycycles['18']) <= 0) {
            dutycycles['18'] = 0;
            dutycycles['23'] = 0;
        }

        console.log(dutycycles['18'], dutycycles['23']);
    });
};
