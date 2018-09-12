class Scoreboard{
    //计分板
    constructor(){
        this.score = 0;
        this.ele = document.createElement('span');
        this.ele.style.display = 'none';
        this.ele.innerHTML = '分数:'+this.score;
        document.querySelector('.main').appendChild(this.ele);

    }
    show(){
        this.ele.style.display = 'block';
    }
    hide(){
        this.ele.style.display = 'none';
    }
        //更新计分板 //小飞机 100分 中型飞机1200 大型飞机3500 
    updateScore(enemy) {
        if (enemy instanceof SmallEnemy) {
            console.log('SmallEnemy');
            this.score +=100;
        }
        if (enemy instanceof MiddleEnemy) {
            console.log('MiddleEnemy')
             this.score +=1200;
        }
        if (enemy instanceof LargeEnemy) {
            console.log('LargeEnemy')
            this.score +=3500;
        }
        this.ele.innerHTML = '分数:'+this.score;

    }
}