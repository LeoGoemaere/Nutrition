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
			this.commit('updateMeals', state.meals);			
		},
		updateMeals(state, meals) {
			state.meals = meals;
			// Update the meals in case a food contained in it has been updated.
			state.meals.forEach(el => {
				el.foods = el.foods.filter(e => state.favoriteFoods.map(food => food.datas._id).includes(e.datas._id));
			})
			this.commit('updateDaily', state.daily);
		},
		updateDaily(state, daily) {
			state.daily = daily;
			// Update the entire daily in case a food or meal contained in the daily has been updated.
			// Update the daily foods with the favorite foods list.
			state.daily.foods = state.daily.foods.filter(el => state.favoriteFoods.map(e => e.datas._id).includes(el.datas._id));
			// Replace the daily foods datas by the updated favorite foods datas.
			state.daily.foods.forEach((el) => {
				el.datas = state.favoriteFoods.find(e => e.datas._id === el.datas._id).datas;
			});
			// Replace the daily meals by the correct updated meals.
			state.daily.meals = state.daily.meals.map(meal => state.meals.find(el => state.daily.meals.map(e => e.id).includes(el.id)));
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
