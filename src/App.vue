<template>
	<div id="app">
		<div class="nav">
			<router-link class="nav__link" to="/foods">
				<i class="fas fa-drumstick-bite"></i>
			</router-link>
			<router-link class="nav__link" to="/meals">
				<i class="fas fa-utensils"></i>
			</router-link>
			<router-link class="nav__link" to="/">
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
		font-family: 'Roboto';
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
		&.router-link-exact-active {
			color: #3ae374;
		}
	}

	.button-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
	}

	.button {
		border: none;
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		background-color: #3ae374;
		color: #fff;
		font-size: 17px;
		transform: scale(1);
		transition: transform .1s  ease-out;
		&:active {
			transform: scale(0.99);
			transition: transform .1s  ease-out;
		}
		&:focus {
			outline: none;
		}
	}

</style>
