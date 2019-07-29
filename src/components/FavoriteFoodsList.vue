<template>
	<div>
		<div v-if="getFavoriteFoods.length > 0" class="search__content u-mb">
			<div class="search__inner">
				<input class="search__input" v-model="filterRequest" type="text" placeholder="Search...">
					<button class="search__button" @click="filterRequest ? clearFilterRequest() : null" :class="{ 'search__button--inactive': !filterRequest, 'search__button--red': filterRequest }">
						<transition mode="out-in">
							<i class="fas fa-search" v-if="!filterRequest" key="search"></i>
							<i class="fas fa-times" v-if="filterRequest" key="times"></i>
						</transition>
					</button>
			</div>
		</div>
		<div class="foods__row js-foods-row" 
			 v-for="food in filterFavoriteFoods"
			 :key="food.key"
			 @click="foodRowClicked(food, $event)"
			 >
			<img class="foods__image" :src="food.image_url" alt="">
			<div class="foods__name">{{food.product_name}}</div>
			<div class="u-mr u-ml">
				<button class="foods__btn-checked js-checked-btn">
					<i class="far fa-check-circle"></i>
				</button>
			</div>
			<div v-if="showQuantity" class="quantity">
				<div class="quantity__content">
					<input type="number" @change="foodQuantityChanged(food, $event)" placeholder="Quantity" class="quantity__input">
					<span class="quantity__unit">g</span>
				</div>
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
		showQuantity: Boolean
	},
	data: function() {
		return {
			filterRequest: null
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
		},
		foodRowClicked: function(food, event) {
			const datas = { food, event }
			EventBus.$emit('food-row:clicked', datas);
		},
		foodQuantityChanged: function(food, event) {
			const foodRowElement = event.target.closest('.js-foods-row');
			const datas = { food, event, foodRowElement }
			EventBus.$emit('food-row:quantity-changed', datas);
		}
	},
	computed: {
		filterFavoriteFoods: function () {
			if (!this.filterRequest) return this.getFavoriteFoods;
			return this.getFavoriteFoods.filter(food => this.convertToDiacriticInsensitive(this.convertToLowerCase(food.product_name)).includes(this.convertToDiacriticInsensitive(this.convertToLowerCase(this.filterRequest))));
		},
		...mapGetters([
			'getFavoriteFoods',
		])
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.quantity__label {
		font-size: 12px;
		color: #777777;
	}
	.quantity__content {
		display: flex;
		align-items: center;
	}
	.quantity__unit {
		color: #777777;
	}
	.quantity__input {
		border: none;
		border-bottom: 1px solid #d7d7d7;
		margin-right: 10px;
		padding: 10px 10px 10px 0;
		max-width: 60px;
	}
</style>
