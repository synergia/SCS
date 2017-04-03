<template>
<div id="app" class="container">
    <div class="container_left">
        <Stream></Stream>
    </div>
    <!-- <Topbar></Topbar> -->
    <!-- <Sidebar></Sidebar> -->

    <!-- <States></States> -->
    <div class="container_right">
        <Joystick></Joystick>
    </div>

</div>
</template>

<script>
const Topbar = require('./components/Topbar.vue');
const Sidebar = require('./components/Sidebar.vue');
const States = require('./components/States.vue');
const Joystick = require('./components/Joystick.vue');
const Stream = require('./components/Stream.vue');

module.exports = {
    components: {
        Topbar,
        Sidebar,
        States,
        Joystick,
        Stream
    },
    computed: {

    }

}
</script>

<style>
</style>
