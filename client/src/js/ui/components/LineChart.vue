<script>
import {
    Line,
    mixins
} from 'vue-chartjs'
export default Line.extend({
    mixins: [mixins.reactiveData],
    props: ["options"],
    data() {
        return {
            chartData: {
                labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', ],
                datasets: [{
                        label: 'Oś X',
                        borderColor: '#e67e22',
                        pointBackgroundColor: '#e67e22',
                        borderWidth: 1,
                        pointBorderColor: '#e67e22',
                        backgroundColor: 'transparent',
                        data: this.$root.$data.vehicle.accel.x
                    },
                    {
                        label: 'Oś Y',
                        borderColor: 'green',
                        pointBackgroundColor: 'green',
                        borderWidth: 1,
                        pointBorderColor: 'green',
                        backgroundColor: 'transparent',
                        data: this.$root.$data.vehicle.accel.y
                    },
                    {
                        label: 'Oś Z',
                        borderColor: 'purple',
                        pointBackgroundColor: 'purple',
                        borderWidth: 1,
                        pointBorderColor: 'purple',
                        backgroundColor: 'transparent',
                        data: this.$root.$data.vehicle.accel.z
                    }
                ],

            },

        }
    },


    mounted() {
        // if (this.chartData) {
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
            scaleStepWidth: 20,
            //Number - The scale starting value
            scaleStartValue: 0
        });

        // }
        var self = this;
        self.set = setInterval(function() {
            self._chart.update()
        }, 500);
    },
    // watch: {
    //     chartData: function() {
    //         this._chart.destroy()
    //         this.renderChart(this.data, this.options)
    //         this._chart.update()
    //     }
    // }


});
</script>
