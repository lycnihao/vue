<template>
	<header id="head_top" class="header">
	  <div class="header-item" style="height: 100%;">
	    <a class="logo" href="/"><img src="@/assets/logo.png" width="100%"></a>
		<ul class="nav">
			<li class="nav-item"><a  href="/" class="active">主页</a></li>
			<!-- <li class="nav-item"><a  href="#test">其他</a></li> -->
		</ul>
	  </div>
	  <div class="header-item">
	  </div>
	  <div class="header-item" style="height: 100%;">
			<ul class="nav menu-inline">
				<li class="nav-item">
					<el-tooltip class="item" effect="dark" content="便签">
						<a  href="/"><img src="@/assets/img/note.svg" width="31px"></a>
					</el-tooltip>
				</li>
				<li class="nav-item">
					<el-popover placement="bottom" title="小工具" width="280" trigger="hover">
						<a href="javascript:void(0);" slot="reference"><img src="@/assets/img/app.svg" width="18px"></a>
						<ul class="tool-list">
							<li><a href="javascript:void(0);"><span class="icon"><i class="el-icon-full-screen"></i></span><span class="title">二维码生成</span></a></li>
							<li><a href="javascript:void(0);"><span class="icon"><i class="el-icon-link"></i></span><span class="title">短链接生成</span></a></li>
						</ul>
					</el-popover>
				</li>
				<li class="nav-item">
					<el-tooltip class="item" effect="dark" content="自定义皮肤背景">
					  <a href="/"><img src="@/assets/img/skin.svg" width="18px"></a>
					</el-tooltip>
				</li>
				<!-- <li class="nav-item"><el-avatar style="vertical-align: middle;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></li> -->
				<li class="nav-item" @click="loginOpen = true"><a>登录</a></li>
				<li class="nav-item" @click="registerOpen = true"><a>注册</a></li>
			</ul>

			<el-dialog title="登录" :visible.sync="loginOpen" :modal-append-to-body="false">
				<el-input v-model="username" placeholder="请输入账号"></el-input>
				<el-input v-model="password" placeholder="请输入密码"></el-input>
				<el-button type="primary" style="width: 100%;" @click="login()">登录</el-button>
				<p @click="registerOpen=true,loginOpen = false">没有账号？<a href="#">立即注册</a></p>
			</el-dialog>
			<el-dialog title="注册" :visible.sync="registerOpen" :modal-append-to-body="false">
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
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 3.75rem;
		line-height: 3.75rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		background-color: #fff;
		-webkit-box-shadow: 0 1px 3px rgba(26,26,26,.1);
		box-shadow: 0 1px 3px rgba(26,26,26,.1);
		display: flex;
		justify-content:space-between;
		align-items:center;
	}

	.header .logo{
	    width: 40px;
	    float: left;
	}

	.logo img{
	  vertical-align: middle;
	}

	.el-dialog{
		width: 500px!important;
	}

	.tool-list {
		width: 100%;
	}

	.tool-list li{
		display: inherit;
		width: 49%;
	}

	.tool-list a{
		display: inline-block;
		width: 100%;
		border-radius:18px;
		background-color: #E6F1FE;
	}

	.tool-list a:hover {
		color: #fff;
		background-color: #409EFF;
	}

	.tool-list a:hover .icon{
		color: #F35C01;
	}

	.tool-list .icon i{
		margin: 2px 8px 2px 2px;
		padding: 10px;
		border-radius: 50%;
		background-color: #fff;
	}

	@media screen and (min-width:1200px) {
		.header{
			padding: 0 10%;
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

		.el-dialog{
			width: 90%!important;;
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

		.el-dialog{
			width: 90%;
		}
	}

</style>
