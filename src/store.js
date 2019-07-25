import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
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
	},
	getters: {
		getFavoriteFoods: (state) => {
			return state.favoriteFoods;
		},
		getMeals: (state) => {
			return state.meals;
		}
	},
	actions: {

	}
})
