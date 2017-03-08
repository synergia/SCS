exports = module.exports = function(steerage) {
    const RAD45 = Math.PI / 4;
    const RAD135 = RAD45 * 3;
    const RAD235 = RAD45 * 5;
    const RAD315 = RAD45 * 7;
    const RAD360 = Math.PI * 2;
    const RAD180 = Math.PI;

    var options = {
        zone: document.getElementById('zone_joystick'),
        size: 100
    };
    var manager = require('nipplejs').create(options);

    manager.on('added', function(evt, nipple) {
        nipple.on('move', function(evt, data) {
            if (data.distance > 10) {
                // right 0-45
                if (data.angle.radian >= 0 && data.angle.radian <= RAD45) {
                    steerage.touchRight(RAD45 - data.angle.radian);
                }
                // right 315-360
                if (data.angle.radian >= RAD315 && data.angle.radian <= RAD360) {
                    steerage.touchRight(Math.abs(RAD315 - data.angle.radian));
                }
                // left 135-180
                if (data.angle.radian <= RAD180 && data.angle.radian >= RAD135) {
                    steerage.touchLeft(Math.abs(RAD135 - data.angle.radian));
                }
                // left 180-235
                if (data.angle.radian >= RAD180 && data.angle.radian <= RAD235) {
                    steerage.touchLeft(Math.abs(RAD235 - data.angle.radian));
                }
                if(data.angle.radian <= RAD180 && data.angle.radian >= 0) {
                    console.log(data.distance);
                    steerage.touchForward(data.distance, options.size);
                }
            } else {
                steerage.softStop();
            }

        });
    }).on('removed', function(evt, nipple) {
        steerage.default();
        steerage.softStop();
        nipple.off('end', function(evt) {
            // steerage.default();
        });


    });

};
