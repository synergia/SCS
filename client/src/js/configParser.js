const store = require('./store/store');

exports = module.exports =  {
    parsePins: function (config) {
        // Da f**k is this??
        console.log('as',(config.filter((item) => 'pins' in item))[0].pins);
        return (config.filter((item) => 'pins' in item))[0].pins;
    },
    // Definitely needs to be redone
    // `for in / for of`  <- you need to look for this,
    // or just push all config as is to store
    parseArch: function (config) {
        store.vehicle.arch = config.filter((item) => 'architecture' in item)[0].architecture;
    },
    parseName: function (config) {
        store.vehicle.name = config.filter((item) => 'vehiclename' in item)[0].vehiclename;
    },
    parseInver: function (config) {
        store.vehicle.inver = config.filter((item) => 'inversion' in item)[0].inversion;
    },
    setPropulsions: function (pins) {
        let propulsions = pins.filter((pin) => pin.role === 'propulsion');
        store.pins.propulsions = propulsions;
    },
    setLogics: function (pins) {
        let logics = pins.filter((pin) => pin.role === 'logic');
        store.pins.logics = logics;
    },
    setServos: function (pins) {
        let servos = pins.filter((pin) => pin.role === 'servo');
        store.pins.servos = servos;
    },
    setHeartbeats: function (pins) {
        let heartbeats = pins.filter((pin) => pin.role === 'heartbeat');
        store.pins.heartbeats = heartbeats;
    },
    setConfig: function (config) {
        let pins = this.parsePins(config);
        this.setPropulsions(pins);
        this.setLogics(pins);
        this.setServos(pins);
        this.setHeartbeats(pins);

        // Should create function parse config, it will parse all vehicle meta data
        // like it does now with parsePins()
        // But it needs different config structure
        this.parseArch(config);
        this.parseName(config);
        this.parseInver(config);

    },
};
