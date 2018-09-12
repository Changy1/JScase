//animate( obj, {left: 300, width: 400})
function animate(ele, options, callback){
	if(ele.isMoving) return;
	
	ele.isMoving = true;
	for(var attr in options) {
		(function(prop){
			var targetvalue = options[prop];  //获取到终点值
			ele[prop+"-timer"] = setInterval(function(){
				console.log(prop);
				if(prop == "opacity") {
					var currentValue = parseFloat(getStyle(ele)[prop])*100;
					var speed = (targetvalue - currentValue)/7;
					speed = speed>0?Math.ceil(speed):Math.floor(speed);
					ele.style.opacity = (currentValue + speed)/100;
					ele.style.filter = "alpha(opacity="+(currentValue + speed)+")"
					if(ele.style.opacity == targetvalue/100) {
						clearInterval(ele["opacity-timer"]);
						if(isAllover()) {
							callback ? callback() : "";
						}
					}
				} else {
					var currentValue = parseInt(getStyle(ele)[prop]);
					var speed = (targetvalue - currentValue)/7;
					speed = speed>0?Math.ceil(speed):Math.floor(speed);
					console.log(speed)
					ele.style[prop] =  currentValue + speed + "px";
					
				}
				
				if(parseInt(getStyle(ele)[prop]) == targetvalue) {
					clearInterval(ele[prop+"-timer"]);
					if(isAllover()) {
						callback ? callback() : "";
					}
				}
			}, 30);
			
		})(attr);
	}
	
	function isAllover() {
		var flag = true;
		for(var attr in options) {
			var targetval = options[attr];
			var curtVal = parseInt(getStyle(ele)[attr]);
			if(attr == "opacity") {
				curtVal = getStyle(ele)[attr]*100;
			}
			if(curtVal != targetval) {
				flag = false;
				return flag;
			}
		}
		ele.isMoving = false;
		return flag;
	}
}


function getStyle(ele){
	if(ele.currentStyle) {
		return ele.currentStyle;
	} else {
		return getComputedStyle(ele);
	} 
}