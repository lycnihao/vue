<template>
	<footer class="box">
		<ul class="menu">
			<li class="nav-item"><el-link @click="aboutVisible = true">关于我们</el-link></li>
			<li class="nav-item"><el-link >商务合作</el-link></li>
			<li class="nav-item"><el-link href="https://wj.qq.com/s2/4216300/3ed1" target="_blank">申请收录</el-link></li>
			<li class="nav-item"><el-link href="https://wj.qq.com/s2/4216517/3dd6" target="_blank">意见反馈</el-link></li>
		</ul>
		<p>红衣导航 - hom1.cn @ All rights Reserved ，本站收录的网站若侵害到您的利益，请联系我们删除处理</p>

    <el-dialog title="关于" :visible.sync="aboutVisible">
    <strong>168红衣导航 www.168dh.cn 上线时间 2019-09-28</strong><br />
		<p style="text-align: left;">发现、收集、整理全网高质量的产品、网站、工具、文章、APP等资源，希望为每位用户提供良好的上网体验。</p><br />
		(如有问题联系邮箱<u><em><strong>38707145@qq.com</strong></em></u>)
    </el-dialog>

	</footer>

</template>

<script>
	export default {
     data() {
      return {
        aboutVisible: false,
      };
    },
		methods:{
			about:function(){
				this.$router.push('/about')
			},
			cooperation:function(){
				this.$router.push('/cooperation')
			},

		}
	}
</script>
<style>
	footer{
		margin: 10px 0px 0px !important;
		padding: 25px 0px !important;;

	}
	footer .menu{
	    padding: 0px 18%;
		display: flex;
		justify-content: space-around;
	}
	footer p{
		text-align: center;
		font-size: 12px;
	}

	@media only screen and (max-width: 479px) {
		footer .menu{
		    padding: 0px 10%;
		}

		footer p{
			margin: 0 6%;
		}
	}
</style>
