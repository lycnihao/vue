<template>
	 <div class="wrapper">
		<div class="calendar-header">
			<h3>
				<span class="btn-prev" @click="perCalendar()"><a href="javascript:(0);"><i class="el-icon-arrow-left"></i></a></span>
				<span>{{nowYear}}年 {{nowMonth}}月 {{nowDay}}日</span>
				<span class="btn-next" @click="nextCalendar()"><a href="javascript:(0);"><i class="el-icon-arrow-right"></i></a></span>
			</h3>
		</div>
		<div class="week"><ul><li class="week-item" v-for="week in weekArr"><span>{{week}}</span></li></ul></div>
		<div class="day" v-html="dates"></div>
	  </div>
</template>

<script>
export
default {
	data() {
		return{
			weekArr:['一','二','三','四','五','六','日'],
			dates:'',
			nowYear:'',
			nowMonth:'',
			nowDay:'',
		}
	},
	methods: {
		// 判断某年是否是闰年,平年闰年[四年一闰，百年不闰，四百年再闰]
		isLeapYear : function(year) {
			return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
		},
		// 2.获得每个月的日期有多少，注意 month - [0-11]
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
			// 生成日历数据，上个月的 x 天 + 当月的 [28,29,30,31]天 + 下个月的 y 天 = 42
			let currentMonth = this.getMonthCount(year, month);
			let preMonth = this.getPreMonthCount(year, month);
			let nextMonth = this.getNextMonthCount(year, month);
			let whereMonday = this.getWeekday(year, month);
			let preArr = preMonth.slice(-1 * whereMonday);
			let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
			let res = [].concat(preArr, currentMonth, nextArr);
			let str = '';
			for (let i = 0; i < 6; i++) {
				str += '<ul class="week-day">';
				for (let j = 0; j < 7; j++) {
					let res_day = res.shift();
					let cl = 'day';
					if ((i == 0 && j < whereMonday ) || (i * 7) + j - whereMonday > currentMonth.length){
						cl = ''
					} else if(res_day == day){
						cl = 'active'
					}
					str += `<li class='day-item'><a href="javascript:(0);" class="${cl}">${res_day}</a></li>`;
				  
				  if (j === 6) {
					str += '</ul>';
				  }
				}
			}
			this.dates = str;
			
		},
	
		//上个月
		perCalendar : function(){
			if (this.nowMonth -1 === 0) {
			  this.updateCalendar(this.nowYear - 1, 11, this.nowDay);
			} else {
			  this.updateCalendar(this.nowYear, this.nowMonth - 1, this.nowDay);
			}
		},
		nextCalendar : function(){
			if (this.nowMonth === 11) {
			  this.updateCalendar(this.nowYear + 1, 0, this.nowDay);
			} else {
			  this.updateCalendar(this.nowYear, this.nowMonth + 1, this.nowDay);
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
		margin-bottom: 5px;
	}
	
	.calendar-header .btn-prev i{
		font-size: 18px;
		margin-right: 5px;
	}
	
	.calendar-header .btn-next i{
		font-size: 18px;
		margin-left: 5px;
	}
	
	
	.week-item {
		width: 13%;
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
		width: 40px;
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
	}
	
	.day-item a:hover{
		color: #fff;
		background-color: #95ab9d;
	}
	
	.day-item .day{
		color: #343951;
	}
	
	.day-item .active{
		color: #fff;
		background-color: #31b16a;
	}
	
	
</style>
