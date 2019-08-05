<template>
	<div class="push-layer">
		<div class="button-container space-x u-sticky-top">
			<button class="back-button" @click="backToOverview"><i class="fas fa-chevron-left"></i></button>
			<button @click="" class="ui-bar-button">
				<span>Add to daily</span>
			</button>
		</div>
		<p class="u-mt u-mb u-ta-c">What have you eat today ?</p>
		<div class="accordion__row space-x">
			<div class="accordion__title">
				<p>Meals</p>
				<div class="accordion__edit-container">
					<i class="fas fa-chevron-down icon-chevron"></i>
				</div>
			</div>
			<div class="accordion__details">
				<EmptyView view="meals" />
			</div>
		</div>

		<div class="accordion__row space-x">
			<div class="accordion__title">
				<p>Foods</p>
				<div class="accordion__edit-container">
					<i class="fas fa-chevron-down icon-chevron"></i>
				</div>
			</div>
			<div class="accordion__details">
				<FavoriteFoodsList v-if="getFavoriteFoods.length > 0" :foods="getFavoriteFoods" tileType="slim" />
				<EmptyView v-else view="foods" />
			</div>
		</div>
		

	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import FavoriteFoodsList from '@/components/FavoriteFoodsList';
import EmptyView from '@/components/EmptyView';

export default {
	name: "AddDaily",
	components: { FavoriteFoodsList, EmptyView },
	props: {
	},
	data: function() {
		return {
		}
	},
	methods: {
		backToOverview: function() {
			this.$router.push({ path: '/daily/overview' });
		}
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
};
</script>

