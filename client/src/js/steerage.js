let inverse = require('./inverse');
const sockets = require('./sockets');
const store = require('./store/store');

let propulsions = store.getters.pins.propulsions;
console.log(propulsions);

/*
24 27 17 22
1  1  1  1 STOP
0  0  0  0 STOP
1  1  0  0 FW
0  0  1  1 BW
*/

// Offset/compensation for wheels
exports = module.exports = {
    accelerate: function(range = 255) {
        store.getters.pins.propulsions.map(function(propulsion) {
            if (propulsion.value >= 0 && propulsion.value < range)
                ++propulsion.value;
                console.log(propulsion);
                store.dispatch('setPin', propulsion);
        });
    },
    decelerate: function(dutycycles, range = 255) {
        dutycycles.map(function(pin) {
            if (pin.dutycycle > 0 && pin.dutycycle <= range)
                --pin.dutycycle;
        });
    },
    hardStop: function(socket, dirs) {
        // HARD STOP -- ALL DIRS ARE 0
        // Num of pins must be strings.
        // You should do smth with this!!!
        dirs.map((dir) => dir.value = 0);
        sockets.writeDirs(socket, dirs);
    },
    softStop: function(socket, dutycycles) {
        //SOFT STOP -- ALL PWM's ARE 0
        dutycycles.map((pin) => pin.dutycycle = inverse(0));
        sockets.writeDutycycles(socket, dutycycles);

    },
    // nie jestem pewien czy to te diry
    ready: function(socket) {
        sockets.writeDirs(socket, [
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
        dutycycles.map((pin) => pin.dutycycle = inverse(pin.dutycycle));
        sockets.writeDutycycles(socket, dutycycles);
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
