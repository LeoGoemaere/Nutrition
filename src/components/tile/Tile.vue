<template>
	<div :class="[{ 'active': isSelected }, `tile--${type}`]" class="tile">
		<TileGrid 
			:food="food"
			:isSelected="isSelected"
			:showQuantity="showQuantity"
			:editQuantity="editQuantity"
			:tileType="type"
		/>
		<TileSlim :tileType="type" />
	</div>
	<!-- <div class="tile" 
		:class="{ 'active': isSelected }"
	>
		<img class="tile__image" :src="food.datas.image_url" alt="">
		<div class="tile__name">{{food.datas.product_name}}</div>
		<div class="u-mr u-ml">
			<button class="tile__button js-checked-btn">
				<i class="far fa-check-circle"></i>
			</button>
		</div>
		<div v-if="editQuantity" class="tile__quantity">
			<input type="number" :value="food.quantity" @change="foodQuantityChanged" placeholder="Quantity" class="tile__quantity-input">
			<span class="tile__quantity-unit">g</span>
		</div>
		<div v-if="showQuantity" class="tile__quantity">
			<span class="tile__quantity-copy">{{food.quantity}} g</span>
		</div>
	</div> -->
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
		type: String
	},
	methods: {
		foodQuantityChanged: function(event) {
			const quantity = parseInt(event.target.value, 10);
			const isQuantitySet = quantity > 0;
			const foodUpdated = isQuantitySet ? { datas: { ...this.food.datas }, isSelected: true, quantity } : { datas: { ...this.food.datas }, isSelected: false, quantity: null };
			EventBus.$emit('food-row:quantity-changed', foodUpdated);
		}
	}
};
</script>

