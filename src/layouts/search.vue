<template>
	<div id="search">
		<div class="theme" v-if="theme.name == 'background'" :style="'background-image: url('+theme.value+');background-size: cover;filter: blur('+theme.cssBlur+'px);'"></div>
		<div class="theme" v-else :style="'background:'+theme.value"></div>
		<div class="search-center">
			<form onsubmit="return false;">
				<input slot="reference" type="text" class="search_text" size="30" v-model="keywords" @keyup="keyup($event)"
				@focus="searchFocus()" @blur="searchBlur()" placeholder="输入关键字 搜你所想"/>
				<button id="search_but" type="button" @click="search"><i class="el-icon-search"></i></button>
				<div id="suggest">
					<ul>
						<li v-for="suggestItem of suggestItems" v-html="suggestItem" @mousedown ="searchTo($event)"></li>
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
		  theme:{'name':'background','value':'https://cdn.jsdelivr.net/gh/hshanx/static@v1.0.2/default-bg.jpeg','cssBlur':'0'},
		  suggestIndex:-1,
		}
	},
	methods:{
		searchBlur:function(){
			document.querySelector("#suggest").style.display = "none";
			if (this.keywords.trim() == '') {
				this.suggestItems = [];
			}
		},
		searchFocus:function(){
			document.querySelector("#suggest").style.display = "block";
		},
		search: function() {
		    var url = this.searchUrl + document.querySelector(".search_text").value;
		    window.open(url, "_blank")
		},
		searchTo: function(event) {
		    this.keywords = event.target.innerText;
			this.search()
		},
		keyup : function(ev){
			 if(ev.keyCode == 13){
				this.search()
            } else if(ev.keyCode == 40){ //向下
				var items = document.querySelectorAll("#suggest ul li");
				if(items.length == 0)
					return
				else
				if(this.suggestIndex == -1 || items.length - 1 - this.suggestIndex == 0){
					if(this.suggestIndex > 0)
						items[this.suggestIndex].className="";
					this.suggestIndex = 0;
					items[this.suggestIndex].className="suggestHover";
					document.querySelector(".search_text").value = items[this.suggestIndex].innerText;
				} else{
					items[this.suggestIndex].className="";
					items[this.suggestIndex + 1].className="suggestHover";
					document.querySelector(".search_text").value = items[this.suggestIndex + 1].innerText;
					this.suggestIndex ++;
				}
			} else if(ev.keyCode == 38){ //向上
				var items = document.querySelectorAll("#suggest ul li");
				if(items.length == 0)
					return
				else
				if(this.suggestIndex == -1 || this.suggestIndex <= 0){
					if(this.suggestIndex == 0)
						items[this.suggestIndex].className="";
					this.suggestIndex = items.length - 1;
					items[this.suggestIndex].className="suggestHover";
					document.querySelector(".search_text").value = items[this.suggestIndex].innerText;
				} else {
					items[this.suggestIndex].className="";
					items[this.suggestIndex - 1].className="suggestHover";
					document.querySelector(".search_text").value = items[this.suggestIndex - 1].innerText;
					this.suggestIndex --;
				}
			}
		}
	},
	watch : {
	   keywords:function(val){
		   if(this.keywords.trim() == ''){
			this.suggestItems = [];
		   	return
		   }
		   this.$ajax.get(`/suggestion/su?wd=${this.keywords}&cb=window.baidu.sug`)
		   .then((response)=>{
		    let res_str = response.data;
		   	let str = res_str.split("window.baidu.sug(")[1].split(");")[0];
		   	let strObj = eval("("+str+")");
		   	
			if(strObj.s.length == 0){
				return
			}
			
			this.suggestItems = [];
		   	for(let item of strObj.s){
		   		let suggestItem = item.replace(this.keywords.trim(),"<b>"+this.keywords.trim()+"</b>");
				this.suggestItems.push(suggestItem);
				this.suggestIndex = -1;
		   	}
		   });
	   }
	}
}
</script>

<style>

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
	padding: 158px 0 128px 0;
	transition:padding 0.3s ease-out;
}

#search .search-center {
	text-align: center;
}

#search form {
	display: inline-block;
	position: relative;
}

#search .search_text {
	z-index: 99;
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
	z-index: 10;
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
#suggest li:hover,#suggest .suggestHover{
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
