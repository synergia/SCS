const io = require('socket.io-client');
// let socket = io.connect('http://' + document.domain + ':' + location.port);
let socket = io.connect(null, {port: location.port, rememberTransport: false, transports: ['websocket']});
const configParser = require('./configParser');

exports = module.exports = {
    connection: function(store) {
        socket.on('connect', function() {
            socket.emit('connection');
            console.info("Connected");
            socket.emit('config');
            socket.on('accelorometr', function(acc_data) {
                console.info("[Sockets]: Acc data recieved:", acc_data);
            });
        });
        socket.on('config', function(config) {
            configParser.setConfig(config);
        });
    },
    accelorometr: function() {
        console.log("acc");
        socket.on('accelorometr', function(acc_data) {
            console.info("[Sockets]: Acc data recieved:", acc_data);
        });
    },
    accelorometrEmit: function() {
        socket.emit('accelorometr');
    },
    writePins: function(socket, pins) {
        pins.map(function(pin) {
            socket.emit('pin:write', pin);
        });
        console.log("pin:write");
    },
    writeDirs: function(socket, dirs) {
        dirs.map(function(dir) {
            socket.emit('pin:write', dir);
        });
        console.log("pin:write");
    },
    writeDutycycles: function(dutycycles) {
        // dutycycles.map(function(dutycycle) {
            socket.emit('pin:dutycycles', dutycycles);
        // });
        console.log("pin:dutycycles");
    },

};
