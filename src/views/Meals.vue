<template>
	<div class="meals">
		<div class="heading space-x">
			<h1>My Meals</h1>
		</div>
		<div class="space-x">
			<button class="button">
				<i class="fas fa-plus u-mr"></i>
				<span>Create a new meal</span>
			</button>
			<!-- Create meal popin -->
			<div :class="" class="popin__element">
				<p class="popin__title">Create a meal</p>
				<div class="popin__input-row">
					<input type="text" class="popin__row" placeholder="Meal name" />
				</div>
				<div class="popin__buttons">
					<button class="button-action" @click="">Cancel</button>
					<button :class="" class="button-action" @click="">Create</button>
				</div>
			</div>
			<div :class="" class="popin__overlay" @click=""></div>
		</div>
		<div class="space-x u-mt">
			<div class="meal__row">
				<p class="meal__title">
					<span>Breakfast</span>
					<i class="fas fa-chevron-down icon-chevron"></i>
				</p>
				<div class="meal__details">
					<div class="meal__recap">
						<p class="nutriments__label">
							<i class="fas fa-fire-alt meal__recap-icon"></i>
							<span class="meal__datas">500kj / 250kcal</span>
						</p>
						<p class="nutriments__label">
							<i class="fas fa-drumstick-bite meal__recap-icon"></i>
							<span class="meal__datas">10g</span>
						</p>
						<p class="nutriments__label">
							<i class="fas fa-bread-slice meal__recap-icon"></i>
							<span class="meal__datas">10g</span>
						</p>
						<p class="nutriments__label">
							<i class="fas fa-fish meal__recap-icon"></i>
							<span class="meal__datas">3g</span>
						</p>
					</div>
					<div class="foods__row">
						<img class="foods__image" src="https://static.openfoodfacts.org/images/products/761/303/462/6844/front_fr.71.400.jpg" alt="">
						<div class="foods__name">Chocapic</div>
						<div class="u-mr u-ml">
							<!-- <router-link :to="{ name: 'details' }" class="search__results-btn-detail"> -->
								<i class="far fa-question-circle"></i>
							<!-- </router-link> -->
						</div>
					</div>
					<div class="foods__row">
						<img class="foods__image" src="https://static.openfoodfacts.org/images/products/761/303/462/6844/front_fr.71.400.jpg" alt="">
						<div class="foods__name">Chocapic</div>
						<div class="u-mr u-ml">
							<!-- <router-link :to="{ name: 'details' }" class="search__results-btn-detail"> -->
								<i class="far fa-question-circle"></i>
							<!-- </router-link> -->
						</div>
					</div>
				</div>
			</div>
			<div class="meal__row">
				<p class="meal__title">
					<span>Lunch</span>
					<i class="fas fa-chevron-down icon-chevron"></i>
				</p>
			</div>
			<div class="meal__row">
				<p class="meal__title">
					<span>Lunch</span>
					<i class="fas fa-chevron-down icon-chevron"></i>
				</p>
			</div>
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

<style scoped lang="scss">

	.nutriments__label {
		display: inline-block;
		text-align: center;
	}

	.meal__recap {
		display: flex;
		justify-content: space-evenly;
		padding: 10px 0;
		background-color: #696969;
		color: #dcdcdc;
		margin-bottom: 5px;
		border-radius: 3px;
		font-size: 13px;
	}

	.meal__recap-icon {
		margin-right: 5px;
	}

	.meal__row {
		+.meal__row {
			border-top: 1px solid #d7d7d7;
		}
	}
	.meal__title {
		display: flex;
		justify-content: space-between;
		padding: 15px 0;
		font-size: 20px;
		align-items: center;
	}

	.meal__details {
		padding: 0 10px;
		border-left: 1px solid #d7d7d7;
		margin-bottom: 15px;
	}
</style>