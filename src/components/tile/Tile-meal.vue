<template>
	<div class="tile tile--meal" :class="{ 'active': isSelected }">
		<div class="tile__details">
			<div class="tile__left">
				<p class="tile__name">{{meal.name}}</p>
				<p v-if="serving" class="tile__serving">{{serving}} serving(s)</p>
				<p v-else class="tile__serving">No serving</p>
			</div>
		</div>
		<div v-if="editQuantity" class="tile__quantity">
			<button class="tile__quantity-plus" @click="addServing">+</button>
			<button class="tile__quantity-minus" @click="removeServing">-</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

export default {
	name: "TileMeal",
	props: {
		meal: Object,
		isSelected: Boolean,
		editQuantity: Boolean,
		serving: Number,
		view: String // Define wich view is displaying the component in order to go back to the view after visiting the food details.
	},
	data: function() {
		return {
		}
	},
	methods: {
		addServing: function() {
			const isServing = true;
			this.servingChanged(isServing);
		},
		removeServing: function() {
			const isServing = false;
			this.servingChanged(isServing);
		},
		servingChanged: function(isServing) {
			const data = { meal: this.meal, isServing };
			EventBus.$emit('tile-meal:serving-changed', data);
		}
	}
};
</script>

