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
            <FavoriteFoodsList />
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
			foodSelected: null
		}
	},
	mounted() {
		EventBus.$on('food-row:clicked', this.foodRowClickHandler);

		this.meals = JSON.parse(JSON.stringify(this.getMeals));
	},
	destroyed() {
		EventBus.$off('food-row:clicked', this.foodRowClickHandler);
	},
	methods: {
        backToMeals: function() {
			this.$router.push({ path: '/meals' });
		},
		foodRowClickHandler(datas) {
			this.foodSelected = datas.food;
			this.selectedFoodsForMeal({ element: datas.event.currentTarget });
		},
		selectedFoodsForMeal({ element }) {
			const isFoodAlreadyInMeal = this.meal.foods.some(element => element._id === this.foodSelected._id);
			if (!isFoodAlreadyInMeal) {
				this.meal.foods.push(this.foodSelected);
			} else {
				this.meal.foods = this.meal.foods.filter(element => !element._id === this.foodSelected._id);
			}
			element.classList.toggle('active');
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
