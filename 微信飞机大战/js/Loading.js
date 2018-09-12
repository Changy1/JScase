/**
 * Created by jameswatt2008 on 2017/6/20.
 */

class Loading{
    constructor(){
        this.timer = null;
    }
    show(){
        let that = this;
        this.ele = document.createElement('div');
        this.ele.className = 'loading';
        document.body.appendChild(this.ele);

        let imgs = ['images/loading1.png','images/loading2.png','images/loading3.png']
        let index = 1;
        this.timer = setInterval(function () {
            that.ele.style.background ='url('+imgs[index%3]+')'
            index++;
        },500);
    }
    hide(){
        clearInterval(this.timer);
        document.body.removeChild(this.ele);
    }
}

