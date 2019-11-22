<template>
	<footer>
		<p>Copyright ©2019 红衣导航 All rights reserved <a href="#">湘ICP备19024303号</a> <a href="#">网站地图</a></p>
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
		border-top: 1px solid rgba(188, 198, 208, 0.4);
		padding: 10px 0px !important;
		background-color: #fff;
		text-align: center;
	}
	footer p,footer a{
		font-size: 12px;
	}
</style>
