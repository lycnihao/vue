<template>
	<div id="he-plugin-standard"></div>
</template>

<script>
	
</script>
<script>
					
	export
	default {
		created(){
			(function (d) {
			  var c = d.createElement('link')
			  c.rel = 'stylesheet'
			  c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.1'
			  
			  var s = d.createElement('script')
			  s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.1'
			  
			  
			  var w = d.createElement('script')		
			  w.innerHTML = 'WIDGET = {CONFIG: {"layout": 1,"width": 450,"height": 150,"background": 1,"dataColor": "FFFFFF", "borderRadius": 5,"key": "05bcfc7d9024455fa19eed3553636c14"}}';
			  
			  var sn = d.getElementsByTagName('script')[0]
			  sn.parentNode.insertBefore(c, sn)
			  sn.parentNode.insertBefore(s, sn)
			})(document)
		}
	}
</script>

<style>
</style>
