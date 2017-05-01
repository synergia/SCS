exports = module.exports = {
    pins: {
        propulsions: [],
        logics: [],
        servos: []
    },
    vehicle: {
        name: "",
        arch: "",
        inver: 0,
        is: {
            forward : false,
            backward: false,
        },
        accel: {
            x: []
        }
    },
    core: {

    },
    ui: {
        fullscreen: false,
        chartData: {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Data One',
                borderColor: '#e67e22',
                pointBackgroundColor: '#e67e22',
                borderWidth: 1,
                pointBorderColor: '#e67e22',
                backgroundColor: 'transparent',
                data: []
            }]
        },
    }
};
