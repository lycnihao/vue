<template>
	<div>
		<head-top></head-top>

		<section>
			<div id="search">
				<svg class="bg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
					<defs>
						<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
					</defs>
					<g class="parallax">
						<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
						<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
						<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
						<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
					</g>
				</svg>
				<h3>以高效的方式获取想要的资源</h3>
				<div class="search-tools" style="height: 40px; line-height: 40px;">
					<ul class="nav menu-inline" style="line-height: 30px;">
						<li class="nav-item"><a href="javascript::void(0)" class="active">搜索引擎</a></li>
						<li class="nav-item"><a href="javascript::void(0)">站点搜索</a></li>
						<li class="nav-item"><a href="javascript::void(0)">文章搜索</a></li>
						<li class="nav-item"><a href="javascript::void(0)">图片</a></li>
						<li class="nav-item"><a href="javascript::void(0)">素材</a></li>
					</ul>
				</div>
				<div class="search-center">
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
					<button id="search_but" @click="search" style="padding: 10px 25px;">{{searchTitle}}搜索</button>
				</div>

			</div>

			 <!-- 主体板块 -->
			 <div class="main" style="margin-top: 20px;">
           <!-- user-block图标板块 -->
           <div class="box">
              <div class="box-header">
               <h3>常用链接</h3>
              </div>
             <div class="box-body">
                <div id="user-block">
                   <ul class="user-website">
                     <li>
                        <a class="site-item" href="#" target='_blank' title="测试">
                          <div class="site-icon float-left"><el-image src="http://47.106.84.166:3302/upload/www_ipmtalk_com.png" lazy></el-image></div>
                          <div class="site-info float-right">
                          <h3>测试标题</h3>
                          <p>测试描述</p>
                          </div>
                        </a>
                     </li>
                     <li>
                        <a class="site-item" href="#" target='_blank' title="测试">
                          <div class="site-icon float-left"><el-image src="http://47.106.84.166:3302/upload/www_ipmtalk_com.png" lazy></el-image></div>
                          <div class="site-info float-right">
                          <h3>测试标题</h3>
                          <p>测试描述</p>
                          </div>
                        </a>
                     </li>
                     <li>
                        <a class="site-item" href="#" target='_blank' title="测试">
                          <div class="site-icon float-left"><el-image src="http://47.106.84.166:3302/upload/www_ipmtalk_com.png" lazy></el-image></div>
                          <div class="site-info float-right">
                          <h3>测试标题</h3>
                          <p>测试描述</p>
                          </div>
                        </a>
                     </li>
                   </ul>
                </div>
             </div>
         </div>

				<el-row :gutter="10">
					<!-- 主体显示块 -->
					<el-col :md="18" :lg="18" :xl="18" class="container">
						<!-- 功能导航板块 -->
						 <div class="box">
							 <div style="width: 100%;display: inherit;border-bottom: 1px #F2F2F2 solid;">
								 <div class="float-left" style="margin-bottom: -5px;">
									 <ul class="nav menu-inline" style="line-height: 30px;">
										 <li class="nav-item"><a href="#" class="active">导航</a></li>
										 <!-- <li class="nav-item"><a href="#test">其他</a></li> -->
									</ul>
								 </div>
								 <div class="float-right"></div>
							 </div>
							 <div class="box-body" ref="menuWrapper1">
								 <ul class="menu menu-inline cate-list">
									 <li class="nav-item-radius" v-for="(category, index) in categorys">
										 <a  :class="(index == 0 ? 'active':'')" @click="menuClick(index,$event)">
											<i :class="category.icon"></i>{{category.name}}
										 </a>
									 </li>
								 </ul>
							 </div>
						 </div>

						 <div v-show="menuTop" v-bind:class="['header-top-nav main', !headerNav ? 'hide' : '']">
						  <el-row :gutter="10">
							<!-- 主体显示块 -->
							<el-col :md="18" :lg="18" :xl="18" class="block">
							  <transition name="slide-fade" >
								 <ul v-show="headerNav" class="menu menu-inline cate-list" ref="menuWrapper2">
								 <li class="nav-item-radius" v-for="(category, index) in categorys">
								   <a :class="(index == 0 ? 'active':'')" @click="menuClick(index,$event)">
								  <i :class="category.icon"></i>{{category.name}}
								   </a>
								 </li>
								 </ul>
							  </transition>
							  <transition name="slide-fade">
								<span v-on:click="headerNav = !headerNav"  v-show="headerNav">
								   <i class="el-icon-caret-top"></i>
								</span>
							  </transition>
							  <transition name="slide-fade">
								<span v-on:click="headerNav = !headerNav" v-show="!headerNav">
								  <i class="el-icon-caret-bottom"></i>显示导航
								</span>
							  </transition>
							</el-col>
						  </el-row>
						 </div>

						<div id="wrapper" ref="sitesWrapper">
							<ul>
								<li v-for="category in categorys" class="box site-list-hook">
								  <div class="box-header">
									 <h3 :id="category.slugName">{{category.name}}</h3>
									 <span><i class="el-icon-setting"></i></span>
								  </div>
								   <div class="box-body">
									 <ul class="site-list">
									   <li v-for="site in sites[category.categoryId]">
										 <a class="site-item" :href="site.url" target='_blank' :title="site.summary">
										   <div class="site-icon float-left">
												<el-image :src="site.icon" :alt="site.title" lazy>
													<div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i></div></el-image>
												</div>
										   <div class="site-info float-right">
											 <h3>{{ site.title }}</h3>
											 <p>{{ site.summary }}</p>
										   </div>
										 </a>
									   </li>
									 </ul>
								   </div>
								</li>
							</ul>
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

						<div class="box">
						  <el-tabs class="tabs box-body" v-model="activeName" type="card">
							<el-tab-pane label="预留" name="first">
								<el-carousel trigger="click" height="130px">
									<el-carousel-item v-for="item in imgs" :key="item">
										<img class="thumbnail" :src="item" width="100%" height="100%" />
									</el-carousel-item>
								</el-carousel>
							</el-tab-pane>
							<el-tab-pane label="音乐" name="second">
								<div style="position: relative;display: flex;justify-content:center">
									<div>
										<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="//music.163.com/outchain/player?type=0&id=2822479734&auto=0&height=32"></iframe>
										<div class="music-ing" style="position:absolute;top: 10px;margin-left: 11px;">
											<a href="https://music.163.com/playlist?id=2822479734" target="_blank" rel="nofollow">
												<img src="http://47.106.84.166:3302/upload/music.svg" width="20" height="20">
											</a>
										</div>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="预留" name="third">预留</el-tab-pane>
						  </el-tabs>
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
                     <li class="nav-item" style="width: 100%;"  v-for="item in array">
                       <div style="display: flex;justify-content:space-between;">
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
import BScroll from 'better-scroll'

