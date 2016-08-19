(function() {
    const io = require('socket.io-client');
    const Vue = require('vue');
    require('./pin');
    require('./dutycycle');
    require('./camera');
    let socket = io.connect('http://' + document.domain + ':' + location.port);

    require("../styles/main.css");

    let SCS = new Vue({
        el: '#app',
        data: {
            pinlist: {},
            // To nie powinno być zahardkodowane,
            // należy wyciągać z pinlisty
            dutycycles: [
                {
                    num: '18',
                    dutycycle: 0
                },
                {
                    num: '23',
                    dutycycle: 0
                }
            ],
        },
        methods: {},
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

    // CAMERA & IMAGE
    window.setInterval(function() {
        console.log("CAPTURE!");
        socket.emit('capture');
    }, 7000);

    let img = document.getElementById("cam");

    $(function() {
        var intervalMS = 7100; // 5 seconds
        setInterval(function() {
            console.log('UPDATING IMG');
            $("#cam").prop("src", "client/foo.jpg?" + new Date().getTime());
        }, intervalMS);
    });


    $(document).ready(function() {
        $('#getPins').click(function() {
            socket.emit('capture');
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
