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
										 <li class="nav-item"><v-link href="/">导航</v-link></li>
										 <li class="nav-item"><v-link href="/hot">热榜</v-link></li>
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
							
						<slot></slot>
							
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
									<el-carousel-item>
							   <ul v-for="array in hotList" class="menu" style="width: 100%;">
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
		
		<!-- 友情链接 -->
		<v-links></v-links>

		<!-- <div id="sidebar" title="加载边栏" class="el-icon-discover"></div> -->
    <v-footer></v-footer>

 </div>
</template>

<script>
import BScroll from 'better-scroll'
import dataJson from '../data.json';
import header from '../pages/header'
import footer from '../pages/footer'

import search from '../pages/search'
import userBlock from '../pages/userSite'
import links from '../pages/links'
import calendar from '../components/calendar'
import VLink from '../components/VLink'



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
				loading.close();
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
		  'v-user':userBlock,
		  'v-links':links,
		  'v-link':VLink,
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
