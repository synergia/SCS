// `value` is a current dutycycle value
// `range` is PWM range, look at http://abyz.co.uk/rpi/pigpio/python.html#set_PWM_range
exports = module.exports = function(value, range = 255) {
    // temp disable inversion
    // return range - value;
    return value;
};
