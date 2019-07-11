<template>
	<div>
		<div  v-if="getFavoriteFoods.length > 0" class="search__content u-mb">
			<div class="search__inner">
				<input class="search__input" type="text" placeholder="Or search for food..">
				<button class="search__button">
					<i class="fas fa-search"></i>
				</button>
			</div>
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

export default {
	name: "FavoriteFoodsList",
	props: {
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
