<template>
	<div>
		<v-header></v-header>
		<section class="section">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }"><a href="/">首页</a></el-breadcrumb-item>
			  <el-breadcrumb-item>酷站</el-breadcrumb-item>
			  <el-breadcrumb-item>详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="content">
				<el-row :gutter="10">
				  <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="1">
					  <div class="site-icon">
						  <div class="blur"></div>
					  	<el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
					  </div>
				  </el-col>
				  <el-col :xs="8" :sm="6" :md="4" :lg="15" :xl="1">
					  <h3>微词云</h3>
					  <hr />
					  <div class="info">
						  <p><span>网站简介：</span>搜索引擎搜索引擎搜索引擎搜索引擎搜索引擎</p>
						  <p><span>官方网址：</span>https://cn.bing.com/</p>
						  <p><span>所属分类：</span>搜索引擎</p>
						  <p><a href="#"><el-button size="small">链接直达<i class="el-icon-position"></i></el-button></a></p>
					  </div>
					  
				  </el-col>
				  <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="1">
					
				  </el-col>  
				</el-row>
			</div>
		</section>
		<v-footer></v-footer>
	</div>
</template>

<script>
import header from './common/module/header'
import footer from './common/module/footer'

export
default {
	components: {
	  'v-header': header,
	  'v-footer': footer
	},
}
</script>

<style>
	hr{
		color: #dcdfe6!important;
		border-width: 0.5px;
	}
	.content{
		font-size: 15px;
		margin-top: 12px;
		border-radius: 5px;
		padding: 20px;
		color: #616161;
		background-color: #fff;
	}
	.content h3{
		font-weight: 600;
		font-size: 26px;
	}
	.content .info{
		color: #6b7386;
		line-height: 32px;
	}
	
	.content .info span{
		color: #5d6165;
	}
	
	.blur{
		width: 90%;
		height: 90%;
		background: transparent url('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg');
		background-size: cover;
		filter: blur(10px);
		opacity: .3;
	}
	.content .site-icon{
		width: 200px;
		height: 200px;
		display: flex;
		justify-content:center;
		align-items:center;
	}
	.content .el-image {
		position: absolute;
		animation: rotate 8s linear infinite;
	}
	.content .el-image img{
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.section{
		padding: 15px 0;
	}
	@media screen and (min-width:1200px) {
			.section{
				margin: 56px 10% 0!important;;
			}
		}
		@media screen and (min-width: 960px) and (max-width: 1199px) {
			.section{
				margin: 56px 10% 0!important;;
			}
		}
	
	@media only screen and (min-width: 480px) and (max-width: 767px) {
			.section{
				margin: 56px 5% 0!important;;
			}
		}
	
		@media only screen and (max-width: 479px) {
			.section{
				margin: 56px 5% 0!important;;
			}
		}
</style>
