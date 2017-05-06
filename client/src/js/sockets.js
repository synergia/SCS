const io = require('socket.io-client');
// let socket = io.connect('http://' + document.domain + ':' + location.port);
let socket = io.connect(null, {
    port: location.port,
    rememberTransport: false,
    transports: ['websocket']
});
const configParser = require('./configParser');

exports = module.exports = {
    connection: function(store) {
        socket.on('connect', function() {
            socket.emit('connection');
            console.info("Connected");
            socket.emit('config');
            // socket.on('accelerometer', function(acc_data) {
            //     console.info("[Sockets]: Acc data recieved:", acc_data);
            //     store.vehicle.accel.x.push(acc_data.x.toFixed(2));
            //     store.vehicle.accel.y.push(acc_data.y.toFixed(2));
            //     store.vehicle.accel.z.push(acc_data.z.toFixed(2));
            //     if (store.vehicle.accel.x.length > 20) {
            //         store.vehicle.accel.x.shift();
            //         store.vehicle.accel.y.shift();
            //         store.vehicle.accel.z.shift();
            //     }
            // });
        });
        socket.on('config', function(config) {
            configParser.setConfig(config);
        });
    },
    // accelorometr: function() {
    //     console.log("acc");
    //     socket.on('accelorometr', function(acc_data) {
    //         console.info("[Sockets]: Acc data recieved:", acc_data);
    //     });
    // },
    // accelorometrEmit: function() {
    //     socket.emit('accelorometr');
    // },
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
