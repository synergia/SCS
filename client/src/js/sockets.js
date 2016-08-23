
exports = module.exports = {
    writePins: function (socket, pins) {
        pins.map(function (pin) {
            socket.emit('pin:write', pin);
        });
        console.log("pin:write");
    }
};
