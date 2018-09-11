window.onload = function(){
    var Btn = document.getElementById('bTn2');          //页面按钮
    var Div = document.getElementById('click');         //弹出窗口
    var divDown = document.getElementById('down');      //鼠标拖拽点击部分
    var divSmall = document.getElementById('sMall');    //缩小按钮
    var divBig = document.getElementById('bIg');        //放大按钮
    var divClose = document.getElementById('cLose');    //关闭按钮

    //给页面按钮添加点击事件

    Btn.onclick = function(){
        Div.style.display = 'block';
        Btn.style.display = 'none';
    }

    //给弹出窗口添加拖拽事件

    divDown.onmousedown = function(e){
        if(e.target != divSmall && e.target != divBig && e.target != divClose){
            var e = e || event;
            var div_x = e.offsetX;
            var div_y = e.offsetY;
            document.onmousemove = function(e){
                var e = e || event;
                Div.style.margin = 0;
                _left = e.clientX - div_x;
                _top = e.clientY - div_y;
                Div.style.left = Math.max(0,Math.min(window.innerWidth-Div.offsetWidth,_left)) + 'px';
                Div.style.top = Math.max(0,Math.min(window.innerHeight-Div.offsetHeight,_top)) + 'px';
            }
        }
    }
    document.onmouseup = function(){
        document.onmousemove = '';
    }

    //最大化按钮
    divBig.onclick = function(){
        if( Div.offsetWidth < 1000 ){
            Div.style.left = 0;
            Div.style.top = 0;
            Div.style.width = window.innerWidth - 6 + 'px';
            Div.style.height = window.innerHeight - 4  + 'px';
            divBig.style.background = 'url(imgs/tool.png) no-repeat -149px 0px';
        }else{
            Div.style.margin = 'auto';
            Div.style.top = 0;
            Div.style.bottom = 0;
            Div.style.left = 0;
            Div.style.right = 0;
            Div.style.width = 350 + 'px';
            Div.style.height = 400  + 'px';
            divBig.style.background = 'url(imgs/tool.png) no-repeat -60px 0px';
        }
    }
   
    //关闭按钮

    divClose.onclick = function(){
        Div.style.display = 'none';
        Btn.style.display = 'block';
    }

    //最小化按钮

    divSmall.onclick = function(){
        Div.style.display = 'none';
        Btn.style.display = 'block';
    }
}