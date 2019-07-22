import Vue from 'vue'
import Router from 'vue-router'
import Foods from './views/Foods.vue'
import Meals from './views/Meals.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Profile
		},
		{
			path: '/meals',
			name: 'meals',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/Meals.vue')
		},
		{
			path: '/foods',
			name: 'foods',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/Foods.vue'),
			children: [
				{
					path: 'Add',
					name: 'add',
					component: () => import(/* webpackChunkName: "about" */ './views/AddFoods.vue')
				},
			]
		},
		{
			path: '/foods/details/:id',
			name: 'details',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ './views/FoodDetails.vue')
		}
	]
})
