<template>
<div id="people">
    <span>States</span>

    <table>
        <thead>
            <tr>
                <th>NAME</th>
                <th>ROLE</th>
                <th>NUMBER</th>
                <th>VALUE</th>
                <th>OWNER</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="pin in this.$store.getters.pins.propulsions">
                <td>{{pin.name}}</td>
                <td>{{pin.role}}</td>
                <td>{{pin.num}}</td>
                <td>{{pin.value}}</td>
            </tr>
            <tr v-for="pin in this.$store.getters.pins.logics">
                <td>{{pin.name}}</td>
                <td>{{pin.role}}</td>
                <td>{{pin.num}}</td>
                <td>{{pin.value}}</td>
                <td>{{pin.owner}}</td>
            </tr>
            <tr v-for="pin in this.$store.getters.pins.servos">
                <td>{{pin.name}}</td>
                <td>{{pin.role}}</td>
                <td>{{pin.num}}</td>
                <td>{{pin.value}}</td>
            </tr>
        </tbody>

    </table>
</div>
</template>
<script>
module.exports = {

    methods: {
        showSidebar() {
            this.$store.dispatch('showSidebar');
        },

        getTodo(e) {
            this.$store.dispatch('getTodo', e.target.value)
        },
        addTodo() {
            this.$store.dispatch('addTodo')
            this.$store.dispatch('clearTodo')
        }
    },
    computed: {
        newTodo() {
            return this.$store.getters.newTodo
        }
    }
}
</script>
