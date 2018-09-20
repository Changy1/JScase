function randomColor(){
	var R = randomInt(0,255);
	var G = randomInt(0,255);
	var B = randomInt(0,255);
	return "rgb("+R+","+G+","+B+")";
}

function randomInt(min, max){
	return Math.floor(Math.random()*(max-min)) + min;
}

function textNodefilter(nodelist){
	var temp = [];
	for(var i=0; i<nodelist.length; i++){
		if(nodelist[i].nodeType == 1){
			temp.push(nodelist[i]);
		}
	}
	return temp;
}

function getStyle(ele){
	if(ele.currentStyle) {
		return ele.currentStyle;
	} else {
		return getComputedStyle(ele);
	} 
}

function toArray(arr){
	var a = [];
	for(var i = 0; i<arr.length; i++){
		a.push(arr[i]);
	}
	return a;
}

function log(){
	if(console && console.log){
		console.log(arguments);
	} else {
		alert(arguments);
	}
}

//计算一个dom元素的PageX/Y
function getPagePosition(target){
	var sumLeft = target.offsetLeft;
	var sumTop = target.offsetTop;
	while(target.offsetParent != null){
		sumLeft += target.offsetParent.offsetLeft;
		sumTop += target.offsetParent.offsetTop;
		
		target = target.offsetParent;
	}
	return {
		pageX : sumLeft,
		pageY : sumTop
	};
}

//封装事件监听的添加
function addEventHandler(ele, eventType, fn, isCapture){
	if(ele.addEventListener) {
		ele.addEventListener(eventType, fn, isCapture);
	} else {
		ele.attachEvent("on"+eventType, fn);
	}
}

//限定一个数字的大小范围
function section(val, min, max) {
	return Math.max(min, Math.min(max, val));
}

function hide(ele) {
	ele.style.display = "none";
}
function show(ele) {
	ele.style.display = "block";
}

(function(){
	if(!document.getElementsByClassName){
		document.getElementsByClassName = function(classname){
			var allEle = document.getElementsByTagName("*");
			var temp = [];
			for(var i=0; i<allEle.length; i++){
				if( allEle[i].className.indexOf(classname) != -1){
					temp.push( allEle[i] );
				}
			}
			return temp;
		}
	}
})();

