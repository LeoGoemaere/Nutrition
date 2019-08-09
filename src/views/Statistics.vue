<template>
	<div class="space-x">
		<Chart class="chart" 
			:chartData="chartData"
			:options="options"
		/>
		<table class="table">
			<thead class="table__head">
				<tr>
					<th class="table__th"></th>
					<th class="table__th">Total</th>
				</tr>
			</thead>
			<tbody class="table__body">
				<tr 
					v-for="(nutriment, index) in nutriments"
					:key="nutriment.key"
					:style="`color: ${nutriment.color}`"
					:class="{'nutriment__calories-row': index === 0}"
				>
					<td class="table__td">{{ nutriment.name }}</td>
					<td class="u-ta-c table__td">
						<span v-if="index === 0">{{ roundValue(convertKilojouleToKilocalorie(nutriment.quantity)) }} kcal</span>
						<span v-else>{{ Math.round(getPercentageOfQuantity(nutriment)) }}%</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Chart from '@/components/Chart';

export default {
	name: "Statistics",
	components: { Chart },
	props: {
	},
	data: function() {
		return {
			nutriments: [
				{
					name: "Calories",
					color: null,
					quantity: 0
				},
				{
					name: "Proteins",
					color: '#A9E5BB',
					quantity: 0
				},
				{
					name: "Carbohydrates",
					color: '#FCAA67',
					quantity: 0
				},
				{
					name: "Fats",
					color: '#A09ABC',
					quantity: 0
				},
			],
			chartData: null,
			options: null
		}
	},
	mounted() {
		let totalOfFoodsInDaily = [];
		// TODO: Test when a meal in daily don't contained any foods.
		const totalFoodsOfDailyMeals = this.getDaily.meals.map(meal => meal.foods).reduce((accumulator, currentValue) => {
			accumulator.push(...currentValue);
			return accumulator;
		}, []);
		totalOfFoodsInDaily = [...totalFoodsOfDailyMeals, ...this.getDaily.foods];
		this.nutriments.forEach(nutriment => {
			nutriment.quantity = this.sumQuantityOf(totalOfFoodsInDaily, nutriment);
		})
		this.updateChartObject();
	},
	methods: {
		updateChartObject() {
			this.chartData = {
				labels: this.nutriments.filter(nutriment => nutriment.name !== 'Calories').map(nutriment => nutriment.name),
				datasets: [{
					data: this.nutriments.filter(nutriment => nutriment.name !== 'Calories').map(nutriment => nutriment.quantity),
					backgroundColor: this.nutriments.filter(nutriment => nutriment.name !== 'Calories').map(nutriment => nutriment.color),
					borderWidth: 1
				}]
			},
			this.options = {
				legend: { display: false },
				tooltips: {
					callbacks: {
						label: (tooltipItem, data) => {
							return `${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]} g`;
						}
					},
				},
				plugins: {
					labels: {
						render: 'labels',
						fontColor: '#fff',
						fontSize: 15,
					}
				}
			}
		},
		convertKilojouleToKilocalorie: function(kilojoule) {
			return kilojoule / 4.184;
		},
		getPercentageOfQuantity(nutriment) {
			const sumOfTotalQuantity = this.nutriments.filter(el => el.name !== 'Calories').map(el => el.quantity).reduce((accumulator, currentValue) => accumulator + currentValue);
			return nutriment.quantity > 0 ? (nutriment.quantity * 100) / sumOfTotalQuantity : 0;
		},
		sumQuantityOf(foods, nutriment) {
			// TODO: Cath the error when the API send a food without nutriments informations.
			if (foods.length === 0) { return 0 }
			switch(nutriment.name) {
				case 'Calories':
					return foods.map(food => this.calculNutrimentQuantity(food.datas.nutriments.energy_100g, food.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
					break;
				case 'Proteins':
					return foods.map(food => this.calculNutrimentQuantity(food.datas.nutriments.proteins_100g, food.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
					break;
				case 'Carbohydrates':
					return foods.map(food => this.calculNutrimentQuantity(food.datas.nutriments.carbohydrates_100g, food.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
					break;
				case 'Fats':
					return foods.map(food => this.calculNutrimentQuantity(food.datas.nutriments.fat_100g, food.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
					break;
			}
		},
		calculNutrimentQuantity(valueFor100g, quantity) {
			return (valueFor100g * quantity) / 100;
		},
		roundValue: function(value) {
			return Math.ceil(value * 10) / 10;
		},
	},
	computed: {
		...mapGetters([
			'getDaily'
		])
	}
};
</script>

