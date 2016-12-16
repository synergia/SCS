<template>
<div id="app" class="container">
    <Topbar></Topbar>
    <Sidebar></Sidebar>
    <States></States>
    <!-- <CompletedTodos></CompletedTodos>
    <GetTodo></GetTodo>
    <CurrentTodos></CurrentTodos> -->
</div>
</template>

<script>

const Topbar = require('./components/Topbar.vue');
const Sidebar = require('./components/Sidebar.vue');
const States = require('./components/States.vue');
const GetTodo = require('./components/GetTodo.vue');
const CurrentTodos = require('./components/CurrentTodos.vue');
const CompletedTodos = require('./components/CompletedTodos.vue');
module.exports = {
    components: {
        Topbar,
        Sidebar,
        States,
        GetTodo,
        CurrentTodos,
        CompletedTodos
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
