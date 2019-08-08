<template>
	<div class="profile">
		<div class="heading space-x">
			<h1>Daily</h1>
		</div>
		<ul class="segmented">
			<li class="segmented__item">
				<router-link :to="{ name: 'statistics' }" class="segmented__link">Statistics</router-link>
			</li>
			<li class="segmented__item">
				<router-link :to="{ name: 'overview' }" class="segmented__link">Overview</router-link>
			</li>
		</ul>
		<router-view/>
	</div>
</template>
