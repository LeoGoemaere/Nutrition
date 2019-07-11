<template>
	<div class="foods">
		<div class="foods__heading space-x">
			<h1>My Foods</h1>
			<router-link to="/foods/add" class="add-button">+</router-link>
			<transition name="sliding-on-side">
				<router-view></router-view>
			</transition>
		</div>
		<FavoriteFoodsList />
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
