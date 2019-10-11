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
				<li class="nav-item" v-show="isLogin">
				<el-dropdown trigger="click" placement="top" @command="handleCommand">
					<span class="el-dropdown-link">
					  <el-avatar style="vertical-align: middle;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					</span>
					<el-dropdown-menu slot="dropdown">
					  <el-dropdown-item command="1">我的主页</el-dropdown-item>
					  <el-dropdown-item command="2">设置</el-dropdown-item>
					  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

        </li>
				<li class="nav-item" v-show="!isLogin" @click="loginOpen = true"><a>登录</a></li>
				<li class="nav-item" v-show="!isLogin" @click="registerOpen = true"><a>注册</a></li>
			</ul>

			<el-dialog title="登录" :visible.sync="loginOpen" :modal-append-to-body="false">
				<el-input v-model="username" placeholder="请输入账号"></el-input>
				<el-input v-model="password" placeholder="请输入密码" show-password></el-input>
				<el-button type="primary" style="width: 100%;" @click="login()">登录</el-button>
				<p @click="registerOpen=true,loginOpen = false">没有账号？<a href="#">立即注册</a></p>
			</el-dialog>
			<el-dialog title="注册" :visible.sync="registerOpen" :modal-append-to-body="false">
				<el-input v-model="r_username" placeholder="请输入账号"></el-input>
				<el-input v-model="r_password" placeholder="请输入密码" show-password></el-input>
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
				r_username:'',
				r_password:'',
				loginOpen:false,
				registerOpen:false,
				isLogin:false,
				user:null,
				/* apiUrl: 'http://47.106.84.166:3302/', */
				apiUrl: 'http://127.0.0.1:3302/',
			}
		},
		methods: {
			login:function(){
				this.$http.post('http://localhost:3302/api/user/login',{'username': this.username,'password': this.password },{emulateJSON:true})
				.then(function(res) {
				    if(res.body.code == 1){
						this.$message({message: '登录成功',type: 'success'});
						this.isLogin=true;
						this.loginOpen=false;
            document.cookie="user_session="+res.body.result;
					} else{
						this.$message.error(res.body.msg);
					}
				},function() {
                    this.$message.error('发送请求失败，请检查网络是否通畅');
                });
			},
			register:function(){
				this.$http.post('http://localhost:3302/api/user/register',{'username': this.r_username,'password': this.r_password },{emulateJSON:true})
				.then(function(res) {
				    if(res.body.code == 1){
						this.$message({message: '注册成功',type: 'success'});
						this.registerOpen=false;
					} else{
						this.$message.error(res.body.msg);
					}
				},function() {
				    this.$message.error('发送请求失败，请检查网络是否通畅');
				});
			},
		  handleCommand:function(command){
			switch(command){
			   case 'logout':
				this.logout();
				break;
			}
		  },
		  logout:function(){
			let name = "user_session";
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null){
				for (var i = arr.length; i--;){
				document.cookie = arr[i] + '=0;expires=' + new Date(0).toUTCString()
			  }
			  this.isLogin = false;
			}
		  }
		},
		mounted() {
      let name = "user_session";
      var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
      console.log(arr)
			this.$ajax.defaults.headers.common['token'] = arr[2];
			 this.$ajax.get(this.apiUrl + 'api/user/info').then((response)=>{
				 if(response.data.code == 1){
					 this.user = response.data;
					 this.isLogin = true;
				 }
			});
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
	    width: 100px;
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
		background-color: #9e9e9e24;
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

    .el-dialog{
    	width: 90%!important;;
    }

		.header .logo{
			width: 55px;
		}

		.el-dialog{
			width: 90%;
		}
	}

</style>
