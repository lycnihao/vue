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
				<li class="nav-item"><a href="javascript:void(0)" @click="tabs('icon',$event)">图标</a></li>
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
							<el-dropdown-item v-for="(searchEngine,index) in searchList.searchEngines" :command="searchEngine.title+','+searchEngine.url+','+searchEngine.icon">
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
					v-model="suggest">
					<div class="popover-content" v-html="suggestContent"></div>
					<input slot="reference" type="text" class="search_text" size="30" v-model="keywords"  @keyup.enter="search"
					@focus="keywords!='' ? suggest = !suggest :''" @blur="keywords!='' ? suggest = !suggest :''" placeholder="输入关键字 搜你所想"/>
				  </el-popover>
				<button id="search_but" @click="search" style="padding: 10px 25px;">{{searchTitle}}搜索</button>
			</div>
			
			<div class="tabpanel" name="picture">
				 <!-- <el-popover
					trigger="manual"
					data-html="true"
					placement="bottom"
					class="search-input select"
					popper-class="suggest"
					v-model="popovers.picture">
					<div class="popover-content" v-html="suggestContent"></div>
					<div slot="reference" style="width: 100%;display: inherit;">
						<div class="dropdown">
							<el-select v-model="value" placeholder="请选择" @change="checkSearch">
								<el-option
								  v-for="picture in pictures"
								  :key="picture.title"
								  :label="picture.title"
								  :value="picture.url">
								</el-option>
							</el-select>
						</div>
						<input type="text" class="search_text" size="30" v-model="keywords"  @keyup.enter="search"
						@focus="keywords!='' ? popovers.picture = !popovers.picture :''" @blur="keywords!='' ? popovers.picture = !popovers.picture :''" :placeholder="searchDescribe"/>
					</div>
					</el-popover> -->
					<div class="search-input select">
							<div class="dropdown">
								<el-select v-model="value" placeholder="请选择" @change="checkSearch">
									<el-option
									  v-for="picture in searchList.pictures"
									  :key="picture.title"
									  :label="picture.title"
									  :value="picture.url">
									</el-option>
								</el-select>
							</div>
							<input type="text" class="search_text" size="30" v-model="keywords"  @keyup.enter="search" :placeholder="searchDescribe"/>
					</div>
				<button id="search_but" @click="search" style="padding: 12px 25px;"><i class="el-icon-search" style="font-size: 20px;"></i></button>
			</div>
			<div class="tabpanel" name="icon">
				<div class="search-input select">
					<div class="dropdown">
						<el-select v-model="value" placeholder="请选择" @change="checkSearch">
							<el-option
							  v-for="icon in searchList.icons"
							  :key="icon.title"
							  :label="icon.title"
							  :value="icon.url">
							</el-option>
						</el-select>
					</div>
					<input type="text" class="search_text" size="30" v-model="keywords"  @keyup.enter="search" :placeholder="searchDescribe"/>
				</div>
				<button id="search_but" @click="search" style="padding: 12px 25px;"><i class="el-icon-search" style="font-size: 20px;"></i></button>
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
		  suggest:false,
		  suggestContent:"",
		  searchList:{
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
			  material:[
				  {title:'包图网',describe:'专注原创商用设计图片下载',url:'https://ibaotu.com/tupian/niao.html?spm=stdhrs&utm_source=BD&utm_medium=168导航&utm_campaign='},
			  ],
			  icons:[
				  {title:'iconfont',describe:'国内功能很强大且图标内容很丰富的矢量图标库',url:'https://www.iconfont.cn/search/index?searchType=icon&q='},
				  {title:'easyicon',describe:'超过五十万个SVG、PNG、ICO、ICNS格式图标',url:'https://www.easyicon.net/iconsearch/'},
				  {title:'iconfinder',describe:'290万加优质图标搜索',url:'https://www.iconfinder.com/search/?q='},
				  {title:'flaticon',describe:'128万加免费矢量图标下载',url:'https://www.flaticon.com/search?word='},
				  {title:'iconarchive',describe:'3.5万个免费矢量图标下载',url:'http://www.iconarchive.com/search?q='},
			  ]
		  },
		  value:'',
		  tabName:'searchEngine'
		}
	},
	methods:{
		checkSearchIcon: function(command) {
		    var str = command.split(',');
		    this.searchTitle = str[0];
		    this.searchUrl = str[1];
		    this.searchIcon = this.$parent.searchIcon = str[2];
		},
		checkSearch: function() {
			this.searchUrl = this.value;
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
			if(name == 'searchEngine'){
				this.searchTitle = '百度'
				this.searchUrl = 'https://www.baidu.com/s?word='
			}else
			if(name == 'picture'){
				this.searchTitle = '高图网',
				this.searchDescribe = '免费无版权高清图片下载'
				this.searchUrl = this.value = 'http://www.gaoimg.com/plus/search.php?kwtype=0&q='
			}else
			if(name == 'icon'){
				this.searchTitle = 'iconfont',
				this.searchDescribe = '国内功能很强大且图标内容很丰富的矢量图标库'
				this.searchUrl = this.value = 'https://www.iconfont.cn/search/index?searchType=icon&q='
			}
		},
	},
	watch : {
	   keywords:function(val){
		   if(this.keywords.trim() == '' || this.tabName != 'searchEngine'){
			this.suggest = false
		   	return
		   }
		   this.suggest = true
		   this.$ajax.get(`/suggestion/su?wd=${this.keywords}&cb=window.baidu.sug`)
		   .then((response)=>{
		       let res_str = response.data;
		   	console.log(res_str)
		   	let str = res_str.split("window.baidu.sug(")[1].split(");")[0];
		   	let strObj = eval("("+str+")");
		   	
			if(strObj.s.length == 0){
				this.suggest = false
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
</style>
