exports = module.exports = function() {
    const SECTOR = Math.PI/4;
    var options = {
        zone: document.getElementById('zone_joystick')
    };
    var manager = require('nipplejs').create(options);
    let steerage = require('./steerage.js');
    console.log("Sensor");


    manager.on('added', function(evt, nipple) {
        nipple.on('move', function(evt, data) {
            if(evt.target.direction !== undefined && evt.target.direction.angle === 'right'){
            // steerage.turn(data.angle.radian);
            if(data.angle.radian >= 0 && data.angle.radian <= SECTOR) {
                steerage.turn(SECTOR - data.angle.radian);
            }
            console.log(data.angle.radian);
        }
            });
        }).on('removed', function(evt, nipple) {
            nipple.off('start move end dir plain', function(evt) {
                steerage.default();
            });


        });

};
