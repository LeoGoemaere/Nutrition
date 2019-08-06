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
				<div class="space-x nutriments__dose">
					<p>Informations for 100g</p>
					<button @click="getFavoriteFoods.some(el => el.id === product.id) ? removeFromFavoriteFoods() : addToFavoritesFoods()" class="check-button" :class="{ 'check-button--ischecked': getFavoriteFoods.some(el => el.id === product.id) }">
						<transition name="fade-out-in" mode="out-in">
							<span key="remove" v-if="getFavoriteFoods.some(el => el.id === product.id)">
								<i class="fas fa-check"></i>
							</span>
							<span key="add" v-else>
								<i class="fas fa-plus"></i>
							</span>
						</transition>
				</button>
				</div>
				<div class="u-mt space-x nutriments__row">
					<p>
						<i class="fas fa-fire-alt icon--cal u-mr"></i>
						<span>Calories</span>
					</p>
					<span class="nutriments__datas">{{product.nutriments.energy_100g}} kj / {{roundValue(convertKilojouleToKilocalorie(product.nutriments.energy_100g))}} kcal</span>
				</div>
				<div class="space-x nutriments__row">
					<p>
						<i class="fas fa-drumstick-bite icon-prot u-mr"></i>
						<span>Proteïnes</span>
					</p>
					<span class="nutriment__datas">{{product.nutriments.proteins_100g}}g</span>
				</div>
				<div class="space-x nutriments__row">
					<p>
						<i class="fas fa-bread-slice icon-carb u-mr"></i>
						<span>Glucides</span>
					</p>
					<span class="nutriments__datas">{{product.nutriments.carbohydrates_100g}}g</span>
				</div>
				<div class="space-x nutriments__row">
					<p>
						<i class="fas fa-fish icon-fat u-mr"></i>
						<span>Lipides</span>
					</p>
					<span class="nutriments__datas">{{product.nutriments.fat_100g}}g</span>
				</div>
			</div>
			<div class="space-x">
				
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

	// Import food details view styles.
	@import '../styles/views/food-details';

</style>
