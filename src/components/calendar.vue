<template>
	 <div class="wrapper">
		<div class="calendar-header">
			<h3>
				<span class="btn-prev" @click="perCalendar()"><a href="javascript:(0);"><i class="el-icon-arrow-left"></i></a></span>
				<span><strong>{{nowYear}}</strong> <small>年</small> &nbsp;<strong>{{nowMonth}}</strong> <small>日</small></span>
				<span class="btn-next" @click="nextCalendar()"><a href="javascript:(0);"><i class="el-icon-arrow-right"></i></a></span>
			</h3>
			<p class="info">{{lunarcalendar}} · {{week}} ·
			<a :href="'http://www.tianqi.com/index.php?c=history&md='+num(nowMonth)+num(nowDay)" target="_blank" style="font-size: 12px;">历史上的今天</a></p>
		</div>
		<div class="week"><ul><li class="week-item" v-for="week in weekArr"><span>{{week}}</span></li></ul></div>
		<div class="day">
			<ul class="week-day" v-for="row in 6">
				<li class="day-item" v-for="item in 7">
					<a href="javascript:(0);" :class="days[(row-1) * 7 + item -1].style"
					:title="days[(row-1) * 7 + item -1].significant ? days[(row-1) * 7 + item -1].text:''"
					@click="updateCalendar(nowYear,days[(row-1) * 7 + item -1].month - 1,days[(row-1) * 7 + item -1].value)">
					<span v-html="days[(row-1) * 7 + item -1].text"></span></a>
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
			sTermInfo : [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758],
			solarTerm : ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
			madd: new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334),
			NumString: "一二三四五六七八九十",
			MonString: "正二三四五六七八九十冬腊",
			CalendarData: new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95),
			holidays:{t0101:"t,春节 ",t0115:"t,元宵节",t0202:"t,龙头节",t0505:"t,端午节",t0707:"t,七夕节",t0715:"t,中元节",t0815:"t,中秋节",t0909:"t,重阳节",t1001:"t,寒衣节",t1015:"t,下元节",t1208:"t,腊八节",t1223:"t,小年",
			"0202":"i,湿地日,1996","0308":"i,妇女节,1975","0315":"i,消费者权益日,1983","0401":"i,愚人节,1564","0422":"i,地球日,1990","0501":"i,劳动节,1889","0512":"i,护士节,1912","0518":"i,博物馆日,1977","0605":"i,环境日,1972","0623":"i,奥林匹克日,1948",1020:"i,骨质疏松日,1998",1117:"i,学生日,1942",1201:"i,艾滋病日,1988",
			"0101":"h,元旦","0312":"h,植树节,1979","0504":"h,五四青年节,1939","0601":"h,儿童节,1950","0701":"h,建党节,1941","0801":"h,建军节,1933","0903":"h,抗战胜利日,1945","0910":"h,教师节,1985",1001:"h,国庆节,1949",1213:"h,国家公祭日,2014",1224:"c,平安夜",1225:"c,圣诞节","0214":"a,情人节",w:{"0520":"i,母亲节,1913","0630":"a,父亲节",1144:"a,感恩节"}},
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
		// 补零  1 --> 01
		num : function(v){
			let num = Number(v);
			if(num < 10){
				num = "0" + num
			}
			return num
		},
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
			let sTermInfo = this.sTermInfo;
			let solarTerm = this.solarTerm;
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
		//获取节假日
		getFestival:function(month, day){
			let t='t';
			let date = this.num(month) + this.num(day);
			for(let holiday in this.holidays){
				if(holiday == date){
					let str = this.holidays[holiday];
					return str.split(',')[1];
				}
			}
			return '';
		},
		//获取农历
		getLunarcalendar:function(year, month, day){

			var GetBit = function(m, n) {
		    return (m >> n) & 1;
			}

			var total, m, n, k;
			total = (year - 1921) * 365 + Math.floor((year - 1921) / 4) + this.madd[month-1] + day - 38;
		    if (year % 4 == 0 && month > 1) {
		        total++;
		    }
			ok:
		    for (m = 0;; m++) {
				k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
				for (n = k; n >= 0; n--) {
					let bit = GetBit(this.CalendarData[m], n)
		            if (total <= 29 + bit){
						break ok ;
					}

		            total = total - 29 - bit;
		        }
		    }


			day = total;
			let month_ = k - n + 1;
			if (k == 12) {
		        if (month == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
		            month = 1 - month;
		        }
		        if (month > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
		            month --;
		        }
		    }
			let tmp = '';
			if (month_ < 1) {
		        //tmp += "(闰)";
		        tmp += this.MonString.charAt(-month_ - 1);
		    } else {
		        tmp += this.MonString.charAt(month_ - 1);
		    }
			tmp += "月";
			tmp += (day < 11) ? "初" : ((day < 20) ? "十" : ((day < 30) ? "廿" : "三十"));
			/* if (day % 10 != 0 || day == 10) {
				tmp += this.NumString.charAt((day - 1) % 10);
			} */
			tmp += this.NumString.charAt((day - 1) % 10);

			return tmp;
		},
		// 获取农历 数字类型
		getNumLunarcalendar:function(str){
			var NumString = this.NumString;
			function convert(s){
				let num =  NumString.indexOf(s) + 1;
				return num == 10 ? 0 : num;
			}
			let strDay = str.split("月")[1];
			let strDay1_ = strDay.substring(0,1);
			let strDay1 = strDay1_ == '初' ? '0' : strDay1_ == '十' ? '1' : strDay1_ == '廿' ? '2' : '3';
			let strDay2 = convert(strDay.substring(1,2));
			if(strDay1_ == "初" && strDay2 == 0){
				return "10";
			}
			return strDay1 + strDay2 ;
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
			this.lunarcalendar = this.getLunarcalendar(year,month + 1,day);
			let whereMonday = this.getWeekday(year, month);
			this.week = "星期" + this.weekArr[whereMonday]

			// 生成日历数据，上个月的 x 天 + 当月的 [28,29,30,31]天 + 下个月的 y 天 = 42
			let currentMonth = this.getMonthCount(year, month);
			let preMonth = this.getPreMonthCount(year, month);
			let nextMonth = this.getNextMonthCount(year, month);
			let preArr = preMonth.slice(-1 * whereMonday);
			let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
			let res = [].concat(preArr, currentMonth, nextArr);
			this.days = [];
			for(let i = 0;i < res.length;i++){

				let res_day = res[i];
				let year_ = year;
				let month_ = month;

				let style = 'day';
        /* console.log(month_) */
				if(i <= 7 && i < whereMonday){
					if(month_ == 0){
						month_ = 11
            year_ = year_ - 1
					}
          month_ = month_ - 1
					style = 'preMonth'
				}
				else if ( i + 1 > whereMonday + currentMonth.length){
					if(month_ > 10){
						month_ = 1
            year_ = year_ + 1
					}
          month_ = month_ + 1
					style = 'nextMonth'
				}
				else if(res_day == day)
					style = 'active'
				
				if(new Date().getMonth() == month && new Date().getDate() == res_day){
					style = 'today'
				}
				
				let solarTerm = this.getSolarTerm(year_, month_, res_day);
				let lunarcalendar = this.getLunarcalendar(year_,month_ + 1,res_day);
				let festival = this.getFestival(month_ + 1,res_day);
				let text = res_day;
				if(solarTerm != ''){
					style += ' significant';
					text = solarTerm
				} else if(festival != ''){
					style += ' significant';
					text = festival
				}
				/* console.log(this.getNumLunarcalendar(lunarcalendar)) */
				let significant = style.indexOf("significant");
				
				this.days.push({month:month_ + 1,value:res_day, text:text, style:style ,significant: significant != -1 })
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
			if (this.nowMonth + 1 > 12) {
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
    margin: 5px 0;
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
	}

	.day-item a{
		width: 40px;
		height: 40px;
		line-height: 40px;
		border-radius: 50%;
		text-align: center;
		overflow: hidden;
		display: inline-block;
		transition: all .4s cubic-bezier(.175,.885,.32,1);
	}

	.day-item a:hover{
		background-color: #f8f8f8;
		box-shadow: 0 1px 2px 0 rgba(0,0,0,.3);
	}

	.day-item .day{
		color: #343951!important;
	}

	.day-item .active{
		color: #fff;
		background-color: #ffb72b!important;
		box-shadow: 0 1px 2px 0 rgba(0,0,0,.3);
	}
	
	.day-item .today{
		background-color: #9875dc!important;
		box-shadow: 0 1px 2px 0 rgba(0,0,0,.3);
	}
	.day-item .today span{
		color: #fff;
	}

	.significant span{
		font-size: 12px!important;
		color: #b1906f;
	}

	.active.significant span{
		color: #fff;
	}


	.info{
		margin-top: 2px;
		margin-bottom: 5px;
		font-size: 12px;
		color: #a2a2a2;
	}

</style>
