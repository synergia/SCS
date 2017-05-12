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

// move all consts to store?

const SERVO_DEFAULT = 1500;

const RANGE = 255;

// TODO: Offset/compensation for wheels

// accelerate: function(range = RANGE) {
//     store.pins.propulsions.map(function(propulsion) {
//         if (propulsion.value >= 0 && propulsion.value < range)
//             ++propulsion.value;
//     });
// },
// decelerate: function(range = 255) {
//     store.pins.propulsions.map(function(propulsion) {
//         if (propulsion.value > 0 && propulsion.value <= range)
//             --propulsion.value;
//     });
// },

class Steerage {
    constructor() {
        //in constructor you should probably filter and map
        // and maybe it speed up steerage
        console.log('Initiating Steerage');
    }
    default (interval = null) {
        clearInterval(interval);
        let servos = store.pins.servos;
        servos.map((servo) => {
            servo.value = SERVO_DEFAULT;
            sockets.writeDutycycles(servo);
        });
    }
    left(t, interval = null) {
        let servos = store.pins.servos;
        // filter return array, so [0]
        let turn_servo = servos.filter(function(servo) {
            return servo.name === "turn";
        })[0];
        if (turn_servo.value <= turn_servo.max) {
            turn_servo.value = turn_servo.value + 10 * t;
            sockets.writeDutycycles(turn_servo);
        } else {
            clearInterval(interval);
        }
    }

    right(t, interval = null) {
        let servos = store.pins.servos;
        let turn_servo = servos.filter(function(servo) {
            return servo.name === "turn";
        })[0];
        if (turn_servo.value >= turn_servo.min) {
            turn_servo.value = turn_servo.value - 10 * t;
            sockets.writeDutycycles(turn_servo);
        } else {
            clearInterval(interval);
        }
    }

    run(propulsion, interval = null) {
        // It could return true to use clearInterval in keysControl, not here
        if (propulsion.value <= propulsion.max - 5 && propulsion.value + 5 >= 0) {
            propulsion.value = propulsion.value + 5;
            console.log("RUN", propulsion.value);
        } else {
            clearInterval(interval);
        }
        console.log("SOCKETS", inverse(propulsion).value);
        sockets.writeDutycycles(inverse(propulsion));
    }
    // if current state is not forward, then find logics that is owned by
    // by propulsion. logic0 pin number should be always less than logic1
    forward(t, interval = null) {
        let propulsions = store.pins.propulsions;
        propulsions.map(function(propulsion) {
            if (!store.vehicle.is.forward) {
                console.log('Changing logics to go forward');
                let logics = store.pins.logics;
                let ownedLogics = logics.filter((logic) => logic.owner === propulsion.num);
                if (ownedLogics[0].num > ownedLogics[1].num) {
                    ownedLogics[0].value = 0;
                    ownedLogics[1].value = 1;
                } else {
                    ownedLogics[0].value = 1;
                    ownedLogics[1].value = 0;
                }
                sockets.writeDutycycles(logics);
                store.vehicle.is.forward = true;
                store.vehicle.is.backward = false;
            }
            this.run(propulsion, interval);

        }, this);
        propulsions = null;
    }
    backward(t, interval = null) {
        let propulsions = store.pins.propulsions;
        propulsions.map(function(propulsion) {
            if (!store.vehicle.is.backward) {
                console.log('Changing logics to go backward');
                let logics = store.pins.logics;
                let ownedLogics = logics.filter((logic) => logic.owner === propulsion.num);
                if (ownedLogics[0].num > ownedLogics[1].num) {
                    ownedLogics[0].value = 1;
                    ownedLogics[1].value = 0;

                } else {
                    ownedLogics[0].value = 0;
                    ownedLogics[1].value = 1;
                }
                sockets.writeDutycycles(logics);
                store.vehicle.is.forward = false;
                store.vehicle.is.backward = true;
            }
            this.run(propulsion, interval);
        }, this);
        propulsions = null;
    }

