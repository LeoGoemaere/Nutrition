<template>
	<div class="space-x">
		<Chart class="chart" />
		<table class="table">
			<thead class="table__head">
				<tr>
					<th class="table__th"></th>
					<th class="table__th">Total</th>
				</tr>
			</thead>
			<tbody class="table__body">
				<tr class="nutriment__calories-row">
					<td class="table__td">Calories</td>
					<td class="u-ta-c table__td nutriment__value">700kc</td>
				</tr>
				<tr class="nutriment__prots-row">
					<td class="table__td nutriment__label nutriment__label--prots">Proteins</td>
					<td class="u-ta-c table__td nutriment__value">40%</td>
				</tr>
				<tr class="nutriment__carbs-row">
					<td class="table__td nutriment__label nutriment__label--carbs">Carbs</td>
					<td class="u-ta-c table__td nutriment__value">40%</td>
				</tr>
				<tr class="nutriment__fats-row">
					<td class="table__td nutriment__label nutriment__label--fats">Fats</td>
					<td class="u-ta-c table__td nutriment__value">20%</td>
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
	methods: {
	},
	computed: {
		...mapGetters([
			'getDaily'
		])
	}
};
</script>

