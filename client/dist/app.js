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
	
	    __webpack_require__(53);
	
	    var SCS = new Vue({
	        el: '#app',
	        data: {
	            pinlist: {},
	            // To nie powinno być zahardkodowane,
	            // należy wyciągać z pinlisty
	            dutycycles: [{
	                num: '18',
	                dutycycle: 0
	            }, {
	                num: '23',
	                dutycycle: 0
	            }]
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
	    SCS.$watch('pinlist', function (newVal, oldVal) {
	        __webpack_require__(57)(socket, SCS);
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
	
	var Vue = __webpack_require__(49);
	
	Vue.component('dutycycle', {
	    props: ['pin', 'val'],
	    data: function data() {
	        return {};
	    },
	    template: '<div>{{pin}} val:{{val}}</div>'
	});

/***/ },

/***/ 53:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyboard = __webpack_require__(58);
	// var stopwatch = require('simple-stopwatch');
	var inverse = __webpack_require__(64);
	var steerage = __webpack_require__(65);
	
	exports = module.exports = function (socket, SCS) {
	    var pinlist = SCS.pinlist;
	    var dutycycles = SCS.dutycycles;
	
	    var pinsWithPWM = pinlist.filter(function (pin) {
	        return pin.dutycycle !== undefined;
	    });
	
	    // let pin0 = pinsWithPWM[0].num;
	    // let pin1 = pinsWithPWM[1].num;
	
	    // FORWARD
	    keyboard.bind('up', function (e) {
	        steerage.forward(socket, dutycycles);
	        console.log('Run with:', inverse(dutycycles[0].dutycycle), inverse(dutycycles[1].dutycycle));
	    }, function (e) {
	        steerage.softStop(socket);
	    });
	
	    // INCREMENT DUTYCYCLE
	    keyboard.bind('a', function (e) {
	        steerage.accelerate(dutycycles);
	        console.log(dutycycles[0].dutycycle, dutycycles[1].dutycycle);
	    });
	
	    // DECREMENT DUTYCYCLE
	    keyboard.bind('z', function (e) {
	        steerage.decelerate(dutycycles);
	        console.log(dutycycles[0].dutycycle, dutycycles[1].dutycycle);
	    });
	
	    // EMERGENCY STOP
	    keyboard.bind('space', function (e) {
	        steerage.hardStop(socket);
	        console.log('STOP');
	    });
	
	    // UNBLOCK
	    keyboard.bind('enter', function (e) {
	        steerage.ready(socket);
	        console.log('READY TO FUN? GO!');
	    });
	};

/***/ },

/***/ 64:
/***/ function(module, exports) {

	"use strict";
	
	// `value` is a current dutycycle value
	// `range` is PWM range, look at http://abyz.co.uk/rpi/pigpio/python.html#set_PWM_range
	exports = module.exports = function (value) {
	    var range = arguments.length <= 1 || arguments[1] === undefined ? 255 : arguments[1];
	
	    return range - value;
	};

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inverse = __webpack_require__(64);
	
	exports = module.exports = {
	    accelerate: function accelerate(dutycycles) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? 255 : arguments[1];
	
	        dutycycles.map(function (pin) {
	            if (pin.dutycycle >= 0 && pin.dutycycle < range) ++pin.dutycycle;
	        });
	    },
	    decelerate: function decelerate(dutycycles) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? 255 : arguments[1];
	
	        dutycycles.map(function (pin) {
	            if (pin.dutycycle > 0 && pin.dutycycle <= range) --pin.dutycycle;
	        });
	    },
	    hardStop: function hardStop(socket) {
	        // Num of pins must be strings.
	        // You should do smth with this!!!
	        socket.emit('pin:write', {
	            num: '24',
	            value: 0
	        });
	        socket.emit('pin:write', {
	            num: '27',
	            value: 0
	        });
	    },
	    ready: function ready(socket) {
	        socket.emit('pin:write', {
	            num: '24',
	            value: 1
	        });
	        socket.emit('pin:write', {
	            num: '27',
	            value: 1
	        });
	    },
	    forward: function forward(socket, dutycycles) {
	        socket.emit('pin:dutycycles', {
	            '18': inverse(dutycycles[0].dutycycle),
	            '23': inverse(dutycycles[1].dutycycle)
	        });
	    },
	    softStop: function softStop(socket) {
	        socket.emit('pin:dutycycles', {
	            '18': inverse(0),
	            '23': inverse(0)
	        });
	    }
	};

/***/ }

});
//# sourceMappingURL=app.js.map