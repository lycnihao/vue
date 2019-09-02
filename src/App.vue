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
	    display: block;
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
		margin: 0;
		height: 25px!important;
		line-height: 25px!important;
	}
	.nav-item-radius a{
		padding: 2px 15px;
		border-radius: 20px;
	}
	.nav-item-radius a:hover{
		background-color: #f1f1f1;
	}
	.menu li{
		height: 35px;
		line-height:35px;
	}


	#app {
	  font-family: Helvetica, sans-serif;
	}

section {
	padding-top: 75px;
	display: inherit;
}
</style>
