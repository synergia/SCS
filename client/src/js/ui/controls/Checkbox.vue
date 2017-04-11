<template>
    <label class="switch">
        <input :class="classes" type="checkbox" :checked="checked" :name="name" :disabled="disabled" v-model="value" v-bind:true-value="1"
  v-bind:false-value="0">
        <span><slot></slot></span>
    </label>
</template>

<script>
    module.exports = {
        props: {
            disabled: Boolean,
            classes: String,
            checked: Boolean,
            name: String,
        },
        data() {
            return {
                value: null
            }
        },
        beforeMount() {
            // this.value = (this.checked === true) ? "1" : "0";
            this.value = 0;
        },
        mounted() {
            this.$emit('input', this.value = !!this.checked)
        },
        watch: {
            value(val) {
                this.$emit('input', val)
            }
        }
    }
</script>
