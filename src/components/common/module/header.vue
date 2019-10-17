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
						<a href="javascript:void(0);" slot="reference"><img src="@/assets/img/app.svg" width="17px"></a>
						<ul class="tool-list">
							<li><a href="javascript:void(0);"><span class="icon"><i class="el-icon-full-screen"></i></span><span class="title">二维码生成</span></a></li>
							<li><a href="javascript:void(0);"><span class="icon"><i class="el-icon-link"></i></span><span class="title">短链接生成</span></a></li>
						</ul>
					</el-popover>
				</li>
				<li class="nav-item">
					<el-tooltip class="item" effect="dark" content="自定义皮肤背景">
					  <a href="/"><img src="@/assets/img/skin.svg" width="21px"></a>
					</el-tooltip>
				</li>
				<li class="nav-item" v-show="isLogin">
				<el-dropdown trigger="click" placement="top" @command="handleCommand">
					<span class="el-dropdown-link">
					  <el-avatar style="vertical-align: middle;" :src="user!=null ? user.userAvatar : ''"></el-avatar>
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

			<el-dialog title="登录" :visible.sync="loginOpen" :modal-append-to-body="false" :close-on-click-modal="false">
				<el-form :model="logForm" ref="logForm" :rules="rules" status-icon>
					<el-form-item prop="username">
						<el-input v-model="logForm.username" placeholder="输入您的用户名或邮箱地址"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="logForm.password" placeholder="输入您的密码" show-password></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" style="width: 100%;" @click="login()">登录</el-button>
				<p @click="registerOpen=true,loginOpen = false">没有账号？<a href="#">立即注册</a></p>
			</el-dialog>
			<el-dialog title="注册" :visible.sync="registerOpen" :modal-append-to-body="false" :close-on-click-modal="false">				
				<el-form :model="regForm" ref="regForm" :rules="rules" status-icon>
				  <el-form-item prop="username">
					<el-input v-model="regForm.username" placeholder="请输入您的用户名"></el-input>
				  </el-form-item>
				  <el-form-item prop="password">
				  	<el-input v-model="regForm.password" placeholder="请输入您的密码" show-password></el-input>
				  </el-form-item>
				  <el-form-item prop="checkPass">
				  	<el-input v-model="regForm.checkPass" placeholder="请确认您的密码" show-password></el-input>
				  </el-form-item>
				  <el-form-item prop="qq">
				  	<el-input v-model.number="regForm.qq" placeholder="请输入您的QQ"></el-input>
				  </el-form-item>
				  <el-form-item prop="email">
				  		<el-input v-model="regForm.email" placeholder="请输入您的邮箱地址"></el-input>
				  </el-form-item>
				</el-form>
				
				<el-button type="primary" style="width: 100%;" @click="register()">注册</el-button>
				<p style="width: 100%;text-align: right;" @click="registerOpen=false,loginOpen = true">已有账号？<a href="#">立即登录</a></p>
			</el-dialog>
	  </div>
	</header>
</template>

<script>
	export default {
		data(){
			let validatePass = (rule, value, callback) => {
				if (value === '') {
				  callback(new Error('请再次输入密码'));
				} else if (value !== this.regForm.password) {
				  callback(new Error('两次输入密码不一致!'));
				} else {
				  callback();
				}
			};
			return{
				username:'',
				password:'',
				logForm:{
					username:'',
					password:'',
				},
				regForm:{
					username:'',
					password:'',
					checkPass:'',
					email:'',
					qq:''
				},
				rules: {
					username: [{ required: true, message: '请输入登陆用户名', trigger: 'blur' },{ min: 3, max: 16, message: '长度在 3 到 12 个字符', trigger: 'blur' }],
					password: [{ required: true, message: '请输入登陆密码', trigger: 'blur' },{ min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
					checkPass: [{ validator: validatePass, trigger: 'blur' } ],
					qq:[{ min: 10000, max: 9999999999, message: '长度在 5 到 10 的数字', type:'number'}],
					email: [ { required: false, message: '请输入邮箱地址', trigger: 'blur' },{ required: false, message: '请输入正确的邮箱地址', trigger: 'blur', type: 'email' }],
				},
				loginOpen:false,
				registerOpen:false,
				isLogin:false,
				user:null,
				apiUrl: 'http://47.106.84.166:3302/',
				/* apiUrl: 'http://127.0.0.1:3302/' */
			}
		},
		methods: {
			resetForm:function(formName) {
				this.$refs[formName].resetFields();
			},
			login:function(){
				let data = new FormData();
				data.append('username',this.logForm.username);
				data.append('password',this.logForm.password);
				this.$refs.logForm.validate((valid) => {
					if (valid) {
						this.$ajax.post('http://47.106.84.166:3302/api/user/login',data)
						.then((response)=>{
						    if(response.data.code == 1){
								this.$message({message: '登录成功',type: 'success'});
								this.getInfo();
								this.isLogin=true;
								this.loginOpen=false;
								this.user = response.data.result;
								document.cookie="user_session="+response.data.result;
								window.location.reload();
							} else{
								this.$message.error(response.data.msg);
							}
						}).catch((response)=>{
						    this.$message.error('发送请求失败，请检查网络是否通畅');
						});
					}else{
						console.log('error submit!!');
						return false;
					}
				});
			},
			register:function(){
				this.$refs.regForm.validate((valid) => {
				  if (valid) {
					let data = new FormData();
					data.append('username',this.regForm.username);
					data.append('password',this.regForm.password);
					data.append('email',this.regForm.email);
					data.append('qq',this.regForm.qq);
					this.$ajax.post(this.apiUrl+'/api/user/register',data)
					.then((response)=>{
					    if(response.data.code == 1){
							this.$message({message: '注册成功',type: 'success'});
							this.registerOpen=false;
						} else{
							this.$message.error(response.data.msg);
						}
					}).catch((response)=>{
					    this.$message.error('发送请求失败，请检查网络是否通畅');
					});
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
		  handleCommand:function(command){
			switch(command){
			   case 'logout':
				this.logout();
				window.location.reload();
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
		  },
		  getInfo:function(){
			  let name = "user_session";
			  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			  if(arr != null){
				  this.$ajax.defaults.headers.common['token'] = arr[2];
				  this.$ajax.get(this.apiUrl + 'api/user/info')
				  .then((response)=>{
				  	 if(response.data.code == 1){
				  		 this.user = response.data.result;
				  		 this.isLogin = true;
				  	 }
				  });
			  }
		  }
		},
		mounted() {
			this.getInfo();
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
		display: inline-block;
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
