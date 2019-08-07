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
		},
		updateMeals(state, meals) {
			state.meals = meals;
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
