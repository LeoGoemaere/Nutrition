<script>
import { mapGetters } from 'vuex';
import { Pie, mixins } from 'vue-chartjs';
import { ChartModule } from 'chartjs-plugin-labels';
const { reactiveProp } = mixins

export default {
	extends: Pie,
	mixins: [reactiveProp],
	name: "Chart",
	components: { },
	props: {
		chartData: Object,
		options: Object
	},
	mounted() {
		this.renderChart(this.chartData, this.options)
	}
};
</script>

