<template>
<div id="zone_joystick"></div>
</template>

<script>
module.exports = {
    mounted: function () {
        // Very high latency if save steerage to store
        const touchControl = require('../../touchControl.js');
        const Steerage = require('../../steerage11.js');
        let steerage = new Steerage();
        touchControl(steerage);
    }
}
</script>
