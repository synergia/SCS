<template>
<div id="zone_joystick"></div>
</template>

<script>
module.exports = {
    mounted: function () {
        const touchControl = require('../../touchControl.js');
        const Steerage = require('../../steerage.js');
        let steerage = new Steerage();
        touchControl(steerage);
    }

}
</script>
