var dataAry = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg"];

/*封装我们常用的DOM库*/
var listToArray = function (likeAry) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeAry, 0);
    } catch (e) {
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
};
var getElementsByClass = function (strClass, context) {
    context = context || document;
    if ("getElementsByClassName" in document) {
        return listToArray(context.getElementsByClassName(strClass));
    }
    var classAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/), tagList = context.getElementsByTagName("*"), ary = [];
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i];
        curTag.flag = true;
        for (var j = 0; j < classAry.length; j++) {
            var reg = new RegExp("(^| +)" + classAry[j] + "( +|$)");
            if (!reg.test(curTag.className)) {
                curTag.flag = false;
                break;
            }
        }
        curTag.flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};

var getCss = function (curEle, attr) {
    var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/, val = null;
    if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            var temp = curEle.currentStyle["filter"], tempReg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = tempReg.test(temp) ? tempReg.exec(temp)[1] : "1";
            val = parseFloat(val) / 100;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    return reg.test(val) ? parseFloat(val) : val;
};
var setCss = function (curEle, attr, value) {
    var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
    if (attr === "opacity") {
        if (value >= 0 && value <= 1) {
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        }
    } else if (attr === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
    } else if (reg.test(attr)) {
        curEle["style"][attr] = isNaN(value) ? value : value + "px";
    } else {
        curEle["style"][attr] = value;
    }
};
var setGroupCss = function (curEle, options) {
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            setCss(curEle, key, options[key]);
        }
    }
};

