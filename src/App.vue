<template>
  <div id="app">
		<header class="header">
		  <div class="float-left" style="height: 100%;">
		    <a class="logo" href="#"><img src="./assets/logo.png" width="100%"></a>
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
		<section>
		  <div id="search">
				<div class="form">
				<div class="dropdown">
					<el-dropdown placement="bottom" @command="handleCommand">
						<el-button type="text" class="el-dropdown-link">
							<img width="20px" height="20px" v-bind:src="searchIcon">
							<i class="el-icon-arrow-down"></i>
						</el-button>
						
					  <el-dropdown-menu slot="dropdown">
													<el-dropdown-item command="百度,https://www.baidu.com/s?word=,https://img.bidianer.com/engine/201905/06/5ccffcbb848d1_6VmFZFyC397EDMO.svg">
														<img width="20" alt="" src="https://img.bidianer.com/engine/201905/06/5ccffcbb848d1_6VmFZFyC397EDMO.svg">
														百度
													</el-dropdown-item>
						<el-dropdown-item command="360,https://www.so.com/s?q=,https://img.bidianer.com/engine/201905/06/5ccffd8020cce_R1YvwXqlRNM4p7C.svg">
														<img width="20" alt="" src="https://img.bidianer.com/engine/201905/06/5ccffd8020cce_R1YvwXqlRNM4p7C.svg">
														360
													</el-dropdown-item>
						<el-dropdown-item command="Bing,https://cn.bing.com/search?q=,https://img.bidianer.com/engine/201905/06/5ccffd87e721ag7BQ-YtbrOxEJjfI.svg">
														<img width="20" alt="" src="https://img.bidianer.com/engine/201905/06/5ccffd87e721ag7BQ-YtbrOxEJjfI.svg">
														Bing
													</el-dropdown-item>
						<el-dropdown-item command="搜狗,https://www.sogou.com/web?query=,https://img.bidianer.com/engine/201905/06/5ccffd9104ff3DM3FSyYOTj98PTEB.svg">
														<img width="20" alt="" src="https://img.bidianer.com/engine/201905/06/5ccffd9104ff3DM3FSyYOTj98PTEB.svg">
														搜狗
													</el-dropdown-item>
													<el-dropdown-item command="谷歌,https://www.google.com/search?q=,https://img.bidianer.com/engine/201905/06/5ccffd97e20e47wW-I6ThCs_DGqfc.svg">
														<img width="20" alt="" src="https://img.bidianer.com/engine/201905/06/5ccffd97e20e47wW-I6ThCs_DGqfc.svg">
														谷歌
													</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
		      <input type="text" id="search_text" size="30" @keyup.enter="search" placeholder="您的搜索小能手"/>
		      <button id="search_but" @click="search">{{searchTitle}}搜索</button>
				</div>
		   </div>
				
				<!-- touch图标块 -->
				<div id="touch" class="box">
					<a target='_blank' class="site-card" v-for="t in touch" :href="t.url" :title="t.summary" >
					 <div class="site-touch-icon"><img :src="t.icon" :alt="t.title"></div>
					 <div class="site-touch-title">{{ t.title }}</div>
					</a>
			 </div>
			 
			 <!-- 功能导航块 -->
			 <div class="box">
				 <div style="width: 100%;display: inherit;border-bottom: 1px #F2F2F2 solid;">
					 <div class="float-left">
						 <ul class="nav" style="line-height: 30px;">
							 <li class="nav-item"><a href="#" class="active">导航</a></li> 
							 <!-- <li class="nav-item"><a href="#test">其他</a></li> -->
						</ul>
					 </div>
					 <div class="float-right"></div>
				 </div>
				 <div style="margin: 3px 5px 5px 5px;">
					 <ul class="menu">
					 	 <li class="nav-item-radius"><a href="#" class="active"><i class="el-icon-goods"></i>购物</a></li> 
						 <li class="nav-item-radius"><a href="#"><i class="el-icon-video-play"></i>视频</a></li> 
						 <li class="nav-item-radius"><a href="#"><i class="el-icon-video-camera"></i>直播</a></li> 
						 <li class="nav-item-radius"><a href="#"><i class="el-icon-data-analysis"></i>财经</a></li> 
					 </ul>
				 </div>
			 </div>
			 
			 <div class="main">
				 <!-- 主体显示块 -->
				 <div class="container">	 
						<div class="box" style="margin-top: 3px;">
							 <div class="box-header">
								 <h3>推荐</h3>
								 <span><i class="el-icon-setting"></i></span>
							 </div>
							 <div class="box-body">
								 <ul class="site-list">
									 <li v-for="site in sites">
										 <a class="site-item" :href="site.url" target='_blank' :title="site.summary">
											 <div class="site-icon float-left"><img :src="site.icon" :alt="site.title"/></div>
											 <div class="site-info float-right">
												 <h3>{{ site.title }}</h3>
												 <p>{{ site.summary }}</p>
											 </div>
										 </a>
									 </li>
								 </ul>
							 </div>
						 </div>
				 </div>
				 <!-- 侧边栏 -->
				 <div class="sidebar">
						<div class="box">
							<el-carousel trigger="click" height="130px">
								<el-carousel-item v-for="item in imgs" :key="item">
									<img class="thumbnail" :src="item" width="100%" height="100%" />
								</el-carousel-item>
							</el-carousel>
						</div>
						<div class="box link">
							<div class="box-header">
								<h3>今日推荐 * 精选</h3>
							</div>
							<div class="box-body">
								<a v-for="item in recommend" :href="item.url" target="_blank">
									<img :src="item.icon">
									{{ item.title }}-{{ item.summary }}
								</a>
							</div>
						</div>
				 </div>
				
				<div class="box">
					<div class="box-header">
						<h3>精选图集</h3>
					</div>
					<div class="box-body">
						<ul class="accordion-container">
						  <li class="accordion-item" :style="{'background-image': 'url('+thumbnail.url+')'}" v-for="thumbnail in thumbnails">
							<a href="#"><p class="accordion-title">{{thumbnail.title}}</p></a>
						  </li>
						</ul>
					</div>
				</div>
				
			 </div>
			
			</section>
			<footer class="box">
				<ul class="menu">
					<li class="nav-item"><el-link>关于我们</el-link></li>
					<li class="nav-item"><el-link>商务合作</el-link></li>
					<li class="nav-item"><el-link>申请收录</el-link></li>
					<li class="nav-item"><el-link>意见反馈</el-link></li>
				</ul>
				<p>红衣导航 - hom1.cn @ All rights Reserved ，本站收录的网站若侵害到您的利益，请联系我们删除处理</p>
			</footer>
  </div>
