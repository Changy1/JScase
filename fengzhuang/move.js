function move(ele,cssprop,targetval,totaltime){

	var speed = (targetval-parseInt(getstyle(ele)[cssprop]))/totaltime*30;
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var currentValue = parseInt(getStyle(ele)[cssprop]);  //每次回来获取一下，因为他在改变  如果只用上面的全局变量 那么每次回来这个值还是全局变量的值
		ele.style[cssprop] = currentValue + speed + 'px'; 
		var updatedCurrentValue = parseInt(ele.style[cssprop]);
		if( Math.abs(updatedCurrentValue - targetval) < 0.5 ){
			ele.style[cssprop] = targetval + "px";
			clearInterval(ele.timer);
		}
	},30);
	
	
	
	function getstyle(list){
		if(list.currentStyle){
			return list.currentStyle;
		}else{
			return window.getComputedStyle(list);
		}
	}
}