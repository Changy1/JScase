/**
 * Created by jameswatt2008 on 2017/6/19.
 */
//我方飞机

class MyPlane{
    constructor(weaponLevel=0){
        //飞机发射子弹的速度
        this.frequcy = 0;
        //武器等级，默认等级是0
        this.weaponLevel = weaponLevel;

    }
 //我方飞机  显示
    show(){
        let that = this;
        //创建
        this.ele = document.createElement('div');
        this.ele.className = 'my-warplain';
        document.body.appendChild(this.ele);
        console.log('show')

        //控制飞机的初始位置
        let body_main = document.getElementById('body_main');
        this.ele.style.left = body_main.offsetLeft+body_main.offsetWidth/2-this.ele.offsetWidth/2+'px';
        this.ele.style.top = body_main.offsetHeight-this.ele.offsetHeight+'px'

        //监听飞机移动
        this.move();
        //让飞机发射子弹
        this.fire();

    }
    move(){
   

        let that = this;
        //根据鼠标的坐标 控制 飞机的移动
        let body_main = document.getElementById('body_main');

        let rightSlide = body_main.offsetLeft +body_main.offsetWidth-this.ele.offsetWidth;
        let leftSlide = body_main.offsetLeft;


        document.onmousemove = function (evt) {

            //游戏状态
            if(gameStatus.running == false || gameStatus.stop){
                 return;
            }

            //左右边界
            let left = evt.clientX - that.ele.offsetWidth/2;
            let top = evt.clientY - that.ele.offsetHeight/2;

            if(left < leftSlide){
                left = leftSlide
            }

            if(left > rightSlide){
                left =rightSlide;
            }

            that.ele.style.left = left +'px';
            that.ele.style.top = top +'px';

        }

    }
    fire(){
        var that = this;
        //  产生子弹
        setInterval(function () {
                // this.ele.style.left = myPlane.offsetLeft +myPlane.offsetWidth/2-this.ele.offsetWidth/2+'px';
                //  this.ele.style.top = myPlane.offsetTop -this.ele.offsetHeight+'px';

                //计算出子弹的位置
                 //控制子弹的初始位置 根据飞机来定的
                let x =  that.ele.offsetLeft +that.ele.offsetWidth/2;
                let y = that.ele.offsetTop ;
            if(that.weaponLevel ==0){
                //生产一个子弹

                let tmp =  new Bullet(x,y);
                engine.bullets.push(tmp);
            }else if(that.weaponLevel == 1){
                console.log('武器等级2')
                //发射两个子弹，每个子弹有个 水平偏移
                let tmp =  new Bullet(x,y,10);
                let tmp1 =  new Bullet(x,y,-10);
                engine.bullets.push(tmp,tmp1);
            }else if(that.weaponLevel == 2){
                let tmp =  new Bullet(x,y,0);
                let tmp1 =  new Bullet(x,y,10,10);
                let tmp2 =  new Bullet(x,y,-10,-10);
                engine.bullets.push(tmp,tmp1,tmp2);

            }

        },this.frequcy);
    }
    //我方飞机爆咋
    boom(callback){
        console.log(1)
        var that = this;
        let index = 0;
       let timer =  setInterval(function(){
            console.log(index)
            index++;
           
            that.ele.style.background = `url(images/me_die${index}.png)`

            if(index == 3){
                  clearInterval(timer);
                  callback();

            }

        },100)
    }

    //武器升级
    weaponUp(){
        if(this.weaponLevel==2){
            return;
        }
        this.weaponLevel++;
      
    }
}

