<template>
	<div class="profile">
		<div class="heading space-x">
			<h1>Daily</h1>
		</div>
		<ul class="segmented">
			<li class="segmented__item">
				<a href="" class="segmented__link">Statistics</a>
				<!-- <router-link class="segmented__link">Stats</router-link> -->
			</li>
			<li class="segmented__item">
				<router-link :to="{ name: 'overview' }" class="segmented__link">Overview</router-link>
			</li>
		</ul>
		<router-view/>
	</div>
</template>
