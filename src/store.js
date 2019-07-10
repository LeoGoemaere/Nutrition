import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		favoriteFoods: []
	},
	mutations: {
		updateMyFoods(state, foods) {
			state.favoriteFoods = foods;
		}
	},
	getters: {
		getFavoriteFoods: (state) => {
			return state.favoriteFoods;
		} 
	},
	actions: {

	}
})
