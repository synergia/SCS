const Hammer = require('hammerjs');
const Fullscreen = require('./fullscreen.js');

exports = module.exports = function(store) {
    let fullscreen = new Fullscreen();
    let el = document.getElementById('mainView');
    var mc = new Hammer(el);
    mc.on('doubletap', function(ev) {
        console.log('double');
        if (!store.ui.fullscreen) {
            fullscreen.go();
            store.ui.fullscreen = true;
        }else {
            fullscreen.exit();
            store.ui.fullscreen = false;
        }
    });

};
