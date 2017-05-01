<script>
import {
    Line,
    mixins
} from 'vue-chartjs'

export default Line.extend({
    mixins: [mixins.reactiveProp],
    props: ["chartData", "options"],


    mounted() {
        if (this.data) {
            this.renderChart(this.chartData, {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                //Boolean - If we want to override with a hard coded scale
                scaleOverride: true,
                //** Required if scaleOverride is true **
                //Number - The number of steps in a hard coded scale
                scaleSteps: 20,
                //Number - The value jump in the hard coded scale
                scaleStepWidth: 10,
                //Number - The scale starting value
                scaleStartValue: 0
            });

        }
    },
    watch: {
        chartData: function() {
            // this._chart.destroy()
            // this.renderChart(this.data, this.options)
            this._chart.update()
        }
    }


});
</script>
