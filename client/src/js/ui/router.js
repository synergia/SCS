exports = module.exports = function(VueRouter) {

    // const Foo = { template: '<div>foo</div>' };
    // const Bar = { template: '<div>bar</div>' };

    const States = require('./components/States.vue');
    const Joystick = require('./components/Joystick.vue');

    // 2. Define some routes
    // Each route should map to a component. The "component" can
    // either be an actual component constructor created via
    // Vue.extend(), or just a component options object.
    // We'll talk about nested routes later.
    const routes = [
      { path: '/joystick', component: Joystick },
      { path: '/states', component: States }
    ];

    // const router = new VueRouter({
    //     routes // short for routes: routes
    // });
    return routes;
};