/*封装我们常用的动画库*/
var zhufengEffect = {
    zfLinear: function zfLinear(t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function QuadEaseIn(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function QuadEaseOut(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function QuadEaseInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function ExpoEaseIn(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function ExpoEaseOut(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    zfBounce: {
        easeIn: function (t, b, c, d) {
            return c - zhufengEffect.zfBounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function (t, b, c, d) {
            if (t < d / 2) return zhufengEffect.zfBounce.easeIn(t * 2, 0, c, d) * .5 + b;
            else return zhufengEffect.zfBounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
};

var animate = function (curEle, oTarget, duration, effect, callBack) {
    
    //初始化传递进来的参数值,主要处理的是动画的方式
    var fnEffect = zhufengEffect.Expo.easeOut;
    if (typeof effect === "number") {
        switch (effect) {
            case 1:
                fnEffect = zhufengEffect.zfLinear;
                break;
            case 2:
                fnEffect = zhufengEffect.Elastic.easeOut;
                break;
            case 3:
                fnEffect = zhufengEffect.Back.easeOut;
                break;
            case 4:
                fnEffect = zhufengEffect.zfBounce.easeOut;
                break;
            case 5:
                fnEffect = zhufengEffect.Expo.easeIn;
                break;
        }
    } else if (effect instanceof Array) {
        fnEffect = effect.length === 1 ? zhufengEffect[effect] : zhufengEffect[effect[0]][effect[1]];
    } else if (typeof effect === "function") {
        callBack = effect;
    }

    //times:当前运动的时间 interval:多长时间运动一次 oBegin:起始的位置集合 oChange:总距离集合 oTarget:目标的位置集合{left: "-2000", opacity: 1}
    var times = null, interval = 15, oBegin = {}, oChange = {};
    for (var key in oTarget) {
        if (oTarget.hasOwnProperty(key)) {
            oBegin[key] = getCss(curEle, key);
            oChange[key] = oTarget[key] - oBegin[key];
        }
    }

    //实现我们的动画
    //1)清除之前正在运行的动画
    window.clearInterval(curEle.timer);
    //2)开始设置新的动画执行我们的操作
    curEle.timer = window.setInterval(function () {
        times += interval;
        if (times >= duration) {
            setGroupCss(curEle, oTarget);
            window.clearInterval(curEle.timer);
            typeof callBack === "function" ? callBack.call(curEle) : null;
            return;
        }

        for (var key in oChange) {
            var curVal = fnEffect(times, oBegin[key], oChange[key], duration);
            setCss(curEle, key, curVal);
        }
    }, interval);
};

/*下面是实现轮播图的具体的业务逻辑*/
~function () {
    //获取所需要的元素
    var banner = document.getElementById("banner");

    var bannerImg = getElementsByClass("bannerImg", banner);
    if (bannerImg.length <= 0) return;
    bannerImg = bannerImg[0];

    var bannerTip = getElementsByClass("bannerTip", banner);
    if (bannerTip.length <= 0) return;
    bannerTip = bannerTip[0];

    var bannerLeft = document.getElementById("bannerLeft");
    var bannerRight = document.getElementById("bannerRight");

    //计算当前bannerImg的宽度和位置
    var bannerW = banner.clientWidth, totalW = (dataAry.length + 2) * bannerW, count = dataAry.length + 2;
    setGroupCss(bannerImg, {
        width: totalW,
        left: -bannerW
    });

    //初始化绑定数据
    var initData = function () {
        var str = "";
        str += "<div trueImg='" + dataAry[dataAry.length - 1] + "'></div>";
        for (var i = 0; i < dataAry.length; i++) {
            str += "<div trueImg='" + dataAry[i] + "'></div>";
        }
        str += "<div trueImg='" + dataAry[0] + "'></div>";
        bannerImg.innerHTML = str;

        str = "";
        for (i = 0; i < dataAry.length; i++) {
            i === 0 ? str += "<li class='select'></li>" : str += "<li></li>";
        }
        bannerTip.innerHTML = str;
    };
    initData();

    //图片延迟加载
    var initAsyncImg = function () {
        var divList = bannerImg.getElementsByTagName("div");
        for (var i = 0; i < divList.length; i++) {
            ~function (i) {
                var curDiv = divList[i];
                if (!curDiv.isLoad) {
                    var oImg = new Image;
                    oImg.src = curDiv.getAttribute("trueImg");
                    oImg.onload = function () {
                        curDiv.appendChild(oImg);
                        curDiv.isLoad = true;
                    };
                }
            }(i);
        }
    };
    window.setTimeout(initAsyncImg, 0);

    //实现焦点对齐
    var setTip = function (index) {
        var bannerTipList = bannerTip.getElementsByTagName("li");
        index < 0 ? index = bannerTipList.length - 1 : null;
        index >= bannerTipList.length ? index = 0 : null;
        for (var i = 0; i < bannerTipList.length; i++) {
            bannerTipList[i].className = i === index ? "select" : null;
        }
    };


    //实现自动轮播
    var step = 1;
    var autoMove = function () {
        step++;
        if (step >= count) {
            setCss(bannerImg, "left", -1 * bannerW);
            step = 2;
        }
        setTip(step - 1);
        animate(bannerImg, {left: -step * bannerW}, 500, 1);
    };
    bannerImg.autoTimer = window.setInterval(autoMove, 3000);

    //实现tip点击切换
    var bannerTipList = bannerTip.getElementsByTagName("li");
    for (var i = 0; i < bannerTipList.length; i++) {
        bannerTipList[i].index = i;
        bannerTipList[i].onclick = function () {
            window.clearInterval(bannerImg.autoTimer);
            setTip(this.index);
            step = this.index + 1;
            animate(bannerImg, {left: -step * bannerW}, 500, 1, function () {
                bannerImg.autoTimer = window.setInterval(autoMove, 3000);
            });
        };
    }

    //点击左右切换的
    banner.onmouseover = function () {
        window.clearInterval(bannerImg.autoTimer);
        bannerLeft.style.display = bannerRight.style.display = "block";
    };

    banner.onmouseout = function () {
        bannerImg.autoTimer = window.setInterval(autoMove, 3000);
        bannerLeft.style.display = bannerRight.style.display = "none";
    };

    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        step--;
        if (step < 0) {
            setCss(bannerImg, "left", -(count - 2) * bannerW);
            step = 3;
        }
        setTip(step - 1);
        animate(bannerImg, {left: -step * bannerW}, 500, 1);
    };
}();