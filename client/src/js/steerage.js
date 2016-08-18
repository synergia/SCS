let inverse = require('./inverse');

exports = module.exports = {
    accelerate: function(dutycycles, range = 255) {
        dutycycles.map(function(pin) {
            if (pin.dutycycle >= 0 && pin.dutycycle < range)
                ++pin.dutycycle;
        });
    },
    decelerate: function (dutycycles, range = 255) {
        dutycycles.map(function(pin) {
            if (pin.dutycycle > 0 && pin.dutycycle <= range)
                --pin.dutycycle;
        });
    },
    hardStop: function (socket) {
        // Num of pins must be strings.
        // You should do smth with this!!!
        socket.emit('pin:write', {
            num: '24',
            value: 0
        });
        socket.emit('pin:write', {
            num: '27',
            value: 0
        });
    },
    ready: function (socket) {
        socket.emit('pin:write', {
            num: '24',
            value: 1
        });
        socket.emit('pin:write', {
            num: '27',
            value: 1
        });
    },
    forward: function (socket, dutycycles) {
        socket.emit('pin:dutycycles', {
            '18': inverse(dutycycles[0].dutycycle),
            '23': inverse(dutycycles[1].dutycycle)
        });
    },
    softStop: function (socket) {
        socket.emit('pin:dutycycles', {
            '18': inverse(0),
            '23': inverse(0)
        });
    }
};
