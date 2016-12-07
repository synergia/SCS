var app =
webpackJsonp_name_([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vue = __webpack_require__(1);
	var App = __webpack_require__(3);
	var store = __webpack_require__(29);
	var io = __webpack_require__(31);
	var sockets = __webpack_require__(82);
	
	var socket = io.connect('http://' + document.domain + ':' + location.port);
	
	new Vue({
	  el: '#app',
	  store: store,
	  render: function render(h) {
	    return h(App);
	  },
	  mounted: function mounted() {
	    sockets.connection(socket);
	  }
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(4)
	
	/* script */
	__vue_exports__ = __webpack_require__(8)
	
	/* template */
	var __vue_template__ = __webpack_require__(28)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/stsdc/pi/SCS/client/src/js/App.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-01683cb5", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-01683cb5", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] App.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-01683cb5!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-01683cb5!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "\nbody {\n    font-family: Helvetica, sans-serif;\n}\n", "", {"version":3,"sources":["/./js/App.vue?4916ca7d"],"names":[],"mappings":";AAiCA;IACA,mCAAA;CACA","file":"App.vue","sourcesContent":["<template>\n<div id=\"app\" class=\"container\">\n    <Topbar></Topbar>\n    <Sidebar></Sidebar>\n    <!-- <CompletedTodos></CompletedTodos>\n    <GetTodo></GetTodo>\n    <CurrentTodos></CurrentTodos> -->\n</div>\n</template>\n\n<script>\n\nconst Topbar = require('./components/Topbar.vue');\nconst Sidebar = require('./components/Sidebar.vue');\nconst GetTodo = require('./components/GetTodo.vue');\nconst CurrentTodos = require('./components/CurrentTodos.vue');\nconst CompletedTodos = require('./components/CompletedTodos.vue');\nmodule.exports = {\n    components: {\n        Topbar,\n        Sidebar,\n        GetTodo,\n        CurrentTodos,\n        CompletedTodos\n    },\n    computed: {\n\n    }\n\n}\n</script>\n\n<style>\nbody {\n    font-family: Helvetica, sans-serif;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	
	const Topbar = __webpack_require__(9);
	const Sidebar = __webpack_require__(12);
	const GetTodo = __webpack_require__(17);
	const CurrentTodos = __webpack_require__(20);
	const CompletedTodos = __webpack_require__(25);
	module.exports = {
	    components: {
	        Topbar,
	        Sidebar,
	        GetTodo,
	        CurrentTodos,
	        CompletedTodos
	    },
	    computed: {}
	
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(10)
	
	/* template */
	var __vue_template__ = __webpack_require__(11)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/stsdc/pi/SCS/client/src/js/components/Topbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7440baea", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7440baea", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Topbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 10 */
/***/ function(module, exports) {

	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    methods: {
	        showSidebar() {
	            this.$store.dispatch('showSidebar');
	        },
	
	        getTodo(e) {
	            this.$store.dispatch('getTodo', e.target.value);
	        },
	        addTodo() {
	            this.$store.dispatch('addTodo');
	            this.$store.dispatch('clearTodo');
	        }
	    },
	    computed: {
	        newTodo() {
	            return this.$store.getters.newTodo;
	        }
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "topbar",
	    attrs: {
	      "id": "topbar"
	    }
	  }, [_h('button', {
	    staticClass: "btn btn-primary",
	    on: {
	      "click": _vm.showSidebar
	    }
	  }, ["Settings"]), " "])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7440baea", module.exports)
	  }
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(13)
	
	/* script */
	__vue_exports__ = __webpack_require__(15)
	
	/* template */
	var __vue_template__ = __webpack_require__(16)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/stsdc/pi/SCS/client/src/js/components/Sidebar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-07670a3f", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-07670a3f", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Sidebar.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-07670a3f!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-07670a3f!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.sidebar--active {\n    background: red;\n}\n", "", {"version":3,"sources":["/./js/components/Sidebar.vue?4edb11b9"],"names":[],"mappings":";AASA;IACA,gBAAA;CACA","file":"Sidebar.vue","sourcesContent":["<template>\n    <div id=\"sidebar\" class=\"sidebar\" v-bind:class=\"{ 'sidebar--active': this.$store.getters.showSidebar }\">\n        ole!\n    </div>\n</template>\n<script>\n\n</script>\n<style>\n.sidebar--active {\n    background: red;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	//
	//
	//
	//
	//

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "sidebar",
	    class: {
	      'sidebar--active': this.$store.getters.showSidebar
	    },
	    attrs: {
	      "id": "sidebar"
	    }
	  }, ["\n    ole!\n"])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-07670a3f", module.exports)
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(18)
	
	/* template */
	var __vue_template__ = __webpack_require__(19)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/stsdc/pi/SCS/client/src/js/components/GetTodo.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4e811f9f", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4e811f9f", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] GetTodo.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 18 */
/***/ function(module, exports) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    methods: {
	        getTodo(e) {
	            this.$store.dispatch('getTodo', e.target.value);
	        },
	        addTodo() {
	            this.$store.dispatch('addTodo');
	            this.$store.dispatch('clearTodo');
	        }
	    },
	    computed: {
	        newTodo() {
	            return this.$store.getters.newTodo;
	        }
	    }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "container",
	    attrs: {
	      "id": "get-todo"
	    }
	  }, [_h('input', {
	    staticClass: "form-control",
	    attrs: {
	      "placeholder": "I need to..."
	    },
	    domProps: {
	      "value": _vm.newTodo
	    },
	    on: {
	      "change": _vm.getTodo
	    }
	  }), " ", _h('button', {
	    staticClass: "btn btn-primary",
	    on: {
	      "click": _vm.addTodo
	    }
	  }, ["Add Todo"])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4e811f9f", module.exports)
	  }
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(21)
	
	/* script */
	__vue_exports__ = __webpack_require__(23)
	
	/* template */
	var __vue_template__ = __webpack_require__(24)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/stsdc/pi/SCS/client/src/js/components/CurrentTodos.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-414a27be", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-414a27be", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] CurrentTodos.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-414a27be!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CurrentTodos.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-414a27be!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CurrentTodos.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.btn-group{\n    float: right;\n}\n", "", {"version":3,"sources":["/./js/components/CurrentTodos.vue?077edd36"],"names":[],"mappings":";AA0CA;IACA,aAAA;CACA","file":"CurrentTodos.vue","sourcesContent":["<template>\n    <div id=\"current-todos\" class=\"container\">\n        <h3 v-if=\"todos.length > 0\">Current({{todos.length}})</h3>\n        <ul class=\"list-group\">\n            <li class=\"list-group-item\" v-for=\"todo in todos\">\n                {{todo.body}}\n            <div class=\"btn-group\">\n                <button type=\"button\" @click=\"edit(todo)\" class=\"btn btn-default btn-sm\">\n                <span class=\"glyphicon glyphicon-edit\"></span> Edit\n                </button>\n                <button type=\"button\" @click=\"complete(todo)\" class=\"btn btn-default btn-sm\">\n                <span class=\"glyphicon glyphicon-ok-circle\"></span> Complete\n                </button>\n                <button type=\"button\" @click=\"remove(todo)\" class=\"btn btn-default btn-sm\">\n                <span class=\"glyphicon glyphicon-remove-circle\"></span> Remove\n                </button>\n            </div>\n            </li>\n        </ul>\n    </div>\n</template>\n<script>\nmodule.exports = {\n    methods: {\n        edit(todo){\n            this.$store.dispatch('editTodo', todo)\n        },\n        complete(todo){\n            this.$store.dispatch('completeTodo', todo)\n        },\n        remove(todo){\n            this.$store.dispatch('removeTodo', todo)\n        }\n    },\n    computed: {\n        todos(){\n            return this.$store.getters.todos\n        }\n    }\n}\n</script>\n<style>\n    .btn-group{\n        float: right;\n    }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 23 */
