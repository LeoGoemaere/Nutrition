<template>
	<div id="app">
		<div class="nav">
			<router-link class="nav__link" to="/foods">
				<i class="fas fa-carrot"></i>
			</router-link>
			<router-link class="nav__link" to="/meals">
				<i class="fas fa-utensils"></i>
			</router-link>
			<router-link class="nav__link" to="/daily/overview">
				<i class="fas fa-calendar"></i>
			</router-link>
		</div>
		<router-view/>
	</div>
</template>

<script>
</script>


<style lang="scss">

	// Import core styles.
	@import './styles/core/reset';
	@import './styles/core/variables';
	@import './styles/core/mixins';
	@import './styles/core/animations';
	@import './styles/core/common';

	// Import utilities styles.
	@import './styles/utilities/margin';
	@import './styles/utilities/space';
	@import './styles/utilities/text';
	@import './styles/utilities/sticky';
	@import './styles/utilities/unstyle';

	// Import components styles.
	@import './styles/components/button';
	@import './styles/components/filter';
	@import './styles/components/food-tile';
	@import './styles/components/form';
	@import './styles/components/search';
	@import './styles/components/empty-view';
	@import './styles/components/segmented-control';
	@import './styles/components/accordion';

	// Import layouts styles.
	@import './styles/layouts/navigation';

</style>
