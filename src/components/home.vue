<template>
	<div>
		<head-top></head-top>

		<section>
			<div id="search">
				<div class="dropdown">
					<el-dropdown placement="bottom" @command="handleCommand">
						<el-button type="text" class="el-dropdown-link">
							<img width="20px" height="20px" v-bind:src="searchIcon">
							<i class="el-icon-arrow-down"></i>
						</el-button>

						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="百度,https://www.baidu.com/s?word=,http://47.106.84.166:3302/upload/baidu.svg">
								<img width="20" alt="" src="http://47.106.84.166:3302/upload/baidu.svg">
								百度
							</el-dropdown-item>
							<el-dropdown-item command="360,https://www.so.com/s?q=,http://47.106.84.166:3302/upload/360.svg">
								<img width="20" alt="" src="http://47.106.84.166:3302/upload/360.svg">
								360
							</el-dropdown-item>
							<el-dropdown-item command="Bing,https://cn.bing.com/search?q=,http://47.106.84.166:3302/upload/bing.svg">
								<img width="20" alt="" src="http://47.106.84.166:3302/upload/bing.svg">
								Bing
							</el-dropdown-item>
							<el-dropdown-item command="搜狗,https://www.sogou.com/web?query=,http://47.106.84.166:3302/upload/sogou.svg">
								<img width="20" alt="" src="http://47.106.84.166:3302/upload/sogou.svg">
								搜狗
							</el-dropdown-item>
							<el-dropdown-item command="谷歌,https://www.google.com/search?q=,http://47.106.84.166:3302/upload/google.svg">
								<img width="20" alt="" src="http://47.106.84.166:3302/upload/google.svg">
								谷歌
							</el-dropdown-item>
						</el-dropdown-menu>

					</el-dropdown>
				</div>
				<input type="text" id="search_text" size="30" @keyup.enter="search" placeholder="您的搜索小能手"/>
				<button id="search_but" @click="search">{{searchTitle}}搜索</button>
			</div>

			<!-- touch图标板块 -->
			<div id="touch" class="box">
				<a target='_blank' class="site-card" v-for="t in touch" :href="t.url" :title="t.summary" >
				 <div class="site-touch-icon"><img :src="t.icon" :alt="t.title"></div>
				 <div class="site-touch-title">{{ t.title }}</div>
				</a>
			 </div>

			 <!-- 主体板块 -->
			 <div class="main">
				<el-row :gutter="10">
					<!-- 主体显示块 -->
					<el-col :md="18" :lg="18" :xl="18" class="container">
						<!-- 功能导航板块 -->
						 <div class="box">
							 <div style="width: 100%;display: inherit;border-bottom: 1px #F2F2F2 solid;">
								 <div class="float-left">
									 <ul class="nav menu-inline" style="line-height: 30px;">
										 <li class="nav-item"><a href="#" class="active">导航</a></li>
										 <!-- <li class="nav-item"><a href="#test">其他</a></li> -->
									</ul>
								 </div>
								 <div class="float-right"></div>
							 </div>
							 <div style="margin: 3px 5px 5px 5px;">
								 <ul class="menu menu-inline cate-list">
									 <li class="nav-item-radius" v-for="(category, index) in categorys">
										 <a :href='"#" + category.slugName' :class="(index == 0 ? 'active':'')">
											<i :class="category.icon"></i>{{category.name}}
										 </a>
									 </li>
								 </ul>
							 </div>
						 </div>

						<div class="box" style="margin-top: 3px;" v-for="category in sites">
						  <div class="box-header">
							 <h3 :id="category.slugName">{{category.name}}</h3>
							 <span><i class="el-icon-setting"></i></span>
						  </div>
						   <div class="box-body">
							 <ul class="site-list">
							   <li v-for="site in category.list">
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

