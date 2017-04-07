
<template>
    <div class="states">
        <div class="propulsion" v-for="pin in this.$root.$data.pins.propulsions">
            <div class="propulsion_name">{{pin.name}}</div>
            <div class="propulsion_value">{{pin.value}}</div>
        </div>
        <div class="servo" v-for="pin in this.$root.$data.pins.servos">
            <div class="servo_name">{{pin.name}}</div>
            <div class="servo_value">{{pin.value}}</div>
        </div>
        <div class="logic" v-for="pin in this.$root.$data.pins.logics">
            <div class="logic_name">{{pin.name}}</div>
            <div class="logic_value">{{pin.value}}</div>
        </div>
    </div>
</template>
