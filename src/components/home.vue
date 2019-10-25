<template>
	<div>
		<v-header ref="header"></v-header>

		<section>
			<!-- 搜索功能模块 -->
			<v-search ref="search"></v-search>
			 <!-- 主体板块 -->
			 <div class="main" style="margin-top: 20px;">
			 <v-user ref="userSite"></v-user>

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
							  <transition name="el-zoom-in-top" >
								 <ul v-show="headerNav" class="menu menu-inline cate-list" ref="menuWrapper2">
								 <li class="nav-item-radius" v-for="(category, index) in categorys">
								   <a @click="menuClick(index,$event)">
								  <i :class="category.icon"></i>{{category.name}}
								   </a>
								 </li>
								 </ul>
							  </transition>
							  <transition name="el-zoom-in-top">
								<div style="position: relative;">
									<span v-on:click="headerNav = !headerNav"  v-show="headerNav" style="position: absolute;left: -28px;top: -8px;">
									   <a href="javascript:(0);;" title="收起"><i class="el-icon-caret-top"></i></a>
									</span>
								</div>
							  </transition>
							  <transition name="el-zoom-in-top">
								<span v-on:click="headerNav = !headerNav" v-show="!headerNav">
								  <i class="el-icon-caret-bottom"></i>
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
													   <div class="site-icon">
														<img :data-src="site.icon" :alt="site.title"></img>
														</div>
													   <div class="site-info">
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

		<div class="links">
			 <div class="box">
				 <div class="box-header">
					 <h4><strong>友情链接</strong></h4>
				 </div>
				 <div class="box-body">
					<!-- <table width="100%" border="0" cellpadding="3" cellspacing="0">
						<tbody>
							<tr>
								<td><el-link href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=d05FTkBPTk5GRjcGBlkUGBo" target="_blank" type="info">申请友链</el-link></td>
							</tr>
						</tbody>
					</table> -->
					<table border="0" cellpadding="3" cellspacing="0">
						<tbody>
							<tr>
								<td style=" padding-right: 20px;"><el-link href="https://daohang.aizhancloud.cn/76" target="_blank" type="info">免费收录网站</el-link></td>
								<td><el-link href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=d05FTkBPTk5GRjcGBlkUGBo" target="_blank" type="info">申请友链</el-link></td>
							</tr>
						</tbody>
					</table>
				 </div>
			 </div>
		</div>

		<!-- <div id="sidebar" title="加载边栏" class="el-icon-discover"></div> -->
    <v-footer></v-footer>

 </div>
</template>

<script>
import dataJson from './../data.json';
import header from './common/module/header'
import footer from './common/module/footer'
import calendar from './common/widget/calendar'
import BScroll from 'better-scroll'
import search from './common/module/search'
import userBlock from './common/module/userSite'


export
default {
        data() {
            return {
			  searchIcon: 'http://47.106.84.166:3302/upload/baidu.svg',
              listHeight: [],
              sitesScrollY: 0,
              imgs: ['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp', '//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
              /* apiUrl: 'http://106.54.255.9:3302/', */
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
              loading:true,
            };
        },
        methods: {
          _initScroll() {
            new BScroll(this.$refs.menuWrapper1, { click: true });
            new BScroll(this.$refs.menuWrapper2, { click: true });
          },
          _calculateHeight() {
            let foodList = this.$refs.sitesWrapper.querySelectorAll(".site-list-hook");
            let user = document.querySelector(".user").scrollHeight;
            let search = document.getElementById("search");
            let height = 520 + user;
            this.listHeight  = []
            this.listHeight.push(height)
            for (let i = 0, l = foodList.length; i < l; i++) {
              let item = foodList[i]
              height += item.clientHeight + 10
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

                this.$ajax.get('/hom1/api/getHotList/')
                .then((response)=>{
                    this.hotList = response.data;
                }).catch((response)=>{
                this.$message.error('数据请求失败，请稍后再试');
                });

                this.$ajax.get('/hom1/api/getList')
                .then((response)=>{
                  loading.close();
                            for(let categorie of response.data.categories){
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
                            this.sites = response.data.webSites;
							  this.$nextTick(() => {
								this.$refs.userSite.getUserSites();
								this._initScroll(); // 初始化scroll
								this._calculateHeight(); // 初始化列表高度列表
								var img=document.querySelectorAll("img[data-src]")
								for(var i=0;i<img.length;i++){img[i].style.opacity="0"}
								this.lazy();
							  })
                }).catch((response)=>{
                  loading.close();
                  this.$message.error('数据请求失败，请稍后再试');
                });
            },
            hotSearch: function(options) {
                /* console.log(options.target.innerText); */
                window.open(this.searchUrl + options.target.innerText);
            },
            hotRefresh: function() {
                this.$ajax.get('/hom1/api/getHotList')
                .then((response)=>{
                    this.hotList = response.data;
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
				let user = document.querySelector(".user").scrollHeight;
				if ( t > 618 + user) {
					this.menuTop = true;
				} else{
					this.menuTop = false;
				}


				var img=document.querySelectorAll("img[data-src]")
				for(var i=0;i<img.length;i++){img[i].style.opacity="0"}
				//图片懒加载
				this.lazy();

			},
			tabs:function(name,event){
				event.path[2].querySelector(".tablist .active").className = "";
				event.target.className = "active";
				event.path[6].querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
				event.path[6].querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab

				this._calculateHeight();
			},
			lazy:function(){
				var viewHeight=document.documentElement.clientHeight
				var t=document.documentElement.scrollTop||document.body.scrollTop;
				var limg=document.querySelectorAll("img[data-src]")
					Array.prototype.forEach.call(limg,function(item,index){

					var rect
					if(item.getAttribute("data-src")==="")
					return

					rect=item.getBoundingClientRect()
					if(rect.bottom>=0&&rect.top<viewHeight){(function(){
						var img=new Image()
						img.src=item.getAttribute("data-src")
						item.src=img.src
						var j=0
						setInterval(function(){j+=0.2
						if(j<=1){item.style.opacity=j
						return}},100)
						item.removeAttribute('data-src')
					})()}
				})
			}
	  },

      components: {
          'v-header': header,
          'v-footer': footer,
		  'v-search':search,
		  'calendar': calendar,
		  'v-user':userBlock
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
