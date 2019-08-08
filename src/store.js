import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		daily: {
			meals: [],
			foods: []
		},
		favoriteFoods: [],
		meals: []
	},
	mutations: {
		updateMyFoods(state, foods) {
			state.favoriteFoods = foods;
			// Update the daily object
			state.daily.foods = state.daily.foods.filter(el => foods.map(e => e.datas._id).includes(el.datas._id));
			// When foods is updated, reassign the new food datas in the daily object.
			state.daily.foods.forEach((el) => {
				el.datas = foods.find(e => e.datas._id === el.datas._id).datas;
			});
			this.commit('updateMeals', state.meals);			
		},
		updateMeals(state, meals) {
			state.meals = meals;
			state.meals.forEach(el => {
				el.foods = el.foods.filter(e => state.favoriteFoods.map(food => food.datas._id).includes(e.datas._id));
			})
			// const dailyMealIds = state.daily.meals.map(el => el.id);
			// state.daily.meals = meals.filter(el => dailyMealIds.includes.includes(el.id));
		},
		updateDaily(state, daily) {
			state.daily = daily;
		}
	},
	getters: {
		getFavoriteFoods: (state) => {
			return state.favoriteFoods;
		},
		getMeals: (state) => {
			return state.meals;
		},
		getDaily: (state) => {
			return state.daily;
		}
	},
	actions: {

	}
})
