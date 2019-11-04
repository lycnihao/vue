<template>
	<main-layout>
		<el-container style="margin: 5px 0!important;">
		  <el-aside width="180px">
			  <ul class="aside">
				  <li><a href="javascript:void(0)" class="active" @click="tabs('tab1',$event),baiduClick({index:0})">百度风云榜单</a></li>
				  <li><a href="javascript:void(0)"  @click="tabs('tab2',$event),weiboClick({index:0})">微博热搜榜</a></li>
				  <li><a href="javascript:void(0)"  @click="tabs('tab3',$event),zhihuClick({index:0})">知乎热搜榜</a></li>
				  <li><a href="javascript:void(0)"  @click="tabs('tab2',$event),weiboClick({index:0})">豆瓣排行榜</a></li>
			  </ul>
		  </el-aside>
		  <el-main class="content">
			  <div class="tabpanel show" name='tab1'>
			  		<el-tabs v-model="info.baidu.active" type="card" @tab-click="baiduClick">
						<el-tab-pane label="百度实时热点榜" name="baidu_tab1">
							<div class="hot-header">
								<span>刚刚更新-数据源自百度</span>
							</div>
							<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
							  <ul>
								  <li v-for="realTime of baidu.realTime">
									  <a :href="realTime.url" target="_blank" class="item" :title="'百度实时热点-'+realTime.title">
									  		<div class="title"><span class="number tag">{{realTime.id}}</span> {{realTime.title}}</div>
											<span class="level">{{realTime.level}}</span>
											<span class="trend"><i :class="realTime.trend == 'rise' ? 'rise el-icon-top':'fall el-icon-bottom'"></i></span>
									  </a>
								  </li>
							  </ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="百度今日热点榜" name="baidu_tab2">
							<div class="hot-header">
								<span>刚刚更新-数据源自百度</span>
							</div>
							<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
							  <ul>
								  <li v-for="today of baidu.today">
									  <a :href="today.url" target="_blank" class="item" :title="'百度今日热点-'+today.title">
											<div class="title"><span class="number tag">{{today.id}}</span> {{today.title}}</div>
											<span class="level">{{today.level}}</span>
											<span class="trend"><i :class="today.trend == 'rise' ? 'rise el-icon-top':'fall el-icon-bottom'"></i></span>
									  </a>
								  </li>
							  </ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="百度百科热词" name="baidu_tab3">
							<ul class="random" v-if="baidu.baike.length > 0">
								<!-- 1 -->
								<li class="el-col-24">
									<a :href="baidu.baike[0].url" target='_blank' class="class-a"><span>{{baidu.baike[0].title}}</span></a>
								</li>
								<!-- 2 -->
								<li class="el-col-12">
									<a :href="baidu.baike[1].url" target='_blank' class="class-b"><span>{{baidu.baike[1].title}}</span></a>
								</li>
								<li class="el-col-12">
									<a :href="baidu.baike[2].url" target='_blank' class="class-c"><span>{{baidu.baike[2].title}}</span></a>
								</li>
								<!-- 3 -->
								<li class="el-col-7">
									<a :href="baidu.baike[3].url" target='_blank' class="class-c"><span>{{baidu.baike[3].title}}</span></a>
								</li>
								<li class="el-col-10">
									<a :href="baidu.baike[4].url" target='_blank' class="class-a"><span>{{baidu.baike[4].title}}</span></a>
								</li>
								<li class="el-col-7">
									<a :href="baidu.baike[5].url" target='_blank' class="class-b"><span>{{baidu.baike[5].title}}</span></a>
								</li>
								<!-- 4 -->
								<li class="el-col-12">
									<a :href="baidu.baike[6].url" target='_blank' class="class-b"><span>{{baidu.baike[6].title}}</span></a>
								</li>
								<li class="el-col-12">
									<a :href="baidu.baike[7].url" target='_blank' class="class-c"><span>{{baidu.baike[7].title}}</span></a>
								</li>
							</ul>
						</el-tab-pane>
			  		</el-tabs>
			  </div>

			  
			  <div class="tabpanel" name='tab2'>
		  		<el-tabs v-model="info.weibo.active" type="card" @tab-click="weiboClick">
		  			<el-tab-pane label="微博热搜榜" name="weibo_tab1">
		  				<div class="hot-header">
		  					<span>刚刚更新-数据源自微博</span>
		  				</div>
		  				<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
		  				  <ul>
							  <li v-for="realTime of weibo.realTime">
								  <a :href="realTime.url" target="_blank" class="item" :title="'微博实时热点-'+realTime.title">
										<div class="title">
											<span class="number tag" v-if="realTime.id == 0"><i class="el-icon-download" style="transform: rotate(180deg);"></i></span>
											<span class="number tag" v-else>{{realTime.id}}</span> {{realTime.title}}
										</div>
										<span class="level">{{realTime.level}}</span>
										<span><span class="trend tag" v-if="realTime.trend != ''">{{realTime.trend}}</span></span>
								  </a>
							  </li>
		  				  </ul>
		  				</div>
		  			</el-tab-pane>
					<el-tab-pane label="微博新时代榜" name="weibo_tab2">
						<div class="hot-header">
							<span>刚刚更新-数据源自微博</span>
						</div>
						<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
						  <ul>
							 <li v-for="socialEvent of weibo.socialEvent">
								<a :href="socialEvent.url" target="_blank" class="item" :title="'新时代-'+socialEvent.title">
									<span><i class="el-icon-paperclip"></i> {{socialEvent.title}}</span>
								</a>
							 </li>
						  </ul>
						</div>
					</el-tab-pane>
				</el-tabs>
		      </div>
			  
			  <div class="tabpanel" name='tab3'>
				<el-tabs v-model="info.zhihu.active" type="card" @tab-click="zhihuClick">
					<el-tab-pane label="知乎热搜" name="zhihu_tab1">
						<div class="hot-header">
							<span>刚刚更新-数据源自知乎</span>
						</div>
						<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
						  <ul>
							 <li v-for="(topSearch,index) of zhihu.topSearch">
								<a :href="topSearch.url" target="_blank" class="item" :title="'知乎-'+topSearch.title">
									<span style="width: 60%;"><i class="el-icon-paperclip"></i> {{topSearch.title}}</span>
									<span>{{topSearch.summary}}</span>
								</a>
							 </li>
						  </ul>
						</div>
					</el-tab-pane>
					<el-tab-pane label="知乎热榜" name="zhihu_tab2">
						<div class="hot-header">
							<span>刚刚更新-数据源自知乎</span>
						</div>
						<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
						  <ul class="article">
							 <li v-for="(topHot,index) of zhihu.topHot">
								<a class="item" :href="topHot.url" target="_blank" :title="topHot.title">
									<div class="article-index"><span class="number">{{index+1}}</span></div>
									<div class="article-content">
										<h3 class="h3">{{topHot.title}}</h3>
										<p class="article-excerpt">{{topHot.summary}}</p>
									</div>
									<div class="article-img"><img :src="topHot.img" v-if="topHot.img" :title="topHot.title" :alt="topHot.title"/></div>
								</a>
							 </li>
						  </ul>
						</div>
					</el-tab-pane>
				</el-tabs>
			  </div>
		  </el-main>
		</el-container>
	</main-layout>
