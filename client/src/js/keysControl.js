const keyboard = require('keyboardjs');
exports = module.exports = function(socket){
    keyboard.bind('a', function(e) {
        console.log('a is pressed');
        socket.emit('pin:list');
    });
};
