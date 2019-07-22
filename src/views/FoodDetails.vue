<template>
	<div>
		<div class="button-container space-x">
			<button class="back-button" @click="backToAddFoods"><i class="fas fa-chevron-left"></i></button>
		</div>
		<div class="heading space-x">
			<h1 v-if="this.product">{{this.product.product_name}}</h1>
		</div>
	</div>
</template>

<script>

export default {
	name: 'meals',
	props: {
		id: String
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
				console.log(this.product)
			})
	},
	methods: {
		backToAddFoods: function() {
			this.$router.push({ name: 'add' });
		}
	}
}
</script>

<style scoped lang="scss">
</style>
