<template>
	 <div class="wrapper">
		<div class="calendar-header">
			<h3>
				<span class="btn-prev" @click="perCalendar()"><a href="javascript:(0);"><i class="el-icon-arrow-left"></i></a></span>
				<span>{{nowYear}} 年 &nbsp;{{nowMonth}} 月</span>
				<span class="btn-next" @click="nextCalendar()"><a href="javascript:(0);"><i class="el-icon-arrow-right"></i></a></span>
			</h3>
			<p class="info">{{lunarcalendar}} · {{week}} · 
			<a href="http://www.tianqi.com/index.php?c=history&md=0926" target="_blank" style="font-size: 12px;">历史上的今天</a></p>
		</div>
		<div class="week"><ul><li class="week-item" v-for="week in weekArr"><span>{{week}}</span></li></ul></div>
		<div class="day">
			<ul class="week-day" v-for="row in 6">
				<li class="day-item" v-for="item in 7">
					<a href="javascript:(0);" :class="days[(row-1) * 7 + item -1].style" 
					@click="updateCalendar(nowYear,nowMonth - 1,days[(row-1) * 7 + item -1].value)" v-html="days[(row-1) * 7 + item -1].value"></a>
				</li>
			</ul>
		</div>
	  </div>
</template>

<script>
export
default {
	data() {
		return{
			weekArr:['一','二','三','四','五','六','日'],
			madd: new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334),
			NumString: "一二三四五六七八九十",
			MonString: "正二三四五六七八九十冬腊",
			CalendarData: new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95),
			dates:'',
			nowYear:'',
			nowMonth:'',
			nowDay:'',
			week:'',
			days:[],
			lunarcalendar:'',
		}
	},
	methods: {
		// 判断某年是否是闰年,平年闰年[四年一闰，百年不闰，四百年再闰]
		isLeapYear : function(year) {
			return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
		},
		// 获得每个月的日期有多少，注意 month - [0-11]
		getMonthCount : function(year, month) {
			let arr = [
			  31, null, 31, 30, 
			  31, 30, 31, 31,
			  30, 31, 30, 31
			];
			let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
			return Array.from(new Array(count), (item, value) => value + 1);
		},
		  // 获得某年某月的某日 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
		getWeekday :function(year, month, day=1) {
			let date = new Date(year, month, day);
			if (date.getDay() == 0){
				return 6;
			}
			return date.getDay() - 1;
		},
		//获取24节气
		getSolarTerm:function(year, month, day){
			let sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
			let solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
			var tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[month * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
			var tmp2 = tmp1.getUTCDate();
			var solarTerms = "";
			if (tmp2 == day)
				solarTerms = solarTerm[month * 2 + 1];
			tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[month * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
			tmp2 = tmp1.getUTCDate();
			if (tmp2 == day)
				solarTerms = solarTerm[month * 2];
			return solarTerms;
		},
		//获取农历
		getLunarcalendar:function(day){
			
			var GetBit = function(m, n) {
            return (m >> n) & 1;
			}

			var total, m, n, k;
			total = (this.nowYear - 1921) * 365 + Math.floor((this.nowYear - 1921) / 4) + this.madd[this.nowMonth-1] + day - 38;
			console.log(total)
            if (this.nowYear % 4 == 0 && this.nowMonth > 1) {
                total++;
            }
			let isEnd = false;
            for (m = 0;; m++) {
                k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
                for (n = k; n >= 0; n--) {
                    if (total <= 29 + GetBit(this.CalendarData[m], n)) {
						isEnd = true;
                        break;
                    }
                    total = total - 29 - GetBit(this.CalendarData[m], n);
                }
				if (isEnd)
                    break;
            }
			day = total;
			let month = k - n + 1;
			if (k == 12) {
                if (this.nowMonth == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                    this.nowMonth = 1 - this.nowMonth;
                }
                if (this.nowMonth > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                    this.nowMonth--;
                }
            }
			let tmp = '';
			if (month < 1) {
                //tmp += "(闰)";  
                tmp += this.MonString.charAt(-month - 1);
            } else {
                tmp += this.MonString.charAt(month - 1);
            }
			tmp += "月";
			tmp += (day < 11) ? "初" : ((day < 20) ? "十" : ((day < 30) ? "廿" : "三十"));
			if (day % 10 != 0 || day == 10) {
				tmp += this.NumString.charAt((day - 1) % 10);
			}
			return tmp;
		},
		
		// 获得上个月的天数
		getPreMonthCount : function(year, month) {
			if (month === 0) {
			  return this.getMonthCount(year - 1, 11);
			} else {
			  return this.getMonthCount(year, month - 1);
			}
		},
		// 获得下个月的天数
		getNextMonthCount : function(year, month) {
			if (month === 11) {
			  return this.getMonthCount(year + 1, 0);
			} else {
			  return this.getMonthCount(year, month + 1);
			}
		},
		// 当前月数显示
		updateCalendar : function(year, month, day) {
			if (typeof year === 'undefined' && typeof month === 'undefined' && typeof day === 'undefined') {
			  let nowDate = new Date();
			  year = nowDate.getFullYear();
			  month = nowDate.getMonth();
			  day = nowDate.getDate();
			}
			// 更新一下顶部的年月显示
			this.nowYear = year;
			this.nowMonth = month + 1;
			this.nowDay = day;
			this.lunarcalendar = this.getLunarcalendar(day);
			let whereMonday = this.getWeekday(year, month);
			this.week = "星期" + this.weekArr[whereMonday]
			
			// 生成日历数据，上个月的 x 天 + 当月的 [28,29,30,31]天 + 下个月的 y 天 = 42
			let currentMonth = this.getMonthCount(year, month);
			let preMonth = this.getPreMonthCount(year, month);
			let nextMonth = this.getNextMonthCount(year, month);
			let preArr = preMonth.slice(-1 * whereMonday);
			let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
			let res = [].concat(preArr, currentMonth, nextArr);
			/* 拼接的方式
			let str = '';
			for (let i = 0; i < 6; i++) {
				str += '<ul class="week-day">';
				for (let j = 0; j < 7; j++) {
					
					let res_day = res.shift();
					let cl = 'day';
					
					if ((i == 0 && j < whereMonday ) || (i * 7) + j - whereMonday +1 > currentMonth.length)
						cl = '' 
					else if(new Date().getMonth() == month && res_day == day)
						cl = 'active'
						
					let solarTerm = this.getSolarTerm(year, month, res_day);
					
					if(solarTerm != ''){
						res_day = '<span class="solarTerm">'+solarTerm+'</span>'
					}
					
					str += `<li class='day-item'><a href="javascript:(0);" class="${cl}">${res_day}</a></li>`;
				  
				  if (j === 6) {
					str += '</ul>';
				  }
				}
			}
			this.dates = str; 
			*/
		   this.days = [];
			for(let i = 0;i < res.length;i++){
				
				let res_day = res[i];
				
				let style = 'day';
				if ((i <= 7 && i < whereMonday) || i + 1 > whereMonday + currentMonth.length)
					style = '' 
				else if(i > whereMonday && new Date().getMonth() == month && res_day == day)
					style = 'active'
					
				let solarTerm = this.getSolarTerm(year, month, res_day);
				
				if(solarTerm != ''){
					res_day = `<span class="${style != '' ? 'solarTerm' : '' }">${solarTerm}</span>`
				}
				
				this.days.push({value:res_day, style:style})
			}
		},
		
		//上个月
		perCalendar : function(){
			if (this.nowMonth - 1  <= 0) {
			  this.updateCalendar(this.nowYear - 1, 11, this.nowDay);
			} else {
			  this.updateCalendar(this.nowYear, this.nowMonth - 2, this.nowDay);
			}
		},
		//下个月
		nextCalendar : function(){
			if (this.nowMonth >= 12) {
			  this.updateCalendar(this.nowYear + 1, 0, this.nowDay);
			} else {
			  this.updateCalendar(this.nowYear, this.nowMonth, this.nowDay);
			}
		}
	
	},
	created(){
		this.updateCalendar();
	}
}
</script>

<style>
	
	.calendar-header{
		text-align: center;
		margin-top: 3px;
		margin-bottom: 10px;
	}
	
	.calendar-header .btn-prev i{
		font-size: 20px;
		margin-right: 5px;
	}
	
	.calendar-header .btn-next i{
		font-size: 20px;
		margin-left: 5px;
	}
	
	
	.week-item {
		width: 14%;
		display: inline-block;
		text-align: center;
	}
	
	.week ul,.week-day{
		width: 100%;
	}
	.week ul{
		border-bottom: 1px silver solid;
	}
	.week ul span{
		line-height: 32px;
		font-size: 13px;
	}
	

	.day-item {
		width: 14%;
		height: 40px;
		line-height: 40px;
		display: inline-block;
		text-align: center;
	}
	
	.day-item a{
		width: 30px;
		height: 30px;
		line-height: 30px;
		border-radius: 50%;
		display: inline-block;
		transition: all .4s cubic-bezier(.175,.885,.32,1);
	}
	
	.day-item a:hover{
		color: #fff;
		background-color: #f98a0024;
	}
	
	.day-item .day{
		color: #343951!important;
	}
	
	.day-item .active{
		color: #fff;
		background-color: #f98a00!important;
	}
	
	.solarTerm{
		font-size: 12px;
		color: #f20c00;
	}
	
	.info{
		font-size: 12px;
		color: #a2a2a2;
	}
	
</style>
