/**
 * Created by jameswatt2008 on 2017/6/19.
 */


//子弹类
class Bullet {
    constructor(x,y,shiftX=0,shiftY=0){
        this.ele = document.createElement('div');
        this.ele.className = 'bullet';
         document.body.appendChild(this.ele)

 //控制子弹的初始位置 根据飞机来定的
      
        //  let myPlane = document.getElementsByClassName('my-warplain')[0];
        // this.ele.style.left = myPlane.offsetLeft +myPlane.offsetWidth/2-this.ele.offsetWidth/2+'px';
        // this.ele.style.top = myPlane.offsetTop -this.ele.offsetHeight+'px';

        //子弹的初始位置
        this.x=x;
        this.y=y;
        //子弹方向的偏移
        this.shiftX = shiftX;
        this.shiftY = shiftY;

        //此处需要减去子弹的宽度的半 和高度 ，否则子弹的初始位置会盖住飞机
        this.ele.style.left = this.x+this.shiftX-this.ele.offsetWidth/2+'px';
        this.ele.style.top = this.y-this.ele.offsetHeight+'px';

        this.speed = 10;

        this.moveTimer = null;
        this.move();
    }
    move () {
        let that = this;
 

        //子弹的运动

        this.ele.moveTimer =  setInterval(function () {
            if(gameStatus.running == false ||gameStatus.stop){
                return;
            }

            that.ele.style.top = that.ele.offsetTop -that.speed +'px';
            if(that.shiftY<0){
                 that.ele.style.left =that.ele.offsetLeft -that.speed/3 +'px';
            }
            if(that.shiftY>0){
                 that.ele.style.left =that.ele.offsetLeft +that.speed/3 +'px';
            }

            //超出屏幕产出子弹
            if(that.ele.offsetTop < -that.ele.offsetHeight){

                clearInterval(that.moveTimer)
                document.body.removeChild(that.ele)
              
               // this
                //engine.bullets.
                let index = 0;
                for(let i=0;i<engine.bullets.length;i++){
                    if(engine[i] == this){
                        index = i;
                    }
                }
                engine.bullets.splice(index,1);

            }

        },50)



    }
    //爆炸 函数
    boom () {
        let that = this;
         this.ele.className = 'bullet_die';
        clearInterval(this.ele.moveTimer);
        setTimeout(function () {

            that.ele.remove();
        
        },200)

    }
    

}