<!-- 						<div class="box">
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
						</div> -->
					</el-col>
					<!-- 侧边栏 -->
					<el-col :md="6" :lg="6" :xl="6" class="sidebar">

						<!-- <div class="box">
							<el-carousel trigger="click" height="130px">
								<el-carousel-item v-for="item in imgs" :key="item">
									<img class="thumbnail" :src="item" width="100%" height="100%" />
								</el-carousel-item>
							</el-carousel>
						</div> -->
						<div class="box" style="background: #fff;">
							<div class="box-body" style="position: relative;">
								<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="//music.163.com/outchain/player?type=0&id=2822479734&auto=0&height=32"></iframe>
								<div class="music-ing" style="position:absolute;top: 20px;margin-left: 11px;">
									<a href="https://music.163.com/playlist?id=2822479734" target="_blank" rel="nofollow">
										<img src="http://47.106.84.166:3302/upload/music.svg" width="20" height="20">
									</a>
								</div>
							</div>

						</div>
			<div class="box hot-link">
            	<div class="box-header">
            		<h3><img :src="searchIcon">热搜榜</h3>
					<i @click="hotRefresh" class="el-icon-refresh"></i>
            	</div>
            	<div class="box-body">
            		<el-carousel trigger="click" :autoplay="false" indicator-position="none" height= "350px">
            			<el-carousel-item v-for="array in hotList">
                   <ul class="menu" style="width: 100%;">
                     <li class="nav-item" style="cursor: text;" v-for="item in array">
                       <div style="display: flex;justify-content:space-between">
                         <span style="display: inherit;">
                           <em>{{ item.index }}</em>
                           <a :href="item.url" @click="hotSearch">{{ item.title }}</a>
                         </span>
                         <span style="font-size: 13px;color: #999;">
                            {{ item.level }}<i :class="item.trend == 'rise' ? 'rise el-icon-top':'fall el-icon-bottom'"></i>
                         </span>
                       </div>
                     </li>
                   </ul>


            			</el-carousel-item>
            		</el-carousel>
            	</div>
            </div>
						<!-- <div class="box link">
							<div class="box-header">
								<h3>今日推荐 * 精选</h3>
							</div>
							<div class="box-body">
								<a v-for="item in recommend" :href="item.url" target="_blank">
									<img :src="item.icon">
									{{ item.title }}-{{ item.summary }}
								</a>
							</div>
						</div> -->
					</el-col>
				</el-row>


			 </div>
			<el-backtop :bottom="100"></el-backtop>
		</section>
	

		<foot></foot>
	</div>
</template>

<script>
import dataJson from './../data.json';
import header from './common/header/head'
import footer from './common/footer/foot'

export
default {
        data() {
            return {
                activeIndex:
                '1',
                searchTitle: '百度',
                searchUrl: 'https://www.baidu.com/s?word=',
                searchIcon: 'http://47.106.84.166:3302/upload/baidu.svg',
                imgs: ['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp', '//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
                apiUrl: 'http://47.106.84.166:3302/',
                categorys: [],
                sites: null,
                touch: null,
                recommend: null,
                thumbnails: null,
                hotList: null
            };
        },
        methods: {
            search: function() {
                var url = this.searchUrl + document.getElementById("search_text").value;
                window.open(url, "_blank")
            },
            handleCommand: function(command) {
                var str = command.split(',');
				this.searchTitle = str[0];
                this.searchUrl = str[1];
                this.searchIcon = str[2];
                this.$message('切换至搜索引擎 ' + str[0]);
            },
            getData: function() {
                //this.touch = dataJson.getTouch;
                //this.sites = dataJson.getList;
                //this.recommend = dataJson.getRecommend;
                this.thumbnails = dataJson.getThumbnail;
                this.$http.get(this.apiUrl + '/api/getList').then(function(res) {
                    console.log(res.body);
					for (var category of res.body) {
                        var cate = {
                            name: category.name,
                            icon: category.icon,
                            slugName: category.slugName
                        };
                        this.categorys.push(cate);
                    }
                    this.sites = res.body;
                },
                function() {
					this.$message.error('数据请求失败，请稍后再试');
                });
                this.$http.get(this.apiUrl + 'api/getTouch').then(function(res) {
                    this.touch = res.body;
                },
                function() {
                    this.$message.error('数据请求失败，请稍后再试');
                });
                this.$http.get(this.apiUrl + 'api/getRecommend').then(function(res) {
                    this.recommend = res.body;
                },
                function() {
                    this.$message.error('数据请求失败，请稍后再试');
                });
                this.$http.get(this.apiUrl + 'api/getHotList').then(function(res) {
                    this.hotList = res.body;
                },
                function() {
                    this.$message.error('数据请求失败，请稍后再试');
                });
            },
            hotSearch: function(options) {
                console.log(options.target.innerText);
				window.open(this.searchUrl + options.target.innerText);
            },
            hotRefresh: function() {
                this.$http.get(this.apiUrl + 'api/getHotList').then(function(res) {
                    this.hotList = res.body;
                    this.$notify({
                        title: '刷新成功',
                        message: '热搜榜每2个小时更新一次~',
                        type: 'success',
                        position: 'bottom-right'
                    });
                });
            }
        },
        components: {
            'headTop': header,
            'foot': footer
        },
        mounted() {
            this.getData();
        }
    }

    window.onload = function() {
        /* scroll(); */
    }
    function scroll() {
        var cards = document.getElementsByClassName("site-card");
        for (var card of cards) {
            var text = card.getElementsByClassName("site-touch-title")[0];
            console.log(text);
			var card_w = card.offsetWidth;
            var text_w = text.offsetWidth;
            console.log("card_w=" + card_w + ",text_w" + text_w);
        }
    }
</script>

<style>
section {
	padding-top: 5%;
	margin: 0;
	display: inherit;
		/* margin: 0 16%; */
}

#search {
	padding: 20px 0;
	display: flex;
	justify-content: center;
}

