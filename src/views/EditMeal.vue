<template>
	<div class="push-layer">
		<div class="button-container space-x u-sticky-top">
			<button class="back-button" @click="backToMeals"><i class="fas fa-chevron-left"></i></button>
			<p v-if="!meal.name">Meal</p>
			<p v-else>{{meal.name}}</p>
			<button @click="createMeal" class="ui-bar-button" :class="{ 'disabled': meal.name === '' || !meal.name }">
				<span v-if="id">Done</span>
				<span v-else>Create</span>
			</button>
		</div>
		<div class="meal__name">
			<label class="label space-x" for="">Name</label>
			<div class="input-container u-mt js-input-container" :class="toggleInputError">
				<input class="input" v-model="meal.name" placeholder="Required" type="text">
			</div>
		</div>
		<div class="u-mt">
			<FavoriteFoodsList v-if="foods.length > 0" :foods="foods" :editQuantity="true" tileType="grid" />
			<EmptyView v-else view="foods" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';
import uuid from 'uuid/v4';

import FavoriteFoodsList from '@/components/FavoriteFoodsList';
import EmptyView from '@/components/EmptyView';

export default {
    name: "AddMeal",
    components: { FavoriteFoodsList, EmptyView },
	props: {
		id: String
	},
	data: function() {
		return {
			meals: null,
			meal: {
				id: null,
				name: null,
				foods: [],
			},
			foods: []
		}
	},
	mounted() {
		EventBus.$on('food-row:quantity-changed', this.foodRowQuantityChangeHandler);
		this.meals = JSON.parse(JSON.stringify(this.getMeals));
		this.foods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
		if (this.id) {
			// Update foods inside an existing meal if user is editing.
			const meal = this.meals.find(meal => meal.id === this.id);
			this.meal = { ...meal };
			this.meal.foods.forEach(food => this.updateFood(food));
		}
	},
	destroyed() {
		EventBus.$off('food-row:quantity-changed', this.foodRowQuantityChangeHandler);
	},
	methods: {
        	backToMeals: function() {
			this.$router.push({ path: '/meals' });
		},
		foodRowQuantityChangeHandler(food) {
			this.updateFood(food);
			this.selectedFoodsForMeal();
		},
		updateFood(food) {
			// pass the food to selected state.
			this.foods.find(el => el.datas._id === food.datas._id).isSelected = food.isSelected;
			this.foods.find(el => el.datas._id === food.datas._id).quantity = food.quantity;
		},
		selectedFoodsForMeal() {
			const foodsSelected = this.foods.filter(food => food.quantity > 0);
			this.meal.foods = [...foodsSelected];
		},
		createMeal() {
			const isMealNameFill = this.meal.name === null || this.meal.name === '';
			const isEditing = typeof this.id !== 'undefined';
			if (isMealNameFill) {
				this.addInputError();
				return;
			} else if (isEditing) {
				const indexOfMeal = this.meals.findIndex(el => el.id === this.id);
				this.meals[indexOfMeal] = this.meal;
				this.$store.commit('updateMeals', this.meals);
				this.$router.push({ path: '/meals' });
			} else {
				// Generate id when create meal.
				this.meal.id = uuid();
				this.meals.push(this.meal);
				this.$store.commit('updateMeals', this.meals);
				this.$router.push({ path: '/meals' });
			}
		},
		addInputError() {
			// Reset the meal name to trigger the computed toggleInput method.
			this.meal.name = '';
		}
	},
	computed: {
		...mapGetters([
			'getMeals',
			'getFavoriteFoods'
		]),
		toggleInputError() {
			return 	{ 'error': this.meal.name === '' }
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

	// Import meal view styles.
	@import '../styles/views/meals';

</style>
