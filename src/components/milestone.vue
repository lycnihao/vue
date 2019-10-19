<template>
	<div>
		<head-top></head-top>

		<section class="section">
			<div class="content">
				<div class="block">
				  <el-timeline>
					<el-timeline-item timestamp="更早之前" placement="top">
						<el-card>
							<h4 class="h4">从灵感到产品 0~1</h4>
							<p>从最初的灵感闪现到项目的部署,最早的html5静态页面到后端数据交互,经历了很多<!-- 为服务器域名和名字犯愁,项目的多次重构使我多次奔溃 -->。庆幸自己坚持把它完成了。</p>
							<p style="margin-top: 10px;">会飞的虾 提交于 2019年某月某日</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2019/9/28" placement="top">
					  <el-card>
						<h4 class="h4">168红衣导航正式上线,并录入了大量网址,满足用户的基本使用。</h4>
						<p>会飞的虾 提交于 2019/9/28 20:46</p>
					  </el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2019/9/28 - 2019/10/10" placement="top">
					  <el-card>
						<h4 class="h4">优化分类,优化了网站合集板块并加入标签页以更便于使用,加入友情链接板块,加入“关于我们”&“更新日志”页面</h4>
						<p>会飞的虾 提交于 2019/10/10 16:01</p>
					  </el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2019/10/14" placement="top">
					  <el-card>
						<h4 class="h4">新增用户注册、登陆、注销功能，常用网址板块</h4>
						<p>会飞的虾 提交于 2019/10/19 12:48</p>
					  </el-card>
					</el-timeline-item>
				  </el-timeline>
				</div>
			</div>
		</section>
		<foot></foot>
	</div>
</template>

<script>
	import header from './common/module/header'
	import footer from './common/module/footer'

	export default {
	  name: 'About',
	  components:{
	      'headTop' : header,
	  	  'foot' : footer
	  }
	}
</script>

<style>
	.section{
		padding: 15px 0;
	}
	.content{
		font-size: 15px;
		margin-top: 62px;
		border-radius: 5px;
		padding: 10px 10px 100px 10px;
		color: #616161;
		background-color: #fff;
	}
	.block .h4{
		margin: 2px 0 10px 0;
	}
	.block p{
		color: #5e6d82;
		line-height: 2em;
	}
	@media screen and (min-width:1200px) {
		.section{
			margin: 0 10% !important;
		}
    .block{
    	margin: 30px 180px 0 180px;
    }
	}
	@media screen and (min-width: 960px) and (max-width: 1199px) {
		.section{
			margin: 0 10% !important;;
		}
    .block{
    	margin: 30px 180px 0 180px;
    }
	}

@media only screen and (min-width: 480px) and (max-width: 767px) {
		.section{
			margin: 0 5% !important;;
		}
    	.block{
    	margin: 30px 100px 0 100px;
    }
	}

	@media only screen and (max-width: 479px) {
		.section{
			margin: 0 5%;
		}
    	.block{
    	margin: 30px 0 0 0;
    }
	}
</style>
