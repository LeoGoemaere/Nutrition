<template>
	<div>
		<div class="push-layer">
			<div class="button-container space-x">
				<button class="back-button" @click="backToFavorite"><i class="fas fa-chevron-left"></i></button>
				<button @click="addToFavoriteFoods" class="ui-bar-button" :class="{ 'disabled': !isFoodsSelected }">Done</button>
			</div>
			<div class="search">
				<div class="search__content">
					<div class="search__inner">
						<input @change="searchProducts" class="search__input" type="text" placeholder="Or search for food..">
						<button @click="searching" class="search__button">
							<i class="fas fa-search"></i>
						</button>
					</div>
				</div>
				<div class="space-x u-mt">
					<button class="button">
						<i class="fas fa-plus u-mr"></i>
						<span>Create food</span>
					</button>
				</div>
				<div v-if="searchResults" class="search__results">
					<Tile 
						v-for="(food, index) in searchResults"
						:key="food.key"
						:food="food"
						:isSelected="favoriteFoods.some(el => el.datas._id === food.datas._id)"
						type="grid"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@/event-bus';

import Tile from '@/components/tile/Tile';

export default {
	name: "AddFoods",
	components: { Tile },
	props: {
	},
	data: function() {
		return {
			userRequest: null,
			searchResults: null,
			isFoodsSelected: false,
			favoriteFoods: null
		}
	},
	mounted() {
		EventBus.$on('food-row:clicked', this.foodRowClickedHandler);
		this.favoriteFoods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
	},
	destroyed() {
		EventBus.$off('food-row:clicked', this.foodRowClickedHandler);
	},
	methods: {
		foodRowClickedHandler(datas) {
			this.selectedFavoriteFoods(datas.food, datas.event);
		},
		backToFavorite: function() {
			this.$router.push({ path: '/foods' });
		},
		searchProducts(e) {
			this.userRequest = e.target.value;
		},
		searching: function() {
			const request = new Request(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${this.userRequest}&search_simple=1&action=process&json=1`);
			fetch(request)
				.then((response) => {  return response.json(); })
				.then(data => {
					this.searchResults = data.products.map(element => { 
						return	{ datas: element, isSelected: false,  quantity: null }
					})
				})

		},
		selectedFavoriteFoods: function(food, event) {
			const isFoodSelected = event.currentTarget.classList.contains('active');
			if (isFoodSelected) {
				this.favoriteFoods = this.favoriteFoods.filter(el => el.datas._id !== food.datas._id);
			} else {
				this.favoriteFoods.push({ datas: food.datas, isSelected: false,  quantity: null });
			}
			const isFavoriteFoodsdifferentFromstore = this.getFavoriteFoods.length !== this.favoriteFoods.length;
			const isFavoriteFoodsContainsEveryItemFromStore = this.getFavoriteFoods.map(el => el.datas._id).every(id => this.favoriteFoods.map(el => el.datas._id).includes(id));
			this.isFoodsSelected = isFavoriteFoodsdifferentFromstore || !isFavoriteFoodsContainsEveryItemFromStore;
		},
		addToFavoriteFoods: function() {
			if (!this.isFoodsSelected) return;
			// Store the selected favorite foods.
			this.$store.commit('updateMyFoods', this.favoriteFoods);
			// Then reset the datas
			this.isFoodsSelected = false;
			// And return to the foods view.
			this.$router.push({ path: '/foods' });
		}
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
