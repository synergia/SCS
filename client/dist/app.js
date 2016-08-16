var app =
webpackJsonp_name_([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	(function () {
	    var io = __webpack_require__(1);
	    var Vue = __webpack_require__(49);
	    __webpack_require__(51);
	
	    __webpack_require__(52);
	    var socket = io.connect('http://' + document.domain + ':' + location.port);
	
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
	    // socket.on('pin:list', function(pinlist) {
	    //     let ul = document.getElementById('pinlist');
	    //     if (pinlist) {
	    //         pinlist.map(function(pin) {
	    //             let li = document.createElement("li");
	    //             li.innerHTML = pin.num;
	    //             ul.appendChild(li);
	    //         });
	    //     }
	    //     console.log(pinlist);
	    // });
	
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
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.js.map