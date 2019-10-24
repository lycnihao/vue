<template>
	<div id="search">
	
		<svg class="bg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
			<defs>
				<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
			</defs>
			<g class="parallax">
				<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
				<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
				<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
				<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
			</g>
	
		</svg>
		<h3>以最快的方式获取想要的资源</h3>
		<div class="search-tools" style="height: 40px; line-height: 40px;">
			<ul class="nav menu-inline" style="line-height: 30px;">
				<li class="nav-item"><a href="javascript:void(0)" @click="tabs('searchEngine',$event)" class="active">搜索引擎</a></li>
				<li class="nav-item"><a href="javascript:void(0)" @click="tabs('picture',$event)">图片</a></li>
			</ul>
		</div>
		<div class="search-center">
			
			<div class="tabpanel show" name="searchEngine">
				<div class="dropdown">
					<el-dropdown placement="bottom" @command="checkSearchIcon">
						<el-button type="text" class="el-dropdown-link">
							<img width="20px" height="20px" v-bind:src="searchIcon">
							<i class="el-icon-arrow-down"></i>
						</el-button>
					
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="(searchEngine,index) in searchEngines" :command="searchEngine.title+','+searchEngine.url+','+searchEngine.icon">
								<img width="20" alt="" :src="searchEngine.icon">
								{{searchEngine.title}}
							</el-dropdown-item>
						</el-dropdown-menu>
					
					</el-dropdown>
				</div>
				 <el-popover
					trigger="manual"
					data-html="true"
					placement="bottom"
					class="search-input"
					popper-class="suggest"
					v-model="popovers.searchEngine">
					<div class="popover-content" v-html="suggestContent"></div>
					<input slot="reference" type="text" class="search_text" size="30" v-model="keywords"  @keyup.enter="search"
					@focus="keywords!='' ? popovers.searchEngine = !popovers.searchEngine :''" @blur="keywords!='' ? popovers.searchEngine = !popovers.searchEngine :''" placeholder="输入关键字 搜你所想"/>
				  </el-popover>
				<button id="search_but" @click="search" style="padding: 10px 25px;">{{searchTitle}}搜索</button>
			</div>
			
			<div class="tabpanel" name="picture">
				 <el-popover
					trigger="manual"
					data-html="true"
					placement="bottom"
					class="search-input select"
					popper-class="suggest"
					v-model="popovers.picture">
					<div class="popover-content" v-html="suggestContent"></div>
					<div class="dropdown" slot="reference" style="width: 140px;padding:0">
						<el-select v-model="value" placeholder="请选择" @change="checkSearch">
							<el-option
							  v-for="picture in pictures"
							  :key="picture.title"
							  :label="picture.title"
							  :value="picture">
							</el-option>
						</el-select>
					</div>
					<input slot="reference" type="text" class="search_text" size="30" v-model="keywords"  @keyup.enter="search"
					@focus="keywords!='' ? popovers.picture = !popovers.picture :''" @blur="keywords!='' ? popovers.picture = !popovers.picture :''" :placeholder="searchDescribe"/>
				  </el-popover>
				<button id="search_but" @click="search" style="padding: 10px 25px;"><i class="el-icon-search" style="font-size: 20px;"></i></button>
			</div>
			
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
	      searchIcon: 'http://47.106.84.166:3302/upload/baidu.svg',
		  searchDescribe: '输入关键字 搜你所想',
		  keywords:"",
		  suggestContent:"",
		  searchEngines:[
			  {title:'百度',url:'https://www.baidu.com/s?word=',icon:'http://47.106.84.166:3302/upload/baidu.svg'},
			  {title:'360',url:'https://www.so.com/s?q=',icon:'http://47.106.84.166:3302/upload/360.svg'},
			  {title:'Bing',url:'https://cn.bing.com/search?q=',icon:'http://47.106.84.166:3302/upload/bing.svg'},
			  {title:'搜狗',url:'https://www.sogou.com/web?query=',icon:'http://47.106.84.166:3302/upload/sogou.svg'},
			  {title:'谷歌',url:'https://www.google.com/search?q=',icon:'http://47.106.84.166:3302/upload/google.svg'},
		  ],
		  pictures:[
			  {title:'高图网',describe:'免费无版权高清图片下载',url:'http://www.gaoimg.com/plus/search.php?kwtype=0&q='},
			  {title:'Pexels',describe:'免费无版权高清图片下载',url:'https://www.pexels.com/search/'},
			  {title:'Unsplash',describe:'免费无版权高清图片下载',url:'https://unsplash.com/s/photos/'},
			  {title:'Wallhaven',describe:'免费无版权高清图片下载',url:'https://wallhaven.cc/search?q='},
		  ],
		  value:{title:'高图网',describe:'免费无版权高清图片下载',url:'http://www.gaoimg.com/plus/search.php?kwtype=0&q='},
		  popovers:{
			  searchEngine:false,
			  picture:false
		  },
		  tabName:'searchEngine'
		}
	},
	methods:{
		checkSearchIcon: function(command) {
		    var str = command.split(',');
		    this.searchTitle = str[0];
		    this.searchUrl = str[1];
		    this.searchIcon = str[2];
		},
		checkSearch: function() {
			this.searchUrl = this.value.url;
		},
		search: function() {
		    var url = this.searchUrl + this.keywords;
		    window.open(url, "_blank")
		},
		tabs:function(name,event){
			event.path[2].querySelector(".search-tools .active").className = "";
			event.target.className = "active";
			event.path[6].querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
			event.path[6].querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab
			
			this.keywords = '';
			this.tabName = name;
			
			if(name == 'SearchEngine'){
				this.searchTitle = '百度'
				this.searchUrl = 'https://www.baidu.com/s?word='
			}else
			if(name == 'Picture'){
				this.searchTitle = '高图网',
				this.searchDescribe = '免费无版权高清图片下载'
				this.searchUrl = 'http://www.gaoimg.com/plus/search.php?kwtype=0&q='
			}
		},
	},
	watch : {
	   keywords:function(val){
		   if(this.keywords.trim() == ''){
			this.popovers[this.tabName] = false
		   	return
		   }
		   this.popovers[this.tabName] = true
		   this.$ajax.get(`/suggestion/su?wd=${this.keywords}&cb=window.baidu.sug`)
		   .then((response)=>{
		       let res_str = response.data;
		   	console.log(res_str)
		   	let str = res_str.split("window.baidu.sug(")[1].split(");")[0];
		   	let strObj = eval("("+str+")");
		   	
			if(strObj.s.length == 0){
				this.popovers[this.tabName] = false
				return
			}
			
		   	let centent ='<ul>'
		   	for(let item of strObj.s){
		   		console.log(item)
		   		centent += `<li><a href="${this.searchUrl}${item}" target="_blank">${item}</a></li>`
		   	}
		   	centent += "</ul>";
			this.suggestContent = centent;
		   });
	   }
	},
}
</script>

