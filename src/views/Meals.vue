<template>
	<div class="meals">
		<div class="heading space-x">
			<h1>Meals</h1>
			<router-link to="/meals/add" class="add-button add-button--fill">+</router-link>
		</div>
		<transition name="sliding-on-top">
			<router-view></router-view>
		</transition>
		<div v-if="getMeals.length > 0" class="meal__list">
			<div
				v-for="meal in getMeals"
				:key="meal.key"
				class="accordion__row js-accordion-row space-x"
			>
				<div @click="toggleAccordion($event)" class="accordion__title">
					<p>{{meal.name}}</p>
					<div class="accordion__edit-container">
						<router-link :to="{ name: 'edit', params: { id: meal.id } }" class="ui-bar-button js-ui-bar-button u-mr">Edit</router-link>
						<i class="fas fa-chevron-down icon-chevron"></i>
					</div>
				</div>
				<div class="accordion__details">
					<div class="meal__recap">
						<p>
							<i class="fas fa-fire-alt meal__recap-icon"></i>
							<!-- Display the calories by default -->
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(convertKilojouleToKilocalorie(calculNutrimentDatas(food, meal, nutriment.calories))))[0] }}</span>
						</p>
						<p>
							<i class="fas fa-drumstick-bite meal__recap-icon"></i>
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(calculNutrimentDatas(food, meal, nutriment.proteins)))[0] }}</span>
						</p>
						<p>
							<i class="fas fa-bread-slice meal__recap-icon"></i>
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(calculNutrimentDatas(food, meal, nutriment.carbs)))[0] }}</span>
						</p>
						<p>
							<i class="fas fa-fish meal__recap-icon"></i>
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(calculNutrimentDatas(food, meal, nutriment.fat)))[0] }}</span>
						</p>
					</div>
					<Tile 
						v-for="food in meal.foods"
						:key="food.key"
						:food="food"
						:showQuantity="true"
						type="slim"
						view="meals"
					/>
				</div>
			</div>
		</div>
		<EmptyView v-else view="meals" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Tile from '@/components/tile/Tile';
import EmptyView from '@/components/EmptyView';

export default {
	name: 'meals',
	components: { Tile, EmptyView },
	data: function() {
		return {
			nutriment: {
				calories: 'energy_100g',
				proteins: 'proteins_100g',
				carbs: 'carbohydrates_100g',
				fat: 'fat_100g'
			}
		}
	},
	methods: {
		convertKilojouleToKilocalorie: function(kilojoule) {
			return kilojoule / 4.184;
		},
		roundValue: function(value) {
			return Math.ceil(value * 10) / 10;
		},
		toggleAccordion: function(e) {
			if (e.target.classList.contains('js-ui-bar-button')) return;
			e.currentTarget.closest('.js-accordion-row').classList.toggle('accordion__row--active');
		},
		calculNutrimentDatas: function(food, meal, nutriment) {
			const nutrimentsQuantity = meal.foods.map(food => food.datas.nutriments[nutriment]).reduce((accumulator, currentValue) => parseFloat(accumulator, 10) + parseFloat(currentValue, 10), 0);
			return food.quantity * nutrimentsQuantity / 100;
		},
	},
	computed: {
		...mapGetters([
			'getMeals',
		])
	}
}
</script>

<style scoped lang="scss">

	// Import meal view styles.
	@import '../styles/views/meals';

</style>