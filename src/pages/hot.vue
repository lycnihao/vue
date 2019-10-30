<template>
	<main-layout>
		<el-container style="margin: 5px 0!important;">
		  <el-aside width="180px">
			  <ul class="aside">
				  <li><a href="javascript:void(0)" class="active" @click="tabs('tab1',$event)">百度风云榜单</a></li>
				  <li><a href="javascript:void(0)"  @click="tabs('tab2',$event)">微博热搜榜</a></li>
				  <li><a href="javascript:void(0)"  @click="tabs('tab2',$event)">知乎热搜榜</a></li>
				  <li><a href="javascript:void(0)"  @click="tabs('tab2',$event)">豆瓣排行榜</a></li>
			  </ul>
		  </el-aside>
		  <el-main class="content">
			  <div class="tabpanel show" name='tab1'>
			  		<el-tabs v-model="activeName" type="card">
						<el-tab-pane label="百度实时热点榜" name="bd_tab1">
							<div class="hot-header">
								<span>刚刚更新-数据源自百度</span>
							</div>
							<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
							  <table>
								 <tr title="一个人的时光也很美好" v-for="i of 50">
									<td><a href="javascript:void(0)" class="item" title="百度实时热点-一个人的时光也很美好">
											 <span class="number">01</span>
											 一个人的时光也很美好
									</a></td>
									<td width="15%">
										<span class="level">4,411,840</span>
									</td>
									<td width="8%" style="text-align: center;">
										<span class="trend">↑</span>
									</td>
								 </tr>
							  </table>
							</div>
						</el-tab-pane>
						<el-tab-pane label="百度今日热点榜" name="bd_tab2">
							<div class="hot-header">
								<span>刚刚更新-数据源自百度</span>
							</div>
							<div class="scrollbar" style="border-left: 1px #F0F0F0 solid;border-right: 1px #F0F0F0 solid;border-bottom: 1px #F0F0F0 solid;">
							  <table>
								 <tr title="一个人的时光也很美好" v-for="i of 50">
									<td><a href="javascript:void(0)" class="item" title="百度实时热点-一个人的时光也很美好">
											 <span class="number">01</span>
											 一个人的时光也很美好
									</a></td>
									<td width="15%">
										<span class="level">4,411,840</span>
									</td>
									<td width="8%" style="text-align: center;">
										<span class="trend">↑</span>
									</td>
								 </tr>
							  </table>
							</div>
						</el-tab-pane>
						<el-tab-pane label="百度百科热词" name="bd_tab3">
							<ul class="random">
								<!-- 1 -->
								<li class="el-col-24">
									<a href="#" class="class-a">
										<span>1中共十九届四中全会</span>
									</a>
								</li>
								<!-- 2 -->
								<li class="el-col-12">
									<a href="#" class="class-b"><span>2中共十九届四中全会</span></a>
								</li>
								<li class="el-col-12">
									<a href="#" class="class-c"><span>3中共十九届四中全会</span></a>
								</li>
								<!-- 3 -->
								<li class="el-col-7">
									<a href="#" class="class-c"><span>4中共十九届四中全会</span></a>
								</li>
								<li class="el-col-10">
									<a href="#" class="class-a"><span>5中共十九届四中全会</span></a>
								</li>
								<li class="el-col-7">
									<a href="#" class="class-b"><span>6中共十九届四中全会</span></a>
								</li>
								<!-- 4 -->
								<li class="el-col-12">
									<a href="#" class="class-b"><span>7中共十九届四中全会</span></a>
								</li>
								<li class="el-col-12">
									<a href="#" class="class-c"><span>8中共十九届四中全会</span></a>
								</li>
							</ul>
						</el-tab-pane>
			  		</el-tabs>
			  </div>

			  
			  <div class="tabpanel" name='tab2'>
		  		222
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
				activeName:'bd_tab1'
			}
		},
		methods: {
			tabs:function(name,event){
				event.path[2].querySelector(".active").className = "";
				event.target.className = "active";
				event.path[6].querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
				event.path[6].querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab
			}
		},
		components: {
			MainLayout
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
	.content table{
		width: 100%;
		border-collapse: collapse;
	}
	
	.content tr{
		height: 50px;
		cursor: pointer;
		border-bottom: 1px #E8E8E8 dotted;
	}
	
	.content .item{
		font-size: 16px;
		padding-left: 22px;
	}
	
	.content .item .number{
		background-color: #01AAED;
		padding: 2px 6px;
		color: #F2F4F7;
		border-radius: 4px;
		font-size: 14px;
		margin-right: 8px;
	}
	
	.level{
		font-size: 13px;
		color: #666666;
	}
	
	.trend{
		font-size: 14px;
		color: #909399;
	}
	
	.content tr:nth-child(1) .number{
		background-color: #FF5722;
	}
	
	.content tr:nth-child(2) .number{
		background-color: #FFB800;
	}
	
	.content tr:hover a{
		color: #5FB878;
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
		opacity: .9;
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
		font-size: 19px;
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
		background-color: rgba(0, 255, 231, 0.5);
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
