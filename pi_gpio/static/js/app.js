(function() {
    'use strict';

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
        pinlist.map(function(pin) {
            let li = document.createElement("li");
            li.innerHTML = pin.num;
            ul.appendChild(li);
        });
        console.log(pinlist);
    });

    $(document).ready(function() {
        $('#getPins').click(function() {
            socket.emit('pin:list');
        });
        $('#runPWM18').click(function() {
            console.log("Start PWM18");
            socket.emit('pin:PWM18');
        });
        $('#runPWM23').click(function() {
            console.log("Start PWM23");
            socket.emit('pin:PWM23');
        });
    });


})();
