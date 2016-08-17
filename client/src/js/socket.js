const io = require('socket.io-client');

module.exports = function() {
    return io.connect('http://' + document.domain + ':' + location.port);
};
