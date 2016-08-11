var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	(function () {
	    'use strict';
	
	    __webpack_require__(1);
	
	    var socket = io.connect('http://' + document.domain + ':' + location.port);
	
	    socket.on('connect', function () {
	        socket.emit('connection');
	        console.log("Connected");
	    });
	    socket.on('disconnect', function () {
	        console.log('Disconnected');
	    });
	    socket.on('pin:list', function (pinlist) {
	        var ul = document.getElementById('pinlist');
	        if (pinlist) {
	            pinlist.map(function (pin) {
	                var li = document.createElement("li");
	                li.innerHTML = pin.num;
	                ul.appendChild(li);
	            });
	        }
	        console.log(pinlist);
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
	                '18': 50,
	                '23': 60
	            });
	        });
	    });
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map