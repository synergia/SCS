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

const SERVO_DEFAULT = 1500;
const SERVO_MAX = 2000;
const SERVO_MIN = 800;
const RANGE = 255;

// TODO: Offset/compensation for wheels

exports = module.exports = {
    accelerate: function(range = RANGE) {
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
    softStop: function(interval) {
        //SOFT STOP -- ALL PWM's ARE 0
        clearInterval(interval);
        let propulsions = store.pins.propulsions;
        propulsions.map((propulsion) => {
            propulsion.value = 255;
            console.log("SOFT STOP", propulsion.value);
            sockets.writeDutycycles(propulsion);
        });

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
    forward: function(t, interval = null) {
        // this.changeF(socket);
        // this.run(socket, dutycycles);
        let propulsions = store.pins.propulsions;
        // Is map so necessary since there is only one turning servo?
        propulsions.map(function(propulsion) {
            if (propulsion.value <= RANGE && propulsion.value-5 >= 0) {
                propulsion.value = propulsion.value - 5;
                console.log("FORWARD", propulsion.value);
            } else {
                clearInterval(interval);
            }
            console.log("SOCKETS", inverse(propulsion).value);
            sockets.writeDutycycles(inverse(propulsion));

        });
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

    left: function(i, interval = null) {
        let servos = store.pins.servos;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            if (servo.value <= SERVO_MAX) {
                servo.value = servo.value + 10 * i;
                sockets.writeDutycycles(servo);
            } else {
                clearInterval(interval);
            }
        });
    },
    right: function(t, interval = null) {
        let servos = store.pins.servos;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            if (servo.value >= SERVO_MIN) {
                servo.value = servo.value - 10 * t;
                sockets.writeDutycycles(servo);
            } else {
                clearInterval(interval);
            }
        });
    },
    turnRight: function(angle) {
        let servos = store.pins.servos;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            if (angle <= 0.79 && servo.value >= SERVO_MIN) {
                servo.value = Math.round(SERVO_DEFAULT - angle * 700);
                sockets.writeDutycycles(servo);
            }
        });
    },
    turnLeft: function(angle) {
        let servos = store.pins.servos;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            if (angle <= 0.79 && servo.value <= SERVO_MAX) {
                servo.value = Math.round(SERVO_DEFAULT + angle * 600);
                sockets.writeDutycycles(servo);
            }
        });
    },
    default: function(interval = null) {
        clearInterval(interval);
        let servos = store.pins.servos;
        servos.map((servo) => {
            servo.value = SERVO_DEFAULT;
            sockets.writeDutycycles(servo);
        });
    }
};
