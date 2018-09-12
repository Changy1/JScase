class Weapon {
    constructor() {

        this.ele = document.createElement('div');
        document.body.appendChild(this.ele);
        this.ele.className = 'weapon';

        //武器药的初始位置
        let body_main = document.getElementById('body_main');
        let leftSlide =  body_main.offsetLeft;
        let rightSlide = body_main.offsetLeft +body_main.offsetWidth - this.ele.offsetWidth;
        let left = randomInt(leftSlide,rightSlide)
        
        this.ele.style.top = -this.ele.offsetHeight + 'px';
        this.ele.style.left = left + 'px';

        this.speed = 10;

        this.move();

    }

    //武器药 消失
    boom(){
        clearInterval(this.ele.moveTimer);
        this.ele.remove();
    }
    move() {

        let that = this;
        //武器升级 药 的运动
        this.ele.moveTimer = setInterval(function () {
            if (gameStatus.running == false || gameStatus.stop) {
                return;
            }
            that.ele.style.top = that.ele.offsetTop + that.speed + 'px';
            //超出屏幕 
            if (that.ele.offsetTop < -that.ele.offsetHeight) {
                clearInterval(that.moveTimer)
                document.body.removeChild(that.ele)
                // this
                //engine.
                let index = 0;
                for (let i = 0; i < engine.weapons.length; i++) {
                    if (engine[i] == this) {
                        index = i;
                    }
                }
                engine.weapons.splice(index, 1);
            }

        }, 50)


    }
}