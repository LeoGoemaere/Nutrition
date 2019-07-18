<template>
	<div class="meals">
		<div class="heading space-x">
			<h1>My Meals</h1>
			<router-link to="/foods/add" class="add-button">+</router-link>
			<transition name="sliding-on-side">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>

export default {
	name: 'meals',
	components: {
	}
}
</script>
