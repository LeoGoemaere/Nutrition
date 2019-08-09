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
			<div class="u-mb space-x">
				<button @click="getFavoriteFoods.some(el => el.datas._id === product._id) ? removeFromFavoriteFoods() : addToFavoritesFoods()" class="button food-details__button">
					<transition name="fade-out-in" mode="out-in">
						<span key="remove" v-if="getFavoriteFoods.some(el => el.datas._id === product._id)">
							<i class="fas fa-check u-mr"></i>
							<span>Added to your favorites</span>
						</span>
						<span key="add" v-else>
							<i class="fas fa-plus u-mr"></i>
							<span>Add to your favorite</span>
						</span>
					</transition>
				</button>
			</div>
			<div class="space-x">
				<table class="table u-mt">
					<thead class="table__head">
						<tr>
							<th class="table__th"></th>
							<th class="table__th">For 100g</th>
						</tr>
					</thead>
					<tbody class="table__body">
						<tr class="nutriment__calories-row">
							<td class="table__td">Energies</td>
							<td class="u-ta-c table__td">
								<span>{{product.nutriments.energy_100g}} kj / {{roundValue(convertKilojouleToKilocalorie(product.nutriments.energy_100g))}} kcal</span>
							</td>
						</tr>
						<tr class="nutriment__prots-row">
							<td class="table__td">Proteins</td>
							<td class="u-ta-c table__td">
								<span>{{product.nutriments.proteins_100g}}g</span>
							</td>
						</tr>
						<tr class="nutriment__carbs-row">
							<td class="table__td">Carbohydrates</td>
							<td class="u-ta-c table__td">
								<span>{{product.nutriments.carbohydrates_100g}}g</span>
							</td>
						</tr>
						<tr class="nutriment__fats-row">
							<td class="table__td">Fats</td>
							<td class="u-ta-c table__td">
								<span>{{product.nutriments.fat_100g}}g</span>
							</td>
						</tr>
						
					</tbody>
				</table>
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
			this.favoriteFoods.push({ datas: this.product, isSelected: false,  quantity: null });
			this.$store.commit('updateMyFoods', this.favoriteFoods);
		},
		removeFromFavoriteFoods: function() {
			this.favoriteFoods = this.favoriteFoods.filter(food => food.datas._id !== this.product._id);
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
