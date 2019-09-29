<template>
	<div>
		<v-header></v-header>

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
           <!-- <div class="box">
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
         </div> -->

				<el-row :gutter="10">
					<!-- 主体显示块 -->
					<el-col :md="18" :lg="18" :xl="18" class="container">
						<!-- 功能导航板块 -->
						 <div class="box">
							 <div style="width: 100%;display: inherit;border-bottom: 1px #F2F2F2 solid;">
								 <div class="float-left" style="margin-bottom: -5px;">
									 <ul class="nav menu-inline" style="line-height: 36px;">
										 <li class="nav-item"><a style="font-size: 15px;" href="#" class="active">导航</a></li>
										 <li class="nav-item"><a style="font-size: 15px;" href="#">新闻</a></li>
									</ul>
								 </div>
								 <div class="float-right"></div>
							 </div>
							 <div class="box-body" ref="menuWrapper1">
								 <ul class="menu menu-inline cate-list">
									 <li class="nav-item-radius" v-for="(category, index) in categorys">
										 <a @click="menuClick(index,$event)">
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
								   <a @click="menuClick(index,$event)">
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
								<li v-for="category in categorys" class="box site-list-hook tabs">
								  <div class="box-header">
									 <div class="site-tabs">
										 <h3 :id="category.slugName">{{category.name}}</h3>
										 <div class="tabs-nav">
										 	<ul class="tablist">
										 		<li class="tabs-item" v-for="(subCategory,index) in subCategorys[category.categoryId]" @click="tabs(subCategory.slugName,$event)"><a :class="index == 0 ? 'active':''" href="javascript:void(0);">{{subCategory.name}}</a></li>
										 	</ul>
										 </div>
									 </div>
								  </div>
								   <div class="box-body">

										<div class="tabs-content" v-if="subCategorys[category.categoryId]">
											<div v-for="(subCategory,index) in subCategorys[category.categoryId]" :class="index == 0 ? 'tabpanel show':'tabpanel'" :name="subCategory.slugName">
												<ul class="site-list">
												  <li v-for="site in sites[subCategory.categoryId]">
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
										</div>
										<div v-else>
											<ul class="site-list">
											  <li v-for="site in sites[category.categoryId]">
												 <a class="site-item" :href="site.url" target='_blank' :title="site.summary">
												   <div class="site-icon float-left">
													<el-image :src="site.icon" :alt="site.title">
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

						<!-- <div class="box">
						  <el-tabs class="tabs box-body" v-model="activeName" type="card">
							<el-tab-pane label="音乐" name="first">

							</el-tab-pane>
							<el-tab-pane label="预留" name="second">
								<el-carousel trigger="click" height="160px">
									<el-carousel-item v-for="item in imgs" :key="item">
										<img class="thumbnail" :src="item" width="100%" height="100%" />
									</el-carousel-item>
								</el-carousel>
							</el-tab-pane>
							<el-tab-pane label="预留" name="third">预留</el-tab-pane>
						  </el-tabs>
						</div> -->
						<div class="box calendar">
							<div class="box-body">
								<calendar></calendar>
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


		<v-footer></v-footer>
	</div>
</template>

<script>
import dataJson from './../data.json';
import header from './common/module/header'
import footer from './common/module/footer'
import calendar from './common/widget/calendar'
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
              /* apiUrl: 'http://47.106.84.166:3302/', */
              apiUrl: 'http://127.0.0.1:3302/',
              categorys: [],
              subCategorys: {},
              activeSubCategorys: {},
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
			  this.listHeight  = []
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
			  /* console.log(this.listHeight[index]) */
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
					loading.close();
                    for(let categorie of res.body.categories){
                      if(categorie.parentId == 0){
                        this.categorys.push(categorie)
                      }else{
                        let value = this.subCategorys[categorie.parentId];
                        if(value == undefined)
                          value = []
                        value.push(categorie)
                        this.subCategorys[categorie.parentId] = value;

                        //默认选择tab项
                        if(this.activeSubCategorys[categorie.parentId] == undefined)
                          this.activeSubCategorys[categorie.parentId] = categorie.slugName

                      }
                    }
                    this.sites = res.body.webSites;
					this.$nextTick(() => {
					  this._initScroll(); // 初始化scroll
					  this._calculateHeight(); // 初始化列表高度列表
					})
                },
                function() {
					loading.close();
                    this.$message.error('数据请求失败，请稍后再试');
                });
            },
            hotSearch: function(options) {
                /* console.log(options.target.innerText); */
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
			},
			tabs:function(name,event){
				event.path[2].querySelector(".tablist .active").className = "";
				event.target.className = "active";
				event.path[6].querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
				event.path[6].querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab

				this._calculateHeight();
			}
        },
        components: {
            'v-header': header,
            'v-footer': footer,
			'calendar': calendar
        },
		created() {
			this.getData();
			window.addEventListener('scroll', this.handleScroll, true);
		}
    }
</script>

<style>
@import '../assets/css/home_content.css';
@import '../assets/css/home_sidebar.css';
</style>
