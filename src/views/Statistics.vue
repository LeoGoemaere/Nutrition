<template>
	<div class="space-x u-mt">
		<table class="table">
			<thead class="table__head">
				<tr>
					<th class="table__th"></th>
					<th class="table__th">Total</th>
				</tr>
			</thead>
			<tbody class="table__body">
				<tr>
					<td class="table__td">Calories</td>
					<td class="u-ta-c table__td">700kc</td>
				</tr>
				<tr>
					<td class="table__td">Proteins</td>
					<td class="u-ta-c table__td">40%</td>
				</tr>
				<tr>
					<td class="table__td">Carbs</td>
					<td class="u-ta-c table__td">40%</td>
				</tr>
				<tr>
					<td class="table__td">Fats</td>
					<td class="u-ta-c table__td">20%</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: "Statistics",
	components: {},
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

