var utils = {

    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    getCss: function (curEle, attr) {
        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)$/, val = null;
        val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        return reg.test(val) ? parseFloat(val) : val;
    },
    offset: function (curEle) {
        var offsetP = curEle.offsetParent, l = curEle.offsetLeft, t = curEle.offsetTop;
        while (offsetP) {
            if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {
                l += offsetP.clientLeft;   l=l+offsetP.clientLeft;
                t += offsetP.clientTop;    t=t+offsetP.clientTop;
            }
            l += offsetP.offsetLeft;
            t += offsetP.offsetTop;
            offsetP = offsetP.offsetParent;
        }
        return {top: t, left: l};
    }
};
