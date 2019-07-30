<template>
	<div class="foods">
		<div class="heading space-x">
			<h1>My Foods</h1>
			<router-link to="/foods/add" class="add-button">+</router-link>
			<transition name="sliding-on-top">
				<router-view></router-view>
			</transition>
		</div>
		<FavoriteFoodsList :foods="getFavoriteFoods" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoriteFoodsList from '@/components/FavoriteFoodsList';

export default {
	name: 'Foods',
	components: { FavoriteFoodsList },
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
}
</script>

<style lang="scss">

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
