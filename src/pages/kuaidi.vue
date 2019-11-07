<template>
	<main-layout>
		<div style="padding: 5px;background-color: #fff;">
			<el-alert title="提醒：快递查询页面完全由快递100提供，页面上的内容和广告均和红衣无关~" type="warning"></el-alert>
			<iframe class="kuaidi_pc" name="kuaidi100" src="https://www.kuaidi100.com/frame/wuliu/"  style="margin-top: 5px;min-height:615px;width:100%;height:100%;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>
			<iframe class="kuaidi_app" name="kuaidi100_app" src="https://m.kuaidi100.com/app/query/"  style="margin-top: 5px;min-height:615px;width:100%;height:100%;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>
		</div>
	</main-layout>
</template>

<script>
import MainLayout from '../layouts/main'
export
default {
		components: {
			MainLayout
		}
}
</script>

<style>
   @media screen and (min-width:1200px) {
	   .kuaidi_pc{display: inline-block;}
	   .kuaidi_app{display: none;}
	}
	@media screen and (min-width: 960px) and (max-width: 1199px) {
		.kuaidi_pc{display: none;}
		.kuaidi_app{display: inline-block;}
	}
	@media screen and (min-width: 768px) and (max-width: 959px) {
		.kuaidi_pc{display: none;}
		.kuaidi_app{display: inline-block;}
	}
	@media only screen and (min-width: 480px) and (max-width: 767px) {
		.kuaidi_pc{display: none;}
		.kuaidi_app{display: inline-block;}
	}
	@media only screen and (max-width: 479px) {
		.kuaidi_pc{display: none;}
		.kuaidi_app{display: inline-block;}
	}
</style>
