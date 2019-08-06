<template>
	<header id="head_top" class="header">
	  <div class="float-left" style="height: 100%;">
	    <a class="logo" href="#"><img src="./../../../assets/logo.png" width="100%"></a>
		<ul class="nav">
			<li class="nav-item"><a  href="#" class="active">主页</a></li>
			<!-- <li class="nav-item"><a  href="#test">其他</a></li> -->
		</ul>
	  </div>
	  <div class="float-right" style="height: 100%;">
			<ul class="nav">
				<li class="nav-item"><a  href="#"><i class="el-icon-edit"></i></a></li>
				<li class="nav-item"><a  href="#test"><i class="el-icon-discount"></i></a></li>
				<li class="nav-item"><a  href="#test"><i class="el-icon-milk-tea"></i></a></li>
				<li class="nav-item"><el-avatar style="vertical-align: middle;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></li>
				<!-- <li class="nav-item" @click="loginOpen = true"><a href="#">登录</a></li>
				<li class="nav-item" @click="registerOpen = true"><a href="#">注册</a></li> -->
			</ul>
			
			<el-dialog title="登录" :visible.sync="loginOpen" width="30%">
				<el-input v-model="username" placeholder="请输入账号"></el-input>
				<el-input v-model="password" placeholder="请输入密码"></el-input>
				<el-button type="primary" style="width: 100%;" @click="login()">登录</el-button>
				<p @click="loginOpen = false,registerOpen=true">没有账号？<a href="#">立即注册</a></p>
				
			</el-dialog>
			<el-dialog title="注册" :visible.sync="registerOpen" width="30%">
				<el-input v-model="username" placeholder="请输入账号"></el-input>
				<el-input v-model="password" placeholder="请输入密码"></el-input>
				<el-button type="primary" style="width: 100%;" @click="register()">注册</el-button>
				<p style="width: 100%;text-align: right;" @click="registerOpen=false,loginOpen = true">已有账号？<a href="#">立即登录</a></p>
			</el-dialog>
	  </div>
	</header>
</template>

<script>
var _hmt = _hmt || [];
window._hmt = _hmt;
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f4cfe8a2f0d23f5be4788a065ecd9a79";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>



<script>
	export default {
		data(){
			return{
				username:'',
				password:'',
				loginOpen:false,
				registerOpen:false
			}
		},
		methods: {
			login:function(){
				this.$message({message: '登录成功',type: 'success'});
				this.loginOpen=false
			},
			register:function(){
				this.$message({message: '注册成功',type: 'success'});
				this.registerOpen=false
			}
		}
	}
</script>

<style>
	header{
		width: 100%;
		height: 3.75rem;
		line-height: 3.75rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		background-color: #fff;
		-webkit-box-shadow: 0 1px 3px rgba(26,26,26,.1);
		box-shadow: 0 1px 3px rgba(26,26,26,.1);
	}
	
	.header .logo{
	    width: 40px;
	    float: left;
	}
	.logo img{
	  vertical-align: middle;
	}
	
	@media screen and (min-width:1200px) {
		.header{
			padding: 0 6%;
		}
		.nav-item a {
			font-size: 14px;
		    padding: 0 5px;
		}
		.nav-item .el-avatar{
			height: 30px;
			width: 30px;
			line-height:30px;
		}
		.header .logo{
			width: 25px;
		}
	}
	
	@media screen and (min-width: 960px) and (max-width: 1199px) {
		.header{
			padding: 0 10px;
		}
		.nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.nav-item .el-avatar{
			height: 30px;
			width: 30px;
			line-height:30px;
		}
		.header .logo{
			width: 25px;
		}
	}
	
	@media screen and (min-width: 768px) and (max-width: 959px) {
		.header{
			padding: 0 10px;
		}
		.nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.nav-item .el-avatar{
			height: 30px;
			width: 30px;
			line-height:30px;
		}
		.header .logo{
			width: 25px;
		}
	}
	
	@media only screen and (min-width: 480px) and (max-width: 767px) {
		.header{
			padding: 0 10px;
		}
		.nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.nav-item .el-avatar{
			height: 30px;
			width: 30px;
			line-height:30px;
		}
		.header .logo{
			width: 25px;
		}
	}
	
	@media only screen and (max-width: 479px) {
		.header{
			padding: 0 10px;
		}
		.nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.nav-item .el-avatar{
			height: 30px;
			width: 30px;
			line-height:30px;
		}
		.header .logo{
			width: 25px;
		}
	}
	
</style>
