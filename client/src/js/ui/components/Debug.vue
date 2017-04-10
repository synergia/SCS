<template>
<div class="states">
    <div class="propulsion" v-for="pin in this.$root.$data.pins.propulsions">
        <div class="propulsion_info">
            <div class="propulsion_num">{{pin.num}}</div>
            <div class="propulsion_name">{{pin.name}}</div>
            <div class="propulsion_role">{{pin.role}}</div>
            <div class="propulsion_value">{{pin.value}}</div>
        </div>
        <div class="propulsion_control">
            <!-- <input type="range" v-model="pin.value" min="0" max="255" on-change="endFn"/> -->
            <vue-range v-model="pin.value" :max="255"
            :end-func="updatePin(pin)"></vue-range>

        </div>
    </div>

    <!-- <div class="servo" v-for="pin in this.$root.$data.pins.servos">
            <div class="servo_num">{{pin.num}}</div>
            <div class="servo_name">{{pin.name}}</div>
            <div class="servo_role">{{pin.role}}</div>
            <div class="servo_value">{{pin.value}}</div>
        </div>
        <div class="logic" v-for="pin in this.$root.$data.pins.logics">
            <div class="logic_num">{{pin.num}}</div>
            <div class="logic_name">{{pin.name}}</div>
            <div class="logic_role">{{pin.role}}</div>
            <div class="logic_owner">{{pin.owner}}</div>
            <div class="logic_value">{{pin.value}}</div>
        </div> -->

</div>
</template>
<script>
const VueRange = require('./Slider.vue');
const sockets = require('../../sockets.js');

module.exports = {

    methods: {
        updatePin: function (pin) {
            sockets.writeDutycycles(pin);
        }
    },
    components: {
        VueRange
    },
    mounted: function () {

    }
}
</script>
