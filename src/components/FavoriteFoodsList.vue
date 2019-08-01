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
		<div class="tile" 
			 v-for="food in filterFavoriteFoods"
			 :key="food.key"
			 :class="{ 'active': food.isSelected }"
			 >
			<img class="tile__image" :src="food.datas.image_url" alt="">
			<div class="tile__name">{{food.datas.product_name}}</div>
			<div class="u-mr u-ml">
				<button class="tile__button js-checked-btn">
					<i class="far fa-check-circle"></i>
				</button>
			</div>
			<div v-if="showQuantity" class="tile__quantity">
				<input type="number" :value="food.quantity" @change="foodQuantityChanged(food, $event)" placeholder="Quantity" class="tile__quantity-input">
				<span class="tile__quantity-unit">g</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

export default {
	name: "FavoriteFoodsList",
	props: {
		showQuantity: Boolean,
		foods: Array
	},
	data: function() {
		return {
			filterRequest: null,
			food: null,
			favoriteFoods: null
		}
	},
	mounted() {
		this.favoriteFoods = JSON.parse(JSON.stringify(this.foods));
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
		},
		foodQuantityChanged: function(food, event) {
			const quantity = parseInt(event.target.value, 10);
			const isQuantitySet = quantity > 0;
			this.food = isQuantitySet ? { datas: { ...food.datas }, isSelected: true, quantity } : { datas: { ...food.datas }, isSelected: false, quantity: null };
			EventBus.$emit('food-row:quantity-changed', this.food);
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

