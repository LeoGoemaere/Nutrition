<template>
	<div class="foods">
		<div class="heading space-x u-sticky-top">
			<h1>My Foods</h1>
			<router-link to="/foods/add" class="add-button">+</router-link>
			<transition name="sliding-on-top">
				<router-view></router-view>
			</transition>
		</div>
		<FavoriteFoodsList v-if="getFavoriteFoods.length > 0" :foods="getFavoriteFoods" tileType="grid" view="foods" />
		<EmptyView v-else view="foods" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoriteFoodsList from '@/components/FavoriteFoodsList';
import EmptyView from '@/components/EmptyView';

export default {
	name: 'Foods',
	components: { FavoriteFoodsList, EmptyView },
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
}
</script>

