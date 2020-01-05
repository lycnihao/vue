<template>
	<div class="WebSiteLibrary">
		<v-header></v-header>
	</div>
</template>

<script>
import header from '../layouts/header'

export
default {
	data() {
		return {
			
		}
	},
	methods:{
		
	},

	components: {
		'v-header': header,
	},
	created() {

	}
}
</script>

<style>
@import '../assets/css/style.css';
.WebSiteLibrary .header{
	z-index: 99;
	opacity: 1;
}
</style>
