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
	
	    __webpack_require__(54);
	
	    var SCS = new Vue({
	        el: '#app',
	        data: {
	            pinlist: {},
	            dutycycles: [],
	            dirs: []
	        },
	        methods: {
	            dcPins: function dcPins(pinlist) {
	                // filtering all pins that have key dutycycle
	                return pinlist.filter(function (pin) {
	                    return pin.dutycycle !== undefined;
	                });
	            },
	            dirPins: function dirPins(pinlist) {
	                // filtering all pins that have name `dir`
	                return pinlist.filter(function (pin) {
	                    return pin.name === 'dir';
	                });
	            }
	        },
	        ready: function ready() {
	            socket.on('connect', function () {
	                socket.emit('connection');
	                console.log("Connected");
	            });
	            socket.emit('pin:list');
	        }
	    });
	    SCS.$watch('pinlist', function (newVal, oldVal) {
	        __webpack_require__(58)(socket, SCS);
	    });
	    socket.on('pin:list', function (pinlist) {
	        SCS.pinlist = pinlist;
	        SCS.dutycycles = SCS.dcPins(pinlist);
	        SCS.dirs = SCS.dirPins(pinlist);
	        console.log(pinlist);
	        console.log(SCS.dirs[0].num);
	    });
	
	    socket.on('disconnect', function () {
	        console.log('Disconnected');
	    });
	
	    socket.on('pin:dutycycle', function (data) {
	        console.log(data);
	    });
	})();

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vue = __webpack_require__(49);
	
	Vue.component('pin', {
	    props: ['pin', 'index', 'num', 'val', 'mode', 'dc', 'owner'],
	    data: function data() {
	        return {};
	    },
	    template: '<div>{{num}} val:{{val}} mode:{{mode}} dc:{{dc}} owner:{{owner}}</div>'
	});

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vue = __webpack_require__(49);
	var VueAsyncData = __webpack_require__(53);
	
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
	    data: function data() {
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

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	(function () {
	  var vue; // lazy bind
	
	  var asyncData = {
	    created: function created() {
	      if (!vue) {
	        console.warn('[vue-async-data] not installed!');
	        return;
	      }
	      if (this.$options.asyncData) {
	        if (this._defineMeta) {
	          // 0.12 compat
	          this._defineMeta('$loadingAsyncData', true);
	        } else {
	          // ^1.0.0-alpha
	          vue.util.defineReactive(this, '$loadingAsyncData', true);
	        }
	      }
	    },
	    compiled: function compiled() {
	      this.reloadAsyncData();
	    },
	    methods: {
	      reloadAsyncData: function reloadAsyncData() {
	        var load = this.$options.asyncData;
	        if (load) {
	          var self = this;
	          var resolve = function resolve(data) {
	            if (data) {
	              for (var key in data) {
	                self.$set(key, data[key]);
	              }
	            }
	            self.$loadingAsyncData = false;
	            self.$emit('async-data');
	          };
	          var reject = function reject(reason) {
	            var msg = '[vue] async data load failed';
	            if (reason instanceof Error) {
	              console.warn(msg);
	              throw reason;
	            } else {
	              console.warn(msg + ': ' + reason);
	            }
	          };
	          this.$loadingAsyncData = true;
	          var res = load.call(this, resolve, reject);
	          if (res && typeof res.then === 'function') {
	            res.then(resolve, reject);
	          }
	        }
	      }
	    }
	  };
	
	  var api = {
	    mixin: asyncData,
	    install: function install(Vue, options) {
	      vue = Vue;
	      Vue.options = Vue.util.mergeOptions(Vue.options, asyncData);
	    }
	  };
	
	  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') {
	    module.exports = api;
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return api;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof window !== 'undefined') {
	    window.VueAsyncData = api;
	  }
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ },

/***/ 54:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyboard = __webpack_require__(59);
	// var stopwatch = require('simple-stopwatch');
	var inverse = __webpack_require__(64);
	var steerage = __webpack_require__(65);
	
	exports = module.exports = function (socket, SCS) {
	    var pinlist = SCS.pinlist;
	    var dutycycles = SCS.dutycycles;
	    var dirs = SCS.dirs;
	
	    // let pin0 = pinsWithPWM[0].num;
	    // let pin1 = pinsWithPWM[1].num;
	
	    // FORWARD
	    keyboard.bind('up', function (e) {
	        e.preventRepeat();
	        steerage.forward(socket, dutycycles);
	        console.log('FORWARD:', inverse(dutycycles[0].dutycycle), inverse(dutycycles[1].dutycycle));
	    }, function (e) {
	        steerage.softStop(socket);
	    });
	
	    // BACKWARD
	    keyboard.bind('down', function (e) {
	        e.preventRepeat();
	        steerage.backward(socket, dutycycles);
	        console.log('BACKWARD:', inverse(dutycycles[0].dutycycle), inverse(dutycycles[1].dutycycle));
	    }, function (e) {
	        steerage.softStop(socket);
	    });
	
	    // INCREMENT DUTYCYCLE
	    keyboard.bind('a', function (e) {
	        steerage.accelerate(dutycycles);
	        // console.log(dutycycles[0].dutycycle, dutycycles[1].dutycycle);
	    });
	
	    // DECREMENT DUTYCYCLE
	    keyboard.bind('z', function (e) {
	        steerage.decelerate(dutycycles);
	        // console.log(dutycycles[0].dutycycle, dutycycles[1].dutycycle);
	    });
	
	    // EMERGENCY STOP
	    keyboard.bind('space', function (e) {
	        steerage.hardStop(socket, dirs);
	        console.log('STOP');
	    });
	
	    // UNBLOCK
	    keyboard.bind('enter', function (e) {
	        steerage.ready(socket, dirs);
	        console.log('READY TO FUN? GO!');
	    });
	
	    // MAKE KEY COMBO! up-right up-left etc.
	
	    // TURN LEFT
	    keyboard.bind('left', function (e) {
	        e.preventRepeat();
	        steerage.left(socket, dutycycles);
	        console.log('TURN LEFT', inverse(Math.floor(dutycycles[0].dutycycle * 0.5)));
	    }, function (e) {
	        steerage.softStop(socket);
	    });
	
	    // TURN RIGHT
	    keyboard.bind('right', function (e) {
	        e.preventRepeat();
	        steerage.right(socket, dutycycles);
	        console.log('TURN RIGHT', inverse(Math.floor(dutycycles[0].dutycycle * 0.5)));
	    }, function (e) {
	        steerage.softStop(socket);
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
	
	    // temp disable inversion
	    // return range - value;
	    return value;
	};

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inverse = __webpack_require__(64);
	var sockets = __webpack_require__(66);
	/*
	24 27 17 22
	1  1  1  1 STOP
	0  0  0  0 STOP
	1  1  0  0 FW
	0  0  1  1 BW
	*/
	
	// Make socket things in a new module
	// Offset/compensation for wheels
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
	    hardStop: function hardStop(socket, dirs) {
	        // Num of pins must be strings.
	        // You should do smth with this!!!
	        sockets.writePins(socket, function (dirs) {
	            dirs.map(function (dirs) {
	                return dir.value = 0;
	            });
	            console.log(dirs);
	            return dirs;
	        });
	    },
	    softStop: function softStop(socket) {
	        socket.emit('pin:dutycycles', {
	            '18': inverse(0),
	            '23': inverse(0)
	        });
	    },
	    ready: function ready(socket) {
	        sockets.writePins(socket, [{
	            num: '24',
	            value: 1
	        }, {
	            num: '27',
	            value: 1
	        }]);
	    },
	    forward: function forward(socket, dutycycles) {
	        this.changeF(socket);
	        this.run(socket, dutycycles);
	    },
	    backward: function backward(socket, dutycycles) {
	        this.changeB(socket);
	        this.run(socket, dutycycles);
	    },
	    run: function run(socket, dutycycles) {
	        socket.emit('pin:dutycycles', {
	            '18': inverse(dutycycles[0].dutycycle),
	            '23': inverse(dutycycles[1].dutycycle)
	        });
	    },
	    // Refactor this !!!
	    // Update values of pins in pinlist !!!
	    changeF: function changeF(socket) {
	        socket.emit('pin:write', {
	            num: '24',
	            value: 1
	        });
	        socket.emit('pin:write', {
	            num: '27',
	            value: 1
	        });
	        socket.emit('pin:write', {
	            num: '17',
	            value: 0
	        });
	        socket.emit('pin:write', {
	            num: '22',
	            value: 0
	        });
	    },
	    changeB: function changeB(socket) {
	        socket.emit('pin:write', {
	            num: '24',
	            value: 0
	        });
	        socket.emit('pin:write', {
	            num: '27',
	            value: 0
	        });
	        socket.emit('pin:write', {
	            num: '17',
	            value: 1
	        });
	        socket.emit('pin:write', {
	            num: '22',
	            value: 1
	        });
	    },
	    // Make 0.5 changeable or define in const
	    left: function left(socket, dutycycles) {
	        socket.emit('pin:dutycycles', {
	            '18': inverse(dutycycles[0].dutycycle),
	            '23': inverse(Math.floor(dutycycles[0].dutycycle * 0.5))
	        });
	    },
	    right: function right(socket, dutycycles) {
	        socket.emit('pin:dutycycles', {
	            '18': inverse(dutycycles[0].dutycycle * 0.5),
	            '23': inverse(Math.floor(dutycycles[0].dutycycle))
	        });
	    }
	
	};

/***/ },

/***/ 66:
/***/ function(module, exports) {

	"use strict";
	
	exports = module.exports = {
	    writePins: function writePins(socket, pins) {
	        pins.map(function (pin) {
	            socket.emit('pin:write', pin);
	        });
	        console.log("pin:write");
	    }
	};

/***/ }

});
//# sourceMappingURL=app.js.map