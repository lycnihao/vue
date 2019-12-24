<template>
	<header id="head_top">
		<div class="header-simple">
			<div class="header-item float-left" style="height: 100%;">
			    <a class="logo" href="/"><img src="@/assets/logo-simple.png" width="100%"></a>
			</div>
			<div class="header-item float-right" style="height: 100%;">
				<div class="block">
					<a class="header-weather" href="#">
						<img class="weather-icon" :src="headerWeather.nowWeather.cond_img"/> {{headerWeather.nowWeather.tmp}}°
					</a>
				</div>
				<div class="block">
					<a class="text">{{headerWeather.cityName}}</a>
				</div>
			</div>
		</div>
		<div class="header">
			<div class="header-item float-left" style="height: 100%;">
			    <a class="logo" href="/"><img src="@/assets/logo.png" width="100%"></a>
				<ul class="nav">
					<li class="header-nav-item"><a  href="/" class="active">主页</a></li>
				</ul>
			  </div>
			  <div class="header-item float-right" style="height: 100%;">
					<ul class="nav menu-inline">
						<li class="header-nav-item">
							<el-popover placement="bottom" title="小工具" width="280" trigger="hover">
								<a href="javascript:void(0);" slot="reference"><img src="@/assets/img/app.svg" width="17px"></a>
								<ul class="tool-list">
									<li><a href="javascript:void(0);"><span class="icon"><i class="el-icon-full-screen"></i></span><span class="title">二维码生成</span></a></li>
									<li><a href="javascript:void(0);"><span class="icon"><i class="el-icon-link"></i></span><span class="title">短链接生成</span></a></li>
								</ul>
							</el-popover>
						</li>
								
						<li class="header-nav-item">
							<el-tooltip class="item" effect="dark" content="自定义皮肤背景">
							  <a href="javascript:void(0);" @click="skinOpen = true"><img src="@/assets/img/skin.svg" width="21px"></a>
							</el-tooltip>
						</li>
						<li class="header-nav-item" v-show="!isLogin"><a href="login">登录</a></li>
						<li class="header-nav-item" v-show="!isLogin"><a href="login">注册</a></li>
						<li class="header-nav-item" v-show="isLogin">
							<el-dropdown trigger="click" placement="top" @command="handleCommand">
								<div>
									<span class="user-icon" v-show="!isLogin"><i class="el-icon-user"></i></span>
									<span class="el-dropdown-link">
									  <el-avatar style="vertical-align: middle;" :src="user!=null ? user.userAvatar : ''"></el-avatar>
									</span>
								</div>
								<el-dropdown-menu slot="dropdown" class="header-menu-dropdown">
								  <el-dropdown-item command="people" icon="el-icon-user-solid">我的主页</el-dropdown-item>
								  <el-dropdown-item command="2" icon="el-icon-s-check">设置</el-dropdown-item>
								  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
					</ul>
			
					<el-dialog title="换肤" :visible.sync="skinOpen" custom-class="skin_dialog" :modal-append-to-body="false" :destroy-on-close="true" :lock-scroll="false" :modal="false">
						<div class="skin">
							<div class="skin_header">
								<ul class="nav menu-inline">
									<li class="nav-item"><a href="Javascript:void(0);" @click="tabs('tab1',$event)" class="active"><i class="el-icon-picture-outline"></i> 图片背景</a></li>
									<li class="nav-item"><a href="Javascript:void(0);" @click="tabs('tab2',$event)" class=""><i class="el-icon-brush"></i> 纯色背景</a></li>
									<li class="nav-item"><a href="Javascript:void(0);" @click="tabs('tab3',$event)" class=""><i class="el-icon-upload"></i> 自定义</a></li>
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
										<li v-for="item of colorList">
											<a href="Javascript:void(0);" class="color">
												<div class="images_text color_text" @click="optionColor(item[0])"><span :style="'color:'+item[1]">{{item[1]}}</span></div>
												<div class="images" :style="'background-color: ' + item[0] + ';border:0 '+item[1]+' dashed'">
												</div>
											</a>
										</li>
									</ul>
								</div>
								<div class="tabpanel" name='tab3'>
									<div class="skin_slider">
										<label>
											<el-switch
											  v-model="custom.frostedGlass"
											  inactive-text="毛玻璃">
											</el-switch>
										</label>
										<label>面板透明度
											<el-tooltip class="item" effect="dark" content="数值越大面板越透明，建议不要太小，以免看不清文字" placement="top">
											  <i class="el-icon-question"></i>
											</el-tooltip>
										</label>
										<div class="skin_content"><el-slider v-model="cssPanel" :step="1" :max="100"></el-slider></div>
										<label>背景虚化
											<el-tooltip class="item" effect="dark" content="数值越大背景越模糊，背景对文字干扰越小" placement="top">
											  <i class="el-icon-question"></i>
											</el-tooltip>
										</label>
										<div class="skin_content"><el-slider v-model="cssBlur" :step="1" :max="50"></el-slider></div>
										<label><el-button @click="cssReset()" type="danger" size="mini" round><i class="el-icon-refresh"></i> 恢复默认</el-button></label>
									</div>
									<div>
										<label class="h3">背景图</label>
										<small>背景图会被拉伸到浏览器窗口大小, 合理的比例会取得更好的效果</small>
										<el-upload action="" :http-request="avatarUpload" :show-file-list="false">
											<div class="preview" v-if="theme.name == 'background'" :style="'background-image: url('+theme.value+');background-size: cover;'" ></div>
											<div v-else>无</div>
										</el-upload>
									</div>
									<div style="display: inline-block;width: 25%;">
										<label class="h3">主题颜色</label>
										<div class="colorInfo--37Ift">
											<el-color-picker
											  v-model="custom.themeColor"
											  :predefine="predefineColors">
											</el-color-picker>
											<span>{{custom.themeColor!=''?custom.themeColor:'默认'}}</span>
										</div>
									</div>
									<div style="display: inline-block;">
										<label class="h3">文字颜色</label>
										<div class="colorInfo--37Ift">
											<el-color-picker
											  v-model="custom.fontColor"
											  :predefine="predefineColors"
											  >
											</el-color-picker>
											<span>{{custom.fontColor!=''?custom.fontColor:'默认'}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-dialog>
			  </div>
		</div>
	</header>
</template>

<script>
	 import generateColors from '../utils/color';
	export default {
		data(){
			return{
				skinOpen:false,
				isLogin:false,
				user:null,
				token:'',
				background_img:[
				{'name':'www.couldr.com/001.jpg','url':'http://img.168dh.cn/skin/001.jpg'},
				{'name':'www.couldr.com/002.jpg','url':'http://img.168dh.cn/skin/002.jpg'},
				{'name':'www.couldr.com/004.jpg','url':'http://img.168dh.cn/skin/004.jpg'},
				{'name':'www.couldr.com/005.jpg','url':'http://img.168dh.cn/skin/005.jpg'},
				{'name':'www.couldr.com/006.jpg','url':'http://img.168dh.cn/skin/006.jpg'},
				{'name':'www.couldr.com/007.jpg','url':'http://img.168dh.cn/skin/007.jpg'},
				{'name':'www.couldr.com/008.jpg','url':'http://img.168dh.cn/skin/008.jpg'},
				{'name':'www.couldr.com/009.jpg','url':'http://img.168dh.cn/skin/009.jpg'},
				{'name':'www.couldr.com/010.jpg','url':'http://img.168dh.cn/skin/010.jpg'},
				{'name':'www.couldr.com/011.jpg','url':'http://img.168dh.cn/skin/011.jpg'},
				{'name':'www.couldr.com/012.jpg','url':'http://img.168dh.cn/skin/012.jpg'},
				{'name':'www.couldr.com/013.jpg','url':'http://img.168dh.cn/skin/013.jpg'},
				{'name':'www.couldr.com/014.jpg','url':'http://img.168dh.cn/skin/014.jpg'},
				{'name':'www.couldr.com/015.jpg','url':'http://img.168dh.cn/skin/015.jpg'},
				{'name':'www.couldr.com/016.jpg','url':'http://img.168dh.cn/skin/016.jpg'},
				],
				
				colorList:[['#FFEBEE','#EF9A9A'],['#FFCDD2','#E57373'],['#EF9A9A','#EF5350'],['#E57373','#F44336'],
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
				cssPanel:100,
				theme:{'name':'background','value':'http://img.168dh.cn/skin/001.jpg','cssBlur':'0'},
				headerWeather:{
					nowWeather:{},
					cityName:'',
				},
				custom:{
					frostedGlass:false,
					themeColor:'',
					fontColor:'',
				},
				 predefineColors: [
					  '#ff4500',
					  '#ff8c00',
					  '#ffd700',
					  '#90ee90',
					  '#00ced1',
					  '#1e90ff',
					  '#c71585',
					  'rgba(255, 69, 0, 0.68)',
					  'rgb(255, 120, 0)',
					  'hsv(51, 100, 98)',
					  'hsva(120, 40, 94, 0.5)',
					  'hsl(181, 100%, 37%)',
					  'hsla(209, 100%, 56%, 0.73)',
					  '#c7158577'
					],
					bg:'',
			}
		},
		methods: {
			avatarUpload:function(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				let data = new FormData();
				data.append('file',file.file);
			
				this.$ajax.post('/couldr/api/option/skinUpload',data)
				.then((response)=>{
					if(response.data.code == 1){
						this.theme.name = response.data.result.filePath;
						this.optionBackground(response.data.result.filePath);
					} else{
						this.$message.error(response.data.msg);
					}
				}).catch((response)=>{
					this.$message.error('发送请求失败，请检查网络是否通畅');
				});
			},
		  cssReset:function(){
			localStorage.removeItem("cssPanel");
			localStorage.removeItem("themeColor");
			localStorage.removeItem("fontColor");
			this.cssBlur = 0;
			this.cssPanel = 100;
			this.custom.fontColor = '';
			this.custom.themeColor = '';
			this.custom.frostedGlass = false;
			localStorage.setItem("theme",JSON.stringify({'name':'background','value':this.theme.value,'cssBlur':'0'}));
			this.$message({message: '恢复初始状态',type: 'success'});
			document.querySelector("#cssPanel").innerText = "";
			document.querySelector("#themeColor").innerText = "";
			document.querySelector("#fontColor").innerText = "";
			
		  },
		  handleCommand:function(command){
			switch(command){
				case 'people':
					window.location.href = "/people"
					break;
			   case 'logout':
					this.logout();
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
			  window.location.reload();
			}
		  },
		  getInfo:function(){
			  let name = "request_token";
			  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			  if(arr != null){
				  this.token = arr[2];
				  this.$ajax.defaults.headers.common[name] = arr[2];
				  this.$ajax.get('/couldr/api/user/info')
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
			 this.theme = this.$parent.$refs.search.theme = {'name':'background','value':item},
			 localStorage.setItem("theme", JSON.stringify({'name':'background','value':item,'cssBlur':0}));
		  },
		  optionColor:function(item){
			  this.theme = this.$parent.$refs.search.theme = {'name':'color','value':item},
			  localStorage.setItem("theme", JSON.stringify({'name':'color','value':item}));
		  },
		  optionFontColor:function(fontColor){
			  localStorage.setItem("fontColor", fontColor);
			  var colors = generateColors(fontColor);
			  var cssText = ".user-website .site-info h3{color:"+fontColor+"}"
			  cssText += ".site-list .site-info h3{color:"+colors.emptyText+"}"
			  cssText += ".site-list .site-info p{color:"+colors.baseSilver+"}"
			  cssText += ".site-list .site-item:hover p{color:"+colors.baseSilver+"}"
			  
			  var domFontColor = document.querySelector('#fontColor')
			  if(domFontColor){
			  	domFontColor.innerText = cssText
			  }else{
			  	const style = document.createElement('style');
			  	style.setAttribute('id','fontColor');
			  	style.innerText = cssText;
			  	document.head.appendChild(style);
			  }	
		  },
		  optionThemeColor:function(themeColor){
			localStorage.setItem("themeColor", themeColor);
			var colors = generateColors(themeColor);
			var cssText = ".box-header h3{color:"+themeColor+"}"
			cssText += ".hot-link a:hover{color:"+themeColor+"}"
			cssText += ".site-list .site-item:hover h3{color:"+themeColor+"}"
			cssText += ".nav.menu-inline .nav-item a{color:"+colors.baseSilver+"}"
			cssText += ".nav-item a, .nav-item-radius a{color:"+colors.lightSilver+"}"
			cssText += ".nav-item a.active{color:"+themeColor+"}"
			cssText += ".nav.menu-inline .nav-item a.active{color:"+themeColor+"}"
			cssText += ".nav-item a.active:after{background:"+themeColor+"}"
			cssText += ".site-tabs .tablist li a.active{background-color:"+themeColor+"}"
			cssText += ".nextMonth span,.preMonth span{color:"+colors.lightGray+"}"
			cssText += ".info,.info a{color:"+colors.selectOptionSelected+"}"
			cssText += ".day-item .day	{color:"+colors.selectOptionSelected+"!important}"
								
								
			var domThemeColor = document.querySelector('#themeColor')
			if(domThemeColor){
				domThemeColor.innerText = cssText
			}else{
				const style = document.createElement('style');
				style.setAttribute('id','themeColor');
				style.innerText = cssText;
				document.head.appendChild(style);
			}			
			
		  },
		  optionCssPanel:function(val){
			  localStorage.setItem("cssPanel",val);
			  var cssText = '.header,.box{background:rgba(255,255,255,'+ (val / 100) +')}'
			  cssText += '.box .box-header{border-bottom:1px rgba(245,245,245,'+ (val / 100) +') solid}'
			  var domCssPanel = document.querySelector('#cssPanel')
			  if(domCssPanel){
				  domCssPanel.innerText = cssText
			  }else{
				  const style = document.createElement('style');
				  style.setAttribute('id','cssPanel');
				  style.innerText = cssText;
				  document.head.appendChild(style);
			  }
			   
		  },
		  
		  optionFrostedGlass:function(frostedGlass){
				if(frostedGlass == true){
					var body = document.querySelector('body');
					body.className = body.className + ' frostedCss'
					localStorage.setItem("frostedGlass",true);
					
					var domFrostedGlass = document.querySelector('#frostedGlass')
					console.log(domFrostedGlass)
					if(domFrostedGlass){
						domFrostedGlass.innerText = '.frostedCss .box:after{background: url('+this.theme.value+') fixed center -50px/cover no-repeat;}';
					} else {
						const style = document.createElement('style');
						style.setAttribute('id','frostedGlass');
						style.innerText = '.frostedCss .box:after{background: url('+this.theme.value+') fixed center -50px/cover no-repeat;}';
						document.head.appendChild(style);
					}
					
					
				}else{
					localStorage.setItem("frostedGlass",false);
					document.querySelector('body').className = '';
				}
				
		  }
		  
		  /* getStyleTemplate(data) {
			const colorMap = {
			  '#20a0ff': 'primary',
			  '#0190fe': 'secondary',
			  '#fbfdff': 'darkWhite',
			  '#1f2d3d': 'baseBlack',
			  '#324157': 'lightBlack',
			  '#48576a': 'extraLightBlack',
			  '#8391a5': 'baseSilver',
			  '#97a8be': 'lightSilver',
			  '#bfcbd9': 'extraLightSilver',
			  '#d1dbe5': 'baseGray',
			  '#e4e8f1': 'lightGray',
			  '#eef1f6': 'extraLightGray',
			  '#1d90e6': 'buttonActive',
			  '#4db3ff': 'buttonHover',
			  '#dfe6ec': 'tableBorder',
			  '#d2ecff': 'datepickerInRange',
			  '#afddff': 'datepickerInRangeHover',
			  '#1c8de0': 'selectOptionSelected',
			  '#edf7ff': 'lightBackground'
			};
			Object.keys(colorMap).forEach(key => {
			  const value = colorMap[key];
			  data = data.replace(new RegExp(key, 'ig'), value);
			});
			return data;
		  }, */
		},
		watch:{
			cssPanel:function(val){
				this.optionCssPanel(val);
			},
			cssBlur:function(val){
				this.$set(this.$parent.$refs.search.theme,"cssBlur", val)
				var obj = this.$parent.$refs.search.theme;
				localStorage.setItem("theme",JSON.stringify({'name':'background','value':obj.value,'cssBlur':val}));
			},
			custom:{
				handler(newValue, oldValue) {		
					
					if(newValue.fontColor != ''){
						this.optionFontColor(newValue.fontColor)
					}
					
					if(newValue.themeColor != ''){
						this.optionThemeColor(newValue.themeColor)
					}
					this.optionFrostedGlass(newValue.frostedGlass);
		　　　　},
		　　　　deep: true
			}
		},
		mounted() {
			this.getInfo();
			var theme = JSON.parse(localStorage.getItem("theme"));
			if(theme && this.$parent.$refs.search != undefined){
				this.cssBlur = theme.cssBlur;
				this.theme = this.$parent.$refs.search.theme = theme;
			}
			
			this.$nextTick(() => {
				var cssPanel = localStorage.getItem("cssPanel");
				var themeColor = localStorage.getItem("themeColor");
				var fontColor = localStorage.getItem("fontColor");
				var frostedGlass = localStorage.getItem("frostedGlass");
				
				if(cssPanel){
					this.cssPanel = Number(cssPanel)
					this.optionCssPanel(cssPanel)
				}
				
				if(themeColor){
					this.custom.themeColor = themeColor
					this.optionThemeColor(themeColor)
				}
				
				if(fontColor){
					this.custom.fontColor = fontColor
					this.optionFontColor(fontColor)
				}
				if(frostedGlass == 'true'){
					this.custom.frostedGlass = true;
				}
				
			})
			
			
		}
	}
</script>

<style>
	.header-simple{
		position: absolute;
		opacity: 0;
		z-index: 99;
		width: 100%;
		height: 3.75rem;
		line-height: 3.75rem;
	}
	
	.header-simple .header-item{
		margin: 2px 20px;
	}
	
	.header-simple .logo{
		display: block;
		width: 136px;
	}
	
	.header-simple .block{
		display: inline;
	}
	
	.header-simple .block a{
		color: #fff;
	}
	
	.header-simple .header-weather{
		font-size: 22px;
	}
	
	.header-simple .weather-icon{
		width: 24px;
	}
	
	.header{
		position: fixed;
		z-index: 999;
		opacity: 0;
		width: 100%;
		max-width: 100%;
		height: 3.75rem;
		line-height: 3.75rem;
		box-sizing: border-box;
		background-color: rgba(255,255,255,0.95);
		box-shadow: 0 1px 3px rgba(26,26,26,.1);
	}

	.header-nav-item{
		margin: 0 10px;
	}
	
	
	
	.header-nav-item a{
		font-size: 15px;
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
		width: 852px!important
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
	
	.skin_slider>label{
		margin-right: 18px;
	}
	
	.skin_slider>label:nth-child(2){
		margin-right: 0!important;
	}
	
	.skin_slider label i{
		cursor: pointer;
	}
	.skin_slider .skin_content{
		width: 168px;
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
		width: 258px;
		height: 138px;
		position: relative;
		box-sizing: border-box;
	}
	
	.images img{
		height: 138px;
		width: 258px;
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
	
	.skin_dialog .preview{
		width: 350px;
		height: 197px;
		cursor: pointer;
	}
	
	.skin_dialog .preview:hover{
		filter: brightness(70%);
		transition: filter 0.2s ease-in-out;
	}
	
	.login_icon{
		position: relative;
		display: block;
		width: 50px;
		height: 50px;
		margin: auto;
	}
	
	.user-icon{
		border-radius: 50%;
	    padding: 9px;
		display: inline-block;
		background-color: #ececec;
	}
	.user-icon i{
		display: block;
	}
	
	.header-menu{
		margin-left: 12px;
	}
	
	.header-menu span{
		display: inline-block;
		font-size: 22px;
	}
	
	.header-menu-dropdown{
		
	}
	
	.header-menu-dropdown i{
		margin-left: -10px;
		margin-right: 10px;
	}
	.header-menu-dropdown .el-dropdown-menu__item{
		color: rgba(51, 51, 51, 0.75)!important;
	}
	
	.header-menu-dropdown .el-dropdown-menu__item:not(.is-disabled):hover {
	    background-color: #f5f5f5;
	}
	.colorInfo--37Ift{
		display: flex;
		align-items: center;
	}
	.colorInfo--37Ift > span{
		margin-left: 10px;
	}

	@media screen and (min-width:1200px) {
		.header{
			padding: 0 14%;
		}
		.header .nav-item a {
			font-size: 14px;
		    padding: 0 5px;
		}
		.header .header-nav-item .el-avatar{
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
		.header .header-nav-item .el-avatar{
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
		.header .header-nav-item .el-avatar{
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
		.header .header-nav-item .el-avatar{
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
		.header .header-nav-item .el-avatar{
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
