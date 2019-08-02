<template>
	<div v-if="isTypeActive()" class="tile__details">
		<p class="tile__name">{{food.datas.product_name}}</p>
		<div v-if="showQuantity" class="tile__quantity">
			<span class="tile__quantity-copy">{{food.quantity}}</span>
			<span class="tile__quantity-unit">g</span>
		</div>
		<div v-if="editQuantity" class="tile__quantity">
			<input type="number" :value="food.quantity" @change="foodQuantityChanged" placeholder="Quantity" class="tile__quantity-input">
			<span class="tile__quantity-unit">g</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

export default {
	name: "FavoriteFoodsList",
	props: {
		food: Object,
		isSelected: Boolean,
		showQuantity: Boolean,
		editQuantity: Boolean,
		tileType: String
	},
	data: function() {
		return {
			type: 'slim'
		}
	},
	methods: {
		foodQuantityChanged: function(event) {
			const quantity = parseInt(event.target.value, 10);
			const isQuantitySet = quantity > 0;
			const foodUpdated = isQuantitySet ? { datas: { ...this.food.datas }, isSelected: true, quantity } : { datas: { ...this.food.datas }, isSelected: false, quantity: null };
			EventBus.$emit('food-row:quantity-changed', foodUpdated);
		},
		isTypeActive() {
			return this.tileType === this.type;			
		}
	}
};
</script>

