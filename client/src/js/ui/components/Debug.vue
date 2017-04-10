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
            <vue-range v-model="pin.value" :max="255"
            :end-func="updatePin(pin)"></vue-range>

        </div>
    </div>

    <div class="servo" v-for="pin in this.$root.$data.pins.servos">
        <div class="servo_info">
            <div class="servo_num">{{pin.num}}</div>
            <div class="servo_name">{{pin.name}}</div>
            <div class="servo_role">{{pin.role}}</div>
            <div class="servo_value">{{pin.value}}</div>
        </div>
        <div class="servo_control">
            <vue-range v-model="pin.value" :min="800" :max="2000"
            :end-func="updatePin(pin)"></vue-range>
        </div>
    </div>
        <div class="logic" v-for="pin in this.$root.$data.pins.logics">
            <div class="logic_info">
                <div class="logic_num">{{pin.num}}</div>
                <div class="logic_name">{{pin.name}}</div>
                <div class="logic_role">{{pin.role}}</div>
                <div class="logic_owner">{{pin.owner}}</div>
                <div class="logic_value">{{pin.value}}</div>
            </div>
            <div class="logic_control">
                <checkbox name="email_subscribe" id="email-check" className="another-class" value="1" label="Newsletter Sign Up" v-bind:inverted="false" v-model="s" v-bind:checked="s" v-bind:required="true" v-bind:true-value="true" v-bind:false-value="false"></checkbox>

            </div>

        </div>

</div>
</template>
<script>
const VueRange = require('../controls/VueRange.vue');
const Checkbox = require('../controls/Checkbox.vue');
const sockets = require('../../sockets.js');

module.exports = {

    methods: {
        updatePin: function (pin) {
            sockets.writeDutycycles(pin);
        },
        // booler: (val) => {(pin.value === 1) ? true:false},
    },
    components: {
        VueRange,
        Checkbox
    },
    mounted: function () {

    },
    data() {
        return {
        s: false,
        true: 1,
        false: 0
    }
    }
}
</script>
