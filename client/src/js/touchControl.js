exports = module.exports = function() {
    const RAD45 = Math.PI / 4;
    const RAD135 = RAD45 * 3;
    const RAD235 = RAD45 * 5;
    const RAD315 = RAD45 * 7;
    const RAD360 = Math.PI * 2;
    const RAD180 = Math.PI;

    var options = {
        zone: document.getElementById('zone_joystick')
    };
    var manager = require('nipplejs').create(options);
    let steerage = require('./steerage.js');

    manager.on('added', function(evt, nipple) {
        nipple.on('move', function(evt, data) {
            // right 0-45
            if (data.angle.radian >= 0 && data.angle.radian <= RAD45) {
                steerage.turnRight(RAD45 - data.angle.radian);
            }
            // right 315-360
            if (data.angle.radian >= RAD315 && data.angle.radian <= RAD360) {
                steerage.turnRight(Math.abs(RAD315 - data.angle.radian));
            }
            // left 135-180
            if (data.angle.radian <= RAD180 && data.angle.radian >= RAD135) {
                steerage.turnLeft(Math.abs(RAD135 - data.angle.radian));
            }
            // left 180-235
            if (data.angle.radian >= RAD180 && data.angle.radian <= RAD235) {
                steerage.turnLeft(Math.abs(RAD235 - data.angle.radian));
            }
        });
    }).on('removed', function(evt, nipple) {
        steerage.default();
        nipple.off('end', function(evt) {
            // steerage.default();
        });


    });

};
