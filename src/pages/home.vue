<template>
	<main-layout>
		<div class="box-body" ref="menuWrapper1" style="display: inline-block;">
			 <ul class="menu menu-inline cate-list">
				 <li class="nav-item-radius" v-for="(category, index) in categorys">
					 <a @click="menuClick(index,$event)" style="font-size: 13px;">
						<i :class="category.icon"></i>{{category.name}}
					 </a>
				 </li>
			 </ul>
		</div>
		  <div v-show="menuTop" v-bind:class="['header-top-nav main', !headerNav ? 'hide' : '']">
		  <el-row :gutter="10" style="margin-right: -2px!important;">
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
					   <a href="Javascript:void(0);" title="收起"><i class="el-icon-caret-top"></i></a>
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
						 		<li class="tabs-item" v-for="(subCategory,index) in subCategorys[category.categoryId]" @click="tabs(subCategory.slugName,$event)"><a :class="index == 0 ? 'active':''" href="Javascript:void(0);">{{subCategory.name}}</a></li>
						 	</ul>
						 </div>
					 </div>
				  </div>
				   <div class="box-body">
		
						<div class="tabs-content" v-if="subCategorys[category.categoryId]">
							<div v-for="(subCategory,index) in subCategorys[category.categoryId]" :key="index" :class="index == 0 ? 'tabpanel show':'tabpanel'" :name="subCategory.slugName" >
								<ul class="site-list">
								  <li v-for="(site,i) in sites[subCategory.categoryId]" :key="i">
									 <i class="el-icon-circle-plus collect" @click="addUserSite(site)"></i>
									 <a class="site-item" :href="site.url" target='_blank' :title="site.summary" @click="visit(site.websiteId)">
									   <div class="site-icon">
										<img data-src="https://www.168dh.cn/favicon.ico" :alt="site.title" v-if="site.icon == null"></img>
										<img :data-src="site.icon" :alt="site.title" v-else></img>
										<i class="site-icon-shadow"></i>
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
								 <i class="el-icon-circle-plus collect" @click="addUserSite(site)"></i>
								 <a class="site-item" :href="site.url" target='_blank' :title="site.summary" @click="visit(site.websiteId)">
									<div class="site-icon">
									<img data-src="https://www.168dh.cn/favicon.ico" :alt="site.title" v-if="site.icon == null"></img>
									<img :data-src="site.icon" :alt="site.title" v-else></img>
									<i class="site-icon-shadow"></i>
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
	</main-layout>
</template>

<script>
import BScroll from 'better-scroll'
import MainLayout from '../layouts/main'
export
default {
		data() {
			return {
				headerNav:false,
				menuTop:false,
				listHeight: [],
				sitesScrollY: 0,
				sites:[],
				categorys: [],
				subCategorys: {},
				activeSubCategorys: {},
			}
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
			  let height = 450 + user;
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
			  window.scrollTo({ top: this.listHeight[index], left: 0, behavior: 'smooth' })
			},
			lazy:function(){
				this.$nextTick(() => {
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
							item.style.opacity = 1
							/* item.nextElementSibling.style.backgroundImage = 'url('+img.src+') no-repeat 50%/cover;' */
							/* item.removeAttribute('data-src') */
						})()}
					})
				})
				
			},
			handleScroll: function(){
			
				//变量t是滚动条滚动时，距离顶部的距离
				var t = document.documentElement.scrollTop||document.body.scrollTop;
				let user = document.querySelector(".user").scrollHeight;
				if ( t > 450 + user) {
					this.menuTop = true;
				} else{
					this.menuTop = false;
				}
			
				//图片懒加载
				this.lazy();
			
			},
			tabs:function(name,event){
				event.target.parentElement.parentElement.querySelector(".tablist .active").className = "";
				event.target.className = "active";
				event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
				event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab
			
				this._calculateHeight();
			},
			visit:function(id){
				this.$ajax.post('/api/visit/'+id)
			},
			addUserSite:function(webSite){
				if(!this.$children[0].$refs.header.isLogin){
					this.$message.error('请登陆后在进行操作');
					return false;
				}
				this.$set(this.$children[0].$refs.userSite.saveForm,"icon", webSite.icon)
				this.$set(this.$children[0].$refs.userSite.saveForm,"url", webSite.url)
				this.$set(this.$children[0].$refs.userSite.saveForm,"title", webSite.title)
				this.$set(this.$children[0].$refs.userSite.siteManage,"imageUrl", webSite.icon)
				this.$children[0].$refs.userSite.editOpen();
			}
		},
		components: {
			MainLayout
		},
		created() {
			this.$ajax.get('/api/webSite/list')
			.then((response)=>{
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
					this._initScroll(); // 初始化scroll
					this._calculateHeight(); // 初始化列表高度列表
				  })
				  this.lazy();
				  this.$children[0].$el.ownerDocument.querySelector("#nav").appendChild(this.$refs.menuWrapper1)
			}).catch((response)=>{
			  this.$message.error('数据请求失败，请稍后再试');
			});
			
			window.addEventListener('scroll', this.handleScroll, true);
		}
}
</script>

