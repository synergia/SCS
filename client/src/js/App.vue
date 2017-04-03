<template>
<div id="app" class="container">
    <Topbar></Topbar>
    <div class="sidebar">
        <div class="sidebar_left">
            <Stream></Stream>
            <States></States>

        </div>
        <!-- <Sidebar></Sidebar> -->

        <div class="sidebar_right">
            <Joystick></Joystick>
        </div>
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
