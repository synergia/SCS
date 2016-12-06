
exports = module.exports = {
    connection: function(socket){
        socket.on('connect', function() {
            socket.emit('connection');
            console.log("Connected");
            socket.emit('config');
        });
    },
    writePins: function (socket, pins) {
        pins.map(function (pin) {
            socket.emit('pin:write', pin);
        });
        console.log("pin:write");
    },
    writeDirs: function (socket, dirs) {
        dirs.map(function (dir) {
            socket.emit('pin:write', dir);
        });
        console.log("pin:write");
    },
    writeDutycycles: function (socket, dutycycles) {
        dutycycles.map(function (dutycycle) {
            socket.emit('pin:dutycycles', dutycycles);
        });
        console.log("pin:dutycycles");
    },

};
