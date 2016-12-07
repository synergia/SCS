exports = module.exports = function configParser(config, store) {
    store.dispatch('setConfig', config);

    let pins = config.filter((item) => 'pins' in item);
    let arch = config.filter((item) => 'architecture' in item);
    console.log(pins);

    // PARSE PROPULSION AND OTHERS!!!

    let propulsions = pins.filter((pin) => pin.role === 'propulsion');
    console.log(propulsions);
    console.log(store.getters.config);
};
