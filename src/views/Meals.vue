<template>
	<div class="meals">
		<div class="heading space-x">
			<h1>My Meals</h1>
			<router-link to="/meals/add" class="add-button">+</router-link>
			<transition name="sliding-on-top">
				<router-view></router-view>
			</transition>
		</div>
		<div class="meal__list">
			<div class="meal__row space-x meal__row--active">
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
			<div class="meal__row space-x">
				<p class="meal__title">
					<span>Lunch</span>
					<i class="fas fa-chevron-down icon-chevron"></i>
				</p>
			</div>
			<div class="meal__row space-x">
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

	.meal__list {
		margin-top: 25px;
	}

	.meal__recap {
		display: flex;
		justify-content: space-evenly;
		padding: 10px 0;
		background-color: #696969;
		color: #fff;
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
	.meal__row--active {
		background-color: #f5f5f5;
		padding-bottom: 15px;
	}
	.meal__title {
		display: flex;
		padding: 15px 0;
		font-size: 20px;
		align-items: center;
		&::before {
			content: "";
			display: block;
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background-color: #535c68;
			margin-right: 10px;
		}
	}

	.meal__details {
		padding: 0 10px;
		border-left: 1px solid #d7d7d7;
		display: none;
		.meal__row--active & {
			display: block;
		}
	}

	.icon-chevron {
		.meal__row--active & {
			transform: rotate(180deg);
		}
	}
</style>