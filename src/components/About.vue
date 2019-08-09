<template>
	<div>
		<head-top></head-top>
		
		<section>
			<el-row :gutter="20">
				<el-col :md="3" :lg="3" :xl="3" style="text-align: center;">
					<ul class="menu">
						<li class="nav-item"><a href="/about" class="active"><i class="el-icon-s-custom"></i>关于我们</a></li> 
						<li class="nav-item"><a href="/cooperation"><i class="el-icon-s-cooperation"></i>商务合作</a></li> 
						<li class="nav-item"><a href="https://wj.qq.com/s2/4216300/3ed1" target="_blank"><i class="el-icon-document-add"></i>申请收录</a></li>
						<li class="nav-item"><a href="https://wj.qq.com/s2/4216517/3dd6" target="_blank"><i class="el-icon-edit-outline"></i>意见反馈</a></li>
					</ul>
				</el-col>
				<el-col :md="17" :lg="17" :xl="17">
					<div class="title">
						<h3>关于我们</h3>
					</div>
					<div class="content">
						<p>红衣导航(www.hom1.cn)创立于2019年8月6日。目前处于开发环节，各个功能还有待完善，感谢大家使用红衣，我们会越做越好😘。</p>
					</div>
				</el-col>
			</el-row>
			
		</section>
		
		<foot></foot>
	</div>
</template>

<script>
	import header from './common/header/head'
	import footer from './common/footer/foot'
	
	export default {
	  name: 'About',
	  components:{
	      'headTop' : header,
	  	  'foot' : footer
	  }
	}
</script>

<style>
	section{
		padding-top: 2%;
		margin: 0;
		display: inherit;
		/* margin: 0 16%; */
	}
	
	.title h3 {
		line-height: 40px;
		color: #333;
		font-size: 17px;
		position: relative;
		padding-left: 20px;
	}
	
	.title h3:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 11px;
		height: 18px;
		width: 3px;
		background: #1989fa;
	}
	.content{
		line-height: 30px;
		font-size: 15px;
		margin-top: 15px;
		color: #616161;
	}
	
	@media screen and (min-width:1200px) {
		section{
			margin: 0 10%;
		}
	}
	@media screen and (min-width: 960px) and (max-width: 1199px) {
		section{
			margin: 0 10%;
		}
	}
	
@media only screen and (min-width: 480px) and (max-width: 767px) {
		section{
			margin: 0 5%;
		}
		.nav-item{
			float: left;
		}
		._nav{
			border-bottom: 1px solid #ececec;
			margin-bottom: 15px;
		}
	}
	
	@media only screen and (max-width: 479px) {
		section{
			margin: 0 5%;
		}
		.nav-item{
			float: left;
		}
		._nav{
			border-bottom: 1px solid #ececec;
			margin-bottom: 15px;
		}
	}
</style>
