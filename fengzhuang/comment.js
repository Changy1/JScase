//生成随机颜色
function randomColor(){
	var R = randomInt(0,255);
	var G = randomInt(0,255);
	var B = randomInt(0,255);
	return "rgb("+R+","+G+","+B+")";
}
//生成两个值之间的随机数
function randomInt(min, max){
	return Math.floor(Math.random()*(max-min)) + min;
}
	
	
//过滤出来元素节点
function filter(node){
	var a=[];
	for(var i=0;i<node.length;i++){
		if(node[i].nodeType == 1){
			a.push(node[i]);
		}
	}
	return a;
}

//获取非行内样式，兼容问题

function getstyle(list){
	if(list.currentStyle){
		return list.currentStyle;
	}else{
		return window.getComputedStyle(list);
	}
}

//转换为数组
function toArray(arr){
	var a = [];
	for(var i = 0; i<arr.length; i++){
		a.push(arr[i]);
	}
	return a;
}

//console.log 的兼容封装
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


//事件监听的封装

function addEventHandler(ele, eventType, fn, isCapture){
	if(ele.addEventListener) {
		ele.addEventListener(eventType, fn, isCapture);
	} else {
		ele.attachEvent("on"+eventType, fn);
	}
}

//这个是 getElementsClassName的封装
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
//这是拖拽  第一个参数是 拖拽元素 第二个是父元素
function dragNode(ele,box){
	ele.onmousedown = function(e){
		var e = e || event;     
		var disx = e.offsetX;
		var disy = e.offsetY;
		document.onmousemove = function(e){
			var e = e || event;
			if(!box){
				var _left = e.clientX-disx;
				var _top = e.clientY-disy;
				ele.style.left = Math.max(0,Math.min((window.innerWidth-ele.offsetWidth),_left)) + 'px';
				ele.style.top = Math.max(0,Math.min((window.innerHeight-ele.offsetHeight),_top)) + 'px';
			}else{
				var _left2 = e.clientX-getpageposition(ele.parentNode).pageX-disx;
				var _top2 = e.clientY-getpageposition(ele.parentNode).pageY-disy;
				ele.style.left = Math.max(0,Math.min((box.offsetWidth-ele.offsetWidth),_left2)) + 'px';
				ele.style.top = Math.max(0,Math.min((box.offsetHeight-ele.offsetHeight),_top2)) + 'px';
			}
		}
	}
	document.onmouseup = function (){
		document.onmousemove = null;
	} 
	function getpageposition(forgat){
		var sumleft = forgat.offsetLeft;
		var sumtop = forgat.offsetTop;
		while(forgat.offsetParent){ 
			sumleft += forgat.offsetParent.offsetLeft;
			sumtop += forgat.offsetParent.offsetTop;
			forgat = forgat.offsetParent;
		}
		return {
			pageX : sumleft,
			pageY : sumtop
		}
	}
}



//获取cookie的内容
function getCookie(key){
	var cookiestr = document.cookie;
	var list = cookiestr.split('; '); 
	for(var i =0; i<list.length;i++){
		var keystr=list[i].split('=');
		if (keystr[0]==key) return keystr[1];
	}
	return null;
	/*var res = list.filter(function(item){
		var kv = item.split('=');
		return kv[0] == key;
	})
	return res[0].split('=')[1];*/
}

//给参数然后建立cookie 其中expires 单位是秒
function setCookie(key,value,expires,path ){
	switch(arguments.length){
		case 0 :
		case 1 : throw new Error('笨蛋，参数传错了，请重新再来一次！')
		case 2 : {
			document.cookie = key + '=' + value;
			break;
		}
		case 3 : {
			var parem = arguments[2];
			if( typeof parem == 'number'){
				var d = new Date();
				d.setSeconds(d.getSeconds()+parem);
				document.cookie = key+'='+value+ '; expires=' + d;
			}else if (typeof parem == 'string'){
				document.cookie = key+'='+value+ '; path=' + parem;
			}
			break;
		}
		case 4 : {
			var d = new Date();
			d.setSeconds(d.getSeconds()+expires);
			document.cookie = key+'='+value+ '; expires=' + expires + '; path=' + path;
		}
	}
}