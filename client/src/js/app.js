(function() {
    const io = require('socket.io-client');
    const Vue = require('vue');

    require('./pin');
    require('./dutycycle');
    let socket = io.connect('http://' + document.domain + ':' + location.port);

    require("../styles/main.css");

    let SCS = new Vue({
        el: '#app',
        data: {
            pinlist: {},
            dutycycles: [],
            dirs: []
        },
        methods: {
            dcPins : function (pinlist) {
                // filtering all pins that have key dutycycle
                return pinlist.filter((pin) => pin.dutycycle !== undefined);
            },
            dirPins: function (pinlist) {
                // filtering all pins that have name `dir`
                return pinlist.filter((pin) => pin.name === 'dir');
            }
        },
        ready: function() {
            socket.on('connect', function() {
                socket.emit('connection');
                console.log("Connected");
            });
            socket.emit('pin:list');
        },
    });
    SCS.$watch('pinlist', function(newVal, oldVal) {
        require('./keysControl')(socket, SCS);
    });
    socket.on('pin:list', function(pinlist) {
        SCS.pinlist = pinlist;
        SCS.dutycycles = SCS.dcPins(pinlist);
        SCS.dirs = SCS.dirPins(pinlist);
        console.log(pinlist);
        console.log(SCS.dirs[0].num);
    });

    socket.on('disconnect', function() {
        console.log('Disconnected');
    });

    socket.on('pin:dutycycle', function(data) {
        console.log(data);
    });

})();