export
default {
        data() {
            return {
				listHeight: [],
				sitesScrollY: 0,

                activeIndex:'1',
                searchTitle: '百度',
                searchUrl: 'https://www.baidu.com/s?word=',
                searchIcon: 'http://47.106.84.166:3302/upload/baidu.svg',
                imgs: ['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp', '//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
                apiUrl: 'http://47.106.84.166:3302/',
                /* apiUrl: 'http://127.0.0.1:3302/', */
                categorys: [],
                sites: null,
                touch: null,
                recommend: null,
                thumbnails: null,
                hotList: null,
                headerNav:true,
                menuTop:false,
                activeName: 'first',
                loading:true
            };
        },
        methods: {
			_initScroll() {
			  new BScroll(this.$refs.menuWrapper1, { click: true });
			  new BScroll(this.$refs.menuWrapper2, { click: true });
			},
			_calculateHeight() {
			  let foodList = this.$refs.sitesWrapper.querySelectorAll(".site-list-hook")
			  let search = document.getElementById("search");
			  let height = 550
			  this.listHeight.push(height)
			  for (let i = 0, l = foodList.length; i < l; i++) {
			    let item = foodList[i]
			    height += item.clientHeight
			    this.listHeight.push(height)
			  }
			},
			menuClick(index, event) {
			  if (!event._constructed) {
			    return
			  }
			  console.log(this.listHeight[index])
			  window.scrollTo({ top: this.listHeight[index], left: 0, behavior: 'smooth' })
			},
            search: function() {
                var url = this.searchUrl + document.getElementById("search_text").value;
                window.open(url, "_blank")
            },
            handleCommand: function(command) {
                var str = command.split(',');
                this.searchTitle = str[0];
                this.searchUrl = str[1];
                this.searchIcon = str[2];
            },
            getData: function() {
                //this.touch = dataJson.getTouch;
                //this.sites = dataJson.getList;
                //this.recommend = dataJson.getRecommend;
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.2)'
                });
                this.thumbnails = dataJson.getThumbnail;
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
                this.$http.get(this.apiUrl + 'api/getList').then(function(res) {
                    this.categorys = res.body.categories;
                    this.sites = res.body.webSites;
                    loading.close();
					this.$nextTick(() => {
					  this._initScroll(); // 初始化scroll
					  this._calculateHeight(); // 初始化列表高度列表
					})
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
            },
			handleScroll: function(){
				//变量t是滚动条滚动时，距离顶部的距离
				var t = document.documentElement.scrollTop||document.body.scrollTop;
				if ( t > 600) {
					this.menuTop = true;
				} else{
					this.menuTop = false;
				}
			}
        },
        components: {
            'headTop': header,
            'foot': footer
        },
		mounted() {
		},
		created() {
			this.getData();
			window.addEventListener('scroll', this.handleScroll, true);
		  }
    }