</template>


<script>
import dataJson from './data.json';

export default {
  data() {
        return {
          activeIndex: '1',
					searchTitle: '百度',
					searchUrl:'https://www.baidu.com/s?word=',
					loginOpen:false,
					registerOpen:false,
					username:'',
					password:'',
					searchIcon: 'https://img.bidianer.com/engine/201905/06/5ccffcbb848d1_6VmFZFyC397EDMO.svg',
					imgs:['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp','//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
					apiUrlSites:'http://localhost:8080/getList',
					apiUrlTouch:'http://localhost:8080/getTouch',
					sites:null,
					touch:null,
					recommend:null,
					thumbnails:null
				};
      },
  methods: {
		login:function(){
			this.$message({
          message: '登录成功',
          type: 'success'
        });
				this.loginOpen=false
		},
		register:function(){
			this.$message({
			    message: '注册成功',
			    type: 'success'
			  });
				this.registerOpen=false
		},
		search:function(){
			var url = this.searchUrl + document.getElementById("search_text").value;
			window.open(url,"_blank")
		},
		handleCommand:function(command) {
			var str = command.split(',')
			this.searchTitle = str[0];
			this.searchUrl = str[1];
			this.searchIcon = str[2];
			this.$message('切换至搜索引擎 ' + str[0]);
		},
		getData:function(){
			//this.touch = dataJson.getTouch;
			//this.sites = dataJson.getList;
			//this.recommend = dataJson.getRecommend;
			this.thumbnails = dataJson.getThumbnail;
			this.$http.get('http://127.0.0.1:3302/api/getList').then(function(res){
                    this.sites =res.body;    
                },function(){
                    console.log('请求失败处理');
                });
			this.$http.get('http://127.0.0.1:3302/api/getTouch').then(function(res){
					this.touch =res.body;    
				},function(){
					console.log('请求失败处理');
				});
			this.$http.get('http://127.0.0.1:3302/api/getRecommend').then(function(res){
					this.recommend =res.body;    
				},function(){
					console.log('请求失败处理');
				});
		}
  },
	mounted() {
		this.getData();
	}
}

window.onload=function(){
	/* scroll(); */
}
function scroll(){
		var cards = document.getElementsByClassName("site-card");
		for(var card of cards){
			var text = card.getElementsByClassName("site-touch-title")[0];
			console.log(text)
			var card_w = card.offsetWidth;
			var text_w = text.offsetWidth;
			console.log("card_w="+card_w+",text_w"+text_w);
		}
    }
</script>

<style>
	body{
	  background-color: #f5f5f5;
	}
	body,header,section,footer,ul{
		margin: 0;
		padding: 0;
	}
	a{
		font-size: 14px;
		color: #909399;
		text-decoration:none
	}
	img{
	  vertical-align: middle;
	}
	ul{
		display: inline-block;
	}
	li{
		list-style: none;
	}
	
	h1, h2, h3, h4, ol, p, ul {
	    padding: 0;
	    margin: 0;
	    font-weight: 400;
	}
	
		.float-left{
	    float: left;
	}
	.float-right{
	    float: right;
	}
	
	.nav{
	    height: 100%;
	    line-height: 60px;
	    background: transparent;
	    padding: 0;
	    margin: 0;
		}
		
		.nav-item ,.nav-item-radius{
	    margin: 0 5px;
		height: 100%;
	    float: left;
	    list-style: none;
	    position: relative;
	    cursor: pointer;
		vertical-align: middle;
	}
	
	.nav-item a ,.nav-item-radius a{
	    text-decoration: none;
	    color:#909399;
	    display: block;
	}
	
	.nav-item a.active{
		    color: #1989fa;
	}
	
	.nav-item a.active:after {
	    content: "";
	    display: inline-block;
	    position: absolute;
	    bottom: 0;
	    left: calc(50% - 15px);
	    width: 30px;
	    height: 2px;
	    background: #409eff;
	}
	.nav-item-radius {
		margin: 0;
		height: 25px!important;
		line-height: 25px!important;
	}
	.nav-item-radius a{
		padding: 2px 15px;
		border-radius: 20px;
	}
	.nav-item-radius a:hover{
		background-color: #f1f1f1;
	}
	
	
	#app {
	  font-family: Helvetica, sans-serif;
	}
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
	
	
	
	
	
	
	section{
	  padding-top: 2%;
		margin: 0;
		display: inherit;
		/* margin: 0 16%; */
	}
	.form{
		display: flex;
		justify-content:center;
	}
	
	#search{
		padding: 20px 0;
	}
	#search input,#search button{
		margin: 0;
		padding: 10px 15px;
		outline: 0;
	  border: none;
	}
	
	#search #search_text{
	  padding: 10px 15px 10px 62px;
	width: 50%;
	-webkit-transition: ease .3s;
	transition: ease .3s;
	-webkit-transform-origin: 50% 50%;
	}
	
	#search_text:hover{
		/* box-shadow: 0 8px 43px rgba(0,0,0,0.15); */
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}
	
	#search #search_but{
		color: #fff;
		border-radius: 0;
		/*background-color: #FF8C69;*/
	  background-color: #909399;
		cursor: pointer;
	}
	
	.dropdown{
	  position: relative;
	}
	
	
	#touch{
		margin: 1rem 0;
		height: 5rem;
		display: flex;
		border-radius: 4px;
		align-items: center;
		justify-content: center;
	}
	
	#touch .site-card{
		text-align: center;
	}
	
	#touch .site-card .site-touch-icon{
		display: inline-block;
		transition: .5s;
	}
	
	#touch .site-card:hover .site-touch-icon{
		margin-top: -10px;
		margin-bottom: 10px;
		-webkit-filter: drop-shadow(0 6px 6px rgba(100,100,100,0.6));
		-webkit-transform: translateY(-4px) scale(1.15);
		  -moz-transform: translateY(-4px) scale(1.15);
		  -ms-transform: translateY(-4px) scale(1.15);
		  -o-transform: translateY(-4px) scale(1.15);
		  transform: translateY(-4px) scale(1.15);
	}
	
	#touch .site-touch-title{
		line-height: 26px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	#touch img{
		width: 100%;
		height: 100%;;
		border-radius: 50%;
	}
	
	.menu li{
		height: 35px;
		line-height:35px;
	}
	
	.box{
		width: 100%;
		padding: 0;
		margin: 5px 0;
		text-align: left;
		border-radius: 2px;
		background: #FFFFFF;
		display: inline-block;
		box-shadow: 0 1px 1px rgba(0,0,0,0.1);
	}
	.box-header{
		color: #444;
	  padding: 10px;
		display: flex;
		justify-content:space-between;
		border-bottom:1px rgba(245,245,245,1) solid;
	}
	.box-header>h3{
		font-size: 16px;
	  color: #6b7386;
	}
	.box-body{
		padding: 10px;
	}
	
	
	.site-list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 10px;
	}	
	.site-list .site-item{
		height: 100%;
		font-size: 14px;
		display:flex;
		align-items:center;
		overflow: hidden;
	}
	
	.site-info h3{
		color: #444444;
	}
	.site-info p{
		color: #a1a7b7;
		font-size: 12px;
		text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
	}
	
	.site-list .site-item:hover{
		background: rgba(241,242,249,.5);
	}
	
	.site-list .site-item:hover h3{
		color: #409EFF;
	}
	
	.site-list .site-item:hover p{
		color: #131313a1;
	}
	
	.link a{
		transition: all .1s linear;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		height: 24px;
		line-height: 24px;
		display: inherit;
		font-size: 14px;
		margin: 5px 0;
	}
	.link a:hover{
		color: #1989FA;
		background: linear-gradient(to right,rgba(221,221,221,0),#f2f2f2,rgba(222,222,222,0));
	}
	.link img{
		width: 16px;
		height: 16px;
		margin-right: 5px;
	}
	
	
	.main{
	}

	
	
	/* 手风琴样式 开始*/
	 .accordion-container {
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
	.accordion-item {
	  list-style: none;
	  height: 125px;
	  transition: width 0.5s;
	  background-repeat: no-repeat;
	  background-size: cover;
	  background-position: center center;
	  position: relative;
	}
	.accordion-item:not(:hover) {
	  width: 20%;
	}
	.accordion-item:hover {
	  width: 400px;
	}
	.accordion-item:hover .accordion-title{
		display: inherit;
		padding: 10px 15px;
		font-size: 14px;
	}
	.accordion-item:hover .accordion-title:after{
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		-webkit-filter: blur(10px);
		filter: blur(10px);
		z-index: -1;
	}
	.accordion-item a{
	  content:'';
	  width: 100%;
	  height: 100%;
	  position: absolute;
	  left: 0;
	  top: 0;
	  z-index: 1;
	  transition: opacity 0.5s;
	  display: flex;
	  justify-content: center;
	  align-items:center;
	}
	.accordion-title {
	  color: #fff;
	  font-size: 18px;
	  display: none;
	  /* filter: blur(1px); */
	  text-align: center;
	}
	/* 手风琴样式 结束*/
	
	.el-dialog__body{
		padding: 0 20px 30px;
	}
	#search .el-dropdown{
		position: absolute;
		top: 0;
		left: 0;
	}
	
	
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
	
	.dropdown-link{
	  cursor: pointer;
	  color: #ccc;
	  background: #fff;
	  width: 40px;
	  height: 100%;
	}
	.dropdown-link:hover{
	  background: #fff;
	}

	.el-menu.el-menu--horizontal{
	      border-bottom: none;
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
	
	#touch .site-card{
		margin: 5px;
		width: 60px;
	}
	#touch .site-card .site-touch-icon{
		width: 36px;
		height: 36px;
	}

	#touch .site-touch-title{
		margin-bottom:0px;
		font-size: 14px;
		text-align: center;
	}
	
	section{
		margin: 0 10%;
	}
	.container{
		width: 70%;
		float: left;
	}
	.sidebar{
		width: 28%;
		float: right;
	}
	
	.site-list li{
		height: 60px;
		width: 190px;
	}
	.site-list .site-icon img{
		width: 32px;
		height: 32px;
	}
	
	.site-list .site-item{
		padding: 5px 15px;
	}
	.site-list .site-icon{
		margin-right: 5px;
	}
	.site-list .site-info{
		width: 130px;
	}
	.site-list .site-info h3{
		font-size: 14px;
	}
	
	.image-placeholder .block{
		width: 190px;
		height: 123px;
		margin: 0 2px;
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
	
	#touch .site-card{
		margin: 2px;
	}
	#touch .site-card .site-touch-icon{
		width: 30px;
		height: 30px;
	}
	.site-list .site-icon img{
		width: 25px;
		height: 25px;
	}
	#touch .site-touch-title{
		margin-bottom:0px;
		font-size: 12px;
		text-align: center;
	}
	
	.container{
		width: 100%;
	}
	.sidebar{
		width: 100%;
	}
	
	.site-list li{
		height: 30px;
		width: 115px;
	}
	.site-list .site-item{
		padding: 5px 10px;
	}
	.site-list .site-icon{
		margin-right: 5px;
	}
	.site-list .site-info{
		width: 65px;
	}
	.site-list .site-info h3{
		font-size: 12px;
	}
	.site-list .site-info p{
		display: none;
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
	
	#touch .site-card{
		margin: 2px;
		width: 50px;
	}
	#touch .site-card .site-touch-icon{
		width: 30px;
		height: 30px;
	}
	.site-list .site-icon img{
		width: 25px;
		height: 25px;
	}
	#touch .site-touch-title{
		margin-bottom:0px;
		font-size: 12px;
		text-align: center;
	}
	
	.container{
		width: 100%;
	}
	.sidebar{
		width: 100%;
	}
	
	.site-list li{
		height: 30px;
		width: 115px;
	}
	.site-list .site-item{
		padding: 5px 10px;
	}
	.site-list .site-icon{
		margin-right: 5px;
	}
	.site-list .site-info{
		width: 65px;
	}
	.site-list .site-info h3{
		font-size: 12px;
	}
	.site-list .site-info p{
		display: none;
	}
	
	.image-placeholder .block{
		width: 190px;
		height: 123px;
		margin: 0 2px;
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
	
	#touch .site-card{
		margin: 2px;
	}
	#touch .site-card .site-touch-icon{
		width: 30px;
		height: 30px;
	}
	.site-list .site-icon img{
		width: 25px;
		height: 25px;
	}
	#touch .site-touch-title{
		margin-bottom:0px;
		font-size: 12px;
		text-align: center;
	}
	
	.container{
		width: 100%;
	}
	.sidebar{
		width: 100%;
	}
	
	.site-list li{
		height: 30px;
		width: 115px;
	}
	.site-list .site-item{
		padding: 5px 10px;
	}
	.site-list .site-icon{
		margin-right: 5px;
	}
	.site-list .site-info{
		width: 65px;
	}
	.site-list .site-info h3{
		font-size: 12px;
	}
	.site-list .site-info p{
		display: none;
	}
	
	.image-placeholder .block{
		width: 190px;
		height: 123px;
		margin: 0 2px;
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
	
	#touch .site-card{
		margin: 2px;
		width: 50px;
	}
	#touch .site-card .site-touch-icon{
		width: 30px;
		height: 30px;
	}
	.site-list .site-icon img{
		width: 25px;
		height: 25px;
	}
	#touch .site-touch-title{
		margin-bottom:0px;
		font-size: 12px;
		text-align: center;
	}
	
	.container{
		width: 100%;
	}
	.sidebar{
		width: 100%;
	}
	
	.site-list li{
		height: 30px;
		width: 100px;
	}
	.site-list .site-item{
		padding: 5px 0;
	}
	.site-list .site-icon{
		margin-right: 5px;
	}
	.site-list .site-info{
		width: 65px;
	}
	.site-list .site-info h3{
		font-size: 12px;
	}
	.site-list .site-info p{
		display: none;
	}
	
	.image-placeholder .block{
		width: 49%;
		height: 112px;
		margin: 1px 1px;
	}
	footer .menu{
	    padding: 0px 10%;
	}
	
	footer p{
		margin: 0 6%;
	}
}
</style>
