const Vue = require('vue');
const App = require('./App.vue');
const store = require('./store/store');
const io = require('socket.io-client');
const sockets = require('./sockets');


let socket = io.connect('http://' + document.domain + ':' + location.port);

let SCS = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    methods: {

    },
    mounted: function() {
        sockets.connection(socket, store);
    },
});
