<template>
	<div class="push-layer">
		<div class="button-container space-x u-sticky-top">
			<button class="back-button" @click="backToOverview"><i class="fas fa-chevron-left"></i></button>
			<button @click="" class="ui-bar-button">
				<span>Add to daily</span>
			</button>
		</div>
		<p class="u-mt u-mb u-ta-c">What have you eat today ?</p>
		<div @click="toggleAccordion($event)" class="accordion__row js-accordion-row space-x">
			<div class="accordion__title">
				<p>Meals</p>
				<div class="accordion__edit-container">
					<i class="fas fa-chevron-down icon-chevron"></i>
				</div>
			</div>
			<div class="accordion__details" v-if="getMeals.length > 0">
				<TileMeal 
					v-for="meal in getMeals"
					:key="meal.key"
					:meal="meal"
					:editQuantity="true"
				/>
			</div>
			<div v-else class="accordion__details">
				<EmptyView view="meals" />
			</div>
		</div>

		<div class="accordion__row js-accordion-row space-x">
			<div @click="toggleAccordion($event)" class="accordion__title">
				<p>Foods</p>
				<div class="accordion__edit-container">
					<i class="fas fa-chevron-down icon-chevron"></i>
				</div>
			</div>
			<div class="accordion__details">
				<FavoriteFoodsList v-if="getFavoriteFoods.length > 0" :foods="getFavoriteFoods" :editQuantity="true" tileType="slim" />
				<EmptyView v-else view="foods" />
			</div>
		</div>
		

	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import FavoriteFoodsList from '@/components/FavoriteFoodsList';
import TileMeal from '@/components/tile/TileMeal';
import EmptyView from '@/components/EmptyView';

export default {
	name: "AddDaily",
	components: { FavoriteFoodsList, TileMeal, EmptyView },
	props: {
	},
	data: function() {
		return {
		}
	},
	methods: {
		backToOverview: function() {
			this.$router.push({ path: '/overview' });
		},
		toggleAccordion: function(e) {
			if (e.target.classList.contains('js-ui-bar-button')) return;
			e.currentTarget.closest('.js-accordion-row').classList.toggle('accordion__row--active');
		},
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
			'getMeals'
		])
	}
};
</script>

