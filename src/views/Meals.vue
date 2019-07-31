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
						<p class="nutriments__label">
							<i class="fas fa-fire-alt meal__recap-icon"></i>
							<!-- Display the calories by default -->
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(convertKilojouleToKilocalorie(calculNutrimentDatas(food, meal, nutriment.calories))))[0] }}</span>
						</p>
						<p class="nutriments__label">
							<i class="fas fa-drumstick-bite meal__recap-icon"></i>
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(calculNutrimentDatas(food, meal, nutriment.proteins)))[0] }}</span>
						</p>
						<p class="nutriments__label">
							<i class="fas fa-bread-slice meal__recap-icon"></i>
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(calculNutrimentDatas(food, meal, nutriment.carbs)))[0] }}</span>
						</p>
						<p class="nutriments__label">
							<i class="fas fa-fish meal__recap-icon"></i>
							<span class="meal__datas">{{ meal.foods.map(food => roundValue(calculNutrimentDatas(food, meal, nutriment.fat)))[0] }}</span>
						</p>
					</div>
					<div 
						v-for="food in meal.foods"
						:key="food.key"
						class="foods__row"
					>
						<img class="foods__image" :src="food.datas.image_url" alt="">
						<div class="foods__name">{{food.datas.product_name}}</div>
						<div class="u-mr u-ml">
							<i class="far fa-question-circle"></i>
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

	.nutriments__label {
		display: inline-block;
		text-align: center;
	}

	.meal__list {
		margin-top: 25px;
	}

	.meal__recap {
		display: flex;
		justify-content: space-evenly;
		padding: 10px 0;
		background-color: #fff;
		color: #535c68;
		margin-bottom: 5px;
		border-radius: 3px;
		font-size: 13px;
	}

	.meal__recap-icon {
		margin-right: 5px;
	}

	.meal__row {
		+.meal__row {
			border-top: 1px solid #d7d7d7;
		}
	}
	.meal__row--active {
		background-color: #f5f5f5;
		padding-bottom: 15px;
	}
	.meal__title {
		display: flex;
		padding: 15px 0;
		font-size: 20px;
		align-items: center;
		&::before {
			content: "";
			display: block;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background-color: #535c68;
			margin-right: 10px;
		}
	}

	.meal__details {
		padding: 0 10px;
		border-left: 1px solid #d7d7d7;
		display: none;
		.meal__row--active & {
			display: block;
		}
	}

	.meal__edit-container {
		margin-left: auto;
		display: flex;
		align-items: center;
		align-self: stretch;
	}

	.icon-chevron {
		.meal__row--active & {
			transform: rotate(180deg);
		}
	}
</style>