/***/ function(module, exports) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    methods: {
	        edit(todo) {
	            this.$store.dispatch('editTodo', todo);
	        },
	        complete(todo) {
	            this.$store.dispatch('completeTodo', todo);
	        },
	        remove(todo) {
	            this.$store.dispatch('removeTodo', todo);
	        }
	    },
	    computed: {
	        todos() {
	            return this.$store.getters.todos;
	        }
	    }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "container",
	    attrs: {
	      "id": "current-todos"
	    }
	  }, [(_vm.todos.length > 0) ? _h('h3', ["Current(" + _vm._s(_vm.todos.length) + ")"]) : _vm._e(), " ", _h('ul', {
	    staticClass: "list-group"
	  }, [_vm._l((_vm.todos), function(todo) {
	    return _h('li', {
	      staticClass: "list-group-item"
	    }, ["\n            " + _vm._s(todo.body) + "\n        ", _h('div', {
	      staticClass: "btn-group"
	    }, [_h('button', {
	      staticClass: "btn btn-default btn-sm",
	      attrs: {
	        "type": "button"
	      },
	      on: {
	        "click": function($event) {
	          _vm.edit(todo)
	        }
	      }
	    }, [_h('span', {
	      staticClass: "glyphicon glyphicon-edit"
	    }), " Edit\n            "]), " ", _h('button', {
	      staticClass: "btn btn-default btn-sm",
	      attrs: {
	        "type": "button"
	      },
	      on: {
	        "click": function($event) {
	          _vm.complete(todo)
	        }
	      }
	    }, [_h('span', {
	      staticClass: "glyphicon glyphicon-ok-circle"
	    }), " Complete\n            "]), " ", _h('button', {
	      staticClass: "btn btn-default btn-sm",
	      attrs: {
	        "type": "button"
	      },
	      on: {
	        "click": function($event) {
	          _vm.remove(todo)
	        }
	      }
	    }, [_h('span', {
	      staticClass: "glyphicon glyphicon-remove-circle"
	    }), " Remove\n            "])])])
	  })])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-414a27be", module.exports)
	  }
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(26)
	
	/* template */
	var __vue_template__ = __webpack_require__(27)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/stsdc/pi/SCS/client/src/js/components/CompletedTodos.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-97c2a362", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-97c2a362", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] CompletedTodos.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 26 */
