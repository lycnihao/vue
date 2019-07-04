<template>
  <div id="app">
		<header class="header">
		  <div class="float-left">
		    <a class="logo" href="#"><img src="./assets/logo.png" width="100%"></a>
		    <el-menu :default-active="activeIndex" mode="horizontal">
		      <el-menu-item index="1">主页</el-menu-item>
		      <!-- <el-menu-item index="2">精选</el-menu-item> -->
		    </el-menu>
		  </div>
		  <div class="float-right">
		    <el-menu mode="horizontal">
		      <el-menu-item><span><i class="el-icon-edit"></i></span></el-menu-item>
		      <el-menu-item><span><i class="el-icon-share"></i></span></el-menu-item>
		      <el-menu-item><span><i class="el-icon-delete"></i></span></el-menu-item>
		      <!-- <el-menu-item><img width="24px" height="24px" src="./assets/img/logo.png" ></el-menu-item> -->
						<el-menu-item @click="loginOpen = true">登录</el-menu-item>
						<el-menu-item @click="registerOpen = true">注册</el-menu-item>
		    </el-menu>
				<el-dialog title="登录" :visible.sync="loginOpen" width="30%">
					<el-input v-model="username" placeholder="请输入账号"></el-input>
					<el-input v-model="password" placeholder="请输入密码"></el-input>
					<el-button type="primary" style="width: 100%;" @click="login()">登录</el-button>
					<p @click="loginOpen = false,registerOpen=true">没有账号？<a href="#">立即注册</a></p>
					
				</el-dialog>
				<el-dialog title="注册" :visible.sync="registerOpen" width="30%">
					<el-input v-model="username" placeholder="请输入账号"></el-input>
					<el-input v-model="password" placeholder="请输入密码"></el-input>
					<el-button type="primary" style="width: 100%;" @click="register()">注册</el-button>
					<p style="width: 100%;text-align: right;" @click="registerOpen=false,loginOpen = true">已有账号？<a href="#">立即登录</a></p>
				</el-dialog>
		  </div>
		</header>
  </div>
</template>

