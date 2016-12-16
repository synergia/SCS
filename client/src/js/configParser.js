exports = module.exports =  {
    parsePins: function (config) {
        // Da f**k is this??
        console.log('as',(config.filter((item) => 'pins' in item))[0].pins);
        return (config.filter((item) => 'pins' in item))[0].pins;
    },
    parseArch: function (config) {
        return config.filter((item) => 'architecture' in item);
    },
    setPropulsions: function (pins, store) {
        let propulsions = pins.filter((pin) => pin.role === 'propulsion');
        store.dispatch('setPropulsions', propulsions);
    },
    setLogics: function (pins, store) {
        let logics = pins.filter((pin) => pin.role === 'logic');
        store.dispatch('setLogics', logics);
    },
    setServos: function (pins, store) {
        let servos = pins.filter((pin) => pin.role === 'servo');
        store.dispatch('setServos', servos);
    },
    setConfig: function (config, store) {
        let pins = this.parsePins(config);
        this.setPropulsions(pins, store);
        this.setLogics(pins, store);
        this.setServos(pins, store);

    },
};
