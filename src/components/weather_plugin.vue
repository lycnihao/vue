<template>
	<div id="weather">
		<p style="margin:5px 0 10px;">
			<a>{{cityName}}</a>
			<img class="weather_icon" :src="nowWeather.cond_img" width="32px">
			<a v-show="cityName">{{nowWeather.cond_txt}} <strong style="font-size: 18px;">{{nowWeather.tmp}}</strong> °C </a>
		</p>
		<p class="info">{{info}}</p>
	</div>
</template>

<script>
					
	export
	default {
		data() {
			return{
				nowWeather:{},
				info:'',
				cityName:'',
			}
		},
		created(){
			this.$ajax.get('/api/getWeather/?cityId=')
			.then((response)=>{
				
				this.cityName = response.data.result.basic.parent_city;
				this.nowWeather = response.data.result.now;
				this.info = response.data.result.msg;
				
				var code = Number(this.nowWeather.cond_code);
				switch(code){
					case 201: code = 200; break;
					case 202: code = 200; break;
					case 203: code = 200; break;
					case 204: code = 200; break;
					case 205: code = 200; break;
					case 206: code = 200; break;
					case 207: code = 200; break;
					case 208: code = 200; break;
					case 210: code = 209; break;
					case 211: code = 209; break;
					case 213: code = 209; break;
					case 301: code = 300; break;
					case 303: code = 302; break;
					case 309: code = 305; break;
					case 310: code = 306; break;
					case 312: code = 311; break;
					case 314: code = 305; break;
					case 315: code = 306; break;
					case 316: code = 308; break;
					case 317: code = 311; break;
					case 318: code = 311; break;
					case 399: code = 305; break;
					case 405: code = 405; break;
					case 406: code = 405; break;
					case 407: code = 401; break;
					case 408: code = 400; break;
					case 409: code = 401; break;
					case 410: code = 402; break;
					case 449: code = 400; break;
					case 501: code = 500; break;
					case 504: code = 503; break;
					case 508: code = 507; break;
					case 509: code = 500; break;
					case 510: code = 500; break;
					case 511: code = 500; break;
					case 512: code = 502; break;
					case 513: code = 502; break;
					case 514: code = 500; break;
					case 515: code = 500; break;
				}
				
				this.nowWeather.cond_img = require('../assets/img/weather/'+code+'.svg');
				this.$parent.$parent.$parent.$refs.header.headerWeather.cityName = this.cityName;
				this.$parent.$parent.$parent.$refs.header.headerWeather.nowWeather = this.nowWeather;
			});
		}
	}
</script>

<style>
	#weather {
	text-align: center;
	}
	#weather > p > a{
		font-size: 15px;
		color: #7a7f88;
	}
	#weather .weather_icon{
		margin:0 4px;
	}
	#weather .info{
		font-size: 12px;
		color: #909399;
	}
</style>
