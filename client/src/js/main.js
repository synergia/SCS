require('../styles/main.scss');
const Vue = require('vue');
const VueRouter = require('vue-router');
const App = require('./ui/App.vue');
const store = require('./store/store');
const sockets = require('./sockets');
const keysControl = require('./keysControl');
const Steerage = require('./steerage.js');
const ui = require('./ui/ui.js');

// const router = require('./ui/router');
const routes = require('./ui/routes');
const router = new VueRouter({
    routes // short for routes: routes
});
Vue.use(VueRouter);

let SCS = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    data: store,
    methods: {},
    mounted: function() {
        sockets.connection(store);
        let steerage = new Steerage();
        keysControl(steerage);
        ui(store);
    },
});
// router.start(App, '#app');
