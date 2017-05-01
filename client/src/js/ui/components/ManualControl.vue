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
            <slider ref="slider1" v-model="pin.value" :max="pin.max" :min="pin.min" :interval="interval" :tooltip="false" :dot-size="dSize" @callback="updatePin(pin)" :bg-style="bgStyle" :process-style="processStyle" :height="height" :slider-style="sliderStyle" event-type="touch"></slider>

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
            <slider ref="slider1" v-model="pin.value" :max="pin.max" :min="pin.min" :interval="interval" :tooltip="false" :dot-size="dSize" @callback="updatePin(pin)" :bg-style="bgStyle" :process-style="processStyle" :height="height" :slider-style="sliderStyle" event-type="touch"></slider>
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
            <input type="checkbox" v-model="pin.value" @click="updatePin(pin)" v-bind:true-value="1" v-bind:false-value="0" />
        </div>
    </div>
    <div class="chart" >
        <line-chart :chartData="chartData"></line-chart>
    </div>

</div>
</template>
<script>
const Slider = require('vue-slider-component');
const LineChart = require('./LineChart.vue');
const sockets = require('../../sockets.js');

module.exports = {
    props: ["chdata"],

    methods: {
        updatePin: function(pin) {
            sockets.writeDutycycles(pin);
        },
    },
    components: {
        Slider,
        LineChart
    },
    mounted: function() {

    },
    data() {
        return {
            height: 2,
            dSize: 24,
            interval: 1,
            bgStyle: {
                "backgroundColor": "rgba(255,255,255,.2)",
            },
            sliderStyle: {
                "backgroundColor": "#e67e22"
            },
            processStyle: {
                "backgroundColor": "#e67e22"
            },
            chartData: {
                labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                datasets: [{
                    label: 'Data One',
                    borderColor: '#e67e22',
                    pointBackgroundColor: '#e67e22',
                    borderWidth: 1,
                    pointBorderColor: '#e67e22',
                    backgroundColor: 'transparent',
                    data: this.chdata
                }]
            },
        }
    },

}
</script>
<style>
.chart {
    margin: 0 auto;
}
</style>
