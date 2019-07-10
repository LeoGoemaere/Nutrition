<template>
	<div class="foods">
		<div class="foods__heading space-x">
			<h1>My Foods</h1>
			<AddFoods />
		</div>
		<div class="foods__row" 
			 v-for="food in getFavoriteFoods"
			 :key="food.key"
		>
			<img class="foods__image" :src="food.image_url" alt="">
			<div class="foods__name">{{food.product_name}}</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import AddFoods from '@/components/AddFoods.vue'

export default {
	name: 'Foods',
	components: {
		AddFoods
	},
	data: function() {
		return {
			favoriteFoods: null
		}
	},
	mounted() {
		// Create a deep copy
		// this.favoriteFoods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
}
</script>

<style lang="scss">

	.foods {
		padding-bottom: 50px;
	}
	.foods__heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.foods__row {
		display: flex;
		align-items: center;
		box-shadow: 0px 1px 4px -2px;
    		border-radius: 5px;
		width: 100%;
		background-color: #fff;
		+ .foods__row {
			margin-top: 5px;
		}
	}
	.foods__image {
		width: 75px;
		height: 75px;
		object-fit: cover;
		box-shadow: 1px 0 2px 0px #b3b1b1;
	}
	.foods__name {
		padding-left: 10px;
		flex: 1;
	}

</style>
