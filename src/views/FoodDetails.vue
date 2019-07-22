<template>
	<div>
		<button class="close-button" @click="backToPreviousView"><i class="fas fa-times"></i></button>
		<div v-if="this.product">
			<figure class="food__figure">
				<img class="food__image" :src="this.product.image_nutrition_url" alt="">
			</figure>
			<div class="heading space-x u-mb">
				<h1>{{this.product.product_name}}</h1>
			</div>
			<p class="space-x nutriment__dose">Informations for 100g</p>
			<div class="u-mt space-x nutriment__row">
				<p class="nutriment__label">Calories</p>
				<span class="nutriment__datas">127kcal</span>
			</div>
			<div class="space-x nutriment__row">
				<p class="nutriment__label">
					<i class="fas fa-fish u-mr"></i>
					<span>Proteïnes</span>
				</p>
				<span class="nutriment__datas">30g</span>
				<div class="nutriment__chart"></div>
			</div>
			<div class="space-x nutriment__row">
				<p class="nutriment__label">
					<i class="fas fa-fish u-mr"></i>
					<span>Glucides</span>
				</p>
				<span class="nutriment__datas">70g</span>
				<div class="nutriment__chart"></div>
			</div>
			<div class="space-x nutriment__row">
				<p class="nutriment__label">
					<i class="fas fa-fish u-mr"></i>
					<span>Lipides</span>
				</p>
				<span class="nutriment__datas">7g</span>
				<div class="nutriment__chart"></div>
			</div>
		</div>
	</div>
</template>

<script>

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
			product: null
		}
	},
	mounted() {
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
		}
	}
}
</script>

<style scoped lang="scss">
	h1 {
		font-size: 25px;
	}

	.nutriment__dose {
		font-weight: 700;
	}

	.nutriment__row {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		+ .nutriment__row {
			margin-top: 25px;
		}
	}

	.nutriment__chart {
		width: 100%;
		height: 5px;
		border-radius: 2.5px;
		background-color: grey; 
		margin-top: 10px;
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
