<template>
	<div id="search">
		<div class="theme" v-if="theme.name == 'background'" :style="'background-image: url('+theme.value+');background-size: cover;filter: blur('+theme.cssBlur+'px);filter:saturate('+theme.cssSaturate+'%)'"></div>
		<div class="theme" v-else :style="'background:'+theme.value"></div>
		
		<!-- <svg class="bg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
			<defs>
				<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
			</defs>
			<g class="parallax">
				<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
				<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
				<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
				<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
			</g>
	
		</svg> -->
		<h3>以最快的方式获取想要的资源</h3>
		<div class="search-center">
			<form>
				<input slot="reference" type="text" class="search_text" size="30" v-model="keywords"  @keyup.enter="search"
				@focus="searchFocus()" @blur="searchBlur()" placeholder="输入关键字 搜你所想"/>
				<button id="search_but" @click="search"><i class="el-icon-search"></i></button>
				<div id="suggest">
					<ul v-for="suggestItem of suggestItems">
						<li v-html="suggestItem" @mousedown ="searchTo($event)"></li>
					</ul>
				</div>
			</form>
		 </div>
	</div>
</template>

<script>
export
default {
	data() {
	    return {
	      searchTitle: '百度',
	      searchUrl: 'https://www.baidu.com/s?word=',
	      searchIcon: require('../assets/img/baidu.svg'),
		  searchDescribe: '输入关键字 搜你所想',
		  keywords:"",
		  suggestItems:[],
		  value:'',
		  tabName:'searchEngine',
		  theme:{'name':'background','value':'http://img.168dh.cn/skin/001.jpg','cssBlur':'0','cssSaturate':'100'},
		}
	},
	methods:{
		searchBlur:function(){
			document.querySelector("#suggest").style.display = "none";
		},
		searchFocus:function(){
			document.querySelector("#suggest").style.display = "block";
		},
		search: function() {
		    var url = this.searchUrl + this.keywords;
		    window.open(url, "_blank")
		},
		searchTo: function(event) {
		    this.keywords = event.target.innerText;
			this.search()
		}
	},
	watch : {
	   keywords:function(val){
		   if(this.keywords.trim() == '' || this.tabName != 'searchEngine'){
			this.suggestItems = [];
		   	return
		   }
		   this.$ajax.get(`/suggestion/su?wd=${this.keywords}&cb=window.baidu.sug`)
		   .then((response)=>{
		       let res_str = response.data;
		   	console.log(res_str)
		   	let str = res_str.split("window.baidu.sug(")[1].split(");")[0];
		   	let strObj = eval("("+str+")");
		   	
			if(strObj.s.length == 0){
				return
			}
			
			this.suggestItems = [];
		   	for(let item of strObj.s){
		   		let suggestItem = item.replace(this.keywords.trim(),"<b>"+this.keywords.trim()+"</b>");
				this.suggestItems.push(suggestItem)
		   	}
		   });
	   }
	}
}
</script>

<style>
/* Animation */
	
.parallax > use {
	animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}

.parallax > use:nth-child(1) {
	animation-delay: -2s;
	animation-duration: 7s;
}

.parallax > use:nth-child(2) {
	animation-delay: -3s;
	animation-duration: 10s;
}

.parallax > use:nth-child(3) {
	animation-delay: -4s;
	animation-duration: 13s;
}

.parallax > use:nth-child(4) {
	animation-delay: -5s;
	animation-duration: 20s;
}

@keyframes move-forever {
	0% {
		transform: translate3d(-90px,0,0);
	}

	100% {
		transform: translate3d(85px,0,0);
	}
}

.bg {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 15vh;
}

.theme {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
}

#search {
	position: relative;
	padding: 200px 0 128px 0;
	transition:padding .5s;
}

#search h3 {
	text-align: center;
	margin-bottom: 60px;
	color: #fff;
	font-size: 40px;
	font-weight: 100!important;
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
}

#search .search-center {
	text-align: center;
}

#search form {
	display: inline-block;
	position: relative;
}

#search .search_text {
	height: 45px;
	border: none;
	margin: auto;
	outline: none;
	color: #525252;
	padding: 0 0 0 15px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    background-color: rgba(255,255,255,0.9);
	float: left;
}

#search #search_but{
	width: 48px;
	height: 45px;
	padding: 0;
	margin: 0;
    border: 0;
	outline: none;
	cursor: pointer;
	font-size: 17px;
    position: relative;
	border-bottom-right-radius: 4px;
	border-top-right-radius: 4px;
    background-color: rgba(255,255,255,0.9);
}

#suggest {
	z-index: 1;
	width: 100%;
	margin-top: -2px;
	text-align: left;
	position: absolute;
	background-color: #fff;
	border-radius: 0 0 4px 4px;
}
#suggest ul{
	box-shadow: 0 1px 2px 0 #cdcdcd;
    border-radius: 0 0 2px 2px;
}
#suggest li{
	margin: 0;
	font-weight: 700!important;
    color: #444;
	height: inherit;
	cursor: default;
	background: #fff;
	line-height: 18px;
    padding: 4px 10px;
    word-wrap: break-word;
	font-family: 'Helvetica Neue',Helvetica,Arial;
	font-weight: 400;
	font-stretch: normal;
	font-size: 16px;
}
#suggest li b{
	font-weight: 400!important;
    color: #333;
}
#suggest li:hover{
	background: #F1F1F1!important;
    color: #222;
    text-shadow: 0 1px 0 #fff;
}
@media screen and (min-width:1200px) {
	#search .search_text {
		width: 492px;
		height: 45px;
	}
	
}

@media screen and (min-width: 960px) and (max-width: 1199px) {
	#search .search_text {
		width: 492px;
		height: 45px;
	}
}

@media screen and (min-width: 768px) and (max-width: 959px) {
	#search .search_text {
		width: 492px;
		height: 45px;
	}
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
	#search .search_text {
		width: 392px;
		height: 45px;
	}
}

@media only screen and (max-width: 479px) {
	#search .search_text{
		width: 292px;
		height: 45px;
	}
	
}
</style>
