(function() {
    'use strict';

    require("../styles/main.css");

    let socket = io.connect('http://' + document.domain + ':' + location.port);

    socket.on('connect', function() {
        socket.emit('connection');
        console.log("Connected");
    });
    socket.on('disconnect', function() {
        console.log('Disconnected');
    });
    socket.on('pin:list', function(pinlist) {
        let ul = document.getElementById('pinlist');
        if (pinlist) {
            pinlist.map(function(pin) {
                let li = document.createElement("li");
                li.innerHTML = pin.num;
                ul.appendChild(li);
            });
        }
        console.log(pinlist);
    });

    socket.on('pin:dutycycle', function (data) {
        console.log(data);
    });

    let getDutycycle = function() {
        return  document.getElementById('dutycycle1').value;
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
                '18': 50,
                '23': 60
            });
        });

    });


})();
