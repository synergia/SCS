const Vue = require('vue');

Vue.component('pin', {
    props: ['pin', 'index', 'num', 'val', 'mode', 'dc', 'owner'],
    data: function() {
        return {

        };
    },
    template: '<div>{{num}} val:{{val}} mode:{{mode}} dc:{{dc}} owner:{{owner}}</div>'
});
