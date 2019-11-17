<template>

	 <div class="sidebar_block">
		<ul>
			<li class="item">
				<a>搜索</a>
				<i class="el-icon-search"></i>
			</li>
			<li class="item">
				<a>意见反馈</a>
				<i class="el-icon-chat-line-round"></i>
			</li>
			<li class="item">
				<a>返回顶部</a>
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
}

.sidebar_block .item a{
	display: none;
}

.sidebar_block .item i{
	font-size: 20px;
	line-height: 40px;
}

.sidebar_block .item:hover a{
	display: inline-block;
	text-align: center;
}
.sidebar_block .item:hover i{
	display: none;
}



.sidebar_block a{
	color: #8590a6;
}

</style>
