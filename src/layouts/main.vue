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
				<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="container">
					<!-- 功能导航板块 -->
					 <div id="nav" class="box">
						 <div style="width: 100%;display: inherit;margin-bottom: -5px;">
							 <div class="float-left" style="margin-bottom: -1px;margin-left: 5px;">
								 <ul class="nav menu-inline" style="line-height: 46px;">
									 <li class="nav-item"><v-link href="/">导航</v-link></li>
									 <li class="nav-item"><v-link href="/hot">热榜</v-link></li>
									 <li class="nav-item"><v-link href="/kuaidi">查快递</v-link></li>

								</ul>
							 </div>
							 <div class="float-right">
								  <ul class="nav menu-inline" style="line-height: 46px;">
								 	 
								 </ul>
							 </div>
						 </div>
					 </div>
						
					<slot></slot>
				</el-col>
				<!-- 侧边栏 -->
				<el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="sidebar">
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
							<weather ref="weather"></weather>
						</div>
					</div>
					<div class="box">
						<div class="box-header">
							<h3>🎖️热门推荐</h3>
							<i class="el-icon-refresh" style="cursor:pointer" @click="RefRecommend()"></i>
						</div>
						<div id="billboard" class="box-body">
							<el-carousel indicator-position="outside" :autoplay="false" arrow="never" >
								<el-carousel-item v-for="(array,index) in recommends" :key="index">
								  <ul style="width: 100%;">
								  	 <li  style="width: 100%;"  v-for="(website,key) in array" :key="key">
								  		 <a class="link" :href="website.url">
											<div class="webSite-icon" style="background-image: url('https://www.168dh.cn/favicon.ico');" v-if="website.icon == null"></div>
								  			<div class="webSite-icon" :style="'background-image: url('+website.icon+');'" v-else></div>
								  			<div class="webSite-info">
								  				<a class="title" :href="website.url">
								  					{{website.title}}
								  				</a>
								  				<div class="description">
								  					{{website.summary}}
								  				</div>
								  			</div>
								  		 </a>
								  	 </li>
								  </ul>
								</el-carousel-item>
							  </el-carousel>
							 
						</div>
					</div>
					<div class="box" id="ads">
						<ins class="adsbygoogle"
						 style="display:block; text-align:center;"
						 data-ad-layout="in-article"
						 data-ad-format="fluid"
						 data-ad-client="ca-pub-3017438581004529"
						 data-ad-slot="6351802465"></ins>
					</div>
				</el-col>
				</el-row>
			 </div>
		</section>
		
		<!-- 友情链接 -->
		<v-links></v-links>

		<sidebar-block ref="sidebarBlock"></sidebar-block>
		
		<v-footer></v-footer>

 </div>
</template>

<script>
import BScroll from 'better-scroll'
import header from '../layouts/header'
import footer from '../layouts/footer'

import search from '../layouts/search'
import userBlock from '../layouts/userSite'
import links from '../layouts/links'
import VLink from '../components/VLink'
import sidebarBlock from '../components/sidebar_block'
import weatherPlugin from '../components/weather_plugin'


