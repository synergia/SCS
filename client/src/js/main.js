const Vue = require('vue');
const App = require('./App.vue');
const store = require('./store/store');
const sockets = require('./sockets');
const touchControl = require('./touchControl.js');
const keysControl = require('./keysControl');

let SCS = new Vue({
    el: '#app',
    render: h => h(App),
    data: store,
    methods: {

    },
    mounted: function() {
        sockets.connection(store);
        touchControl();
        keysControl();



    },
});
