<template>
	<footer class="box">
		<ul class="menu">
			<li class="nav-item"><el-link @click="about">关于我们</el-link></li>
			<li class="nav-item"><el-link>商务合作</el-link></li>
			<li class="nav-item"><el-link href="https://wj.qq.com/s2/4216300/3ed1" target="_blank">申请收录</el-link></li>
			<li class="nav-item"><el-link href="https://wj.qq.com/s2/4216517/3dd6" target="_blank">意见反馈</el-link></li>
		</ul>
		<p>红衣导航 - hom1.cn @ All rights Reserved ，本站收录的网站若侵害到您的利益，请联系我们删除处理</p>
	</footer>
</template>

<script>
	export default {
		methods:{
			about:function(){
				this.$router.push('/about')
			}
		}
	}
</script>
<style>
	footer{
		margin: 10px 0px 0px !important;
		padding: 25px 0px !important;;
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
