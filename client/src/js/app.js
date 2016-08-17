(function() {
    const io = require('socket.io-client');
    const Vue = require('vue');
    require('./pin');
    let socket = io.connect('http://' + document.domain + ':' + location.port);

    const k = require('./keysControl')(socket);

    require("../styles/main.css");

    let SCS = new Vue({
        el: '#app',
        data: {
            pinlist: {}
        },
        methods: {
        },
        ready: function() {
            socket.on('connect', function() {
                socket.emit('connection');
                console.log("Connected");
            });
            socket.emit('pin:list');
        },
    });

    socket.on('pin:list', function(pinlist) {
        SCS.pinlist = pinlist;
        console.log(pinlist);
    });


    socket.on('disconnect', function() {
        console.log('Disconnected');
    });

    socket.on('pin:dutycycle', function(data) {
        console.log(data);
    });

    let getDutycycle = function() {
        return document.getElementById('dutycycle1').value;
    };

    let getDirs = function() {
        return {
            'dir1': document.getElementById('dir1').checked,
            'dir2': document.getElementById('dir2').checked,
            'dir3': document.getElementById('dir3').checked,
            'dir4': document.getElementById('dir4').checked,
        };
    };



    $(document).ready(function() {
        $('#getPins').click(function() {
            socket.emit('pin:list');
        });
        $('#runPWM').click(function() {
            console.log("Start PWM", getDutycycle());
            socket.emit('pin:dutycycles', {
                '18': 150,
                '23': 100
            });
        });

    });

})();
