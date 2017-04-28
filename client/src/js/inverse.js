// `value` is a current dutycycle value
// `range` is PWM range, look at http://abyz.co.uk/rpi/pigpio/python.html#set_PWM_range
const store = require('./store/store');
exports = module.exports = function(pin) {
    // temp disable inversion
    console.log("Inversion:", store.vehicle.inver);
    if (store.vehicle.inver) {
        console.log("Inversion!");
        pin.value = pin.max - pin.value;
        console.log("INV", pin.value);
    }
    return pin;
};
