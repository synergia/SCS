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
            this.$store.dispatch('showSidebar');
        },

        getTodo(e){
            this.$store.dispatch('getTodo', e.target.value)
        },
        addTodo(){
            this.$store.dispatch('addTodo')
            this.$store.dispatch('clearTodo')
        }
    },
    computed: {
        newTodo(){
            return this.$store.getters.newTodo
        }
    }
}
</script>
