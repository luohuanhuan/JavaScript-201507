/*
 * utils(v1.0): Which contains the common method of operating DOM
 * by Team on 2015/11/17
 */
var utils = {
    //遍历数组(类数组)中的每一项,每一次循环的时候,都执行我们的fn
    each: function (curAry, fn) {
        for (var i = 0; i < curAry.length; i++) {
            var item = curAry[i];
            var index = i;
            typeof fn === "function" ? fn(item, index, curAry) : null;
        }
    },
    listToArray: function (likeAry) {
        //this->utils
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            this.each(likeAry, function (item, index, curAry) {
                ary[ary.length] = item;
            });
        }
        return ary;
    }


};