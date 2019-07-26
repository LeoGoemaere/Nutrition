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
				<i class="fas fa-calendar"></i>
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
	.space-y {
		padding-top: 10px;
		padding-bottom: 10px;
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

	.back-button {
		border: none;
		background: none;
		color: #3ae374;
		font-size: 25px;
		margin: 10px 0;
	}
	.ui-bar-button {
		background: none;
		border: none;
		text-transform: uppercase;
		color: #3ae374;
		&.disabled {
			opacity: .5;
		}
	}

	.button-action {
		background: none;
		border: none;
		color: black;
		font-size: 17px;
		color: #3ae374;
	}

	.button-action--disabled {
		opacity: 0.3;
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

	.icon-chevron {
		color: #bcbcbc;
		font-size: 10px;
		margin-left: auto;
	}

	// Popin
	.popin__title {
		color: #000;
		font-size: 17px;
		font-weight: 600;
		padding: 15px 20px;
		border-bottom: 1px solid #e0e0e0;
	}
	.popin__element {
		display: none;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		background-color: #fff;
		width: 80vw;
		border-radius: 5px;
		overflow: hidden;
		opacity: 0;
		transition: opacity .3s ease-out;
		&.is-active {
			display: block;
			opacity: 1;
			transition: opacity .3s ease-out;
		}
	}
	.popin__input-row {
		border-bottom: 1px solid;
		border-color: #e0e0e0;
	}
	.popin__row {
		border: none;
		height: 44px;
		line-height: 44px;
		font-size: 17px;
		width: 100%;
		padding: 0 20px;
		color: #737373;
		box-sizing: border-box;
	}
	.popin__row + .popin__row {
		border-top: none;
	}
	.popin__buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 20px;
	}
	.popin__overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 5;
		&.is-active {
			display: block;
		}
	}

	// Push layer
	.push-layer {
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: auto;
		z-index: 1;
	}

	// Form
	.label {
		display: block;
		font-size: 20px;
	}

	.input-container {
		position: relative;
		border-top: 1px solid #d7d7d7;
		border-bottom: 1px solid #d7d7d7;
		&.error {
			border-top: 1px solid #e9967a;
			border-bottom: 1px solid #e9967a;
			&::before {
				content: "Please, provide a name.";
				position: absolute;
				top: -10px;
				left: 10px;
				background-color: #e9967a;
				border-radius: 4px;
				color: #fff;
				padding: 5px;
				transform: translateY(-100%);
			}
			&:after {
				content: "";
				position: absolute;
				border-top: 5px solid #e9967a;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				top: -10px;
				left: 30px;
			}
		}
	}

	.input {
		padding: 15px 15px;
		width: 100%;
		border: none;
		.input-container.error & {
			&::placeholder {
				color: #e9967a;
			}
		}
	}

	.foods__row {
		display: flex;
		align-items: center;
		box-shadow: 0px 1px 4px -2px;
    	border-radius: 5px;
		width: 100%;
		background-color: #fff;
		+ .foods__row {
			margin-top: 5px;
		}
	}

	.foods__btn-checked {
		border: none;
		background: none;
		font-size: 18px;
		font-weight: 700;
		color: #3ae374;
		opacity: 0;
		transform: scale(.4);
		transition: opacity .2s ease-out, transform .2s ease-out;
		.active & { 
			opacity: 1;
			transform: scale(1);
			transition: opacity .2s ease-out, transform .2s ease-out;
		}
	}
</style>
