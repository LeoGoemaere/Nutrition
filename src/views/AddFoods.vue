<template>
	<div>
		<div class="push-layer">
			<div class="search">
				<div class="button-container space-x">
					<button class="back-button" @click="backToFavorite"><i class="fas fa-chevron-left"></i></button>
					<button @click="addToFavoriteFoods" class="ui-bar-button" :class="{ 'disabled': !isFoodsSelected }">Done</button>
				</div>
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
					<div class="foods__row" 
						v-for="(food, index) in searchResults.products"
						:key="food.key"
						:class="{'active': favoriteFoods.some(el => el.food._id === food._id)}"
						@click="selectedFavoriteFoods($event, index)"
					>
						<img class="foods__image" :src="food.image_url" alt="">
						<span class="foods__name">{{ food.product_name }}</span>
						<div class="u-mr u-ml">
							<router-link :to="{ name: 'details', params: { id: food._id, view: 'add' } }" class="search__results-btn-detail">
								<i class="far fa-question-circle"></i>
							</router-link>
						</div>
						<div class="u-mr u-ml">
							<button class="foods__btn-checked js-checked-btn">
								<i class="far fa-check-circle"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: "AddFoods",
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
		this.favoriteFoods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
	},
	methods: {
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
					this.searchResults = data;
				})

		},
		selectedFavoriteFoods: function(event, index) {
			let selectedProduct = this.searchResults.products[index];
			const isFoodSelected = event.currentTarget.classList.contains('active');
			if (isFoodSelected) {
				this.favoriteFoods = this.favoriteFoods.filter(el => el.food._id !== selectedProduct._id);
			} else {
				this.favoriteFoods.push({ food: selectedProduct, isSelected: false,  quantity: null });
			}
			const isFavoriteFoodsdifferentFromstore = this.getFavoriteFoods.length !== this.favoriteFoods.length;
			const isFavoriteFoodsContainsEveryItemFromStore = this.getFavoriteFoods.map(el => el.food._id).every(id => this.favoriteFoods.map(el => el.food._id).includes(id));
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
