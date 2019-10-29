<template>
	<main-layout>
		<el-container>
		  <el-aside width="180px">
			  <ul class="aside">
				  <li><a href="javascript:void(0)">v2ex</a></li>
				  <li><a href="javascript:void(0)">gihub</a></li>
				  <li><a href="javascript:void(0)">知乎</a></li>
				  <li><a href="javascript:void(0)">哔哩哔哩</a></li>
			  </ul>
		  </el-aside>
		  <el-main class="content">
			  <el-alert title="刚刚更新-数据源自百度" type="info" center style="margin-top: -10px;margin-bottom: 5px;"></el-alert>
			  <table>
				 <tr>
					<td><a href="javascript:void(0)" class="item">
							 <span class="number">01</span>
							 一个人的时光也很美好
					</a></td>
					<td width="10%">
						<span class="level">4,411,840</span>
					</td>
					<td width="10%" style="text-align: right;">
						<span class="trend">↑</span>
					</td>
				 </tr>
				 <tr>
					<td><a href="javascript:void(0)" class="item">
							 <span class="number">01</span>
							 一个人的时光也很美好
					</a></td>
					<td width="10%">
						<span class="level">4,411,840</span>
					</td>
					<td width="10%" style="text-align: right;">
						<span class="trend">↑</span>
					</td>
				 </tr>
				 <tr>
					<td><a href="javascript:void(0)" class="item">
							 <span class="number">01</span>
							 一个人的时光也很美好
					</a></td>
					<td width="10%">
						<span class="level">4,411,840</span>
					</td>
					<td width="10%" style="text-align: right;">
						<span class="trend">↑</span>
					</td>
				 </tr>
				 <tr>
					<td><a href="javascript:void(0)" class="item">
							 <span class="number">01</span>
							 一个人的时光也很美好
					</a></td>
					<td width="10%">
						<span class="level">4,411,840</span>
					</td>
					<td width="10%" style="text-align: right;">
						<span class="trend">↑</span>
					</td>
				 </tr>
				  <tr>
					<td><a href="javascript:void(0)" class="item">
							 <span class="number">01</span>
							 一个人的时光也很美好
					</a></td>
					<td width="10%">
						<span class="level">4,411,840</span>
					</td>
					<td width="10%" style="text-align: right;">
						<span class="trend">↑</span>
					</td>
				 </tr>
			  </table>
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
				
			}
		},
		methods: {
			
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
	
	.aside li a:hover{
		color: #fff;
	}
	
	.aside li a:before{
		content:"";
		top: 50%;
		transform: translateY(-50%);
		left: 1.25em;
		width: 8px;
		height: 8px;
		border: 2px solid #2775ff;
		border-radius: 50%;
		position: absolute;
		background-color: #2775ff;
		transition: all .4s ease;
	}
	
	.aside li a:hover:before{
		box-shadow: 0 5px 16px 0 rgba(165,165,165,.5);
		background-color: transparent;
		border: 2px solid #fff;
	}
	
	.aside li a:hover:after{
		content:"";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50px;
		background: linear-gradient(to right,#2775ff,#7202bb);
		transition: all .4s ease;
		opacity: 1;
		z-index: -1;
	}
	
	
	
	
	.content{
		background-color: #fff;
	}
	.content table{
		width: 100%;
	}
	
	.content tr{
		height: 30px;
	}
	
	.content .item{
		/* font-size: 16px;
		padding: 10px 0;
		display: inherit; */
	}
	
	.content .item .number{
		/* background: #FF5722; */
		background: #01AAED;
		padding: 2px 6px;
		color: #F2F4F7;
		border-radius: 4px;
		font-size: 14px;
		margin-right: 8px;
	}
	
	.level{
		font-size: 14px;
		color: #909399;
	}
	
	.trend{
		font-size: 14px;
		color: #909399;
	}
</style>
