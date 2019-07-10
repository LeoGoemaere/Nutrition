<template>
	<div>
		<button class="add-button" @click="showLayer">+</button>
		<div class="addFoods__layer" :class="{ 'active' : isLayerEnabled  }">
			<div class="search">
				<div class="button-container space-x">
					<button class="addFoods__back-button" @click="hideLayer"><i class="fas fa-chevron-left"></i></button>
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
							<button class="search__results-btn-checked js-checked-btn" :class="{'active': favoriteFoods.some(el => el.id === food.id)}">
								<i class="far fa-check-circle"></i>
							</button>
						</div>
					</div>
				</div>
				<div class="pagination" v-if="searchResults">
					<input type="number" value="0" />
					<span>/</span>
					<span class="pagination__last">{{Math.ceil(searchResults.count / parseInt(searchResults.page_size))}}</span>
					<button>Go</button>
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
			isLayerEnabled: false,
			isFoodsSelected: false,
			favoriteFoods: null
		}
	},
	mounted() {
		this.favoriteFoods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
	},
	methods: {
		showLayer: function() {
			this.isLayerEnabled = true;
		},
		hideLayer: function() {
			this.favoriteFoods.splice(0);
			this.isLayerEnabled = false;
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
			this.favoriteFoods = JSON.parse(JSON.stringify(this.getFavoriteFoods));
			const checkButton = event.currentTarget.querySelector('.js-checked-btn');
			if (!checkButton.classList.contains('active')) {
				this.isFoodsSelected = true;
			}
			const selectedFood = this.searchResults.products[index];
			const indexOfSelectedFoodInFavorite = this.favoriteFoods.indexOf(selectedFood);
			// If the product doesn't exist we push in it, else we remove it.
			if (indexOfSelectedFoodInFavorite === -1) {
				this.favoriteFoods.push(selectedFood);
			} else {
				this.favoriteFoods.splice(indexOfSelectedFoodInFavorite, 1);
			}
			event.currentTarget.querySelector('.js-checked-btn').classList.toggle('active');
		},
		addToFavoriteFoods: function() {
			if (!this.isFoodsSelected) return;
			// Store the selected favorite foods.
			this.$store.commit('updateMyFoods', this.favoriteFoods);
			// Then reset the datas.
			this.searchResults = null;
			this.isLayerEnabled = false;
			this.isFoodsSelected = false;
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
		transform: translateX(-100%);
		z-index: 200;
		transition: transform ease-out .2s;
		overflow: auto;
		&.active {
			transform: translateX(0);
		}
	}
	.addFoods__back-button {
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
	.search {
		position: relative;	
	}
	.search__content {
		padding: 10px 30px 10px 10px;
		position: sticky;
		top: 0;
		background-color: #535c68;
	}

	.search__inner {
		position: relative;
	}

	.search__results {
		padding: 10px 20px 0;
	}


	.search__results-btn-checked {
		border: none;
		background: none;
		font-size: 18px;
		font-weight: 700;
		color: #3ae374;
		opacity: 0;
		transform: scale(.4);
		transition: opacity .2s ease-out, transform .2s ease-out;
		&.active { 
			opacity: 1;
			transform: scale(1);
			transition: opacity .2s ease-out, transform .2s ease-out;
		}
	}

	.search__input {
		width: 100%;
		border-radius: 3px;
		box-sizing: border-box;
		color: #7d7d7d;
		display: block;
		margin: auto;
		border: none;
		padding: 15px 20px;
		&:focus {
			outline: none;
		}
		&::placeholder {
			color: #7d7d7d;
		}
	}

	.search__button {
		border-radius: 50%;
		border: none;
		cursor: pointer;
		background-color: #3ae374;
		color: #fff;
		width: 46px;
		height: 46px;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		transform: translateX(50%);
		margin: auto;
		font-family: 'Roboto';
		font-weight: 300;
		font-size: 16px;
	}
</style>