<style>
@import '../assets/css/webSite_list.css';

/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
	transition: all .5s ease;
}

.slide-fade-leave-active {
	transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
	transform: translateX(10px);
	opacity: 0;
}

.site-nav .item {
	padding: 10px 15px;
}

.header-top-nav {
	z-index: 99;
	position: fixed;
	top: 60px;
	left: -2px;
	right: 0;
	padding: 0 7px;
}

.header-top-nav .block {
	margin: 0!important;
	border-radius: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 0!important;
	padding-right: 0!important;
}

.header-top-nav .block ul {
	padding: 10px;
	background-color: #fff;
	box-shadow: 0 1px 0.5px rgba(107, 107, 107, 0.1);
}

.header-top-nav .block ul a {
	font-size: 13px;
}

.header-top-nav span {
	cursor: pointer;
	display: initial;
	color: rgba(0,0,0,0.1);
}

.header-top-nav span i {
	font-size: 20px;
}

.header-top-nav span:hover {
	color: rgba(0,0,0,0.6);
	transition: all .4s ease-in-out;
}

.hide {
	box-shadow: none !important;
	background-color: transparent !important;
}

.hide span {
	color: #ccc;
}

.hide:hover span {
	color: #ccc;
	display: flex;
	align-items: center;
}

.cate-list i {
	margin-right: 5px;
}

.site-tabs {
	width: 100%;
}

.site-tabs h3 {
	display: initial;
}

.site-tabs .tabs-nav {
	display: inline-block;
}

.site-tabs .tablist {
	display: inline-table;
}

.site-tabs .tablist li {
	display: inherit;
}

.site-tabs .tablist li a {
	padding: 3px 11px;
	border-radius: 20px;
	display: inline-block;
}

.site-tabs .tablist li a.active {
	color: #fff;
	background-color: #1989fa;
	transition: 0.3s;
}

#wrapper .site-icon img {
	opacity: 0;
	/* border-radius: 30px; */
	transition: opacity .5s ease-in;
	/* box-shadow: 0 0 4px 0 rgba(0,0,0,.2); */
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
		
		
@media screen and (min-width:1200px) {
	.image-placeholder .block {
		width: 190px;
		height: 123px;
		margin: 0 2px;
	}
}

@media screen and (min-width: 960px) and (max-width: 1199px) {
	
	.header-top-nav {
		display: none;
	}
}

@media screen and (min-width: 768px) and (max-width: 959px) {
	.container {
		width: 100%;
	}

	.image-placeholder .block {
		width: 190px;
		height: 123px;
		margin: 0 2px;
	}
}

@media only screen and (min-width: 480px) and (max-width: 767px) {

	.container {
		width: 100%;
	}

	.image-placeholder .block {
		width: 190px;
		height: 123px;
		margin: 0 2px;
	}
}

@media only screen and (max-width: 479px) {

	.container {
		width: 100%;
	}

	.tabs-nav {
		margin-top: 8px;
	}
	
	.image-placeholder .block {
		width: 49%;
		height: 112px;
		margin: 1px 1px;
	}

	.section {
		display: block;
	}

	.aside {
		width: 100%;
	}

	.content {
		width: inherit;
	}

	.aside li {
		width: 45%;
		float: left;
	}

	.content .article .article-img img {
		width: 105px;
		height: 70px;
	}
}
</style>
