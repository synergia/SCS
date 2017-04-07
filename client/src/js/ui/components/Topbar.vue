<template>
    <div id="topbar" class="topbar">
        <button class="btn btn-primary" v-on:click="showSidebar">Settings</button>
        <!-- <button class="btn btn-primary" v-on:click="showStates">States</button> -->
        <router-link to="/debug">Debug</router-link>
        <router-link to="/">Go back</router-link>
    </div>
</template>
<script>
module.exports = {
    methods: {
        showSidebar(){
            this.$root.$data.showSidebar = !this.$root.$data.showSidebar;
        },
    },
    computed: {

    }
}
</script>
