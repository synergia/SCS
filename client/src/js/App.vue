<template>
<div id="app" class="container">
    <Topbar></Topbar>
    <Sidebar></Sidebar>
    <States></States>

</div>
</template>

<script>
const Topbar = require('./components/Topbar.vue');
const Sidebar = require('./components/Sidebar.vue');
const States = require('./components/States.vue');

module.exports = {
    components: {
        Topbar,
        Sidebar,
        States,
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
