const store = require('./store/store');

exports = module.exports =  {
    parsePins: function (config) {
        // Da f**k is this??
        console.log('as',(config.filter((item) => 'pins' in item))[0].pins);
        return (config.filter((item) => 'pins' in item))[0].pins;
    },
    parseArch: function (config) {
        return config.filter((item) => 'architecture' in item);
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
    setConfig: function (config) {
        let pins = this.parsePins(config);
        this.setPropulsions(pins);
        this.setLogics(pins);
        this.setServos(pins);

    },
};
