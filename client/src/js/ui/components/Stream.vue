<template>
<div class="stream">
    <img id="stream" class="stream_img" src="http://10.42.0.251:4000/?action=stream"></img>
    <div class="stream_noSignal">No signal</div>
</div>
</template>
<script>
module.exports = {

    methods: {

    },
    components: {

    },
    mounted: function() {
        let stream = document.getElementById('stream');
        stream.onerror = function (e) {
            stream.classList.add('stream-hide');
        }
    },
    data() {
        return {

        }
    }
}
</script>
