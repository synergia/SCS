
exports = module.exports = function(store) {
    console.info('Initializing UI...');
    const touch = require('./touch.js');
    touch(store);
};
