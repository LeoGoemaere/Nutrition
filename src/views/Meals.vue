<template>
	<div class="meals">
		<div class="heading space-x">
			<h1>My Meals</h1>
			<router-link to="/meals/add" class="add-button">+</router-link>
			<transition name="sliding-on-top">
				<router-view></router-view>
			</transition>
		</div>
		<div class="meal__list">
			<div
				v-for="meal in getMeals"
				:key="meal.key"
				class="meal__row js-meal-row space-x"
			>
				<div @click="toggleAccordion($event)" class="meal__title">
					<p>{{meal.name}}</p>
					<div class="meal__edit-container">
						<router-link :to="{ name: 'edit', params: { id: meal.id } }" class="ui-bar-button js-ui-bar-button u-mr">Edit</router-link>
						<i class="fas fa-chevron-down icon-chevron"></i>
					</div>
				</div>
				<div class="meal__details">
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
					<div 
						v-for="food in meal.foods"
						:key="food.key"
						class="tile"
					>
						<img class="tile__image" :src="food.datas.image_url" alt="">
						<div class="tile__name">{{food.datas.product_name}}</div>
						<div class="tile__quantity">
							<span class="tile__quantity-copy">{{food.quantity}} g</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'meals',
	components: {
	},
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
			e.currentTarget.closest('.js-meal-row').classList.toggle('meal__row--active');
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