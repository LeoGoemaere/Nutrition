<template>
	<div class="profile">
		<div class="heading space-x">
			<h1>My Profile</h1>
			<router-link to="/foods/add" class="add-button">+</router-link>
			<transition name="sliding-on-side">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>