#search input,#search button {
	margin: 0;
	padding: 10px 15px;
	outline: 0;
	border: none;
}

#search #search_text {
	padding: 10px 15px 10px 62px;
	width: 50%;
	-webkit-transition: ease .3s;
	transition: ease .3s;
	-webkit-transform-origin: 50% 50%;
}

#search_text:hover {
		/* box-shadow: 0 8px 43px rgba(0,0,0,0.15); */
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

#search #search_but {
	color: #fff;
	border-radius: 0;
		/*background-color: #FF8C69;*/
	background-color: #909399;
	cursor: pointer;
}

.dropdown {
	position: relative;
}

#touch {
	margin: 1rem 0;
	height: 5rem;
	display: flex;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
}

#touch .site-card {
	text-align: center;
}

#touch .site-card .site-touch-icon {
	display: inline-block;
	transition: .5s;
}

#touch .site-card:hover .site-touch-icon {
	margin-top: -10px;
	margin-bottom: 10px;
	-webkit-filter: drop-shadow(0 6px 6px rgba(100,100,100,0.6));
	-webkit-transform: translateY(-4px) scale(1.15);
	-moz-transform: translateY(-4px) scale(1.15);
	-ms-transform: translateY(-4px) scale(1.15);
	-o-transform: translateY(-4px) scale(1.15);
	transform: translateY(-4px) scale(1.15);
}

#touch .site-touch-title {
	line-height: 26px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

#touch img {
	width: 100%;
	height: 100%;
	;
		border-radius: 50%;
}

.box {
	width: 100%;
	padding: 0;
	margin: 5px 0;
	text-align: left;
	border-radius: 2px;
	background: #FFFFFF;
	display: inline-block;
	box-shadow: 0 1px 1px rgba(0,0,0,0.1);
}

.box-header {
	color: #444;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px rgba(245,245,245,1) solid;
}

.box-header>h3 {
	font-size: 16px;
	color: #6b7386;
}

.box-body {
	padding: 10px;
}

.site-list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 10px;
}

.site-list li {
	height: 100%;
}

.site-list .site-item {
	height: 100%;
	font-size: 14px;
	display: flex;
	align-items: center;
	overflow: hidden;
}

.site-info h3 {
	color: #444444;
}

.site-info p {
	color: #a1a7b7;
	font-size: 12px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.site-list .site-item:hover {
	/* background: rgba(241,242,249,.5); */
	box-shadow: 0px 5px 28px 0px rgba(65, 106, 123, 0.2);
}

.site-list .site-item:hover h3 {
	color: #409EFF;
}

.site-list .site-item:hover p {
	color: #131313a1;
}

.hot-link a {
	color: #444;
	font-size: 13px !important;
	padding: 0 5px;
}

.hot-link a:hover {
	cursor: pointer;
	color: #1989FA;
	text-decoration: underline;
}

.hot-link em {
	font-style: normal;
	color: #a1a7b7;
	font-size: 14px;
	font-family: Constantia,Georgia;
}

.hot-link em:after {
	content: ".";
	margin-right: 5px;
}

.hot-link span i {
	margin: 0 2px;
	font-size: 16px;
	font-weight: 600;
}

.hot-link .rise {
	color: #1989FA;
}

.hot-link .fall {
	color: #f35c01;
}

.hot-link img {
	width: 17px;
	height: 17px;
	margin-right: 5px;
}
	/* .link a{
		transition: all .1s linear;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		height: 24px;
		line-height: 24px;
		display: inherit;
		font-size: 14px;
		margin: 5px 0;
    padding: 0 5px;
	}
	.link a:hover{
		color: #1989FA;
		background: linear-gradient(to right,rgba(221,221,221,0),#f2f2f2,rgba(222,222,222,0));
	}
	.link img{
		width: 16px;
		height: 16px;
		margin-right: 5px;
	} */


.main {
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

.accordion-item:hover .accordion-title {
	display: inherit;
	padding: 10px 15px;
	font-size: 14px;
}

.accordion-item:hover .accordion-title:after {
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

.accordion-item a {
	content: '';
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	transition: opacity 0.5s;
	display: flex;
	justify-content: center;
	align-items: center;
}

.accordion-title {
	color: #fff;
	font-size: 18px;
	display: none;
	  /* filter: blur(1px); */
	text-align: center;
}
	/* 手风琴样式 结束*/

.el-dialog__body {
	padding: 0 20px 30px;
}

#search .el-dropdown {
	position: absolute;
	top: 0;
	left: 0;
}

.music-ing {
	width: 32px;
	height: 32px;
	background-color: #fff;
}

.music-ing img {
	padding: 6px 0 6px 11px;
}

.cate-list i {
	margin-right: 5px;
}

.dropdown-link {
	cursor: pointer;
	color: #ccc;
	background: #fff;
	width: 40px;
	height: 100%;
}

.dropdown-link:hover {
	background: #fff;
}

.el-menu.el-menu--horizontal {
	border-bottom: none;
}

@media screen and (min-width:1200px) {

	section {
		margin: 0 10%;
	}

	#touch .site-card {
		margin: 5px;
		width: 60px;
	}

	#touch .site-card .site-touch-icon {
		width: 36px;
		height: 36px;
	}

	#touch .site-touch-title {
		margin-bottom: 0px;
		font-size: 14px;
		text-align: center;
	}

	.site-list .site-icon img {
		width: 32px;
		height: 32px;
	}

	.site-list .site-item {
		padding: 5px 15px;
		height: 60px;
		width: 190px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-info {
		width: 130px;
	}

	.site-list .site-info h3 {
		font-size: 14px;
	}

	.image-placeholder .block {
		width: 190px;
		height: 123px;
		margin: 0 2px;
	}
}

