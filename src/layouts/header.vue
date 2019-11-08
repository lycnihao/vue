<template>
	<header id="head_top" class="header">
	  <div class="header-item" style="height: 100%;">
	    <a class="logo" href="/"><img src="@/assets/logo.png" width="100%"></a>
		<ul class="nav">
			<li class="nav-item"><a  href="/" class="active">主页</a></li>
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
					  <a href="javascript:void(0);" @click="skinOpen = true"><img src="@/assets/img/skin.svg" width="21px"></a>
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

			<el-dialog title="登录" :visible.sync="loginOpen" :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true" :lock-scroll="false">
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
			<el-dialog title="注册" :visible.sync="registerOpen" :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true" :lock-scroll="false">
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
			<el-dialog title="换肤" :visible.sync="skinOpen" custom-class="skin_dialog" :modal-append-to-body="false" :destroy-on-close="true" :lock-scroll="false" :modal="false">
				<div class="skin">
					<div class="skin_header">
						<ul class="nav menu-inline">
							<li class="nav-item"><a href="javascript:(0)" @click="tabs('tab1',$event)" class="active"><i class="el-icon-picture-outline"></i> 图片背景</a></li>
							<li class="nav-item"><a href="javascript:(0)" @click="tabs('tab2',$event)" class=""><i class="el-icon-brush"></i> 纯色背景</a></li>
							<li class="nav-item"><a href="javascript:(0)" @click="tabs('tab3',$event)" class=""><i class="el-icon-files"></i> 动态背景</a></li>
							<li class="nav-item"><a href="javascript:(0)" @click="tabs('tab4',$event)" class=""><i class="el-icon-upload"></i> 自定义上传</a></li>
						</ul>
					</div>
					<div class="skin_body">
						<div class="tabpanel show" name='tab1'>
							<ul class="nav menu-inline">
								<li class="nav-item-radius"><a href="javascript:(0);">萌宠</a></li>
								<li class="nav-item-radius"><a href="javascript:(0);">卡通</a></li>
								<li class="nav-item-radius"><a href="javascript:(0);">人物</a></li>
								<li class="nav-item-radius"><a href="javascript:(0);">汽车</a></li>
								<li class="nav-item-radius"><a href="javascript:(0);">风景</a></li>
							</ul>
							<div>
								<ul class="nav menu-inline images_list">
									<li v-for="item in 16">
										<a href="javascript:(0);">
											<div class="images_float"><span>设置皮肤</span></div>
											<div class="images">
												<img src="https://img.bidianer.com/skin/002.jpg?imageView2/1/w/456/h/256">
											</div>
										</a>
										<a href="#" class="download">
											<el-tooltip class="item" effect="dark" content="下载图片" placement="top">
											  <svg t="1573193380691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1170" width="22" height="22"><path d="M959.5 529.5c-2-84-59.4-161.2-144.4-192-46-126.4-165.9-211.5-300-213-132.5-1.4-253.2 79.2-303 202.5-87.4 32.2-146 112.6-147 199.5-1.2 104.1 80.7 199.5 193.9 216h12.8v-0.1h0.5c23.5 0 42.5-19 42.5-42.5s-19-42.5-42.5-42.5H264v-0.4c-65.5-5.3-117-60.2-117-127 0-70.2 56.7-127.1 126.8-127.5 23.4-110.2 121.3-192.9 238.5-192.9s215.1 82.7 238.5 192.9c70.1 0.4 126.8 57.3 126.8 127.5 0 67.9-53 123.3-119.9 127.2v0.2h-6.6c-23.5 0-42.5 19-42.5 42.5s19 42.5 42.5 42.5h0.8v0.1h19.3c111.2-17 190.7-111.4 188.3-213z" p-id="1171" fill="#f9f9f9"></path><path d="M663.9 681.8c-17.6-15.6-44.7-13.9-60.3 3.7l-49.2 55.7V529.5c0-23.2-18.9-42.1-42.1-42.1-23.2 0-42.1 18.9-42.1 42.1v211.6L421 685.5c-15.6-17.6-42.7-19.3-60.3-3.7-17.6 15.6-19.3 42.7-3.7 60.3l123.3 139.4c4.1 4.7 9 8.2 14.4 10.6 0.1 0 0.2 0.1 0.3 0.1l1.5 0.6c0.2 0.1 0.4 0.2 0.6 0.2 0.4 0.2 0.8 0.3 1.2 0.4 0.3 0.1 0.6 0.2 0.8 0.3 0.3 0.1 0.7 0.2 1 0.3 0.3 0.1 0.7 0.2 1 0.3 0.3 0.1 0.6 0.2 0.9 0.2 0.4 0.1 0.8 0.2 1.1 0.3 0.3 0.1 0.6 0.1 0.8 0.2 0.4 0.1 0.8 0.2 1.2 0.2 0.3 0 0.5 0.1 0.8 0.1 0.4 0.1 0.8 0.1 1.2 0.2 0.3 0 0.6 0.1 0.8 0.1 0.4 0 0.8 0.1 1.2 0.1 0.3 0 0.6 0 0.9 0.1h4.2c0.3 0 0.6 0 0.9-0.1 0.4 0 0.8-0.1 1.2-0.1 0.3 0 0.6-0.1 0.8-0.1 0.4 0 0.8-0.1 1.2-0.2 0.3 0 0.5-0.1 0.8-0.1 0.4-0.1 0.8-0.1 1.2-0.2 0.3-0.1 0.6-0.1 0.8-0.2 0.4-0.1 0.8-0.2 1.1-0.3 0.3-0.1 0.6-0.1 0.9-0.2 0.3-0.1 0.7-0.2 1-0.3 0.3-0.1 0.7-0.2 1-0.3 0.3-0.1 0.6-0.2 0.8-0.3 0.4-0.1 0.8-0.3 1.2-0.4 0.2-0.1 0.4-0.2 0.6-0.2l1.5-0.6c0.1 0 0.2-0.1 0.3-0.1 5.3-2.4 10.3-5.9 14.4-10.6l123.3-139.4c16-17.6 14.3-44.8-3.3-60.3z" p-id="1172" fill="#f9f9f9"></path></svg>
											</el-tooltip>							
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="tabpanel" name='tab2'>
							2222
						</div>
						<div class="tabpanel" name='tab3'>
							3333
						</div>
						<div class="tabpanel" name='tab4'>
							4444
						</div>
					</div>
				</div>
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
				skinOpen:false,
				isLogin:false,
				user:null,
				token:''
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
						this.$ajax.post('/hom1/api/user/login',data)
						.then((response)=>{
						    if(response.data.code == 1){
								this.$message({message: '登录成功',type: 'success'});
								this.getInfo();
								this.isLogin=true;
								this.loginOpen=false;
								this.user = response.data.result;
								var d= new Date();
								d.setHours(d.getHours() + (24 * 30)); //保存一个月
								document.cookie="user_session="+response.data.result+"; expires=" + d.toGMTString();
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
					this.$ajax.post('/hom1/api/user/register',data)
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
				  this.token = arr[2];
				  this.$ajax.defaults.headers.common['token'] = arr[2];
				  this.$ajax.get('/hom1/api/user/info')
				  .then((response)=>{
				  	 if(response.data.code == 1){
				  		 this.user = response.data.result;
				  		 this.isLogin = true;
				  	 }
				  });
			  }
		  },
		  tabs:function(name,event){
		  	event.path[3].querySelector(".active").className = "";
		  	event.target.offsetParent.querySelector("a").className = "active";
		  	event.path[6].querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
		  	event.path[6].querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab
			
		  },
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
	
	.skin_dialog{
		width: 1006px!important
	}
	.skin_dialog .el-dialog__body{
		padding:0;
	}
	.skin{
		margin-top: 15px;
	}
	.skin_header{
		box-sizing: border-box;
		background: #f9f9f9;
		padding: 0 20px;
	}
	.skin .skin_header .nav a{
		display: inherit;
	}
	.skin_body{
		padding: 0 15px 10px;
	}
	
	.images_list{
		flex-wrap:wrap;
	}
	.images_list li{
		margin: 8px;
	}
	.images_list li{
	 position: relative;
	 display: block;
	 overflow: hidden;
	 border-radius: 4px;
	}
	
	.images_list li a.download{
		z-index: 10;
		position: absolute;
		right: 12px;
		bottom: -16px;
	}
	
	.images_float{
		position: absolute;
		width: 100%;
		opacity: 0;
		z-index: 10;
		line-height: 128px;
		text-align: center;
		background: rgba(0,0,0,.3);
	}
	.images_float span{
		padding: 10px 25px;
		border: 2px solid #ccc;
		color: #ccc;
		border-radius: 5px;
	}
	.images{
		display: block;
		height: 128px;
		position: relative;
	}
	
	.images img{
		height: 128px;
		width: 228px;
		display: block;
		object-fit: cover;
	}
	
	.images_list a:hover .images_float{
		opacity: 1;
	}
	
	.skin_header .nav .nav-item a.active:after {
		width: 100%;
		left: 0;
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
