let inverse = require('./inverse');
const sockets = require('./sockets');
/*
24 27 17 22
1  1  1  1 STOP
0  0  0  0 STOP
1  1  0  0 FW
0  0  1  1 BW
*/

// Make socket things in a new module
// Offset/compensation for wheels
exports = module.exports = {
    accelerate: function(dutycycles, range = 255) {
        dutycycles.map(function(pin) {
            if (pin.dutycycle >= 0 && pin.dutycycle < range)
                ++pin.dutycycle;
        });
    },
    decelerate: function(dutycycles, range = 255) {
        dutycycles.map(function(pin) {
            if (pin.dutycycle > 0 && pin.dutycycle <= range)
                --pin.dutycycle;
        });
    },
    hardStop: function(socket, dirs) {
        // Num of pins must be strings.
        // You should do smth with this!!!
        sockets.writePins(socket, function (dirs) {
            dirs.map((dirs) => dir.value = 0);
            console.log(dirs);
            return dirs;
        });
    },
    softStop: function(socket) {
        socket.emit('pin:dutycycles', {
            '18': inverse(0),
            '23': inverse(0)
        });
    },
    ready: function(socket) {
        sockets.writePins(socket, [
            {
                num: '24',
                value: 1
            },
            {
                num: '27',
                value: 1
            }
        ]);
    },
    forward: function(socket, dutycycles) {
        this.changeF(socket);
        this.run(socket, dutycycles);
    },
    backward: function(socket, dutycycles) {
        this.changeB(socket);
        this.run(socket, dutycycles);
    },
    run: function(socket, dutycycles) {
        socket.emit('pin:dutycycles', {
            '18': inverse(dutycycles[0].dutycycle),
            '23': inverse(dutycycles[1].dutycycle)
        });
    },
    // Refactor this !!!
    // Update values of pins in pinlist !!!
    changeF: function(socket) {
        socket.emit('pin:write', {
            num: '24',
            value: 1
        });
        socket.emit('pin:write', {
            num: '27',
            value: 1
        });
        socket.emit('pin:write', {
            num: '17',
            value: 0
        });
        socket.emit('pin:write', {
            num: '22',
            value: 0
        });
    },
    changeB: function(socket) {
        socket.emit('pin:write', {
            num: '24',
            value: 0
        });
        socket.emit('pin:write', {
            num: '27',
            value: 0
        });
        socket.emit('pin:write', {
            num: '17',
            value: 1
        });
        socket.emit('pin:write', {
            num: '22',
            value: 1
        });
    },
    // Make 0.5 changeable or define in const
    left: function(socket, dutycycles) {
        socket.emit('pin:dutycycles', {
            '18': inverse(dutycycles[0].dutycycle),
            '23': inverse(Math.floor(dutycycles[0].dutycycle * 0.5)),
        });
    },
    right: function(socket, dutycycles) {
        socket.emit('pin:dutycycles', {
            '18': inverse(dutycycles[0].dutycycle * 0.5),
            '23': inverse(Math.floor(dutycycles[0].dutycycle)),
        });
    }

};