/***/ function(module, exports) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	module.exports = {
	    methods: {
	        remove(todo) {
	            this.$store.dispatch('removeTodo', todo);
	        }
	    },
	    computed: {
	        completed() {
	            return this.$store.getters.completedTodos;
	        }
	    }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    attrs: {
	      "id": "completed-todos"
	    }
	  }, [(_vm.completed.length > 0) ? _h('h3', ["Completed(" + _vm._s(_vm.completed.length) + ")"]) : _vm._e(), " ", _h('ul', {
	    staticClass: "list-group"
	  }, [_vm._l((_vm.completed), function(todo) {
	    return _h('li', {
	      staticClass: "list-group-item"
	    }, ["\n            " + _vm._s(todo.body) + "\n            ", _h('button', {
	      staticClass: "btn btn-default btn-sm",
	      attrs: {
	        "type": "button"
	      },
	      on: {
	        "click": function($event) {
	          _vm.remove(todo)
	        }
	      }
	    }, [_h('span', {
	      staticClass: "glyphicon glyphicon-remove-circle"
	    }), " Remove\n            "])])
	  })])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-97c2a362", module.exports)
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "container",
	    attrs: {
	      "id": "app"
	    }
	  }, [_h('Topbar'), " ", _h('Sidebar'), " "])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-01683cb5", module.exports)
	  }
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vue = __webpack_require__(1);
	var Vuex = __webpack_require__(30);
	
	Vue.use(Vuex);
	
	module.exports = new Vuex.Store({
	    state: {
	        todos: [],
	        newTodo: '',
	        showSidebar: false
	    },
	    mutations: {
	        SHOW_SIDEBAR: function SHOW_SIDEBAR(state) {
	            state.showSidebar = !state.showSidebar;
	        },
	        GET_TODO: function GET_TODO(state, todo) {
	            state.newTodo = todo;
	        },
	        ADD_TODO: function ADD_TODO(state) {
	            state.todos.push({
	                body: state.newTodo,
	                completed: false
	            });
	        },
	        EDIT_TODO: function EDIT_TODO(state, todo) {
	            var todos = state.todos;
	            todos.splice(todos.indexOf(todo), 1);
	            state.todos = todos;
	            state.newTodo = todo.body;
	        },
	        REMOVE_TODO: function REMOVE_TODO(state, todo) {
	            var todos = state.todos;
	            todos.splice(todos.indexOf(todo), 1);
	        },
	        COMPLETE_TODO: function COMPLETE_TODO(state, todo) {
	            todo.completed = !todo.completed;
	        },
	        CLEAR_TODO: function CLEAR_TODO(state) {
	            state.newTodo = '';
	        }
	    },
	    actions: {
	        showSidebar: function showSidebar(_ref) {
	            var commit = _ref.commit;
	
	            commit('SHOW_SIDEBAR');
	        },
	        getTodo: function getTodo(_ref2, todo) {
	            var commit = _ref2.commit;
	
	            commit('GET_TODO', todo);
	        },
	        addTodo: function addTodo(_ref3) {
	            var commit = _ref3.commit;
	
	            commit('ADD_TODO');
	        },
	        editTodo: function editTodo(_ref4, todo) {
	            var commit = _ref4.commit;
	
	            commit('EDIT_TODO', todo);
	        },
	        removeTodo: function removeTodo(_ref5, todo) {
	            var commit = _ref5.commit;
	
	            commit('REMOVE_TODO', todo);
	        },
	        completeTodo: function completeTodo(_ref6, todo) {
	            var commit = _ref6.commit;
	
	            commit('COMPLETE_TODO', todo);
	        },
	        clearTodo: function clearTodo(_ref7) {
	            var commit = _ref7.commit;
	
	            commit('CLEAR_TODO');
	        }
	    },
	    getters: {
	        showSidebar: function showSidebar(state) {
	            return state.showSidebar;
	        },
	        newTodo: function newTodo(state) {
	            return state.newTodo;
	        },
	        todos: function todos(state) {
	            return state.todos.filter(function (todo) {
	                return !todo.completed;
	            });
	        },
	        completedTodos: function completedTodos(state) {
	            return state.todos.filter(function (todo) {
	                return todo.completed;
	            });
	        }
	    }
	
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vuex v2.0.0
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vuex = factory());
	}(this, (function () { 'use strict';
	
	var devtoolHook =
	  typeof window !== 'undefined' &&
	  window.__VUE_DEVTOOLS_GLOBAL_HOOK__
	
	function devtoolPlugin (store) {
	  if (!devtoolHook) { return }
	
	  store._devtoolHook = devtoolHook
	
	  devtoolHook.emit('vuex:init', store)
	
	  devtoolHook.on('vuex:travel-to-state', function (targetState) {
	    store.replaceState(targetState)
	  })
	
	  store.subscribe(function (mutation, state) {
	    devtoolHook.emit('vuex:mutation', mutation, state)
	  })
	}
	
	function applyMixin (Vue) {
	  var version = Number(Vue.version.split('.')[0])
	
	  if (version >= 2) {
	    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
	    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
	  } else {
	    // override init and inject vuex init procedure
	    // for 1.x backwards compatibility.
	    var _init = Vue.prototype._init
	    Vue.prototype._init = function (options) {
	      if ( options === void 0 ) options = {};
	
	      options.init = options.init
	        ? [vuexInit].concat(options.init)
	        : vuexInit
	      _init.call(this, options)
	    }
	  }
	
	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */
	
	  function vuexInit () {
	    var options = this.$options
	    // store injection
	    if (options.store) {
	      this.$store = options.store
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store
	    }
	  }
	}
	
	function mapState (states) {
	  var res = {}
	  normalizeMap(states).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedState () {
	      return typeof val === 'function'
	        ? val.call(this, this.$store.state, this.$store.getters)
	        : this.$store.state[val]
	    }
	  })
	  return res
	}
	
	function mapMutations (mutations) {
	  var res = {}
	  normalizeMap(mutations).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedMutation () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];
	
	      return this.$store.commit.apply(this.$store, [val].concat(args))
	    }
	  })
	  return res
	}
	
	function mapGetters (getters) {
	  var res = {}
	  normalizeMap(getters).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedGetter () {
	      if (!(val in this.$store.getters)) {
	        console.error(("[vuex] unknown getter: " + val))
	      }
	      return this.$store.getters[val]
	    }
	  })
	  return res
	}
	
	function mapActions (actions) {
	  var res = {}
	  normalizeMap(actions).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedAction () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];
	
	      return this.$store.dispatch.apply(this.$store, [val].concat(args))
	    }
	  })
	  return res
	}
	
	function normalizeMap (map) {
	  return Array.isArray(map)
	    ? map.map(function (key) { return ({ key: key, val: key }); })
	    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
	}
	
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	function isPromise (val) {
	  return val && typeof val.then === 'function'
	}
	
	function assert (condition, msg) {
	  if (!condition) { throw new Error(("[vuex] " + msg)) }
	}
	
	var Vue // bind on install
	
	var Store = function Store (options) {
	  var this$1 = this;
	  if ( options === void 0 ) options = {};
	
	  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.")
	  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.")
	
	  var state = options.state; if ( state === void 0 ) state = {};
	  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
	  var strict = options.strict; if ( strict === void 0 ) strict = false;
	
	  // store internal state
	  this._options = options
	  this._committing = false
	  this._actions = Object.create(null)
	  this._mutations = Object.create(null)
	  this._wrappedGetters = Object.create(null)
	  this._runtimeModules = Object.create(null)
	  this._subscribers = []
	  this._watcherVM = new Vue()
	
	    // bind commit and dispatch to self
	  var store = this
	  var ref = this;
	  var dispatch = ref.dispatch;
	  var commit = ref.commit;
	  this.dispatch = function boundDispatch (type, payload) {
	    return dispatch.call(store, type, payload)
	    }
	    this.commit = function boundCommit (type, payload, options) {
	    return commit.call(store, type, payload, options)
	  }
	
	  // strict mode
	  this.strict = strict
	
	  // init root module.
	  // this also recursively registers all sub-modules
	  // and collects all module getters inside this._wrappedGetters
	  installModule(this, state, [], options)
	
	  // initialize the store vm, which is responsible for the reactivity
	  // (also registers _wrappedGetters as computed properties)
	  resetStoreVM(this, state)
	
	  // apply plugins
	  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); })
	};
	
	var prototypeAccessors = { state: {} };
	
	prototypeAccessors.state.get = function () {
	  return this._vm.state
	};
	
	prototypeAccessors.state.set = function (v) {
	  assert(false, "Use store.replaceState() to explicit replace store state.")
	};
	
	Store.prototype.commit = function commit (type, payload, options) {
	    var this$1 = this;
	
	  // check object-style commit
	  if (isObject(type) && type.type) {
	    options = payload
	    payload = type
	    type = type.type
	  }
	  var mutation = { type: type, payload: payload }
	  var entry = this._mutations[type]
	  if (!entry) {
	    console.error(("[vuex] unknown mutation type: " + type))
	    return
	  }
	  this._withCommit(function () {
	    entry.forEach(function commitIterator (handler) {
	      handler(payload)
	    })
	  })
	  if (!options || !options.silent) {
	    this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); })
	  }
	};
	
	Store.prototype.dispatch = function dispatch (type, payload) {
	  // check object-style dispatch
	  if (isObject(type) && type.type) {
	    payload = type
	    type = type.type
	  }
	  var entry = this._actions[type]
	  if (!entry) {
	    console.error(("[vuex] unknown action type: " + type))
	    return
	  }
	  return entry.length > 1
	    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
	    : entry[0](payload)
	};
	
	Store.prototype.subscribe = function subscribe (fn) {
	  var subs = this._subscribers
	  if (subs.indexOf(fn) < 0) {
	    subs.push(fn)
	  }
	  return function () {
	    var i = subs.indexOf(fn)
	    if (i > -1) {
	      subs.splice(i, 1)
	    }
	  }
	};
	
	Store.prototype.watch = function watch (getter, cb, options) {
	    var this$1 = this;
	
	  assert(typeof getter === 'function', "store.watch only accepts a function.")
	  return this._watcherVM.$watch(function () { return getter(this$1.state); }, cb, options)
	};
	
	Store.prototype.replaceState = function replaceState (state) {
	    var this$1 = this;
	
	  this._withCommit(function () {
	    this$1._vm.state = state
	  })
	};
	
	Store.prototype.registerModule = function registerModule (path, module) {
	  if (typeof path === 'string') { path = [path] }
	  assert(Array.isArray(path), "module path must be a string or an Array.")
	  this._runtimeModules[path.join('.')] = module
	  installModule(this, this.state, path, module)
	  // reset store to update getters...
	  resetStoreVM(this, this.state)
	};
	
	Store.prototype.unregisterModule = function unregisterModule (path) {
	    var this$1 = this;
	
	  if (typeof path === 'string') { path = [path] }
	  assert(Array.isArray(path), "module path must be a string or an Array.")
	    delete this._runtimeModules[path.join('.')]
	  this._withCommit(function () {
	    var parentState = getNestedState(this$1.state, path.slice(0, -1))
	    Vue.delete(parentState, path[path.length - 1])
	  })
	  resetStore(this)
	};
	
	Store.prototype.hotUpdate = function hotUpdate (newOptions) {
	  updateModule(this._options, newOptions)
	  resetStore(this)
	};
	
	Store.prototype._withCommit = function _withCommit (fn) {
	  var committing = this._committing
	  this._committing = true
	  fn()
	  this._committing = committing
	};
	
	Object.defineProperties( Store.prototype, prototypeAccessors );
	
	function updateModule (targetModule, newModule) {
	  if (newModule.actions) {
	    targetModule.actions = newModule.actions
	  }
	  if (newModule.mutations) {
	    targetModule.mutations = newModule.mutations
	  }
	  if (newModule.getters) {
	    targetModule.getters = newModule.getters
	  }
	  if (newModule.modules) {
	    for (var key in newModule.modules) {
	      if (!(targetModule.modules && targetModule.modules[key])) {
	        console.warn(
	          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
	          'manual reload is needed'
	        )
	        return
	      }
	      updateModule(targetModule.modules[key], newModule.modules[key])
	    }
	  }
	}
	
	function resetStore (store) {
	  store._actions = Object.create(null)
	  store._mutations = Object.create(null)
	  store._wrappedGetters = Object.create(null)
	  var state = store.state
	  // init root module
	  installModule(store, state, [], store._options, true)
	  // init all runtime modules
	  Object.keys(store._runtimeModules).forEach(function (key) {
	    installModule(store, state, key.split('.'), store._runtimeModules[key], true)
	  })
	  // reset vm
	  resetStoreVM(store, state)
	}
	
	function resetStoreVM (store, state) {
	  var oldVm = store._vm
	
	  // bind store public getters
	  store.getters = {}
	  var wrappedGetters = store._wrappedGetters
	  var computed = {}
	  Object.keys(wrappedGetters).forEach(function (key) {
	    var fn = wrappedGetters[key]
	    // use computed to leverage its lazy-caching mechanism
	    computed[key] = function () { return fn(store); }
	    Object.defineProperty(store.getters, key, {
	      get: function () { return store._vm[key]; }
	    })
	  })
	
	  // use a Vue instance to store the state tree
	  // suppress warnings just in case the user has added
	  // some funky global mixins
	  var silent = Vue.config.silent
	  Vue.config.silent = true
	  store._vm = new Vue({
	    data: { state: state },
	    computed: computed
	  })
	  Vue.config.silent = silent
	
	  // enable strict mode for new vm
	  if (store.strict) {
	    enableStrictMode(store)
	  }
	
	  if (oldVm) {
	    // dispatch changes in all subscribed watchers
	    // to force getter re-evaluation.
	    store._withCommit(function () {
	      oldVm.state = null
	    })
	    Vue.nextTick(function () { return oldVm.$destroy(); })
	  }
	}
	
	function installModule (store, rootState, path, module, hot) {
	  var isRoot = !path.length
	  var state = module.state;
	  var actions = module.actions;
	  var mutations = module.mutations;
	  var getters = module.getters;
	  var modules = module.modules;
	
	  // set state
	  if (!isRoot && !hot) {
	    var parentState = getNestedState(rootState, path.slice(0, -1))
	    var moduleName = path[path.length - 1]
	    store._withCommit(function () {
	      Vue.set(parentState, moduleName, state || {})
	    })
	  }
	
	  if (mutations) {
	    Object.keys(mutations).forEach(function (key) {
	      registerMutation(store, key, mutations[key], path)
	    })
	  }
	
	  if (actions) {
	    Object.keys(actions).forEach(function (key) {
	      registerAction(store, key, actions[key], path)
	    })
	  }
	
	  if (getters) {
	    wrapGetters(store, getters, path)
	  }
	
	  if (modules) {
	    Object.keys(modules).forEach(function (key) {
	      installModule(store, rootState, path.concat(key), modules[key], hot)
	    })
	  }
	}
	
	function registerMutation (store, type, handler, path) {
	  if ( path === void 0 ) path = [];
	
	  var entry = store._mutations[type] || (store._mutations[type] = [])
	  entry.push(function wrappedMutationHandler (payload) {
	    handler(getNestedState(store.state, path), payload)
	  })
	}
	
	function registerAction (store, type, handler, path) {
	  if ( path === void 0 ) path = [];
	
	  var entry = store._actions[type] || (store._actions[type] = [])
	  var dispatch = store.dispatch;
	  var commit = store.commit;
	  entry.push(function wrappedActionHandler (payload, cb) {
	    var res = handler({
	      dispatch: dispatch,
	      commit: commit,
	      getters: store.getters,
	      state: getNestedState(store.state, path),
	      rootState: store.state
	    }, payload, cb)
	    if (!isPromise(res)) {
	      res = Promise.resolve(res)
	    }
	    if (store._devtoolHook) {
	      return res.catch(function (err) {
	        store._devtoolHook.emit('vuex:error', err)
	        throw err
	      })
	    } else {
	      return res
	    }
	  })
	}
	
	function wrapGetters (store, moduleGetters, modulePath) {
	  Object.keys(moduleGetters).forEach(function (getterKey) {
	    var rawGetter = moduleGetters[getterKey]
	    if (store._wrappedGetters[getterKey]) {
	      console.error(("[vuex] duplicate getter key: " + getterKey))
	      return
	    }
	    store._wrappedGetters[getterKey] = function wrappedGetter (store) {
	      return rawGetter(
	        getNestedState(store.state, modulePath), // local state
	        store.getters, // getters
	        store.state // root state
	      )
	    }
	  })
	}
	
	function enableStrictMode (store) {
	  store._vm.$watch('state', function () {
	    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.")
	  }, { deep: true, sync: true })
	}
	
	function getNestedState (state, path) {
	  return path.length
	    ? path.reduce(function (state, key) { return state[key]; }, state)
	    : state
	}
	
	function install (_Vue) {
	  if (Vue) {
	    console.error(
	      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
	    )
	    return
	  }
	  Vue = _Vue
	  applyMixin(Vue)
	}
	
	// auto install in dist mode
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue)
	}
	
	var index = {
	  Store: Store,
	  install: install,
	  mapState: mapState,
	  mapMutations: mapMutations,
	  mapGetters: mapGetters,
	  mapActions: mapActions
	}
	
	return index;
	
	})));

/***/ },
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ function(module, exports) {

	'use strict';
	
	exports = module.exports = {
	    connection: function connection(socket) {
	        socket.on('connect', function () {
	            socket.emit('connection');
	            console.log("Connected");
	            socket.emit('config');
	        });
	    },
	    writePins: function writePins(socket, pins) {
	        pins.map(function (pin) {
	            socket.emit('pin:write', pin);
	        });
	        console.log("pin:write");
	    },
	    writeDirs: function writeDirs(socket, dirs) {
	        dirs.map(function (dir) {
	            socket.emit('pin:write', dir);
	        });
	        console.log("pin:write");
	    },
	    writeDutycycles: function writeDutycycles(socket, dutycycles) {
	        dutycycles.map(function (dutycycle) {
	            socket.emit('pin:dutycycles', dutycycles);
	        });
	        console.log("pin:dutycycles");
	    }
	
	};

/***/ }
]);
//# sourceMappingURL=app.js.map