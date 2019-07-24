<template>
	<div id="app">
		<div class="nav">
			<router-link class="nav__link" to="/foods">
				<i class="fas fa-carrot"></i>
			</router-link>
			<router-link class="nav__link" to="/meals">
				<i class="fas fa-utensils"></i>
			</router-link>
			<router-link class="nav__link" to="/" exact>
				<i class="fas fa-user"></i>
			</router-link>
		</div>
		<router-view/>
	</div>
</template>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
	}

	$calorie-color: #f4c368;
	$protein-color: #77e18a;
	$carb-color: #ea87e1;
	$fat-color: #8ec6f8;

	// Animations
	.sliding-on-top-enter-active,
	.sliding-on-top-leave-active,
	.sliding-on-side-enter-active,
	.sliding-on-side-leave-active {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	.sliding-on-top-enter-active { animation: sliding-up .3s; }
	.sliding-on-top-leave-active { animation: sliding-up .3s reverse; }

	.sliding-on-side-enter-active { animation: sliding-side 10s; }
	.sliding-on-side-leave-active { animation: sliding-side 10s reverse; }

	.v-enter { opacity: 0; transform: scale(.6); }
	.v-enter-active { transition: opacity .1s, transform .1s; }
	.v-enter-to { opacity: 1; transform: scale(1) }
	.v-leave { opacity: 1; transform: scale(1) }
	.v-leave-active { transition: opacity .1s, transform .1s; }
	.v-leave-to { opacity: 0; transform: scale(.6);  }

	.fade-out-in-enter { opacity: 0; }
	.fade-out-in-enter-active { transition: opacity .2s; }
	.fade-out-in-enter-to { opacity: 1; }
	.fade-out-in-leave { opacity: 1; }
	.fade-out-in-leave-active { transition: opacity .2s; }
	.fade-out-in-leave-to { opacity: 0; }

	@keyframes sliding-side {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes sliding-up {
		0% {
			transform: translateY(100%);
		}
		100% {
			transform: translateX(0);
		}
	}

	.space-x {
		padding-left: 10px;
		padding-right: 10px;
	}

	h1 {
		margin: 15px 0;
	}

	// Utils class 
	.u- {
		&mt { margin-top: 12px; }
		&ml { margin-left: 12px; }
		&mr { margin-right: 12px; }
		&mb { margin-bottom: 12px; }

		&ta-r { text-align: right; }
	}

	#app {
		padding-bottom: 50px;
	}

	.heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;
		background-color: #535c68;
		z-index: 100;
	}

	.nav__link {
		color: #fff;
		&.router-link-active {
			color: #3ae374;
		}
	}

	.icon--cal { color: $calorie-color; }
	.icon-prot { color: $protein-color; }
	.icon-carb { color: $carb-color; }
	.icon-fat { color: $fat-color; }

	.button-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.back-button {
		border: none;
		background: none;
		color: #3ae374;
		font-size: 25px;
		margin: 10px 0;
	}

	.add-button {
		border: none;
		background: none; 
		width: 30px;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		font-weight: 700;
		background-color: #3ae374;
		border-radius: 50%;
		color: #fff;
		text-decoration: none;
		text-align: center;
	}

	.close-button {
		color: #fff;
		border: none;
		position: fixed;
		top: 20px;
		right: 20px;
		width: 30px;
		height: 30px;
		font-size: 16px;
		line-height: 16px;
		background-color: #535c68;
		border-radius: 50%;
	}

	.button {
		border: none;
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		background-color: #3ae374;
		color: #fff;
		font-size: 17px;
		transition: background-color .4s ease-out;
		&:focus {
			outline: none;
		}
	}

	.button--alert {
		background-color: #ec5555;
		transition: background-color .4s ease-out;
	}

	.search {
		position: relative;	
	}
	.search__content {
		padding: 10px 30px 10px 10px;
		position: sticky;
		top: 0;
		background-color: #535c68;
	}

	.search__inner {
		position: relative;
	}

	.search__results {
		padding: 10px 20px 50px;
	}


	.search__results-btn-checked {
		border: none;
		background: none;
		font-size: 18px;
		font-weight: 700;
		color: #3ae374;
		opacity: 0;
		transform: scale(.4);
		transition: opacity .2s ease-out, transform .2s ease-out;
		&.active { 
			opacity: 1;
			transform: scale(1);
			transition: opacity .2s ease-out, transform .2s ease-out;
		}
	}

	.search__results-btn-detail {
		border: none;
		background: none;
		font-size: 20px
	}

	.search__input {
		width: 100%;
		border-radius: 3px;
		box-sizing: border-box;
		color: #7d7d7d;
		display: block;
		margin: auto;
		border: none;
		padding: 15px 20px;
		&:focus {
			outline: none;
		}
		&::placeholder {
			color: #7d7d7d;
		}
	}

	.search__button {
		border-radius: 50%;
		border: none;
		cursor: pointer;
		background-color: #3ae374;
		color: #fff;
		width: 46px;
		height: 46px;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		transform: translateX(50%);
		margin: auto;
		font-family: 'Roboto';
		font-weight: 300;
		font-size: 16px;
		transition: background-color .2s ease-out;
		&.search__button--inactive {
			background-color: #535c68;
			transition: background-color .2s ease-out;
		}
		&.search__button--red {
			background-color: #b9b9b9;
			transition: background-color .2s ease-out;
		}
	}

</style>
