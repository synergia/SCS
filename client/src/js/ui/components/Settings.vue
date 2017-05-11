<template>
    <div class="settings">
        Passive Mode
        <toggle-button @change="onChangeEventHandler" :value="this.$root.$data.vehicle.is.passiveMode" :color="color" :sync="true" :labels="true"/>
    </div>
</template>
<script>

const sockets = require('../../sockets.js');

module.exports = {

    methods: {
        onChangeEventHandler: function(event) {
            sockets.passiveMode(event.value);
            this.$root.$data.vehicle.is.passiveMode = event.value;
        },
    },
    components: {

    },
    mounted: function() {

    },
    data() {
        return {
            color: "#e67e22",
        }
    }
}
</script>
