<template>
	<div class="tile tile--meal">
		<div class="tile__details">
			<div class="tile__left">
				<p class="tile__name">{{meal.name}}</p>
				<p class="tile__serving">1 serving</p>
			</div>
			<div v-if="showQuantity" class="tile__quantity">
			</div>
			<div v-if="editQuantity" class="tile__quantity">
			</div>
		</div>
		<div class="tile__quantity">
			<button class="tile__quantity-plus">+</button>
			<button class="tile__quantity-minus">-</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

export default {
	name: "FavoriteFoodsList",
	props: {
		meal: Object,
		isSelected: Boolean,
		showQuantity: Boolean,
		editQuantity: Boolean,
		view: String // Define wich view is displaying the component in order to go back to the view after visiting the food details.
	},
	data: function() {
		return {
		}
	},
	methods: {
		foodQuantityChanged: function(event) {
			// const quantity = parseInt(event.target.value, 10);
			// const isQuantitySet = quantity > 0;
			// const foodUpdated = isQuantitySet ? { datas: { ...this.food.datas }, isSelected: true, quantity } : { datas: { ...this.food.datas }, isSelected: false, quantity: null };
			// EventBus.$emit('food-row:quantity-changed', foodUpdated);
		}
	}
};
</script>