    softStop() {
        //SOFT STOP -- ALL PWM's ARE 0
        let propulsions = store.pins.propulsions;
        propulsions.map((propulsion) => {
            propulsion.value = 0;
            console.info("[Steerage]: Soft Stop");
            sockets.writeDutycycles(inverse(propulsion));
        });
    }
    hardStop() {
        // HARD STOP -- ALL DIRS ARE 0
        let logics = store.pins.logics;
        logics.map((logic) => logic.value = 0);
        sockets.writeDutycycles(logics);
        console.info("[Steerage]: Hard Stop");
        store.vehicle.is.forward = false;
        store.vehicle.is.backward = false;
    }
    touchLeft(angle) {
        let servos = store.pins.servos;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            if (angle <= 0.79 && servo.value <= SERVO_MAX) {
                servo.value = Math.round(SERVO_DEFAULT + angle * 600);
                sockets.writeDutycycles(servo);
            }
        });
    }

    touchRight(angle) {
        let servos = store.pins.servos;
        // Is map so necessary since there is only one turning servo?
        servos.map(function(servo) {
            if (angle <= 0.79 && servo.value >= SERVO_MIN) {
                servo.value = Math.round(SERVO_DEFAULT - angle * 700);
                sockets.writeDutycycles(servo);
            }
        });
    }
    touchForward(distance, size) {
        let propulsions = store.pins.propulsions;
        propulsions.map(function(propulsion) {
            if (!store.vehicle.is.forward) {
                console.log('Changing logics to go forward');
                let logics = store.pins.logics;
                let ownedLogics = logics.filter((logic) => logic.owner === propulsion.num);
                if (ownedLogics[0].num > ownedLogics[1].num) {
                    ownedLogics[0].value = 0;
                    ownedLogics[1].value = 1;
                } else {
                    ownedLogics[0].value = 1;
                    ownedLogics[1].value = 0;
                }
                sockets.writeDutycycles(logics);
                store.vehicle.is.forward = true;
                store.vehicle.is.backward = false;
            }
            if (propulsion.value <= propulsion.max && propulsion.value >= propulsion.min) {
                propulsion.value = Math.floor((propulsion.max / size) * distance*2);
                console.log("[Steerage]: touchForward: " + propulsion.value + " Inverted: " + inverse(propulsion).value);
            }
            sockets.writeDutycycles(inverse(propulsion));
        }, this);
        propulsions = null;
    }

    touchBackward(distance, size) {
        let propulsions = store.pins.propulsions;
        propulsions.map(function(propulsion) {
            if (!store.vehicle.is.backward) {
                console.log('Changing logics to go backward');
                let logics = store.pins.logics;
                let ownedLogics = logics.filter((logic) => logic.owner === propulsion.num);
                if (ownedLogics[0].num > ownedLogics[1].num) {
                    ownedLogics[0].value = 1;
                    ownedLogics[1].value = 0;
                } else {
                    ownedLogics[0].value = 0;
                    ownedLogics[1].value = 1;
                }
                sockets.writeDutycycles(logics);
                store.vehicle.is.forward = false;
                store.vehicle.is.backward = true;
            }
            if (propulsion.value <= propulsion.max && propulsion.value >= propulsion.min) {
                propulsion.value = Math.floor((propulsion.max / size) * distance*2);
                console.log("[Steerage]: touchBackward: " + propulsion.value + " Inverted: " + inverse(propulsion).value);

            }
            sockets.writeDutycycles(inverse(propulsion));
        }, this);
        propulsions = null;
    }
}

// class touchControl extends Steerage {
//     constructor() {
//         super();
//     }
//     touchLeft(angle) {
//         let servos = store.pins.servos;
//         // Is map so necessary since there is only one turning servo?
//         servos.map(function(servo) {
//             if (angle <= 0.79 && servo.value <= SERVO_MAX) {
//                 servo.value = Math.round(SERVO_DEFAULT + angle * 600);
//                 sockets.writeDutycycles(servo);
//             }
//         });
//     }
//
//     touchRight(angle) {
//         let servos = store.pins.servos;
//         // Is map so necessary since there is only one turning servo?
//         servos.map(function(servo) {
//             if (angle <= 0.79 && servo.value >= SERVO_MIN) {
//                 servo.value = Math.round(SERVO_DEFAULT - angle * 700);
//                 sockets.writeDutycycles(servo);
//             }
//         });
//     }
// }

exports = module.exports = Steerage;
