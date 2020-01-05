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
		  <el-row :gutter="10" style="margin-right: 0px!important;">
			<!-- 主体显示块 -->
			<el-col :md="17" :lg="17" :xl="17" class="block">
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
							<div v-for="(subCategory,index) in subCategorys[category.categoryId]" :class="index == 0 ? 'tabpanel show':'tabpanel'" :name="subCategory.slugName">
								<ul class="site-list">
								  <li v-for="site in sites[subCategory.categoryId]">
									 <a class="site-item" :href="site.url" target='_blank' :title="site.summary" @click="visit(site.websiteId)">
									   <div class="site-icon">
										<img :data-src="site.icon" :alt="site.title"></img>
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
								 <a class="site-item" :href="site.url" target='_blank' :title="site.summary" @click="visit(site.websiteId)">
									<div class="site-icon">
									<img :data-src="site.icon" :alt="site.title"></img>
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
				loading:true,
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
				if ( t > 618 + user) {
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
			}
		},
		components: {
			MainLayout
		},
		created() {
			const loading = this.$loading({
			  lock: true,
			  text: 'Loading',
			  spinner: 'el-icon-loading',
			  background: 'rgba(0, 0, 0, 0.2)'
			});
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
				 loading.close();
			}).catch((response)=>{
			  loading.close();
			  this.$message.error('数据请求失败，请稍后再试');
			});
			
			window.addEventListener('scroll', this.handleScroll, true);
		}
}
</script>

<style>
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

.site-list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 10px;
}

.site-list li {
	width: 31%;
	margin: 5px 1%;
}

.site-list .site-item {
	padding: 15px;
	font-size: 14px;
	display: flex;
		/* align-items: center; */
	overflow: hidden;
	transition: all .4s cubic-bezier(.175,.885,.32,1);
}

.site-list .site-item:hover {
	background: #f9f9f9;
	border-radius: 8px;
	transition: background 0.35s ease-out;
}

.site-list .site-item:hover .site-icon-shadow {
	opacity: 1;
	transition: opacity 0.25s ease-out,
}

.site-list .site-info {
	width: 88%;
}

.site-list .site-info h3 {
	font-weight: 700;
	color: #555;
	font-size: 14px;
}

.site-list .site-info p {
	color: #a1a7b7;
	font-size: 12px;
	margin-top: 2px;
	text-overflow: ellipsis;
	overflow: hidden;
	height: 30px;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.site-list .site-item:hover h3 {
	color: #409EFF;
	transition: color 0.35s ease-out,
}

.site-list .site-item:hover p {
	color: #131313a1;
}

.site-list .site-icon {
	position: relative;
}

.site-icon .site-icon-shadow {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 32px;
	border-radius: 100%;
	-webkit-filter: blur(10px) brightness(80%) opacity(.8);
	filter: blur(10px) brightness(80%) opacity(.8);
	transform: scale(.95);
	z-index: 1;
	opacity: 0;
}

.site-icon img {
	width: 32px;
}

.site-icon .el-image {
	position: inherit!important;
	height: inherit;
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
	.site-list .site-icon {
		margin-right: 8px;
	}

	.site-list .site-icon .el-image {
		width: 36px;
		height: 36px;
	}

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

	.site-list .site-item {
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-icon .el-image {
		width: 25px;
		height: 25px;
	}

	.site-list .site-info p {
		display: none;
	}
}

@media screen and (min-width: 768px) and (max-width: 959px) {
	.container {
		width: 100%;
	}

	.site-list .site-item {
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-icon .el-image {
		width: 25px;
		height: 25px;
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

	.container {
		width: 100%;
	}

	.site-list .site-item {
		height: 30px;
		width: 115px;
	}

	.site-list .site-icon {
		margin-right: 5px;
	}

	.site-list .site-icon .el-image {
		width: 25px;
		height: 25px;
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

	.container {
		width: 100%;
	}

	.tabs-nav {
		margin-top: 8px;
	}

	.site-tabs .tablist li a {
		padding: 3px 6px;
		border-radius: 20px;
	}

	.site-list .site-item {
		height: 30px;
		width: 100px;
		padding: 2px;
	}

	.site-icon img {
		width: 25px;
		height: 25px;
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
