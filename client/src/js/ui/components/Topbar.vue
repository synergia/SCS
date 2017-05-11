<template>
    <div id="topbar" class="topbar">
        <router-link tag="button" class="" to="/settings">Settings</router-link>
        <!-- <button class="btn btn-primary" v-on:click="showStates">States</button> -->
        <router-link to="/manualControl">Manual</router-link>
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
