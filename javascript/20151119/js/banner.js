//焦点轮播图实现的原理：让#bannerImg的left的值改变,就可以显示我们对应的图片了

/*
 * move 珠峰培训第一版简单的动画库(只实现匀速运动的动画)
 * @parameter
 *   curEle:[object] 当前要运动的元素
 *   attr:[string] 当前要操作元素的哪一个样式属性运动
 *   value:[number/string] 要操作的样式属性目标值
 *   duration:[number] 运动的总时间
 *   callBack:[function] 运动结束后执行的操作
 */
var move = function (curEle, attr, value, duration, callBack) {
    window.clearTimeout(curEle.timer);//->清除当前元素正在运行的其它的动画

    //_this:当前要操作的元素 curAtr:当前元素的起始位置 value:当前元素的目标位置
    var _this = curEle, curAtr = utils.css(_this, attr), timer = null;
    var step = ((value - curAtr) / duration) * 13;//->当前的运动步长

    //_move:就是我们运动的动画
    ~function _move() {
        window.clearTimeout(timer);//->清除当前动画上一次产生的那个定时器
        var curAtr = utils.css(_this, attr);
        if (Math.abs(curAtr + step) >= Math.abs(value)) {
            utils.css(_this, attr, value);
            typeof callBack === "function" ? callBack.call(_this) : null;
            return;
        }
        utils.css(_this, attr, curAtr + step);
        timer = window.setTimeout(_move, 13);
    }();
};

var oLis = document.getElementById("bannerTip").getElementsByTagName("li");
var showTip = function (index) {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = index === i ? "select" : null;
    }
};
var tipAction = function () {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].index = i;
        oLis[i].onclick = function () {
            showTip(this.index);
            index = this.index;
            move(bannerImg, "left", this.index * -1000, 1000, function () {
                bannerImg.timer = window.setInterval(autoMove, 3000);
            });
        }
    }
};
tipAction();


//实现我们的轮播图
var bannerImg = document.getElementById("bannerImg");
var index = 0;//->当前展示图片的索引
var autoMove = function () {
    index++;
    move(bannerImg, "left", index * -1000, 1000, function () {
        //当第四张图片切换到最后一张图片完成的时候,我们当前的index变为4(此时展示的最后一张图片和第一张是一样的)
        //我们做判断,在每一次切换完成如果index>=4说明到最后一张了,由于最后一张和第一张一样,我们立马让他的index和left都变为第一张的0->由于两张图片一样所有用户看不出变化来(应用视觉差)
        if (index >= 4) {
            index = 0;
            utils.css(bannerImg, "left", 0);
        }

        //自动切换的时候实现tip样式的对应
        showTip(index);

        //不管是运动到第几张,因为一执行move我们就把之前的setInterval的timer清掉了,所以执行完成后还需要从新的设置一个定时器
        bannerImg.timer = window.setInterval(autoMove, 3000);
    });
};
bannerImg.timer = window.setInterval(autoMove, 3000);





