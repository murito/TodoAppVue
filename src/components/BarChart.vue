<script>
import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
    name: 'barChart',

    data: () => ({

    }),

    extends: Bar,
    
    mixins: [reactiveProp],

    props: ['options'],

    mounted () {
        this.renderChart(this.chartdata, this.options)
    }
}
</script>