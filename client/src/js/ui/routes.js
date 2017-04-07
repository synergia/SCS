module.exports =  [
        {
            path: '/',
            components: {
                default: require('./components/States.vue'),
                joystick: require('./components/Joystick.vue')
            },
      },
        {
            path: '/debug',
            components: {
                default: require('./components/Debug.vue')
            }
        }
    ];
