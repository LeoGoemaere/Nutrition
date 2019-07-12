<template>
	<div>
		<div  v-if="getFavoriteFoods.length > 0" class="search__content u-mb">
			<div class="search__inner">
				<input class="search__input" v-model="filterRequest" type="text" placeholder="Or search for food..">
					<button class="search__button" :class="{ 'search__button--inactive': !filterRequest, 'search__button--red': filterRequest }">
						<transition mode="out-in">
							<i class="fas fa-search" v-if="!filterRequest" key="search"></i>
							<i class="fas fa-times" v-if="filterRequest" key="times"></i>
						</transition>
					</button>
			</div>
		</div>
		<div class="foods__row" 
			 v-for="food in filterFavoriteFoods"
			 :key="food.key"
		>
			<img class="foods__image" :src="food.image_url" alt="">
			<div class="foods__name">{{food.product_name}}</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: "FavoriteFoodsList",
	props: {
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

</style>
