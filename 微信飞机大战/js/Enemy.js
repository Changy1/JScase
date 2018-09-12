/**
 * Created by jameswatt2008 on 2017/6/19.
 */

//敌机

//三种敌机



//敌机的父类
class Enemy{
    constructor(){
        this.ele = document.createElement('div');
        document.body.appendChild(this.ele);
        this.hp = 5;
        this.speed = 2;
        this.imgsArray = [];

    }

    //受伤
    hurt() {
        this.hp--;
        if(this.hp == 0){
            this.destory();
        }
    }
    destory(){

            clearInterval(this.ele.timer);
            let that = this;
            // plain1_die1
            let index = 0;
            let timer = setInterval(function () {
               let imgName =  that.imgsArray[index];
               that.ele.style.background = 'url('+'images/'+imgName+')'
                index++;
                if(index == that.imgsArray.length){
                    clearInterval(timer)
                    that.ele.remove();
                }
            },50);
    }

    move() {
        let that = this;

        this.ele.timer = setInterval(function () {
            if(gameStatus.running == false ||gameStatus.stop){
                return;
            }

            that.ele.style.top = that.ele.offsetTop + that.speed+'px';

           let body_main = document.getElementById('body_main');

           if(that.ele.offsetTop > body_main.offsetHeight + that.ele.offsetHeight){
                clearInterval(that.ele.timer);
                document.body.removeChild(that.ele);
               console.log('清除定时器')

               let index = 0;
               for(let i=0;i<engine.enemies.length;i++){
                   if(engine[i] == this){
                       index = i;
                   }
               }
               engine.enemies.splice(index,1);

            }

        },50)
    }
    //初始化操作
    init () {

        //飞机的位置控制

        let body_main = document.getElementById('body_main');
        let leftSlide =  body_main.offsetLeft;
        let rightSlide = body_main.offsetLeft +body_main.offsetWidth - this.ele.offsetWidth;
        let left = randomInt(leftSlide,rightSlide)
        this.ele.style.left = left +'px';
        this.ele.style.top = -this.ele.offsetHeight +'px';


    }



}
//三个子类
class SmallEnemy extends Enemy{
    constructor(){
        super();
        this.ele.className = 'enemy enemy-small';
        this.speed = 7;
        this.hp = 1;
        this.imgsArray = ['plain1_die1.png','plain1_die2.png','plain1_die3.png']
        this.init();
    }
    
}
class MiddleEnemy extends Enemy {
    constructor(){
        super();
        this.ele.className = 'enemy enemy-middle';
        this.speed = 5;
        this.hp = 3;
        this.imgsArray = ['plain2_die1.png','plain2_die2.png','plain2_die3.png','plain2_die4.png']


        this.init();
    }

}
class LargeEnemy extends Enemy{
    constructor(){
        super();
        this.ele.className = 'enemy enemy-large';
        this.speed = 3;
        this.hp = 6;
        this.imgsArray = ['plain3_die1.png','plain3_die2.png','plain3_die3.png','plain3_die4.png','plain3_die5.png','plain3_die6.png']
        this.init();
    }

}
