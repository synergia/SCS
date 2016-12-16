const Vue = require('vue');
const App = require('./App.vue');
const store = require('./store/store');
const sockets = require('./sockets');

let SCS = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    methods: {

    },
    mounted: function() {
        sockets.connection(store);
    },
});
