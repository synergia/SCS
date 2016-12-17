<template>
    <div id="topbar" class="topbar">
        <button class="btn btn-primary" v-on:click="showSidebar">Settings</button>
        <!-- <button class="btn btn-primary" v-on:click="showStates">States</button> -->
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
