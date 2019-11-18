<template>
	 <div class="sidebar_block" v-show="show">
		<ul>
			<!-- <li class="item">
				<a>搜索</a>
				<i class="el-icon-search"></i>
			</li> -->
			<li class="item">
				<a href="https://wj.qq.com/s2/4216517/3dd6" target="_blank">意见反馈</a>
				<i class="el-icon-chat-line-round"></i>
			</li>
			<li class="item">
				<el-backtop :right="0" :bottom="0">
					<a>返回顶部</a>
				</el-backtop>
				<i class="el-icon-arrow-up"></i>
			</li>
		</ul>
	 </div>
</template>

<script>
export
default {
	data() {
		return{
			show:false
		}
	},
	methods: {
	}
}
</script>

<style>
.sidebar_block{
	position: fixed;
    bottom: 100px;
    right: 32px;
    width: 40px;
}

.sidebar_block .item{
	cursor:pointer;
	color: #8590a6;
	width: 40px;
	height: 40px;
	margin-top: 15px;
	display: flex;
	align-items:center;
	justify-content:center;
	background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
	position: relative;
	overflow: hidden;
}

.sidebar_block .item a{
	padding-top: 80px;
    position: absolute;
	text-align: center;
	transition: padding-top .5s cubic-bezier(.175,.885,.32,1);
}

.sidebar_block .item i{
	font-size: 20px;
	line-height: 40px;
}

.sidebar_block .item:hover a{
	padding-top: 0;
}
.sidebar_block .item:hover i{
	display: none;
}



.sidebar_block a{
	color: #8590a6;
}


.sidebar_block .item .el-backtop{
	position: absolute;
	background-color:transparent;
	box-shadow:0 0;
}

</style>
