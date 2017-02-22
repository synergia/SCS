exports = module.exports = function() {
    const RAD45 = Math.PI / 4;
    const RAD135 = (Math.PI / 4) * 3;
    const RAD235 = (Math.PI / 4) * 5;
    const RAD315 = Math.PI / 4 * 7;
    const RAD360 = Math.PI * 2;
    const RAD180 = Math.PI;

    var options = {
        zone: document.getElementById('zone_joystick')
    };
    var manager = require('nipplejs').create(options);
    let steerage = require('./steerage.js');
    console.log("Sensor");


    manager.on('added', function(evt, nipple) {
        nipple.on('move', function(evt, data) {
            if (evt.target.direction !== undefined && evt.target.direction.angle === 'right') {
                if (data.angle.radian >= 0 && data.angle.radian <= RAD45) {
                    steerage.turnRight(RAD45 - data.angle.radian);
                }
                if (data.angle.radian >= RAD315 && data.angle.radian <= RAD360) {
                    steerage.turnRight(Math.abs(RAD315 - data.angle.radian));
                }
            }
            if (evt.target.direction !== undefined && evt.target.direction.angle === 'left') {
                console.log('left');
                if (data.angle.radian <= RAD180 && data.angle.radian >= RAD135) {
                    steerage.turnLeft(Math.abs(RAD135 - data.angle.radian));
                    console.log(RAD135 - data.angle.radian);
                }
                if (data.angle.radian >= RAD180 && data.angle.radian <= RAD235) {
                    steerage.turnLeft(Math.abs(RAD235 - data.angle.radian));
                }
            }
        });
    }).on('removed', function(evt, nipple) {
        nipple.off('start move end dir plain', function(evt) {
            steerage.default();
        });


    });

};
