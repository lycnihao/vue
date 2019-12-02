<template>
	<footer>
		<p>Copyright ©2019 酷达导航 All rights reserved <a href="#">湘ICP备19024303号</a></p>
	</footer>

</template>

<script>
	export default {
		methods:{
			about:function(){
				this.$router.push('/about')
			},
			cooperation:function(){
				this.$router.push('/cooperation')
			},

		}
	}
</script>
<style>
	footer{
		position: absolute;
		width: 100%;
		padding: 10px 0px !important;
		text-align: center;
	}
	footer p {
		color: #505869;
	}
	footer p,footer a{
		font-size: 12px;
	}
</style>
