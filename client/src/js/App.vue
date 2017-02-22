<template>
<div id="app" class="container">
    <Topbar></Topbar>
    <Sidebar></Sidebar>
    <States></States>
    <Joystick></Joystick>

</div>
</template>

<script>
const Topbar = require('./components/Topbar.vue');
const Sidebar = require('./components/Sidebar.vue');
const States = require('./components/States.vue');
const Joystick = require('./components/Joystick.vue');

module.exports = {
    components: {
        Topbar,
        Sidebar,
        States,
        Joystick
    },
    computed: {

    }

}
</script>

<style>
body {
    font-family: Helvetica, sans-serif;
}
</style>