<style>
	#search {
		position: relative;
		padding: 180px 0 230px 0;
		background: linear-gradient(60deg, rgba(84,58,183,1) 10%, rgba(0,172,193,1) 100%);
		background-image: url(../../../assets/bg/bg.png);
	}
	
	#search .search-center .tabpanel.show,#search .search-tools{
		display: flex;
		justify-content: center;
	}
	
	#search .search-center{
		position: relative;
	}
	
	#search .search-tools li{
		margin: 0 12px;
	}
	
	#search .search-tools .nav .nav-item a{
		display:inline-block;
		color: #fff;
		height: 100%;
	}
	
	#search .search-tools .nav .nav-item a.active:after{
		width: 100%;
		left: 0;
	}
	
	#search input,#search button {
		margin: 0;
		outline: 0;
		border: none;
	}
	
		
	#search .search-input{
		display: inherit;
	}
	
	.suggest{
		z-index: 1!important;
		padding: 0!important;
	}
	.suggest .popper__arrow{
		left: 68px!important;
	}
	
	.suggest .popover-content{
		padding: 10px 0;
	}
	
	.suggest .popover-content li{
		padding-left: 15px;
	}
	
	.suggest .popover-content li:hover{
		background: #f1f1f1;
	}
	
	.suggest .popover-content a{
		height: 32px;
		line-height: 32px;
		color: #606266;
		display: inherit;
	}
	
	#search h3{
		text-align: center;
		margin-bottom: 60px;
		color: #fff;
		font-size: 40px;
	    font-weight: 100!important;
	    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
		}
	
	#search .search_text {
		padding: 15px 15px 15px 5px;
		width: 100%;
		-webkit-transition: ease .3s;
		transition: ease .3s;
		-webkit-transform-origin: 50% 50%;
	}
	.search_text{
		border-radius:5px 0 0 5px;
	}
	.search_text:hover {
			/* box-shadow: 0 8px 43px rgba(0,0,0,0.15); */
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}
	
	#search_but{
		border-radius:0 5px 5px 0 !important;
	}
	
	#search #search_but {
		color: #fff;
		border-radius: 0;
		background-color: #909399;
		cursor: pointer;
	}
	
	.dropdown {
		border-radius:5px 0 0 5px;
		background-color: #fff;
		position: relative;
		z-index: 1;
		right: -4px;
		padding: 0 8px 0 18px;
	}
	.dropdown .el-button{
		line-height:inherit!important;
	}
	
	.dropdown span{
		color: #606266;
		font-size: 15px;
	}
	

	.dropdown span i{
		color: #909399;
	}
	
	.el-dropdown-menu__item:hover{
		background-color: #F5F7FA!important;
		color: #606266!important;
	}
	
	.el-select-dropdown__item.selected{
		color: #000!important;
	}
	
	@media screen and (min-width:1200px) {
		#search .search-center{
			margin: 0 25%;
		}
		
		.suggest{
			width: 37%;
		}
		
		.dropdown .el-select{
			top: 2px;
		}
	}
	
	@media screen and (min-width: 960px) and (max-width: 1199px) {
		
		#search .search-center{
			margin: 0 18%;
		}
		
		#search #search-input{
			width: 72%;
		}
		
		.suggest{
			width: 44%;
		}
	}
	
	@media screen and (min-width: 768px) and (max-width: 959px) {
		
		.suggest{
			width: 52%;
		}
		
		#search .search-center{
			margin: 0 12%;
		}
		
		#search #search_input{
			width: 68%;
		}
	}
	
	@media only screen and (min-width: 480px) and (max-width: 767px) {
		
		#search .search-center{
			margin: 0 8%;
		}
	
		#search #search_input{
			width: 56%;
		}
		
		.suggest{
			width: 57%;
		}
	
		#search h3 {
			margin-bottom: 22px;
			font-size: 32px;
		}
	}
	
	@media only screen and (max-width: 479px) {
		
		.dropdown{
			padding: 0 8px 0 10px;
		}
		
		#search .search-input{
			width: 45%;
		}
		
		#search .search-input.select{
			width: 72%;
		}
		
		.suggest{
			width: 97%;
		}
	}
</style>
