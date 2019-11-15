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
										<i class="site-icon-shadow" :style="'background: url('+site.icon+') no-repeat 50%/cover;'"></i>
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
	</main-layout>
</template>

<script>
import BScroll from 'better-scroll'
import MainLayout from '../layouts/main'
export
default {
		data() {
			return {
				headerNav:true,
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
			  /* console.log(this.listHeight[index]) */
			  window.scrollTo({ top: this.listHeight[index], left: 0, behavior: 'smooth' })
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
			this.$ajax.get('/hom1/api/getList')
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
					/* this.$refs.userSite.getUserSites(); */
					this._initScroll(); // 初始化scroll
					this._calculateHeight(); // 初始化列表高度列表
					var img=document.querySelectorAll("img[data-src]")
					for(var i=0;i<img.length;i++){img[i].style.opacity="0"}
					this.lazy();
				  })
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
</style>
