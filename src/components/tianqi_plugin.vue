<template>
	<div id="tianqi">
		
	</div>
</template>

<script>
					
	export
	default {
		created(){
			let city = 'changsha'
			this.$ajax.get('/hom1/api/getWeather/?city=' + city)
			.then((response)=>{
			   console.log(response.data)
			});
		}
	}
</script>

<style>
</style>
