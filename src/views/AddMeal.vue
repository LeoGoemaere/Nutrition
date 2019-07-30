<template>
	<div class="push-layer">
        <div class="button-container space-x">
            <button class="back-button" @click="backToMeals"><i class="fas fa-chevron-left"></i></button>
	    <p>Create a new meal</p>
            <button @click="createMeal" class="ui-bar-button" :class="{ 'disabled': meal.name === '' || !meal.name }">Done</button>
        </div>
        <div class="addmeal">
            <label class="label space-x" for="">Name</label>
            <div class="input-container u-mt js-input-container" :class="toggleInputError">
		    <input class="input" v-model="meal.name" placeholder="Required" type="text">
	    </div>
        </div>
        <div class="u-mt">
            <FavoriteFoodsList :showQuantity="true" :foods="foods" />
        </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

import FavoriteFoodsList from '@/components/FavoriteFoodsList';

export default {
    name: "AddMeal",
    components: { FavoriteFoodsList },
	props: {
	},
	data: function() {
		return {
			meals: null,
			meal: {
				name: null,
				foods: []
			},
			foods: null
		}
	},
	mounted() {
		EventBus.$on('food-row:quantity-changed', this.foodRowQuantityChangeHandler);

		this.meals = JSON.parse(JSON.stringify(this.getMeals));
		this.foods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
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
			this.foods.find(el => el.food._id === food.food.food._id).isSelected = food.isSelected;
			this.foods.find(el => el.food._id === food.food.food._id).quantity = food.quantity;
		},
		selectedFoodsForMeal() {
			const foodsSelected = this.foods.filter(food => food.isSelected);
			this.meal.foods = [...foodsSelected];
		},
		createMeal() {
			const isMealNameFill = this.meal.name === null || this.meal.name === '';
			if (isMealNameFill) {
				this.addInputError();
				return;
			} else {
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
    .addmeal {
        margin-top: 25px;
    }
</style>
