var app =
webpackJsonp_name_([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	(function () {
	    var io = __webpack_require__(1);
	    var Vue = __webpack_require__(49);
	    __webpack_require__(51);
	    var socket = io.connect('http://' + document.domain + ':' + location.port);
	
	    var k = __webpack_require__(52)(socket);
	
	    __webpack_require__(58);
	
	    var SCS = new Vue({
	        el: '#app',
	        data: {
	            pinlist: {}
	        },
	        methods: {},
	        ready: function ready() {
	            socket.on('connect', function () {
	                socket.emit('connection');
	                console.log("Connected");
	            });
	            socket.emit('pin:list');
	        }
	    });
	
	    socket.on('pin:list', function (pinlist) {
	        SCS.pinlist = pinlist;
	        console.log(pinlist);
	    });
	
	    socket.on('disconnect', function () {
	        console.log('Disconnected');
	    });
	
	    socket.on('pin:dutycycle', function (data) {
	        console.log(data);
	    });
	
	    var getDutycycle = function getDutycycle() {
	        return document.getElementById('dutycycle1').value;
	    };
	
	    var getDirs = function getDirs() {
	        return {
	            'dir1': document.getElementById('dir1').checked,
	            'dir2': document.getElementById('dir2').checked,
	            'dir3': document.getElementById('dir3').checked,
	            'dir4': document.getElementById('dir4').checked
	        };
	    };
	
	    $(document).ready(function () {
	        $('#getPins').click(function () {
	            socket.emit('pin:list');
	        });
	        $('#runPWM').click(function () {
	            console.log("Start PWM", getDutycycle());
	            socket.emit('pin:dutycycles', {
	                '18': 150,
	                '23': 100
	            });
	        });
	    });
	})();

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vue = __webpack_require__(49);
	
	Vue.component('pin', {
	    props: ['pin', 'index', 'num', 'val', 'mode', 'dc'],
	    data: function data() {
	        return {};
	    },
	    template: '<div>{{num}} val:{{val}} mode:{{mode}} dc:{{dc}}</div>'
	});

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyboard = __webpack_require__(53);
	exports = module.exports = function (socket) {
	    keyboard.bind('a', function (e) {
	        console.log('a is pressed');
	        socket.emit('pin:list');
	    });
	};

/***/ },

/***/ 58:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.js.map