</template>

<script>
import MainLayout from '../layouts/main'
export
default {
		data() {
			return {
				info:{
					baidu:{
						url : "/hom1/api/hot/baidu?t=",
						active : "baidu_tab1"
					},
					weibo:{
						url : "/hom1/api/hot/weibo?t=",
						active : "weibo_tab1"
					},
					zhihu:{
						url : "/hom1/api/hot/zhihu?t=",
						active : "zhihu_tab1"
					}
				},
				baidu:{
					realTime:[],
					today:[],
					baike:[],
				},
				weibo:{
					realTime:[],
					socialEvent:[]
				},
				zhihu:{
					topSearch:[],
					topHot:[]
				}
			}
		},
		methods: {
			tabs:function(name,event){
				event.path[2].querySelector(".active").className = "";
				event.target.className = "active";
				event.path[6].querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
				event.path[6].querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab
			},
			baiduClick:function(tab,event){
				const loading = this.$loading({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.2)'
				});
				this.$ajax.get('/hom1/api/hot/baidu?t=' + tab.index)
				.then((response)=>{
					loading.close();
					if(tab.index == 0){
						this.baidu.realTime = response.data.result
					} else if(tab.index == 1){
						this.baidu.today = response.data.result
					} else if(tab.index == 2){
						this.baidu.baike = response.data.result
					}
				console.log(this.baidu.baike)
				}).catch((response)=>{
				  loading.close();
				  this.$message.error('数据请求失败，请稍后再试');
				});
			},
			weiboClick:function(tab,event){
				const loading = this.$loading({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.2)'
				});
				this.$ajax.get('/hom1/api/hot/weibo?t=' + tab.index)
				.then((response)=>{
					loading.close();
					
					if(tab.index == 0)
						this.weibo.realTime = response.data.result
					else if(tab.index == 1)
						this.weibo.socialEvent = response.data.result

				}).catch((response)=>{
				  loading.close();
				  this.$message.error('数据请求失败，请稍后再试');
				});
			},
			zhihuClick:function(tab,event){
				const loading = this.$loading({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.2)'
				});
				this.$ajax.get('/hom1/api/hot/zhihu?t=' + tab.index)
				.then((response)=>{
					loading.close();
					
					if(tab.index == 0)
						this.zhihu.topSearch = response.data.result
					else if(tab.index == 1)
						this.zhihu.topHot = response.data.result
			
				}).catch((response)=>{
				  loading.close();
				  this.$message.error('数据请求失败，请稍后再试');
				});
			}
		},
		components: {
			MainLayout
		},
		created:function(){
			this.baiduClick({index:0})
		}
}
</script>

