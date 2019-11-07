<template>
	<footer>
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
			  <div style="text-align: right;">
				  <img src="http://hom1.79xj.cn/favicon.ico" style="width: 80px;">
		      </div>
		  </el-col>
		  <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
			  <div class="ft-info">
				  <ul>
				  	<li><a href="/about" target="_blank">关于我们</a></li>
				  	<li><a href="/milestone" target="_blank">更新日志</a></li>
				  	<li><a href="https://wj.qq.com/s2/4216300/3ed1" target="_blank">申请收录</a></li>
				  	<li><a href="https://wj.qq.com/s2/4216517/3dd6" target="_blank">意见反馈</a></li>
				  </ul>
				   <p style="color:rgb(136, 136, 136);margin-top: 10px;">Copyright &copy; 2019 红衣导航 - hom1.cn All rights Reserved</p>
			  </div>
		  </el-col>
		  <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
			   <div style="text-align: left;">
			  		<img src="http://hom1.79xj.cn/favicon.ico" style="width: 80px;">
			  </div>
		  </el-col>
		</el-row>
		
		

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
	footer ul{
		display: flex;
	}
	footer .ft-info{
		padding: 0px 3%;
	}
	
	footer ul li{
		margin-right: 35px;
	}
	
	footer ul li a{
		color: #d0d0d0;
		font-size: 15px;
	}
	footer p{
		font-size: 12px;
	}

	@media only screen and (max-width: 479px) {
/* 		footer .menu{
		    padding: 0px 10%;
		} */

		footer p{
			margin: 0 6%;
		}
	}
</style>
