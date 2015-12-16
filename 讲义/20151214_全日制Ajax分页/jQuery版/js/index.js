~function ($) {
    //在传递一遍jQuery给$形参的作用是防止外面的$和里面的冲突
    //遍历对象的方法
    var objEach = function (obj, callback) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                typeof callback === "function" ? callback(key, obj) : null;
            }
        }
    };

    //编写分页的自定义类
    var pageClass = function (selector, options) {
        var jsonData = options.jsonData || [],
            pageNum = options.pageNum || 10,
            _this = this;
        selector.children(".list").css("height", pageNum * 30);

        var obj = {
            selector: selector,
            jsonData: jsonData,
            pageNum: pageNum,
            total: jsonData.length,
            totalPage: Math.ceil(jsonData.length / pageNum),
            curPage: 1
        };

        objEach(obj, function (key, obj) {
            _this[key] = obj[key];
        });
    };

    //在类的原型上编写我们业务逻辑方法
    pageClass.prototype = {
        constructor: pageClass,
        init: function () {
            this.bindData();
            this.bindLink();

            this.bindPage();
            this.bindEven();
        },
        bindData: function () {
            var sIndex = (this.curPage - 1) * this.pageNum, eIndex = this.curPage * this.pageNum - 1, str = "";
            for (var i = sIndex; i <= eIndex; i++) {
                var cur = this.jsonData[i];
                if (cur) {
                    var cName = i % 2 === 1 ? "even" : null;
                    str += "<li class='" + cName + "' num='" + cur["num"] + "'>";
                    objEach(cur, function (key, obj) {
                        var val = obj[key];
                        if (key === "sex") {
                            val = val === 1 ? "男" : "女";
                        }
                        str += "<span>" + val + "</span>";
                    });
                    str += "</li>";
                }
            }
            this.selector.children(".list").html(str).stop().animate({opacity: 1}, 500);
        },
        bindLink: function () {
            var ss = this.selector.selector;
            $(ss + ">.list>li").click(function () {
                window.location.href = "detail.html?num=" + $(this).attr("num");
            });
        },
        bindPage: function () {
            var _this = this;
            var ss = this.selector.selector;
            var $ul = $(ss + ">.page>ul");
            if ($ul.attr("isLoad") === "true") {
                $ul.children("li").each(function (index) {
                    index === _this.curPage ? $(this).addClass("select") : $(this).removeClass("select");
                });
                return;
            }
            var str = "";
            for (var i = 1; i <= this.totalPage; i++) {
                var cName = i === this.curPage ? "select" : null;
                str += "<li class='" + cName + "'>" + i + "</li>";
            }
            $ul.html(str).attr("isLoad", "true");
        },
        bindEven: function () {
            var _this = this;
            var ss = this.selector.selector;
            var $page = $(ss + ">.page");
            $page.live(function (e) {

            });
        }
    };

    //给jQuery添加创建实例并且实现分页效果的方法
    //options -> {jsonData:null,pageNum:10}
    $.extend({
        ajaxPage: function (selector, options) {
            var pageExample = new pageClass(selector, options);
            pageExample.init();
        }
    });
}(jQuery);

$.ajax({
    url: "data.txt",
    type: "get",
    dataType: "json",
    success: function (jsonData) {
        $.ajaxPage($("#box"), {
            jsonData: jsonData
        });
    }
});