<style>
	.aside{
		background-color: #fff;
		margin-right: 5px;
		padding: 10px 0;
	}
	.aside li{
		margin: 5px 0;
		padding: 0 8px;
	}
	
	.aside li a{
		padding: 10px 0;
		padding-left: 38px;
		z-index: 1;
		display: inherit;
		font-size: 15px;
		position: relative;
	}
	
	.aside li a:hover , .aside li .active{
		color: #fff;
	}
	
	.aside li a:before{
		content:"";
		top: 50%;
		transform: translateY(-50%);
		left: 1.25em;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		position: absolute;
		transition: all .4s ease;
	}
	
	.aside li a:hover:before,.aside li .active:before{
		background-color: transparent;
		border: 2px solid #fff;
	}
	
	.aside li a:hover:before{
		box-shadow: 0 5px 16px 0 rgba(165,165,165,.5);
	}
	
	.aside li a:hover:after,.aside li .active:after{
		content:"";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50px;
		background: linear-gradient(to right,#b5d9ff,#0077f3);
		transition: all .4s ease;
		opacity: 1;
		z-index: -1;
	}
	
	
	
	
	.content{
		background-color: #fff;
	}
	
	.scrollbar{
		height:620px;
		overflow-y:auto;
		
	}
	
	.content li{
		height: 50px;
		line-height: 50px;
		color: #909399;
		cursor: pointer;
		border-bottom: 1px #E8E8E8 dotted;
	}
	
	.content .article li{
		height: auto;
		line-height: inherit;
		padding: 15px 10px;
	}
	
	.content .article .article-img{
		display: block;
		height: 105px;
		margin-left: 16px;
		position: relative;
	}
	
	.content .article .article-img img{
		border-radius: 4px;
		height: 105px;
		width: 190px;
		display: block;
		object-fit: cover;
	}
	
	.content .article .article-content{
		flex: 1 1;
		overflow: hidden;
	}
	
	.content .article .article-index{
		width: 35px;
	}
	
	.content .article .number{
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		color: #909399;
	}
	
	.content .article .article-excerpt{
		color: #444;
		line-height: 25px;
		margin-top: 2px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.article li:nth-child(1) .number, .article li:nth-child(2) .number, .article li:nth-child(3) .number{
		color: #ff9607;
	}
	
	.content .item{
		font-size: 16px;
		padding-left: 22px;
		display: flex;
	}
	.content .item .title{
		width: 78%;
	}
	.content .item .number{
		padding: 2px 6px;
	}
	
	.tag{
		background-color: #01AAED;
		color: #F2F4F7;
		border-radius: 4px;
		font-size: 14px;
		margin-right: 8px;
	}
	
	.level{
		width: 17%;
		font-size: 13px;
		color: #666666;
	}
	
	.trend i{
		font-size: 16px;
		font-weight: 600;
		padding: 2px;
	}
	
	.trend.tag{
		background-color: #f26d5f!important;
		font-size: 12px;
		padding: 2px;
	}
	
	.content li:nth-child(1) .tag{
		background-color: #FF5722;
	}
	
	.content li:nth-child(2) .tag{
		background-color: #FFB800;
	}
	
	.content li:hover a{
		color: #5FB878;
	}
	
	.content img{
		height: 90px;
		width: 140px;
	}
	
	.content .article h3{
		color: #1a1a1a;
		font-size: 17px;
		line-height: 28px;
	}
	
	.content .article p{
		color: #444;
		font-size: 14px;
		
	}
	
	.hot-header{
		width: 100%;
		padding: 20px 16px;
		margin: 0;
		box-sizing: border-box;
		border-radius: 4px 4px 0 0;
		position: relative;
		background-color: #FFF;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f4f4f5;
		color: #909399;
	}
	.hot-header span{
		font-size: 14px;
		line-height: 18px;
	}
	
	
	
	.random li{
		height: 100px;
		line-height: 100px;
	}
	.random li a{
		color: #fff;
		opacity: .85;
		display: inherit;
		text-align: center;
		position: relative;
		background-size: cover;
		transition: all .6s ease;
	}
	
	.random li span{
		font-size: 18px;
		display: inherit;
		position: relative;
		transition: all .6s ease;
	}
	
	.random a:before{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.random li a:hover{
		opacity: 1;
	}
	.random li a:hover span{
		font-size: 20px;
	}
	
	
	.random .class-a{
		background-image:url(../assets/bg/bg.png);
	}
	.random .class-a:before{
		background-color: rgba(232, 88, 88, 0.5);
	}
	
	.random .class-b{
		background-image:url(../assets/bg/bg.png);
	}
	.random .class-b:before{
		background-color: rgba(125, 255, 243, 0.5);
	}
	
	.random .class-c{
		background-image:url(../assets/bg/bg.png);
	}
	.random .class-c:before{
		background-color: rgba(100, 187, 255, 0.5);
	}
	
	.el-tabs__item{
		color: #747982;
	}
	    
</style>
