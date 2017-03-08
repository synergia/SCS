<template>
<div id="app" class="container">
    <!-- <Topbar></Topbar> -->
    <!-- <Sidebar></Sidebar> -->
    <States></States>
    <div class="joystick-wrapper">
            <Joystick></Joystick>

    </div>

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

.container {
    /*width: 1280px;*/
    height: 500px;
    overflow: hidden;
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    border: 1px solid black;
    justify-content: space-between;
}
.joystick-wrapper {
    position: relative;
    width: 400px;
}
</style>
