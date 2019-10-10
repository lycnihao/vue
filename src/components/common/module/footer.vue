<template>
	<footer>
		<ul class="menu">
			<li class="nav-item"><el-link href="/about">关于我们</el-link></li>
			<li class="nav-item"><el-link href="/milestone">更新日志</el-link></li>
			<li class="nav-item"><el-link href="https://wj.qq.com/s2/4216300/3ed1" target="_blank">申请收录</el-link></li>
			<li class="nav-item"><el-link href="https://wj.qq.com/s2/4216517/3dd6" target="_blank">意见反馈</el-link></li>
		</ul>
		<p style="color: #EBEEF5;margin-top: 10px;">Copyright &copy; 2019 红衣导航 - hom1.cn All rights Reserved</p>

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
		padding: 25px 0px !important;
		background-color: #303133;
	}
	footer .menu{
	    padding: 0px 18%;
		display: flex;
		justify-content: space-around;
	}
	footer p{
		text-align: center;
		font-size: 12px;
	}

	@media only screen and (max-width: 479px) {
		footer .menu{
		    padding: 0px 10%;
		}

		footer p{
			margin: 0 6%;
		}
	}
</style>
