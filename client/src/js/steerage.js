let inverse = require('./inverse');
const sockets = require('./sockets.js');
const store = require('./store/store');

/*
24 27 17 22
1  1  1  1 STOP
0  0  0  0 STOP
1  1  0  0 FW
0  0  1  1 BW
*/

// Offset/compensation for wheels

var intervalRight;
var intervalLeft;

exports = module.exports = {
    accelerate: function(range = 255) {
        store.pins.propulsions.map(function(propulsion) {
            if (propulsion.value >= 0 && propulsion.value < range)
                ++propulsion.value;
        });
    },
    decelerate: function(range = 255) {
        store.pins.propulsions.map(function(propulsion) {
            if (propulsion.value > 0 && propulsion.value <= range)
                --propulsion.value;
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
    // left: function(socket, dutycycles) {
    //     socket.emit('pin:dutycycles', {
    //         '18': inverse(dutycycles[0].dutycycle),
    //         '23': inverse(Math.floor(dutycycles[0].dutycycle * 0.5)),
    //     });
    // },
    left: function() {
        let servos = store.pins.servos;
        // Investigate: Is this good to declare var every time?
        var i = 1;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            intervalLeft = setInterval(function() {
                if (servo.value > 750) {
                    servo.value = servo.value - 5 * i;
                    i++;
                    console.log(i);
                    sockets.writeDutycycles(servo);
                } else {
                    clearInterval(intervalLeft);
                }
            }, 50);
        });

    },
    right: function() {
        // socket.emit('pin:dutycycles', {
        //     '18': inverse(dutycycles[0].dutycycle * 0.5),
        //     '23': inverse(Math.floor(dutycycles[0].dutycycle)),
        // });
        let servos = store.pins.servos;
        // Investigate: Is this good to declare var every time?
        var i = 1;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            intervalRight = setInterval(function() {
                if (servo.value <= 2000) {
                    servo.value = servo.value + 5 * i;
                    i++;
                    console.log(i);
                    sockets.writeDutycycles(servo);
                } else {
                    clearInterval(intervalRight);
                }
            }, 50);
        });
    },
    default: function() {
        clearInterval(intervalRight);
        clearInterval(intervalLeft);
        let servos = store.pins.servos;
        servos.map((servo) => {
            servo.value = 1500;
            sockets.writeDutycycles(servo);
        });
    }
};