</script>

<style>

.tabs .el-tabs__header ,.tabs .el-tabs__header .el-tabs__nav{
	border:none !important;
}
.tabs .el-tabs__header .el-tabs__nav{
	background-color: transparent;
}
.tabs .el-tabs__header .el-tabs__item{
	border-left:none !important;
	color: #ccc;
}
.tabs .el-tabs__item{
	margin-right:10px;
	height:22px;
	line-height:25px;
	padding: 0 12px !important;
  border-radius: 22px;
	text-align: center;
}
.tabs .el-tabs__item:hover{
	color: #409EFF;
	background-color: #eef5fe;
}
.tabs .el-tabs__header .el-tabs__item.is-active{
	color: #409EFF;
	background-color: #eef5fe;
	border-bottom-color:#E6F1FE;
}


/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.hide{
  	box-shadow:none !important;
    background-color:transparent !important;
}
.hide span{
  display: none;
  color: #CCCCCC;
}
.hide:hover span{
  color: #CCCCCC;
  display: flex;
  align-items:center;
}


.site-nav .item{
	padding: 10px 15px;
}
.header-top-nav{
	position: fixed;
	top: 58px;
	left: -2px;
	right: 0;
	padding: 0 7px;
}

.header-top-nav .block{
  z-index: 99;
  padding: 6px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 0.5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-top-nav .block ul{
	padding: 0 5px;
}

.header-top-nav span{
	color: #ccc;
	margin: 0 18px;
	cursor: pointer;
}
.header-top-nav span:hover{
	color: #409EFF;
}


/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}

.bg {
    position: absolute;
	bottom: 0;
    width: 100%;
	height: 15vh;
}

section {
	margin: 0 !important;
}

#search {
	position: relative;
	padding: 180px 0 230px 0;
	background: linear-gradient(60deg, rgba(84,58,183,1) 10%, rgba(0,172,193,1) 100%);
	background-image: url(../assets/bg/bg2.png);
}

#search .search-center,#search .search-tools{
	display: flex;
	justify-content: center;
}

#search .search-tools li{
	margin: 0 12px;
}

#search .search-tools .nav .nav-item a{
	color: #fff;
}

#search .search-tools .nav .nav-item a.active:after{
	width: 100%;
	left: 0;
}

#search input,#search button {
	margin: 0;
	padding: 10px 15px;
	outline: 0;
	border: none;
}

#search h3{
	text-align: center;
	margin-bottom: 60px;
	color: #fff;
	font-size: 40px;
    font-weight: 100!important;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
;
	}

#search #search_text {
	padding: 15px 15px 15px 62px;
	width: 40%;
	-webkit-transition: ease .3s;
	transition: ease .3s;
	-webkit-transform-origin: 50% 50%;
}
#search_text{
	border-radius:5px 0 0 5px;
}
#search_text:hover {
		/* box-shadow: 0 8px 43px rgba(0,0,0,0.15); */
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

