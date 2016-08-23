const Vue = require('vue');
var VueAsyncData = require('vue-async-data');

// use globally
// you can also just use `VueAsyncData.mixin` where needed
Vue.use(VueAsyncData);
Vue.component('dutycycle', {
    props: {
        pin: {
            type: [String, Number],
            default: "Not set"
        },
        dutycycle: {
            type: [String, Number],
            default: 0
        }
    },
    data: function() {
        return {
            msg: 'load'
        };
    },
    // asyncData: function(resolve, reject) {
    //     // load data and call resolve(data)
    //     // or call reject(reason) if something goes wrong
    //     setTimeout(function() {
    //         // this will call `vm.$set('msg', 'hi')` for you
    //         resolve({
    //             msg: 'hi'
    //         });
    //     }, 1000);
    // },
    template: '<div>{{pin}} dutycycle:{{dutycycle}} </div>'
});
