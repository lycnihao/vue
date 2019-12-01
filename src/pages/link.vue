<template>
	<div>
		<v-header></v-header>
		<section class="section link">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }"><a href="/">首页</a></el-breadcrumb-item>
			  <el-breadcrumb-item>酷站</el-breadcrumb-item>
			  <el-breadcrumb-item>详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="content">
				<el-row :gutter="10">
				  <el-col :xs="8" :sm="6" :md="4" :lg="5" :xl="5">
					  <div class="site-icon">
						  <div class="blur" style="background-image:url('http://www.168dh.cn/favicon.ico');"></div>
					  	<el-image src="http://www.168dh.cn/favicon.ico"></el-image>
					  </div>
				  </el-col>
				  <el-col :xs="8" :sm="6" :md="4" :lg="14" :xl="14">
					<div class="box">
					  <div class="box-header">
						<h3> 168酷达导航</h3>
						<p>
						  <span><i class="el-icon-time"></i>&nbsp; 2018-12-06 15:20:42</span>
						  <span><i class="el-icon-view"></i>3541次浏览</span>
						  <span><a href="javascript:(0);;" onclick="alert('敬请期待')"><i class="el-icon-star-off"></i></a>3541次收藏</span>
						 </p>
					  </div>
					  <div class="info">
						<p><span>网站名称：</span> 168酷达导航</p>
						<p><span>官方网址：</span>https://www.168dh.cn/</p>
						<p><span>所属分类：</span>搜索引擎</p>
						<p><a href="#"><el-button size="small">立即访问<i class="el-icon-position"></i></el-button></a></p>
						<p style="margin-top: 10px;color: #ccc;font-size: 12px;">特别提示:我们收录的网站保证安全，但不保证永久安全。 请您仔细查看谨慎辨别，建议您不要随意泄漏帐号密码等安全信息。</p>
					  </div>
					</div>
				  </el-col>
				  <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="1">

				  </el-col>
				</el-row>
        <br /><br />
        <div class="border-left">
          <h3>关于网站</h3>
        </div>
        <div class="content" style="margin-bottom: 350px;">
          分享有价值的优质书签和工具，欢迎大家使用！
        </div>
			</div>
		</section>
		<v-footer></v-footer>
	</div>
</template>

<script>
import header from '../layouts/header'
import footer from '../layouts/footer'

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
	.link .box .box-header h3{
		font-size: 26px;
		color: #444;
	}
  .link .box .box-header p{
    font-size: 13px;
	color: #7f7f7f;
  }
  .link .box .box-header p span{
    margin: 5px;
  }
	.content .info{
		color: #6b7386;
		line-height: 32px;
	}

	.content .info span{
		color: #999;
	}

	.blur{
		width: 90%;
		height: 90%;
		background-size: cover;
		filter: blur(10px);
		opacity: .2;
	}
	.content .site-icon{
		width: 240px;
		height: 240px;
		display: flex;
		justify-content:center;
		align-items:center;
	}
	.content .site-icon .el-image {
		position: absolute;
		animation: rotate 8s linear infinite;
	}
	.content .site-icon .el-image img{
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.section{
		padding: 15px 0;
	}
  .border-left{
    color: #666;
    font-size: 16px;
    font-weight: 900;
    padding: 12px;
    border-left: 3px solid #000;
    border-bottom: 1px solid #eee;
    box-shadow: 0px 0px 1px #ddd;
    border-radius: 2px;
  }
  .border-left h3{
    font-size: 16px!important;
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
