<template>
	<div>
		<p class="u-mt space-x heading">
			<span>What have you eat today ?</span>
			<router-link :to="{ name: 'addOverview' }" class="add-button add-button--fill">+</router-link>
		</p>
		<transition name="sliding-on-top">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: "AddDaily",
	components: {  },
	props: {
	},
	data: function() {
		return {
		}
	},
	methods: {
	},
	computed: {
		...mapGetters([
			'getFavoriteFoods',
		])
	}
};
</script>

