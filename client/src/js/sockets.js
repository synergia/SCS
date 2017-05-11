const io = require('socket.io-client');
let socket = io.connect('http://' + document.domain + ':' + location.port);

const configParser = require('./configParser');

exports = module.exports = {
    connection: function(store) {
        socket.on('connect', function() {
            socket.emit('connection');
            console.info("Connected");
            socket.emit('config');

        });
        socket.on('config', function(config) {
            configParser.setConfig(config);
        });
        socket.on('passiveMode', function (response) {
            if(response) {
                configParser.setConfig(response);
                store.vehicle.is.passiveMode = !store.vehicle.is.passiveMode;
            }else {
                console.warn("[Sockets]: Passive Mode: No response from server");
            }
        });
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
    passiveMode: function (modeState) {
        socket.emit('passiveMode', modeState);
        console.info("[Sockets]: Emitting Passive Mode:", modeState);
    }

};
