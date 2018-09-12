/**
 * Created by jameswatt2008 on 2017/6/19.
 */
//主要 记录游戏状态
let gameStatus = {
    running: false,
    stop: false
}

//创建游戏引擎 对象
class Engine {
    constructor() {
        //属性 和 方法
        //空数组 放 所有的敌机i
        this.enemies = [];
        //空数组 放所有 的 敌机
        this.bullets = [];
        //空数组 放所有的 武器
        this.weapons = [];
        this.init();
    }

    //选择游戏难度
    gameOption(callback) {
        let that = this;

        console.log('游戏难度选择处理')
        let optionUl = this.ele.getElementsByClassName('options')[0];
        let opLis = optionUl.getElementsByTagName('li');
        for (let i = 0; i < opLis.length; i++) {
            opLis[i].onclick = function () {
                console.log(this.value)
                switch (this.value) {
                    case 1:
                        //游戏难度 1       600
                        //设置飞机 发射子弹的速度
                        console.log(that.myPlane)
                        that.myPlane.frequcy = 450;

                        break;
                    case 2:
                        //400
                        that.myPlane.frequcy = 350;

                        break;
                    case 3:
                        //200
                        that.myPlane.frequcy = 250;

                        break;
                    case 4:
                        //50
                        that.myPlane.frequcy = 200;
                        break;
                }
                optionUl.style.display = 'none'
                //难度选择了
                //
                callback();

            }
        }

    }
    //logo 显示隐藏
    //初始化操作
    init() {
        let that = this;

        //游戏的场景
        this.ele = document.getElementsByClassName('main')[0];
        //创建我飞机
        this.myPlane = new MyPlane();
        console.log(this.myPlane)

        // logo显示
        that.logo = new Logo();
        that.logo.show();

        //初始化计分板
        this.scoreboard = new Scoreboard();

        this.gameOption(function () {
            console.log('游戏难度已经选择了')
            //loading 显示
            that.loading = new Loading();
            that.loading.show();

            //4秒以后 进度条消失 ，logo 也消失
            setTimeout(function () {
                that.loading.hide();
                that.logo.hide();
                //游戏就要开始了
                that.start();
            }, 4000)

        });


    }
    //游戏开始
    start() {

        this.myPlane.weaponLevel = 0;
        gameStatus.running = true;

        let that = this;
        console.log('游戏开始以后的逻辑')
        //游戏背景运动
        this.backgroundRun();
        //计分板显示
        this.scoreboard.show();

        //我方飞机显示 ,发射子弹
        this.myPlane.show();
        //敌人显示
        //随机出现 在屏幕上方 ，往下运动，
        this.createEnemy();
        this.createWeapon();
        //碰撞检测
        this.check();
        //数组 记录所有的飞机
        this.gamePause();

    }

    //游戏暂停相关
    gamePause() {
        document.onkeydown = function (evt) {
            let e = evt || window.event;
            if (e.keyCode == 13 || e.which == 13) {
                gameStatus.running = !gameStatus.running;
            }
        }
    }

    //游戏背景运动
    backgroundRun() {


        let that = this;
        let bgY = 0;
        setInterval(function () {
            if (gameStatus.running == false || gameStatus.stop) {
                return;
            }

            that.ele.style.backgroundPosition = '0px ' + bgY + 'px';
            bgY += 2;
        }, 30);
    }

    //一直检查是否发生碰撞
    check() {

        let that = this;
        //敌机和我方飞机
        //敌机   classname
        setInterval(function () {
            if (gameStatus.running == false || gameStatus.stop) {
                return;
            }
            //子弹和敌机
            //filter为“过滤”、“筛选”之意。指数组filter后，返回过滤后的新数组
            // filter的callback函数需要返回布尔值true或false. 如果为true则表示，恭喜你，通过啦！如果为false, 只能高歌“我只能无情地将你抛弃……
            that.enemies = that.enemies.filter(function (enemy) {
                let flag = false;//记录是否删除飞机
                that.bullets = that.bullets.filter(function (bullet) {
                    // 如果发生碰撞 就删除字段，并且在数组中删除元素
                    if (that.getCollision(enemy.ele, bullet.ele)) {
                        enemy.hurt();
                        if (enemy.hp == 0) {
                            flag = true;
                        }
                        //删除子弹
                        // bullet.ele.remove();
                        bullet.boom();


                        return false;
                    } else {
                        return true;
                    }
                });
                if (flag) {
                    // enemy.ele.remove();
                    //更新计分板
                    that.scoreboard.updateScore(enemy);
                    return false;
                } else {
                    return true;
                }
            });

            //敌机和我方飞机
            for (let index in that.enemies) {
                let enemy = that.enemies[index];
                if (that.getCollision(enemy.ele, that.myPlane.ele)) {

                    gameStatus.stop = true;
                    that.myPlane.boom(() => {
                        alert('恭喜你获得了' + that.scoreboard.score + '分,点击确定重新开始');
                        location.reload();
                    });

                    break;
                    //游戏结束
                }

            }
            //武器药和我方飞机
            for (let index in that.weapons) {
                let weapon = that.weapons[index];
                if (that.getCollision(weapon.ele, that.myPlane.ele)) {

                    that.myPlane.weaponUp();
                    weapon.boom();
                
                    that.weapons.splice(index,1);

                    break;
                    //游戏结束
                }

            }


        }, 50)
    }

    // 生产武器药 
    createWeapon(){
        var that = this;
        setInterval(function () {
            let random = Math.random()
            if (random > 0.5) {
                let tmp = new Weapon();
                that.weapons.push(tmp);
            }
        }, 4000)
    }
    //产生敌机
    createEnemy() {
        let that = this;
        setInterval(function () {
            if (gameStatus.running == false) {
                return;
            }

            let random = Math.random()
            if (random > 0.5) {
                let tmp = new SmallEnemy();
                tmp.move();
                that.enemies.push(tmp)
            }

        }, 800)

        setInterval(function () {
            let random = Math.random()
            if (random > 0.5) {
                let tmp = new MiddleEnemy();
                tmp.move();
                that.enemies.push(tmp)

            }

        }, 2000);
        setInterval(function () {
            let random = Math.random()
            if (random > 0.5) {
                let tmp = new LargeEnemy();
                tmp.move();
                that.enemies.push(tmp)

            }
        }, 6000)

    }
    //碰撞检测方法
    getCollision(obj1, obj2, callback) {
        //参数为碰撞物体与被碰撞物体
        let l1 = obj1.offsetLeft; //左
        let r1 = obj1.offsetLeft + obj1.offsetWidth; //右
        let t1 = obj1.offsetTop; //上
        let b1 = obj1.offsetTop + obj1.offsetHeight; //下

        let l2 = obj2.offsetLeft; //左
        let r2 = obj2.offsetLeft + obj2.offsetWidth; //右
        let t2 = obj2.offsetTop; //上
        let b2 = obj2.offsetTop + obj2.offsetHeight; //下
        if (callback) {
            callback(l1, r1, t1, b1, l2, r2, t2, b2);
        }
        if (r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2) {
            return false;//没有碰撞
        } else {
            return true;
        }
    }




}