export
default {
	data() {
		return {
		  searchUrl:'https://www.baidu.com/s?word=',
		  imgs: ['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp', '//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
		  activeName: 'first',
		  isLogin:false,
		  recommends : []
		};
	},
	methods: {
		getRecommend:function(){
			this.$ajax.get('/api/webSite/recommend')
			.then((response)=>{
				if (response.data != null) {
					let index = 1;
					this.recommends = [];
				    for(let i = 0; i < response.data.length; i++ ){
						if(i!= 0 && i % 4 == 0){
							index ++
						}
						if(this.recommends[index-1] == undefined){
							this.recommends[index-1] = [];
						}
						this.recommends[index-1].push(response.data[i]);
					}
				}
			}).catch((response)=>{
			  this.$message.error('数据请求失败，请稍后再试');
			});
		},
		RefRecommend:function(){
			this.$ajax.get('/api/webSite/recommend/r')
			.then((response)=>{
				if (response.data != null) {
					let index = 1;
					this.recommends = [];
				    for(let i = 0; i < response.data.length; i++ ){
						if(i!= 0 && i % 4 == 0){
							index ++
						}
						if(this.recommends[index-1] == undefined){
							this.recommends[index-1] = [];
						}
						this.recommends[index-1].push(response.data[i]);
					}
					console.log(this.recommends[0])
				}
			}).catch((response)=>{
			  this.$message.error('数据请求失败，请稍后再试');
			});
		}
	},

	components: {
	  'v-header': header,
	  'v-footer': footer,
	  'v-search':search,
	  'sidebar-block': sidebarBlock,
	  'v-user':userBlock,
	  'v-links':links,
	  'v-link':VLink,
	  'weather':weatherPlugin,
	},
	created() {
		
		function addEvent(obj,xEvent,fn) {
			if(obj.attachEvent){
			  obj.attachEvent('on'+xEvent,fn);
			}else{
			  obj.addEventListener(xEvent,fn,false);
			}
		}
		
		var that = this;
		 function onMouseWheel(ev) {/*当鼠标滚轮事件发生时，执行一些操作*/
		 
			if(that.$refs.header.skinOpen){
				return
			}
			
		 
			var ev = ev || window.event;
			var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
				down = ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;
				
			var simple = localStorage.getItem("simple");
			if(down){
				document.querySelector('.scroll-in').style.display= "block"
				document.querySelector('.links').style.display= "block"
				document.querySelector('.scroll-in').style.top= "0"
				document.querySelector('#search').style.padding= "158px 0 128px 0"
				document.querySelector('footer').style.zIndex="99"
				document.querySelector('.header').style.zIndex="99"
				document.querySelector('.header').style.opacity="1"
				document.querySelector('.header-simple').style.opacity="0"
				if(simple != true || simple == null )
				localStorage.setItem("simple", true);
			}else{
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop == 0){
					document.querySelector('.scroll-in').style.display= "none"
					document.querySelector('.links').style.display= "none"
					document.querySelector('#search').style.padding= "220px 0 228px 0"
					document.querySelector('footer').style.zIndex="-1"
					document.querySelector('.header').style.zIndex="-1"
					document.querySelector('.header').style.opacity="0"
					document.querySelector('.header-simple').style.opacity="1"
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
			 this.getRecommend();
			 var simple = localStorage.getItem("simple");
			 if(simple != 'false'){
				 document.querySelector(".scroll-in").style.top = "0";
				 document.querySelector('.header').className="header head-bg"
				 document.querySelector('footer').style.zIndex="99"
				 document.querySelector('.header').style.zIndex="99"
				 document.querySelector('.header').style.opacity="1"
				 document.querySelector('.header-simple').style.opacity="0"
			 } else{
				 document.querySelector(".scroll-in").style.top = "400px";
				 document.querySelector(".scroll-in").style.display = "none";
				 document.querySelector('.links').style.display= "none"
				 document.querySelector('#search').style.padding= "220px 0 128px 0"
				 document.querySelector('footer').style.zIndex="-1"
				 document.querySelector('.header').style.zIndex="-1"
				 document.querySelector('.header').style.opacity="0"
				 document.querySelector('.header-simple').style.opacity="1"
			 }
		 })
	}
}
</script>

<style>
@import '../assets/css/style.css';

#ads{
	background-color: transparent;
	box-shadow:none;
}

.sidebar .box-header h3{
	font-size: 17px;
}

#nav .nav-item a{
	font-size: 15px;
}

#nav .nav-item{
	    margin: 0 8px;
}

.scroll-in{
	position: relative; transition:top 1s;
}

#billboard{
	
}

#billboard li > a{
	padding: .8rem 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
	height: 50px;
}

#billboard li > a:hover{
	background-color: hsla(0,0%,84.7%,.1);
}

#billboard li > a:hover .title{
	color: #3280fc;
}

#billboard .webSite-icon{
	flex: 0 0 auto;
    width: 2.2rem;
    height: 2.2rem;
    /* border-radius: 50%; */
    margin-right: .5rem;
	display: inline-block;
    position: relative;
    background-position: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: #fff;
	cursor: pointer;
}
#billboard .webSite-info{
	
}

#billboard .webSite-info .title{
	font-size: 16px;
	color: #333;
}

#billboard .webSite-info .description{
	font-size: 13px;
	text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