<script>
export default {
  data() {
        return {
          activeIndex: '1',
					searchTitle: '百度',
					searchUrl:'https://www.baidu.com/s?word=',
					loginOpen:false,
					registerOpen:false,
					username:'',
					password:'',
					searchIcon: 'https://img.bidianer.com/engine/201905/06/5ccffcbb848d1_6VmFZFyC397EDMO.svg',
					imgs:['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp','//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
					apiUrlSites:'http://localhost:8080/getList',
					apiUrlTouch:'http://localhost:8080/getTouch',
					sites:null,
					touch:null
				};
      },
  methods: {
		login:function(){
			this.$message({
          message: '登录成功',
          type: 'success'
        });
				this.loginOpen=false
		},
		register:function(){
			this.$message({
			    message: '注册成功',
			    type: 'success'
			  });
				this.registerOpen=false
		}
  }
}
</script>

<style>
body{
	  background-color: #f5f5f5;
	}
	body,header,section,footer,ul{
		margin: 0;
		padding: 0;
	}
	a{
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
	
	#app {
	  font-family: Helvetica, sans-serif;
	}
	header{
		padding: 0 100px;
		width: 100%;
		height: 3.75rem;
	  line-height: 3.75rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
	  background-color: #fff;
		-webkit-box-shadow: 0 1px 3px rgba(26,26,26,.1);
	  box-shadow: 0 1px 3px rgba(26,26,26,.1);
	}
	.logo{
	    display: inline-block;
	    width: 40px;
	    float: left;
	}
	.logo img{
	  vertical-align: middle;
	}

	.float-left{
	    float: left;
	}
	.float-right{
	    float: right;
	}
	section{
	  padding-top: 2%;
		margin: 0 16%;
	}
	#search{
		padding: 20px 0;
	}
	#search input,#search button{
		margin: 0;
		padding: 10px 15px;
		outline: 0;
	  border: none;
	}
	
	#search #search_text{
	  padding: 10px 15px 10px 58px;
		width: 50%;
		-webkit-transition: ease .3s;
	    transition: ease .3s;
	    -webkit-transform-origin: 50% 50%;
	}
	
	#search_text:hover{
		/* box-shadow: 0 8px 43px rgba(0,0,0,0.15); */
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}
	
	#search #search_but{
		color: #fff;
		border-radius: 0;
		/*background-color: #FF8C69;*/
	  background-color: #909399;
		cursor: pointer;
	}
	
	.dropdown{
	  position: relative;
	  top: 0;
	  left: 55px;
	  padding: 0 6px;
	  display: flex;
	  align-items:center;
	  /* background-color: #eeeeeeed;
	  border-right:0.5px #f5f5f5 solid; */
	}
	
	
	#touch{
		margin: 1rem 0;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.site-card{
		display: inline-block;
		margin: 15px;
	}
	
	.site-card .site-touch-icon{
		width: 36px;
		height: 36px;
		transition: .5s;
	}
	
	.site-card:hover .site-touch-icon{
		margin-top: -10px;
		margin-bottom: 10px;
		-webkit-filter: drop-shadow(0 6px 6px rgba(100,100,100,0.6));
		-webkit-transform: translateY(-4px) scale(1.15);
		  -moz-transform: translateY(-4px) scale(1.15);
		  -ms-transform: translateY(-4px) scale(1.15);
		  -o-transform: translateY(-4px) scale(1.15);
		  transform: translateY(-4px) scale(1.15);
	}
	
	.site-touch-title{
		margin-bottom:-12px;
		line-height: 26px;
		font-size: 14px;
	}
	
	#touch img{
		width: 100%;
		height: 100%;;
		border-radius: 50%;
	}
	
	.menu li{
		height: 35px!important;
		line-height:35px!important;
	}
	
	.box{
		width: 100%;
		padding: 0;
		margin: 5px 0;
		text-align: left;
		border-radius: 2px;
		background: #FFFFFF;
		display: inline-block;
		box-shadow: 0 1px 1px rgba(0,0,0,0.1);
	}
	.box-header{
		color: #444;
	  padding: 10px;
		display: flex;
		justify-content:space-between;
		border-bottom:1px rgba(245,245,245,1) solid;
	}
	.box-header>h3{
		font-size: 16px;
	  color: #6b7386;
	}
	.box-body{
		padding: 10px;
	}
	
	
	.site-list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 10px;
	}	
	.site-list li{
		height: 60px;
		width: 230px;
	}
	.site-list .site-item{
		height: 100%;
		font-size: 14px;
		padding: 5px 22px;
		display:flex;
		align-items:center;
		overflow: hidden;
	}
	.site-icon{
		margin-right: 15px;
	}
	.site-icon img{
		width: 2rem;
		height: 2rem;
	}
	.site-info{
		width: 150px;
	}
	.site-info h3{
		color: #444444;
	}
	.site-info p{
		color: #a1a7b7;
		font-size: 12px;
		text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
	}
	
	.site-list .site-item:hover{
		background: rgba(241,242,249,.5);
	}
	
	.site-list .site-item:hover h3{
		color: #409EFF;
	}
	
	.site-list .site-item:hover p{
		color: #131313a1;
	}
	
	.main{
	}
	.container{
		width: 70%;
	}
	.sidebar{
		width: 28%;
	}
	
	.thumbnail{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.image-placeholder{
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
		justify-content: center;
	}
	.image-placeholder .block{
		width: 193px;
		height: 123px;
		margin: 0 2px;
		overflow: hidden;
	}
	.image-placeholder .block img{
		-webkit-transition: ease .3s;
		transition: ease .3s;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}
	.image-placeholder .block:hover img{
		
		-webkit-transform: translateY(-4px) scale(1.05);
    -moz-transform: translateY(-4px) scale(1.05);
    -ms-transform: translateY(-4px) scale(1.05);
    -o-transform: translateY(-4px) scale(1.05);
    transform: translateY(-4px) scale(1.05);
	}
	
	
	.el-dialog__body{
		padding: 0 20px 30px;
	}
	.el-dropdown-link{
	  cursor: pointer;
	  color: #ccc;
	}
	.el-dropdown-link i{
	  margin-left: -2px;
	}
	.el-menu.el-menu--horizontal{
	      border-bottom: none;
	}
</style>
