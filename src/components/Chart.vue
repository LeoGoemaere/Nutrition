<script>
import { mapGetters } from 'vuex';
import { Pie } from 'vue-chartjs';
import { ChartModule } from 'chartjs-plugin-labels'

export default {
	extends: Pie,
	name: "Chart",
	components: { },
	props: {
	},
	mounted() {
		this.renderChart(this.data, this.options)
	},
	data: function() {
		return {
			data: {
				labels: ['Carbs', 'Proteïns', 'Fats'],
				datasets: [{
					label: '# of Votes',
					data: [5, 10, 15],
					backgroundColor: [
						'#FCAA67',	// Carbs
						'#A9E5BB',	// Proteins
						'#A09ABC',	// Fats
					],
					borderColor: [
					],
					borderWidth: 1
				}]
			},
			options: {
				legend: {
					display: false
				},
				plugins: {
					labels: {
						render: 'labels',
						fontColor: '#fff',
						fontSize: 15,
					}
				}
			}
		}
	},
	methods: {
	},
	computed: {
	}
};
</script>

