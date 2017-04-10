

<template>
<div class="custom-checkbox" v-bind:class="{ inverted: inverted }">
    <label v-bind:for="id"><input type="checkbox" v-bind:name="name" v-bind:class="className" v-bind:id="id" v-bind:value="value" v-bind:checked="checked" v-bind:required="required" v-on:change="updateInput" v-bind:true-value="1" v-bind:false-value="0">{{ label }} </label></div>
</template>
<script>
module.exports = {
    props: {
        name: {
            type: String,
            required: false
        },
        className: {
            type: String,
            required: false
        },
        id: {
            type: String,
            required: false
        },
        value: {
            type: Boolean,
            required: false
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        checked: {
            type: Boolean,
            required: false,
            default: false
        },
        label: {
            type: String,
            required: true
        },
        inverted: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    methods: {
        updateInput: function(event) {
            this.$emit('input', event.target.checked);
        }
    },
}
</script>
