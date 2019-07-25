<template>
	<div class="push-layer">
        <div class="button-container space-x">
            <button class="back-button" @click="backToMeals"><i class="fas fa-chevron-left"></i></button>
            <button @click="" class="done-button" :class="">Done</button>
        </div>
        <div class="addmeal">
            <label class="label space-x" for="">Meal's name</label>
            <input class="input u-mt" placeholder="name" type="text">
        </div>
        <div class="u-mt">
            <FavoriteFoodsList />
        </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoriteFoodsList from '@/components/FavoriteFoodsList';

export default {
    name: "AddMeal",
    components: { FavoriteFoodsList },
	props: {
	},
	data: function() {
		return {
		}
	},
	mounted() {
	},
	methods: {
        backToMeals: function() {
			this.$router.push({ path: '/meals' });
		},
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
    .addmeal {
        margin-top: 25px;
    }
</style>
