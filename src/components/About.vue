<template>
	<div>
		<head-top></head-top>

		<section class="section">
			<div class="content large">
				<h3 class="h1">
					<span class="red" style="font-size: 1.3em;"><i class="el-icon-s-home"></i></span>
					<span class="num">
						<em class="blue">1</em>
						<em class="red">6</em>
						<em class="blue">8</em>
					</span>
					<span class="str">
						<em class="red">红</em>
						<em class="blue">衣</em>
					</span>
				</h3>
				<p style="margin: 32px 0 50px 0;">分享有价值的优质书签和工具，欢迎大家使用！</p>
				<div class="block">
					<p class="p">
						168红衣导航 <a href="/">www.168dh.cn</a> 上线于2019年秋<!-- 2019年09月28日 -->，为大家提供发现、收藏、整理网站的平台，希望大家能够喜欢。
					</p>
					<p style="margin-top: 32px;">
						<h3><p style="font-weight:600">与我联系</p></h3>
						<p>欢迎用以下方式和我联系：</p>
						<p>邮箱：38707145@qq.com      QQ：929789911</p>
					</p>
					<p style="margin-top: 50px;">
						<h3><p style="font-weight:600">版权说明</p></h3>
						<p>本站资源均收集整理于互联网或站内用户分享，如果侵犯了您的合法权益，请来信告知，我们将尽快作出处理。</p>
					</p>
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
		text-align: center;
		background-color: #fff;
	}

	.large .h1{
		line-height: 70px;
		font-size: 3em;
		margin-top: 2em;
	}
	.large .red{
		color: #fe5f58;
	}
	.large .blue{
		color: #1bc3fb;
	}

	.num em{
		margin: 0;
		font-style: inherit;
	}
	.str em{
		margin: 0;
		font-family: "新宋体";
		font-style: inherit;
	}

	.block .p{
		line-height: 70px;
		letter-spacing:5px;
	}
	.block p{
		line-height: 30px;
	}
	@media screen and (min-width:1200px) {
		.section{
			margin: 0 10% !important;;
		}
	}
	@media screen and (min-width: 960px) and (max-width: 1199px) {
		.section{
			margin: 0 10% !important;;
		}
	}

@media only screen and (min-width: 480px) and (max-width: 767px) {
		.section{
			margin: 0 5% !important;;
		}
	}

	@media only screen and (max-width: 479px) {
		.section{
			margin: 0 5% !important;;
		}
	}
</style>
