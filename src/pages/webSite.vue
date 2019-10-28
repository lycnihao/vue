<template>
	<div>
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
	</div>
</template>

<script>
export
default {
		data() {
			return {
				headerNav:true,
				menuTop:false,
			}
		},
		methods: {
			
		},
		created() {
			this.menuTop = this.$parent.menuTop;
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
			  
			  this.$message.error('数据请求失败，请稍后再试');
			});
		}
}
</script>

<style>
</style>
