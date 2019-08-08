<template>
	<div>
		<p class="u-mt space-x heading">
			<span>What have you eat today ?</span>
			<router-link :to="{ name: 'addOverview' }" class="add-button add-button--fill">+</router-link>
		</p>
		<div v-if="getDaily.meals.length > 0" class="space-x u-mt">
			<p class="label">Meals</p>
			<TileMeal
				v-for="meal in arrOfReduceMeals"
				:key="meal.key"
				:meal="meal"
				:serving="calculServing(meal)"
			/>
		</div>
		<div v-if="getDaily.foods.length > 0" class="space-x u-mt">
			<p class="label">Foods</p>
			<Tile 
				v-for="food in getDaily.foods"
				:key="food.key"
				:food="food"
				:showQuantity="true"
				type="slim"
			/>
		</div>
		<transition name="sliding-on-top">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import TileMeal from '@/components/tile/Tile-meal';
import Tile from '@/components/tile/Tile';

export default {
	name: "AddDaily",
	components: { Tile, TileMeal },
	props: {
	},
	methods: {
		calculServing(meal) {
			return this.getDaily.meals.filter(el => el.id === meal.id).length;
		},
		updateSelectedMeals(meal) {
			const mealName = this.getMeals.find(el => el.id === meal.id).name;
			meal.name = mealName;
		}
	},
	computed: {
		arrOfReduceMeals() {
			return this.getDaily.meals.reduce((accumulator, currentValue) => {
				const isCurrentValueExistInAccumulator = accumulator.some(el => el.id === currentValue.id);
				if (!isCurrentValueExistInAccumulator) {
					accumulator.push(currentValue);
				}
				return accumulator;
			}, [])
		},
		...mapGetters([
			'getMeals',
			'getFavoriteFoods',
			'getDaily'
		])
	}
};
</script>

