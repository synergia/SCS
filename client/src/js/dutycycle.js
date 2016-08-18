const Vue = require('vue');

Vue.component('dutycycle', {
    props: ['pin', 'val'],
    data: function() {
        return {

        };
    },
    template: '<div>{{pin}} val:{{val}}</div>'
});
