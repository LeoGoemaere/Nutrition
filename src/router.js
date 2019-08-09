import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: { name: 'daily' },
		},
		{
			path: '/daily',
			name: 'daily',
			redirect: { name: 'overview' },
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/Daily.vue'),
			children: [
				{
					path: 'overview',
					name: 'overview',
					component: () => import(/* webpackChunkName: "about" */ './views/Overview.vue'),
					children: [
						{
							path: 'add',
							name: 'addOverview',
							component: () => import(/* webpackChunkName: "about" */ './views/AddOverview.vue')
						}
					]
				},
				{
					path: 'statistics',
					name: 'statistics',
					component: () => import(/* webpackChunkName: "about" */ './views/Statistics.vue')
				},
			]
		},
		{
			path: '/meals',
			name: 'meals',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/Meals.vue'),
			children: [
				{
					path: 'add',
					name: 'add',
					component: () => import(/* webpackChunkName: "about" */ './views/EditMeal.vue')
				},
				{
					path: 'edit/:id',
					name: 'edit',
					props: true,
					component: () => import(/* webpackChunkName: "about" */ './views/EditMeal.vue')
				},
			]
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
			// path: '/details/:view/:id',
			path: '/:view/:id',
			name: 'details',
			props: true,
			component: () => import(/* webpackChunkName: "about" */ './views/FoodDetails.vue')
		}
	]
})
