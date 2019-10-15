<template>
  <div id="app">
	<router-view></router-view>
  </div>
</template>
<style>
	body{
	  background-color: #f5f5f5;
	}
	body,header,section,footer,ul{
		margin: 0;
		padding: 0;
	}
	a{
		font-size: 14px;
		color: #909399;
		text-decoration:none
	}
	img{
	  vertical-align: middle;
	}
	ul{
		display: inline-block;
	}
	li{
		list-style: none;
	}

	h1, h2, h3, h4, ol, p, ul {
	    padding: 0;
	    margin: 0;
	    font-weight: 400;
	}
	
	.h4{
		font-weight: 400;
		color: #1f2f3d;
	}
	.h3{
		font-weight: 600;
	}

	.float-left{
	    float: left;
	}
	.float-right{
	    float: right;
	}

	.nav{
	    height: 100%;
	    line-height: 60px;
	    background: transparent;
	    padding: 0;
	    margin: 0;
		}

	.nav-item ,.nav-item-radius{
	    margin: 0 5px;
		height: 100%;
	    list-style: none;
	    position: relative;
	    cursor: pointer;
		vertical-align: middle;
	}
	
	.menu-inline .nav-item ,.menu-inline .nav-item-radius{
		float: left;
	}


	.nav-item a ,.nav-item-radius a{
	    text-decoration: none;
	    color:#909399;
	}

	.nav-item a.active{
		color: #1989fa;
	}

	.nav-item a.active:after {
	    content: "";
	    display: inline-block;
	    position: absolute;
	    bottom: 0;
	    left: calc(50% - 15px);
	    width: 30px;
	    height: 2px;
	    background: #409eff;
	}
	.nav-item-radius {
		margin:0 10px 0 0;
	}
	.nav-item-radius a{
		padding: 5px 12px;
		border-radius: 20px;
	}
	.nav-item-radius a:hover{
		background-color: #f1f1f1;
	}
	.nav-item-radius a.active{
		color: #fff;
		background-color: #1989fa;
	}
	.menu li{
		height: 35px;
		line-height:35px;

	}
	
	.box {
		width: 100%;
		padding: 0;
		margin: 5px 0;
		text-align: left;
		border-radius: 2px;
		background: #FFFFFF;
		display: inline-block;
		box-shadow: 0 1px 1px rgba(0,0,0,0.1);
	}
	
	.box-header {
		color: #444;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px rgba(245,245,245,1) solid;
	}
	
	.box-header h3 {
		font-size: 18px;
		font-weight: 600;
		color: #3280fc;
	}
	
	.box-body {
		padding: 10px;
	}

	#app {
	  font-family: Helvetica, sans-serif;
	}

	/* 自定义滚动条 start */
::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 5px;
	/*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}

::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #1459fb52;
}

::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: #EDEDED;
}
/* 自定义滚动条 end */

@media only screen and (max-width: 479px) {
  .nav-item, .nav-item-radius{
    margin:0;
  }
  .nav-item a{
    padding: 0 3px;
  }
  .nav-item-radius a{
  	padding: 8px 3px;
  }
}
</style>
<script>
	export
	default {
		created() {
			this.$nextTick(() => {
				console.clear()
				console.log("%c%c168红衣网址导航", "line-height:28px;", "line-height:28px;padding:4px 8px;color:#fff;font-size:16px;background-image:-webkit-gradient(linear,left top,right top,color-stop(0,#ff22ff),color-stop(1,#5500ff));-webkit-background-clip:text;");
				console.log("%c%c哎呦~ 小老弟你来啦！","line-height:28px;","line-height:28px;padding:4px 0px;color:#ff0000;font-size:10px;");
			})
		}
	}
</script>