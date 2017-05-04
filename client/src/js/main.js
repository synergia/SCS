require('../styles/main.scss');
// require('../styles/fonts.scss');
import Vue from 'vue';
import VueRouter from 'vue-router';
const App = require('./ui/App.vue');
import store  from './store/store';
const sockets = require('./sockets');
const keysControl = require('./keysControl');
const Steerage = require('./steerage.js');
import Steerage_11 from './steerage11';
import Positioning from './positioning';
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
        let steerage;
        ui(store);

        // the ugliest thing
        // console.log("store", store.vehicle.arch);
        // if(store.vehicle.arch === 11) {
        //     console.log('Chosing steerage for arch 11');
        //     steerage = new Steerage_11();
        // } else {
        //     console.log('Chosing default steerage');
        //     steerage = new Steerage();
        // }
        steerage = new Steerage_11();
        keysControl(steerage);

    },
});
// router.start(App, '#app');
