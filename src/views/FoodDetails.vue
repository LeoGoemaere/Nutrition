<template>
	<div>
		<button class="close-button" @click="backToPreviousView"><i class="fas fa-times"></i></button>
		<div v-if="this.product">
			<figure class="food__figure">
				<img class="food__image" :src="this.product.image_url" alt="">
			</figure>
			<div class="heading space-x u-mb">
				<h1>{{this.product.product_name}}</h1>
			</div>
			<div class="nutriments">
				<p class="space-x nutriments__dose">Informations for 100g</p>
				<div class="u-mt space-x nutriments__row">
					<p class="nutriments__label">
						<i class="fas fa-fire-alt u-mr"></i>
						<span>Calories</span>
					</p>
					<span class="nutriments__datas">{{product.nutriments.energy_100g}} kj / {{roundValue(convertKilojouleToKilocalorie(product.nutriments.energy_100g))}} kcal</span>
				</div>
				<div class="space-x nutriments__row">
					<p class="nutriments__label">
						<i class="fas fa-drumstick-bite u-mr"></i>
						<span>Proteïnes</span>
					</p>
					<span class="nutriment__datas">{{product.nutriments.proteins_100g}}g</span>
				</div>
				<div class="space-x nutriments__row">
					<p class="nutriments__label">
						<i class="fas fa-bread-slice u-mr"></i>
						<span>Glucides</span>
					</p>
					<span class="nutriments__datas">{{product.nutriments.carbohydrates_100g}}g</span>
				</div>
				<div class="space-x nutriments__row">
					<p class="nutriments__label">
						<i class="fas fa-fish u-mr"></i>
						<span>Lipides</span>
					</p>
					<span class="nutriments__datas">{{product.nutriments.fat_100g}}g</span>
				</div>
			</div>
			<div class="space-x">
				<button @click="removeFromFavoriteFoods" v-if="getFavoriteFoods.some(el => el.id === product.id)" class="button button--alert">
					<i class="far fa-trash-alt u-mr"></i>
					<span>Remove from favorite foods</span>
				</button>
				<button @click="addToFavoritesFoods" v-else class="button">
					<i class="fas fa-plus u-mr"></i>
					<span>Add to favorite foods</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debuglog } from 'util';

export default {
	name: 'FoodDetails',
	props: {
		id: String,
		view: String
	},
	components: {
	},
	data: function() {
		return {
			product: null,
			favoriteFoods: null
		}
	},
	mounted() {
		this.favoriteFoods = JSON.parse(JSON.stringify(this.getFavoriteFoods));

		const request = new Request(`https://world.openfoodfacts.org/api/v0/product/${this.id}.json`);
		fetch(request)
			.then((response) => {  
				return response.json(); 
			})
			.then(data => {
				this.product = data.product;
			})
	},
	methods: {
		backToPreviousView: function() {
			this.$router.push({ name: this.view });
		},
		convertKilojouleToKilocalorie: function(kilojoule) {
			return kilojoule / 4.184;
		},
		roundValue: function(value) {
			return Math.ceil(value * 10) / 10;
		},
		addToFavoritesFoods: function() {
			this.favoriteFoods.push(this.product);
			this.$store.commit('updateMyFoods', this.favoriteFoods);
		},
		removeFromFavoriteFoods: function() {
			this.favoriteFoods = this.favoriteFoods.filter(food => food.id !== this.product.id);
			this.$store.commit('updateMyFoods', this.favoriteFoods);
		}
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
}
</script>

<style scoped lang="scss">
	h1 {
		font-size: 25px;
	}

	.nutriments {
		margin-bottom: 30px;
	}

	.nutriments__dose {
		font-weight: 700;
	}

	.nutriments__row {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 15px;
		padding-top: 15px;
		+ .nutriments__row {
			border-top: 1px solid grey;
		}
	}

	.food__figure {
		height: 220px;
	}

	.food__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
