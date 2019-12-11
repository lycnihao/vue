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
				<!-- <li class="nav-item">
					<el-tooltip class="item" effect="dark" content="便签">
						<a  href="/"><img src="@/assets/img/note.svg" width="31px"></a>
					</el-tooltip>
				</li> -->
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
				<li class="nav-item" v-show="!isLogin"><a href="login">登录</a></li>
				<li class="nav-item" v-show="!isLogin"><a href="register">注册</a></li>
			</ul>

			<el-dialog title="换肤" :visible.sync="skinOpen" custom-class="skin_dialog" :modal-append-to-body="false" :destroy-on-close="true" :lock-scroll="false" :modal="false">
				<div class="skin">
					<div class="skin_header">
						<div class="skin_option" style="float: right;">
							<div class="skin_slider">
								<label>背景虚化
									<el-tooltip class="item" effect="dark" content="数值越大背景越模糊，背景对文字干扰越小" placement="top">
									  <i class="el-icon-question"></i>
									</el-tooltip>
								</label>
								<div class="skin_content"><el-slider v-model="cssBlur" :step="1" :max="50"></el-slider></div>
							</div>
						</div>
						<ul class="nav menu-inline">
							<li class="nav-item"><a href="Javascript:void(0);" @click="tabs('tab1',$event)" class="active"><i class="el-icon-picture-outline"></i> 图片背景</a></li>
							<li class="nav-item"><a href="Javascript:void(0);" @click="tabs('tab2',$event)" class=""><i class="el-icon-brush"></i> 纯色背景</a></li>
							<li class="nav-item"><a href="Javascript:void(0);" @click="tabs('tab3',$event)" class=""><i class="el-icon-files"></i> 动态背景</a></li>
							<li class="nav-item"><a href="Javascript:void(0);" @click="tabs('tab4',$event)" class=""><i class="el-icon-upload"></i> 自定义上传</a></li>
						</ul>
					</div>
					<div class="skin_body">
						<div class="tabpanel show" name='tab1'>
							<!-- <ul class="nav menu-inline">
								<li class="nav-item-radius"><a href="Javascript:void(0);">萌宠</a></li>
								<li class="nav-item-radius"><a href="Javascript:void(0);">卡通</a></li>
								<li class="nav-item-radius"><a href="Javascript:void(0);">人物</a></li>
								<li class="nav-item-radius"><a href="Javascript:void(0);">汽车</a></li>
								<li class="nav-item-radius"><a href="Javascript:void(0);">风景</a></li>
							</ul> -->
							<div>
								<ul class="nav menu-inline images_list">
									<li v-for="item of background_img" @click="optionBackground(item.url)">
										<a href="Javascript:void(0);">
											<div class="images_float"><span>设置皮肤</span></div>
											<div class="images">
												<img :src="item.url">
											</div>
										</a>
										<a :href="item.url+'?attname='+item.name" class="download" target="_blank">
											<el-tooltip class="item" effect="dark" content="下载图片" placement="top">
											  <svg t="1573193380691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1170" width="22" height="22"><path d="M959.5 529.5c-2-84-59.4-161.2-144.4-192-46-126.4-165.9-211.5-300-213-132.5-1.4-253.2 79.2-303 202.5-87.4 32.2-146 112.6-147 199.5-1.2 104.1 80.7 199.5 193.9 216h12.8v-0.1h0.5c23.5 0 42.5-19 42.5-42.5s-19-42.5-42.5-42.5H264v-0.4c-65.5-5.3-117-60.2-117-127 0-70.2 56.7-127.1 126.8-127.5 23.4-110.2 121.3-192.9 238.5-192.9s215.1 82.7 238.5 192.9c70.1 0.4 126.8 57.3 126.8 127.5 0 67.9-53 123.3-119.9 127.2v0.2h-6.6c-23.5 0-42.5 19-42.5 42.5s19 42.5 42.5 42.5h0.8v0.1h19.3c111.2-17 190.7-111.4 188.3-213z" p-id="1171" fill="#f9f9f9"></path><path d="M663.9 681.8c-17.6-15.6-44.7-13.9-60.3 3.7l-49.2 55.7V529.5c0-23.2-18.9-42.1-42.1-42.1-23.2 0-42.1 18.9-42.1 42.1v211.6L421 685.5c-15.6-17.6-42.7-19.3-60.3-3.7-17.6 15.6-19.3 42.7-3.7 60.3l123.3 139.4c4.1 4.7 9 8.2 14.4 10.6 0.1 0 0.2 0.1 0.3 0.1l1.5 0.6c0.2 0.1 0.4 0.2 0.6 0.2 0.4 0.2 0.8 0.3 1.2 0.4 0.3 0.1 0.6 0.2 0.8 0.3 0.3 0.1 0.7 0.2 1 0.3 0.3 0.1 0.7 0.2 1 0.3 0.3 0.1 0.6 0.2 0.9 0.2 0.4 0.1 0.8 0.2 1.1 0.3 0.3 0.1 0.6 0.1 0.8 0.2 0.4 0.1 0.8 0.2 1.2 0.2 0.3 0 0.5 0.1 0.8 0.1 0.4 0.1 0.8 0.1 1.2 0.2 0.3 0 0.6 0.1 0.8 0.1 0.4 0 0.8 0.1 1.2 0.1 0.3 0 0.6 0 0.9 0.1h4.2c0.3 0 0.6 0 0.9-0.1 0.4 0 0.8-0.1 1.2-0.1 0.3 0 0.6-0.1 0.8-0.1 0.4 0 0.8-0.1 1.2-0.2 0.3 0 0.5-0.1 0.8-0.1 0.4-0.1 0.8-0.1 1.2-0.2 0.3-0.1 0.6-0.1 0.8-0.2 0.4-0.1 0.8-0.2 1.1-0.3 0.3-0.1 0.6-0.1 0.9-0.2 0.3-0.1 0.7-0.2 1-0.3 0.3-0.1 0.7-0.2 1-0.3 0.3-0.1 0.6-0.2 0.8-0.3 0.4-0.1 0.8-0.3 1.2-0.4 0.2-0.1 0.4-0.2 0.6-0.2l1.5-0.6c0.1 0 0.2-0.1 0.3-0.1 5.3-2.4 10.3-5.9 14.4-10.6l123.3-139.4c16-17.6 14.3-44.8-3.3-60.3z" p-id="1172" fill="#f9f9f9"></path></svg>
											</el-tooltip>							
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="tabpanel" name='tab2'>
							<ul class="nav menu-inline images_list">
								<li v-for="item of colors">
									<a href="Javascript:void(0);" class="color">
										<div class="images_text color_text" @click="optionColor(item[0])"><span :style="'color:'+item[1]">{{item[1]}}</span></div>
										<div class="images" :style="'background-color: ' + item[0] + ';border:0 '+item[1]+' dashed'">
										</div>
									</a>
								</li>
							</ul>
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
				skinOpen:false,
				isLogin:false,
				user:null,
				token:'',
				background_img:[
				{'name':'www.couldr.com/001.jpg','url':'http://img.168dh.cn/skin/001.jpg'},
				{'name':'www.couldr.com/002.jpg','url':'http://img.168dh.cn/skin/002.jpg'},
				{'name':'www.couldr.com/003.jpg','url':'http://img.168dh.cn/skin/003.jpg'}],
				colors:[['#FFEBEE','#EF9A9A'],['#FFCDD2','#E57373'],['#EF9A9A','#EF5350'],['#E57373','#F44336'],
						['#FBE9E7','#FFAB91'],['#FFCCBC','#FF8A65'],['#FFAB91','#FF7043'],['#FF8A65','#FF5722'],
						['#FFF3E0','#EF9A9A'],['#FFE0B2','#E57373'],['#FFCC80','#EF5350'],['#FFB74D','#F44336'],
						['#FFFDE7','#FDD835'],['#FFF9C4','#FBC02D'],['#FFF59D','#F9A825'],['#FFF176','#F57F17'],
						['#F9FBE7','#C0CA33'],['#F0F4C3','#AFB42B'],['#E6EE9C','#9E9D24'],['#DCE775','#827717'],
						['#F1F8E9','#7CB342'],['#DCEDC8','#689F38'],['#C5E1A5','#558B2F'],['#AED581','#33691E'],
						['#E8F5E9','#43A047'],['#C8E6C9','#388E3C'],['#A5D6A7','#2E7D32'],['#81C784','#1B5E20'],
						['#E0F2F1','#00897B'],['#B2DFDB','#00796B'],['#80CBC4','#00695C'],['#4DB6AC','#004D40'],
						['#E0F7FA','#00ACC1'],['#B2EBF2','#0097A7'],['#80DEEA','#00838F'],['#4DD0E1','#006064'],
						['#E1F5FE','#039BE5'],['#B3E5FC','#0288D1'],['#81D4FA','#0277BD'],['#4FC3F7','#01579B'],
						['#E3F2FD','#1E88E5'],['#BBDEFB','#1976D2'],['#90CAF9','#1565C0'],['#64B5F6','#0D47A1'],
						['#E8EAF6','#3949AB'],['#C5CAE9','#303F9F'],['#9FA8DA','#283593'],['#7986CB','#1A237E'],
						['#EDE7F6','#5E35B1'],['#D1C4E9','#512DA8'],['#B39DDB','#4527A0'],['#9575CD','#311B92'],
						['#F3E5F5','#8E24AA'],['#E1BEE7','#7B1FA2'],['#CE93D8','#6A1B9A'],['#BA68C8','#4A148C'],
						['#FCE4EC','#D81B60'],['#F8BBD0','#C2185B'],['#F48FB1','#AD1457'],['#F06292','#880E4F'],
						['#EFEBE9','#6D4C41'],['#D7CCC8','#5D4037'],['#BCAAA4','#4E342E'],['#A1887F','#3E2723'],
						['#ECEFF1','#546E7A'],['#CFD8DC','#455A64'],['#B0BEC5','#37474F'],['#90A4AE','#263238'],
					],
				cssBlur:0,
			}
		},
		methods: {
			resetForm:function(formName) {
				this.$refs[formName].resetFields();
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
			let name = "request_token";
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null){
				for (var i = arr.length; i--;){
				document.cookie = arr[i] + '=0;expires=' + new Date(0).toUTCString()
			  }
			  this.isLogin = false;
			}
		  },
		  getInfo:function(){
			  let name = "request_token";
			  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			  if(arr != null){
				  this.token = arr[2];
				  this.$ajax.defaults.headers.common['request_token'] = arr[2];
				  this.$ajax.get('/hom1/api/user/info')
				  .then((response)=>{
				  	 if(response.data.code == 1 && response.data.result != null){
				  		 this.user = response.data.result;
				  		 this.$parent.isLogin = this.isLogin = true;
				  	 }
				  });
			  }
		  },
		  tabs:function(name,event){
			document.querySelector(".skin .active").className = "";
			event.target.className = "active";
			document.querySelector('.skin .tabpanel.show').className = "tabpanel"; //隐藏旧tab
			document.querySelector(`.skin .tabpanel[name='${name}']`).className += " show"; //显示新的tab
		  },
		  optionBackground:function(item){
			 this.$parent.$refs.search.theme = {'name':'background','value':item},
			 localStorage.setItem("theme", JSON.stringify({'name':'background','value':item,'cssBlur':0}));
		  },
		  optionColor:function(item){
			  this.$parent.$refs.search.theme = {'name':'color','value':item},
			  localStorage.setItem("theme", JSON.stringify({'name':'color','value':item}));
		  }
		},
		watch:{
			cssBlur:function(val){
				this.$set(this.$parent.$refs.search.theme,"cssBlur", val)
				var obj = this.$parent.$refs.search.theme;
				localStorage.setItem("theme",JSON.stringify({'name':'background','value':obj.value,'cssBlur':val}));
			},
		},
		mounted() {
			this.getInfo();
			var theme = JSON.parse(localStorage.getItem("theme"));
			if(theme){
				this.cssBlur = theme.cssBlur;
				this.$parent.$refs.search.theme = theme;
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
		background-color: rgba(255,255,255,0.95);
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
	
	.skin_slider{
		height: 36px;
	}
	
	.skin_slider label i{
		cursor: pointer;
	}
	.skin_slider .skin_content{
		width: 200px;
		margin: 0 15px;
		display: inline-block;
	}
	
	.skin_slider .skin_content .el-slider__runway{
		margin: 0;
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
	
	.images_text{
		position: absolute;
		width: 100%;
		z-index: 10;
		line-height: 128px;
		text-align: center;
	}
	
	.color_text{
		font-size: 19px;
	}
	
	.color .images_text:hover + .images{
		border-width: 2px!important;
	}
	
	.images{
		display: block;
		width: 228px;
		height: 128px;
		position: relative;
		box-sizing: border-box;
	}
	
	.images img{
		height: 128px;
		width: 228px;
		display: block;
		object-fit: cover;
	}
	
	.images_list a:hover .images_float{
		opacity: 1;
		transition: all .4s ease;
	}
	
	.skin_header .nav .nav-item a.active:after {
		width: 100%;
		left: 0;
	}
	
	.login_icon{
		position: relative;
		display: block;
		width: 50px;
		height: 50px;
		margin: auto;
	}

	@media screen and (min-width:1200px) {
		.header{
			padding: 0 14%;
		}
		.header .nav-item a {
			font-size: 14px;
		    padding: 0 5px;
		}
		.header .nav-item .el-avatar{
			height: 30px;
			width: 30px;
			line-height:30px;
		}
	}
	
	@media screen and (min-width: 960px) and (max-width: 1199px) {
		.header{
			padding: 0 10px;
		}
		.header .nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.header .nav-item .el-avatar{
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
		.header .nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.header .nav-item .el-avatar{
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
		.header .nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.header .nav-item .el-avatar{
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
		.header .nav-item a {
				font-size: 12px;
		    padding: 0 5px;
		}
		.header .nav-item .el-avatar{
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
