<template>
	<div class="push-layer">
        <div class="button-container space-x">
            <button class="back-button" @click="backToMeals"><i class="fas fa-chevron-left"></i></button>
            <button @click="createMeal" class="ui-bar-button" :class="{ 'disabled': meal.name === '' || !meal.name }">Done</button>
        </div>
        <div class="addmeal">
            <label class="label space-x" for="">Meal's name</label>
            <input class="input u-mt js-input-name" v-model="meal.name" placeholder="name" type="text">
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
			const inputElement = document.querySelector('.js-input-name');
			if (isMealNameFill) {
				inputElement.classList.add('error');
				return;
			}
			this.meals.push(this.meal);
			this.$store.commit('updateMeals', this.meals);
			this.$router.push({ path: '/meals' });
		}
	},
	computed: {
		...mapGetters([
			'getMeals',
		])
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .addmeal {
        margin-top: 25px;
    }
</style>
