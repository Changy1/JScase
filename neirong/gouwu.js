window.onload = function(){
    var conTainer = document.getElementsByClassName('container')[0];                //最大的盒子事件绑定
    var inPut = document.getElementsByTagName('input');                             //所有的复选框
    var lastAll = inPut[3];                                                         //最后那个全选
    var leSsen = document.getElementsByClassName('span1');                          //减少
    var Add = document.getElementsByClassName('span3');                             //增加
    var Num = document.getElementsByClassName('span2');                             //数量
    var Allnum = document.getElementById('Allnum');                                 //总价   
    var Body = document.getElementsByClassName('body')[0];                          //中间 
    var Hownum = document.getElementById('hownum');                                 //总数量
   
    //事件代理
    conTainer.onclick = function(e){
        //全选
        var e = e || event;
        if(e.target == inPut[0] || e.target == lastAll){
            if(e.target.checked){//这里存在问题，其实你点input的时候他就已经变成true了，他的checked跟这个事件没有关系
                                //然后再判断的时候只需要让所有的input跟他一样
                for(var i=0; i<inPut.length; i++){
                    inPut[i].checked = true;
                    for(var j=0; j<Body.children.length; j++){
                        Body.children[j].style.background = 'rgb(255,244,232)';
                    }
                }
            }else{
                for(var i=0; i<inPut.length; i++){
                    inPut[i].checked = false;
                    for(var j=0; j<Body.children.length; j++){
                        Body.children[j].style.background = '';
                    }
                }
            }
        }
        
        
        //判断复商品的是否都点击了
        var flag= true;
        for(var i=1; i<inPut.length-1; i++){
            if(!inPut[i].checked){
                flag = false ;
            }
        }
        if(flag){
            inPut[0].checked = true;
            lastAll.checked = true;
        }else{
            inPut[0].checked = false;
            lastAll.checked = false;
        }

        //选中以后让他改变背景颜色
        if( e.target != inPut[0] && e.target != lastAll ){
            if(e.target.checked){
                e.target.parentNode.parentNode.style.background = 'rgb(255,244,232)';
            }else{
                e.target.parentNode.parentNode.style.background = '';
            }
        }

        //数量减少增加
        if( e.target.nodeName == 'SPAN' && e.target.parentNode.nodeName == 'LI'){
            if(e.target == e.target.parentNode.children[0]){
                var num = parseInt( e.target.parentNode.children[1].innerText);
                if(num > 0 ){
                    e.target.parentNode.children[1].innerText = num - 1 + '';
                }else{
                    e.target.parentNode.children[1].innerText = 0 + '';
                }
                e.target.parentNode.nextElementSibling.children[1].innerText =  Math.floor((e.target.parentNode.children[1].innerText)*(e.target.parentNode.previousElementSibling.children[1].innerText) *10)/10 +'0';   
            }else{
                var num = parseInt( e.target.parentNode.children[1].innerText);
                e.target.parentNode.children[1].innerText = num + 1 + '';
                e.target.parentNode.nextElementSibling.children[1].innerText =  Math.floor((e.target.parentNode.children[1].innerText)*(e.target.parentNode.previousElementSibling.children[1].innerText) *10)/10 +'0';
            }
        }
        //总价
        var allnum = 0;
        for(var i=0; i<Body.children.length; i++){
            if(Body.children[i].children[0].children[0].checked){
                allnum +=  Math.floor(Body.children[i].children[5].children[1].innerText);
            }
        }
        Allnum.innerText = allnum;


        //总数量
        var hownum = 0;
        for(var i=0; i<Body.children.length; i++){
            if(Body.children[i].children[0].children[0].checked){
                hownum += parseInt(Body.children[i].children[4].children[1].innerText);
            }
        }
        Hownum.innerText = hownum;

        //删除
        if( e.target.nodeName == 'LI' && e.target.parentNode.children[6] == e.target){
            e.target.parentNode.remove();
        }

        //全选删除
        if( e.target.nodeName == 'SPAN' && e.target.id== 'close' && e.target.parentNode.children[0].checked){
            Body.innerHTML = '';
        }
    }
}