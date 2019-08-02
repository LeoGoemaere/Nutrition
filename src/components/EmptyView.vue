<template>
	<div class="empty-view">
		<i class="empty-view__icon" :class="getCorrectClassIcon()"></i>
		<p class="empty-view__copy">You don't have any {{view}} yet.</p>
	</div>
</template>

<script>

export default {
	name: "EmptyView",
	props: {
		view: String
	},
	methods: {
		getCorrectClassIcon() {
			switch(this.view) {
				case 'foods':
					return 'fas fa-carrot';
					break;
				case 'meals':
					return 'fas fa-utensils';
					break;
			}
		}
	}
};
</script>

