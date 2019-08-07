<template>
	<div>
		<p class="u-mt space-x heading">
			<span>What have you eat today ?</span>
			<router-link :to="{ name: 'addOverview' }" class="add-button add-button--fill">+</router-link>
		</p>
		<div v-if="filteredOnDailyMeals.length > 0" class="space-x u-mt">
			<p class="label">Meals</p>
			<TileMeal
				v-for="meal in filteredOnDailyMeals"
				:key="meal.key"
				:meal="meal"
				:serving="meal.serving"
			/>
		</div>
		<div v-if="filteredOnDailyFoods.length > 0" class="space-x u-mt">
			<p class="label">Foods</p>
			<Tile 
				v-for="food in filteredOnDailyFoods"
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
	data: function() {
		return {
			daily: null
		}
	},
	mounted() {
		this.daily = JSON.parse(JSON.stringify(this.getDaily));
		this.getDaily.meals.forEach(meal => this.updateSelectedMeals(meal));
		this.getDaily.foods.forEach(food => this.updateSelectedFoods(food));
	},
	methods: {
		updateSelectedMeals(meal) {
			const mealName = this.getMeals.find(el => el.id === meal.id).name;
			meal.name = mealName;
		},
		updateSelectedFoods(food) {
			const isFoodExistFavorite = this.getFavoriteFoods.some(el => el.datas._id === food.datas._id);
			if (!isFoodExistFavorite) {
				this.daily.foods = this.daily.foods.filter(el => el.datas._id !== food.datas._id);
				this.$store.commit('updateDaily', this.daily);
			}
		},
	},
	computed: {
		filteredOnDailyMeals() {
			return this.getDaily.meals.filter(meal => meal.isInDaily);
		},
		filteredOnDailyFoods() {
			return this.getDaily.foods.filter(food => food.isInDaily);
		},
		...mapGetters([
			'getMeals',
			'getFavoriteFoods',
			'getDaily'
		])
	}
};
</script>

