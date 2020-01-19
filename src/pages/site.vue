<template>
	<div class="WebSiteLibrary">
		<v-header></v-header>
		<section class="main">
			<div data-v-215bc901="" class="siteBanner"><div data-v-215bc901="" class="siteBannerTitle">分享优秀的网站资源</div></div>
			<el-cascader ></el-cascader>
			<div class="webSiteList">
				<ul class="site-list">
				  <li v-for="site in 20">
					 <a class="site-item" href="" target='_blank' title="酷达导航">
						<div class="site-icon">
							<img alt="酷达导航" src="https://www.168dh.cn/favicon.ico" data-src="https://www.168dh.cn/favicon.ico"></img>
							<i class="site-icon-shadow"></i>
						</div>
					   <div class="site-info float-right">
						   <h3>酷达导航</h3>
						   <p>完美的导航网站</p>
					   </div>
					   <a href="/" class="site-link"><i class="el-icon-link"></i></a>
					 </a>
				  </li>
				</ul>
			</div>
			<el-pagination background layout="prev, pager, next":total="1000" style="text-align: right;"></el-pagination>
		</section>	
		<!-- 友情链接 -->
		<v-links></v-links>
		<v-footer></v-footer>
	</div>
</template>

<script>
import header from '../layouts/header'
import footer from '../layouts/footer'
import links from '../layouts/links'

export
default {
	data() {
		return {
			
		}
	},
	methods:{
		
	},

	components: {
		'v-header': header,
		'v-footer': footer,
		'v-links':links,
	},
	created() {

	}
}
</script>

<style>
@import '../assets/css/style.css';
@import '../assets/css/webSite_list.css';
.WebSiteLibrary .header{
	z-index: 99;
	opacity: 1;
}

.WebSiteLibrary section.main{
	padding-top: 80px;
}

.WebSiteLibrary .siteBanner{
    background-image: linear-gradient(rgba(95,64,58,.3),rgba(255,112,85,.45)),url(http://qiniu.henduonian.com/lemon/finder.png);
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    height: 280px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 20px;
    position: relative;
}
.WebSiteLibrary .siteBanner .siteBannerTitle{
	color: #fff;
    font-size: 24px;
    text-align: center;
    padding-top: 100px;
}

.WebSiteLibrary .webSiteList{
	margin-top: 10px;
}

.WebSiteLibrary .site-list li{
	    width: 23%;
}
.WebSiteLibrary .site-list .site-item:hover{
	background: #f5f5f5;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
