module.exports = [
    {
        path: '/',
        components: {
            default: require('./components/States.vue'),
            joystick: require('./components/Joystick.vue')
        }
    },
    {
        path: '/manualControl',
        components: {
            default: require('./components/ManualControl.vue')
        }
    },
    {
        path: '/settings',
        components: {
            default: require('./components/Settings.vue')
        }
    }
];
