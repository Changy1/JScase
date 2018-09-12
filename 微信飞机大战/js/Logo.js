/**
 * Created by jameswatt2008 on 2017/6/19.
 */

//logo  类
class Logo{
    constructor(){
        this.ele = document.createElement('div');

    }
    show(){
        this.ele.className = 'logo'
        document.body.appendChild(this.ele);
    }
    hide(){
        document.body.removeChild(this.ele);

    }
}