#search_but{
	border-radius:0 5px 5px 0 !important;
}

#search #search_but {
	color: #fff;
	border-radius: 0;
	background-color: #909399;
	cursor: pointer;
}

.dropdown {
	position: relative;
}
.dropdown span i{
	color: #909399;
}

#user-block{
  width: 100%;
  margin: 5px 0;
  border-radius: 2px;
  background-color: #f9f9f9;
  display: flex;
}
.user-website{
  width: 100%;
  padding: 20px 15px;
  background-color: #fff;
}
.user-website>li{
  margin: 2px 5px;
  border-radius: 6px;
  display: inline-block;
  border: 1px solid #b59b751c;
  box-shadow: 0 4px 10px rgba(36, 37, 38, 0.06);
  transition: box-shadow 0.25s ease-out, transform 0.25s ease-out, -webkit-box-shadow 0.25s ease-out, -webkit-transform 0.25s ease-out;
}
.user-website>li:hover{
  box-shadow: 5px 8px 10px rgba(36, 37, 38, 0.13);
  transform: translate(0%, -4px);
}
.user-website>li>a{
  padding: 5px 15px;
  height: 60px;
  width: 190px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.user-website>li>a .site-icon{
  margin-right: 5px;
}

.user-website>li>a .site-info {
    width: 130px;
}

.user-website>li>a .site-info p{
    color: #a1a7b7;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.user-website>li>a img{
    width: 36px;
    height: 36px;
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
	height: 80px;
  width: 25%;
  display: inline-flex;
}

.site-list .site-item {
  padding: 10px 15px;
	height: 100%;
	font-size: 14px;
	display: flex;
	align-items: center;
	overflow: hidden;
  transition: all .4s cubic-bezier(.175,.885,.32,1);
}

.site-list .site-item:hover {
	/* background: rgba(241,242,249,.5); */
  background: #eee;
}

.site-list .site-info {
  width: 88%;
}

.site-list .site-info h3 {
	color: #444444;
}

.site-list .site-info p {
	color: #a1a7b7;
	font-size: 12px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
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
	left: 0;
	top: 2px;
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

.site-icon .el-image{
	position: inherit!important;
}

@media screen and (min-width:1200px) {

	.main{
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
		width: 36px;
		height: 36px;
	}

	.site-list .site-item {
		height: 60px;
		width: 100%;
	}

	.site-list .site-icon {
		margin-right: 5px;
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

	.header-top-nav{
		display: none;
	}

	.main{
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
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-info h3 {
		font-size: 12px;
	}

	.site-list .site-info p {
		display: none;
	}
}

@media screen and (min-width: 768px) and (max-width: 959px) {

	.header-top-nav{
		display: none;
	}

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
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
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

	.header-top-nav{
		display: none;
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

	.site-list li {
		height: 45px;
	}

	.site-list .site-item {
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
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

	.header-top-nav{
		display: none;
	}
  .bg {
    height:40px;
    min-height:40px;
  }
  #search {
  	padding: 130px 0 80px 0;
  }

	#search h3{
		margin-bottom: 22px;
		font-size: 22px;
		}

	#search .search-tools li{
		margin: 0 3px;
	}

  #search #search_text{
    padding: 13px 8px 13px 58px!important;
  }

  #search input,#search button {
  	padding: 10px 15px!important;
  }

  .user-website{
    padding: 0;
  }

  .user-website>li{
    display: inline-flex;
    margin: 2px;
    width: 47%;
  }

  .user-website>li>a{
    height: 40px;
    padding: 5px 15px;
  }

  .user-website>li>a .site-icon{
    margin-right: 2px;
  }

  .user-website>li>a .site-info h3{
      font-size: 14px;
  }

  .user-website>li>a .site-info p{
      font-size: 11px;
  }

  .user-website>li>a img{
      width: 30px;
      height: 30px;
  }

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

	.site-list li {
		height: 45px;
    width: 33.3%;
	}

	.site-list .site-item {
		height: 30px;
		width: 100px;
	}

	.site-list .site-icon {
		margin-right: 5px;
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
