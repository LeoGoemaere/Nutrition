<template>
	<div class="foods">
		<div class="heading space-x">
			<h1>My Foods</h1>
			<router-link to="/foods/add" class="add-button">+</router-link>
			<transition name="sliding-on-top">
				<router-view></router-view>
			</transition>
		</div>
		<FavoriteFoodsList :foods="getFavoriteFoods" tileType="grid" />
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

