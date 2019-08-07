<template>
	<div class="push-layer">
		<div class="button-container space-x u-sticky-top">
			<button class="back-button" @click="backToOverview"><i class="fas fa-chevron-left"></i></button>
			<button @click="addToDaily" class="ui-bar-button">
				<span>Add to daily</span>
			</button>
		</div>
		<p class="u-mt u-mb u-ta-c">What have you eat today ?</p>
		<div class="accordion__row js-accordion-row space-x">
			<div @click="toggleAccordion($event)" class="accordion__title">
				<p>Meals</p>
				<div class="accordion__edit-container">
					<i class="fas fa-chevron-down icon-chevron"></i>
				</div>
			</div>
			<div class="accordion__details" v-if="getMeals.length > 0">

				<TileMeal
					v-for="meal in meals"
					:key="meal.key"
					:meal="meal"
					:editQuantity="true"
					:serving="meal.serving"
					:isSelected="meal.serving > 0"
				/>
			</div>
			<div v-else class="accordion__details">
				<EmptyView view="meals" />
			</div>
		</div>

		<div class="accordion__row js-accordion-row space-x">
			<div @click="toggleAccordion($event)" class="accordion__title">
				<p>Foods</p>
				<div class="accordion__edit-container">
					<i class="fas fa-chevron-down icon-chevron"></i>
				</div>
			</div>
			<div class="accordion__details">
				<FavoriteFoodsList v-if="getFavoriteFoods.length > 0" :foods="foods" :editQuantity="true" tileType="slim" />
				<EmptyView v-else view="foods" />
			</div>
		</div>
		

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

import FavoriteFoodsList from '@/components/FavoriteFoodsList';
import TileMeal from '@/components/tile/Tile-meal';
import EmptyView from '@/components/EmptyView';

export default {
	name: "AddDaily",
	components: { FavoriteFoodsList, TileMeal, EmptyView },
	props: {
	},
	data: function() {
		return {
			daily: {
				foods: [],
				meals: []
			},
			meals: null,
			foods: null
		}
	},
	mounted() {
		EventBus.$on('tile-meal:serving-changed', this.servingMealChangedHandler);
		EventBus.$on('food-row:quantity-changed', this.foodRowQuantityChangedHandler);
		this.daily = JSON.parse(JSON.stringify(this.getDaily));
		this.meals = JSON.parse(JSON.stringify(this.getMeals));
		this.foods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
		this.daily.meals.forEach(meal => this.updateSelectedMeals(meal));
		this.daily.foods.forEach(food => this.updateSelectedFoods(food));
	},
	destroyed() {
		EventBus.$off('tile-meal:serving-changed', this.servingMealChangedHandler);
		EventBus.$off('food-row:quantity-changed', this.foodRowQuantityChangedHandler);
	},
	methods: {
		foodRowQuantityChangedHandler: function(food) {
			this.selectedFoodsForDaily(food);
		},
		servingMealChangedHandler: function(data) {
			this.selectedMealsForDaily(data);
		},
		selectedMealsForDaily: function(data) {
			this.meals.find(meal => meal.id === data.meal.id).serving = data.serving;
			this.meals.find(meal => meal.id === data.meal.id).isInDaily = data.serving > 0;
		},
		selectedFoodsForDaily: function(food) {
			this.foods.find(el => el.datas._id === food.datas._id).isSelected = food.isSelected;
			this.foods.find(el => el.datas._id === food.datas._id).quantity = food.quantity;
			this.foods.find(el => el.datas._id === food.datas._id).isInDaily = food.isSelected;
		},
		updateSelectedMeals(meal) {
			this.meals.find(el => el.id === meal.id).serving = meal.serving;
			this.meals.find(el => el.id === meal.id).isInDaily = meal.isInDaily;
		},
		updateSelectedFoods(food) {
			const isFoodExistFavorite = this.foods.some(el => el.datas._id === food.datas._id);
			if (isFoodExistFavorite) {
				this.foods.find(el => el.datas._id === food.datas._id).quantity = food.quantity;
				this.foods.find(el => el.datas._id === food.datas._id).isSelected = food.isSelected;
				this.foods.find(el => el.datas._id === food.datas._id).isInDaily = food.isInDaily;
			} else {
				this.daily.foods = this.daily.foods.filter(el => el.datas._id !== food.datas._id);
			}
		},
		addToDaily: function() {
			this.daily.foods = this.foods.filter(food => food.isSelected);
			this.daily.meals = this.meals.filter(meal => meal.serving > 0);
			this.$store.commit('updateDaily', this.daily);
			this.$router.push({ path: '/daily/overview' });
		},
		backToOverview: function() {
			this.$router.push({ path: '/daily/overview' });
		},
		toggleAccordion: function(e) {
			if (e.target.classList.contains('js-ui-bar-button')) return;
			e.currentTarget.closest('.js-accordion-row').classList.toggle('accordion__row--active');
		},
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
			'getMeals',
			'getDaily'
		])
	}
};
</script>

