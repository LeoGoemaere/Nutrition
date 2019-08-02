<template>
	<div class="space-x">
		<div v-if="getFavoriteFoods.length > 0" class="filter">
			<input class="filter__input" v-model="filterRequest" type="text" placeholder="Search...">
			<button class="filter__button" @click="filterRequest ? clearFilterRequest() : null" :class="{ 'search__button--inactive': !filterRequest, 'search__button--red': filterRequest }">
				<transition name="fade-out-in" mode="out-in">
					<i class="fas fa-search" v-if="!filterRequest" key="search"></i>
					<i class="fas fa-times" v-if="filterRequest" key="times"></i>
				</transition>
			</button>
		</div>
		<div>
			<Tile 
				v-for="food in filterFavoriteFoods"
				:key="food.key"
				:food="food"
				:isSelected="food.isSelected"
				:showQuantity="showQuantity"
				:editQuantity="editQuantity"
				:type="tileType"
			/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

import Tile from '@/components/tile/Tile';

export default {
	name: "FavoriteFoodsList",
	components: { Tile },
	props: {
		showQuantity: Boolean,
		editQuantity: Boolean,
		foods: Array,
		tileType: String
	},
	data: function() {
		return {
			filterRequest: null,
		}
	},
	methods: {
		convertToLowerCase: function(string) {
			return string.toLowerCase();
		},
		convertToDiacriticInsensitive: function(string) {
			// Remove accents.
			return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		},
		clearFilterRequest() {
			this.filterRequest = null;
		}
	},
	computed: {
		filterFavoriteFoods: function () {
			if (!this.filterRequest) return this.foods;
			return this.foods.filter(food => this.convertToDiacriticInsensitive(this.convertToLowerCase(food.datas.product_name)).includes(this.convertToDiacriticInsensitive(this.convertToLowerCase(this.filterRequest))));
		},
		...mapGetters([
			'getFavoriteFoods',
		])
	}
};
</script>

