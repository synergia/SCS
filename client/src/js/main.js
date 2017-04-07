require('../assets/styles/main.scss');
const Vue = require('vue');
const VueRouter = require('vue-router');
const App = require('./App.vue');
const store = require('./store/store');
const sockets = require('./sockets');
const touchControl = require('./touchControl.js');
const keysControl = require('./keysControl');
const Steerage = require('./steerage.js');
const ui = require('./ui/ui.js');

Vue.use(VueRouter);

let SCS = new Vue({
    el: '#app',
    render: h => h(App),
    data: store,
    methods: {

    },
    mounted: function() {
        sockets.connection(store);
        let steerage = new Steerage();
        touchControl(steerage);
        keysControl(steerage);
        ui(store);
    },
});
