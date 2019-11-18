<template>
	<div id="tianqi">
		
	</div>
</template>

<script>
					
	export
	default {
		created(){
			window.addEventListener('scroll', function(){
				this.$ajax.get('https://free-api.heweather.net/s6/weather/now?location=changsha&key=f30496591f7c416781f3a9d5f84adf90')
				.then((response)=>{
				   console.log(response.data)
				});
			}, true);
		}
	}
</script>

<style>
</style>
