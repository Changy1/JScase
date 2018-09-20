//判断一个年份是否是闰年
function isLeapYear(y){
	return y%4==0 && y%100!=0 || y%400==0;
}

//将一个日期格式化输出 "2018s07s08"
function dateString(n,s){
	var s = s || "-";
	var m = n.getMonth();
	var d = n.getDate();
			
	return n.getFullYear()+s+( m<10?'0'+m:m+'')+s+(d<10?'0'+d:d+'');
}