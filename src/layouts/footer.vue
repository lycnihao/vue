<template>
	<footer>
		<p>Copyright ©2019 酷达导航 All rights reserved | <a href="http://www.beian.miit.gov.cn">湘ICP备19024303号</a>  <a href="http://www.168dh.cn/docs/">更新日志</a></p>
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
		border-top: 1px solid rgba(188, 198, 208, 0.4);
	}
	footer p,footer a{
		color: #333435;
		font-size: 12px;
	}
</style>
