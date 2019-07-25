<template>
	<div>
		<div class="addFoods__layer">
			<div class="search">
				<div class="button-container space-x">
					<button class="back-button" @click="backToFavorite"><i class="fas fa-chevron-left"></i></button>
					<button @click="addToFavoriteFoods" class="addFoods__done" :class="{ 'disabled': !isFoodsSelected }">Done</button>
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
							<button class="search__results-btn-checked js-checked-btn" :class="{'active': getFavoriteFoods.some(el => el.id === food.id)}">
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
			// Add or remove the selected product from favorite list.
			const isFoodSelected = event.currentTarget.querySelector('.js-checked-btn').classList.contains('active');
			if (isFoodSelected) {
				this.favoriteFoods = this.favoriteFoods.filter(el => el.id !== selectedProduct.id);
			} else {
				this.favoriteFoods.push(selectedProduct);
			}
			// TODO: Reset the active class when user make an other search request without confirm with the done button.
			event.currentTarget.querySelector('.js-checked-btn').classList.toggle('active');

			// Enable the done button if needed.
			const isFavoriteFoodsSuperiorFromStore = this.favoriteFoods.length > this.getFavoriteFoods.length;
			const isFavoriteFoodsContainsEveryItemFromStore = this.getFavoriteFoods.map(food => food.id).every(id => this.favoriteFoods.map(food => food.id).includes(id));
			!isFavoriteFoodsContainsEveryItemFromStore || isFavoriteFoodsSuperiorFromStore ? this.isFoodsSelected = true : this.isFoodsSelected = false;
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

	.addFoods__layer {
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: auto;
		z-index: 1;
	}
	.back-button {
		border: none;
		background: none;
		color: #3ae374;
		font-size: 25px;
		margin: 10px 0;
	}
	.addFoods__done {
		background: none;
		border: none;
		text-transform: uppercase;
		color: #3ae374;
		&.disabled {
			opacity: .5;
		}
	}
</style>
