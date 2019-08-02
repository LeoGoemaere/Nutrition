<template>
	<div @click="foodRowClicked" :class="[{ 'active': isSelected }, `tile--${type}`]" class="tile">
		<TileGrid 
			:food="food"
			:isSelected="isSelected"
			:showQuantity="showQuantity"
			:editQuantity="editQuantity"
			:tileType="type"
			:view="view"
		/>
		<TileSlim
			:food="food"
			:isSelected="isSelected"
			:showQuantity="showQuantity"
			:editQuantity="editQuantity"
			:tileType="type"
			:view="view"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

import TileGrid from '@/components/tile/Tile-grid';
import TileSlim from '@/components/tile/Tile-slim';

export default {
	name: "FavoriteFoodsList",
	components: { TileGrid, TileSlim },
	props: {
		food: Object,
		isSelected: Boolean,
		showQuantity: Boolean,
		editQuantity: Boolean,
		type: String,
		view: String
	},
	methods: {
		foodRowClicked: function(event) {
			const isFoodSelected = this.food.isSelected;
			const food = !isFoodSelected ? { datas: { ...this.food.datas }, isSelected: true, quantity: this.food.quantity } : { datas: { ...this.food.datas }, isSelected: false, quantity: null };
			const datas = { food, event };
			EventBus.$emit('food-row:clicked', datas);
		},
	}
};
</script>