@media screen and (min-width: 960px) and (max-width: 1199px) {
	section {
		margin: 0 10%;
	}

	#touch .site-card {
		margin: 2px;
	}

	#touch .site-card .site-touch-icon {
		width: 30px;
		height: 30px;
	}

	.site-list .site-icon img {
		width: 25px;
		height: 25px;
	}

	#touch .site-touch-title {
		margin-bottom: 0px;
		font-size: 12px;
		text-align: center;
	}

	.container {
		width: 100%;
	}

	.sidebar {
		width: 100%;
	}

	.site-list .site-item {
		padding: 5px 10px;
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-info {
		width: 65px;
	}

	.site-list .site-info h3 {
		font-size: 12px;
	}

	.site-list .site-info p {
		display: none;
	}
}

@media screen and (min-width: 768px) and (max-width: 959px) {

	#touch .site-card {
		margin: 2px;
		width: 50px;
	}

	#touch .site-card .site-touch-icon {
		width: 30px;
		height: 30px;
	}

	.site-list .site-icon img {
		width: 25px;
		height: 25px;
	}

	#touch .site-touch-title {
		margin-bottom: 0px;
		font-size: 12px;
		text-align: center;
	}

	.container {
		width: 100%;
	}

	.sidebar {
		width: 100%;
	}

	.site-list .site-item {
		padding: 5px 10px;
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-info {
		width: 65px;
	}

	.site-list .site-info h3 {
		font-size: 12px;
	}

	.site-list .site-info p {
		display: none;
	}

	.image-placeholder .block {
		width: 190px;
		height: 123px;
		margin: 0 2px;
	}
}

@media only screen and (min-width: 480px) and (max-width: 767px) {

	#touch .site-card {
		margin: 2px;
	}

	#touch .site-card .site-touch-icon {
		width: 30px;
		height: 30px;
	}

	.site-list .site-icon img {
		width: 25px;
		height: 25px;
	}

	#touch .site-touch-title {
		margin-bottom: 0px;
		font-size: 12px;
		text-align: center;
	}

	.container {
		width: 100%;
	}

	.sidebar {
		width: 100%;
	}

	.site-list .site-item {
		padding: 5px 10px;
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-info {
		width: 65px;
	}

	.site-list .site-info h3 {
		font-size: 12px;
	}

	.site-list .site-info p {
		display: none;
	}

	.image-placeholder .block {
		width: 190px;
		height: 123px;
		margin: 0 2px;
	}
}

@media only screen and (max-width: 479px) {

	#touch .site-card {
		margin: 2px;
		width: 50px;
	}

	#touch .site-card .site-touch-icon {
		width: 30px;
		height: 30px;
	}

	.site-list .site-icon img {
		width: 25px;
		height: 25px;
	}

	#touch .site-touch-title {
		margin-bottom: 0px;
		font-size: 12px;
		text-align: center;
	}

	.container {
		width: 100%;
	}

	.sidebar {
		width: 100%;
	}

	.site-list .site-item {
		padding: 5px 0;
		height: 30px;
		width: 100px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-info {
		width: 65px;
	}

	.site-list .site-info h3 {
		font-size: 12px;
	}

	.site-list .site-info p {
		display: none;
	}

	.image-placeholder .block {
		width: 49%;
		height: 112px;
		margin: 1px 1px;
	}
}
</style>
