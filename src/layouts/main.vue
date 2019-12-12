<template>
	<div>
		<v-header ref="header"></v-header>

		<section>
			<!-- 搜索功能模块 -->
			<v-search ref="search"></v-search>
			 <!-- 主体板块 -->
			 <div class="main scroll-in">
				<v-user ref="userSite"></v-user>

				<el-row :gutter="15">
				<!-- 主体显示块 -->
				<el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17" class="container">
					<!-- 功能导航板块 -->
					 <div id="nav" class="box">
						 <div style="width: 100%;display: inherit;border-bottom: 1px #F2F2F2 solid;margin-bottom: -5px;">
							 <div class="float-left" style="margin-bottom: -1px;margin-left: 5px;">
								 <ul class="nav menu-inline" style="line-height: 46px;">
									 <li class="nav-item"><v-link href="/">导航</v-link></li>
									 <li class="nav-item"><v-link href="/hot">热榜</v-link></li>
									 <li class="nav-item"><v-link href="/kuaidi">查快递</v-link></li>
								</ul>
							 </div>
							 <div class="float-right"></div>
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
				<el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7" class="sidebar">
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
					<div class="box">
						<div class="box-body">
							<weather></weather>
						</div>
					</div>
					<div class="box calendar">
						<div class="box-body">
							<calendar></calendar>
						</div>
					</div>
					<div class="box hot-link">
						<div class="box-header">
							<h3><img :src="searchIcon">热搜榜</h3>
							<i @click="hotRefresh" class="el-icon-refresh" style="cursor:pointer"></i>
						</div>
						<div class="box-body">
							<el-carousel trigger="click" :autoplay="false" indicator-position="none" height= "350px">
								<el-carousel-item v-for="(array,index) in hotList" :key="index">
						   <ul class="menu" style="width: 100%;">
							 <li class="nav-item" style="width: 100%;"  v-for="item in array" :key="item.index">
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
					<div class="box" id="ads" v-show="!isLogin">
						<ins class="adsbygoogle"
						 style="display:block"
						 data-ad-client="ca-pub-3017438581004529"
						 data-ad-slot="2727905770"
						 data-ad-format="auto"
						 data-full-width-responsive="true"></ins>
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
		</section>
		
		<!-- 友情链接 -->
		<v-links></v-links>

		<sidebar-block ref="sidebarBlock"></sidebar-block>
		
		<!-- <div id="sidebar" title="加载边栏" class="el-icon-discover"></div> -->
		<v-footer></v-footer>

 </div>
</template>

<script>
import BScroll from 'better-scroll'
import dataJson from '../data.json';
import header from '../layouts/header'
import footer from '../layouts/footer'

import search from '../layouts/search'
import userBlock from '../layouts/userSite'
import links from '../layouts/links'
import calendar from '../components/calendar'
import VLink from '../components/VLink'
import sidebarBlock from '../components/sidebar_block'
import weatherPlugin from '../components/weather_plugin'


export
default {
        data() {
            return {
			  searchUrl:'https://www.baidu.com/s?word=',
			  searchIcon: require('../assets/img/baidu.svg'),
              imgs: ['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp', '//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
              hotList: null,
              activeName: 'first',
			  isLogin:false
            };
        },
        methods: {
            getData: function() {
                this.thumbnails = dataJson.getThumbnail;
                this.$ajax.get('/hom1/api/getHotList/')
                .then((response)=>{
                    this.hotList = response.data;
                }).catch((response)=>{
                this.$message.error('数据请求失败，请稍后再试');
                });
            },
            hotSearch: function(options) {
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
            }
	  },

      components: {
          'v-header': header,
          'v-footer': footer,
		  'v-search':search,
		  'calendar': calendar,
		  'sidebar-block': sidebarBlock,
		  'v-user':userBlock,
		  'v-links':links,
		  'v-link':VLink,
		  'weather':weatherPlugin,
      },
		created() {
			this.getData();
			
			function addEvent(obj,xEvent,fn) {
				if(obj.attachEvent){
				  obj.attachEvent('on'+xEvent,fn);
				}else{
				  obj.addEventListener(xEvent,fn,false);
				}
			}
			
			 function onMouseWheel(ev) {/*当鼠标滚轮事件发生时，执行一些操作*/
				var ev = ev || window.event;
				var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
					down = ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;
					
				var simple = localStorage.getItem("simple");
				if(down){
					document.querySelector('.scroll-in').style.display= "block"
					document.querySelector('.links').style.display= "block"
					document.querySelector('.scroll-in').style.top= "0"
					document.querySelector('#search').style.padding= "68px 0 128px 0"
					document.querySelector('footer').style.zIndex="99"
					if(simple != true || simple == null )
					localStorage.setItem("simple", true);
				}else{
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					if(scrollTop == 0){
						document.querySelector('.scroll-in').style.display= "none"
						document.querySelector('.links').style.display= "none"
						document.querySelector('#search').style.padding= "180px 0 128px 0"
						document.querySelector('footer').style.zIndex="-1"
						if(simple != false || simple == null)
						localStorage.setItem("simple", false);
					}
				}
				//if(ev.preventDefault){/*FF 和 Chrome*/
					//ev.preventDefault();// 阻止默认事件
				//}
				return false;
			}
			 addEvent(document.documentElement,'mousewheel',onMouseWheel);
			 addEvent(document.documentElement,'DOMMouseScroll',onMouseWheel);
			 
			 this.$nextTick(() => {				 
				 var simple = localStorage.getItem("simple");
				 if(simple != 'false'){
					 document.querySelector(".scroll-in").style.top = "0";
					 document.querySelector('footer').style.zIndex="99"
				 } else{
					 document.querySelector(".scroll-in").style.top = "400px";
					 document.querySelector(".scroll-in").style.display = "none";
					 document.querySelector('.links').style.display= "none"
					 document.querySelector('#search').style.padding= "180px 0 128px 0"
					 document.querySelector('footer').style.zIndex="-1"
				 }
			 })
		}
    }
</script>

<style>
@import '../assets/css/home_content.css';
@import '../assets/css/home_sidebar.css';

#nav .nav-item a{
	font-size: 15px;
}

#nav .nav-item{
	    margin: 0 8px;
}

.scroll-in{
	position: relative; transition:top 1s;
}
</style>
