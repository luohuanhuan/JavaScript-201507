//基于内置类String.prototype扩展一些我们自己常用的方法
(function (pro) {
    pro.myFormatTime = function myFormatTime() {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?$/g, ary = [];
        this.replace(reg, function () {
            ary = [].slice.call(arguments, 1, 7);
        });
        var format = arguments[0] || "{0}-{1}-{2} {3}:{4}:{5}";
        return format.replace(/{(\d+)}/g, function () {
            var val = ary[arguments[1]];
            return val && val.length === 1 ? "0" + val : val;
        });
    };
    pro.queryURLParameter = function queryURLParameter() {
        var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    };
})(String.prototype);


//请求主要的数据源（如果数据不能加载，那么下面的也不需要展示即可，所有我们采用的是同步）
var dataMath = null;

//先读取二级数据缓存的数据,没有/过期在读取Ajax数据
var nowTime = new Date();
var obj = localStorage.getItem("dataMath");
var isAjax = true;
if (obj) {
    obj = JSON.parse(obj);
    var oldTime = obj.date;
    if (((nowTime - oldTime) / (60 * 60 * 1000)) > 24) {
        localStorage.removeItem("dataMath");
    } else {
        dataMath = obj.dataMath;
        isAjax = false;
    }
}
if (isAjax) {
    $.ajax({
        url: "json.txt?_" + Math.random(),
        type: "get",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data && data[0] === 0) {
                dataMath = data[1];

                //做数据的二级缓存
                var obj = {
                    date: new Date(),
                    dataMath: dataMath
                };
                localStorage.setItem("dataMath", JSON.stringify(obj));
            }
        }
    });
}

//init video
(function () {
    if (dataMath) {
        var $playerVideo = $("#playerVideo");
        $playerVideo.attr({
            poster: dataMath["matchPic"],
            src: dataMath["live"],
            width: document.documentElement.clientWidth + "px"
        });
    }
})();

//init support
(function () {
    if (!dataMath) return;
    var matchInfo = dataMath["matchInfo"];

    //分数
    $(".sup-team").html("<div><img src='" + matchInfo["leftBadge"] + "'/><span>" + matchInfo["leftGoal"] + "</span></div>" +
        "<div>" + matchInfo["startTime"].myFormatTime("{1}月{2}日{3}:{4}") + "</div>" +
        "<div><span>" + matchInfo["rightGoal"] + "</span><img src='" + matchInfo["rightBadge"] + "'/></div>");

    //支持数
    var l = parseFloat(dataMath["leftSupport"]), r = parseFloat(dataMath["rightSupport"]);
    $(".sup-count").html("<div><em class='sup-count-left' flag='left'></em><span>" + l + "</span></div>" +
        "<div>" + matchInfo["matchDesc"] + "</div>" +
        "<div><em class='sup-count-right' flag='right'></em><span>" + r + "</span></div>");

    //支持比例
    var $spans = $(".sup-count span");

    function computed() {
        var left = parseFloat($spans[0].innerHTML);
        var right = parseFloat($spans[1].innerHTML);
        $(".sup-progress>span").css("width", (left / (left + right)) * 100 + "%");
    }

    computed();

    //支持
    var support = localStorage.getItem("support");
    if (support) {
        support = JSON.parse(support);
        if (support.isSup) {
            $spans[0].innerHTML = support["left"];
            $spans[1].innerHTML = support["right"];
            computed();

            if (support.flag === "left") {
                $(".sup-count .sup-count-left").removeClass("sup-count-left").addClass("sup-count-leftRed");
                return;
            }
            $(".sup-count .sup-count-right").removeClass("sup-count-right").addClass("sup-count-rightBlu");
            return;
        }
    }

    var isSup = false;
    $(".sup-count>div").singleTap(function () {
        if (isSup) return;

        var $em = $(this).children("em");
        var $span = $(this).children("span");
        if ($em.length > 0) {
            var flag = $em.attr("flag");
            flag === "left" ? $em.removeClass("sup-count-left").addClass("sup-count-leftRed") : $em.removeClass("sup-count-right").addClass("sup-count-rightBlu");
            $span.html(parseFloat($span.html()) + 1);
            isSup = true;
            computed();

            //记录支持的信息
            var support = {
                isSup: true,
                left: parseFloat($spans[0].innerHTML),
                right: parseFloat($spans[1].innerHTML),
                flag: flag
            };
            localStorage.setItem("support", JSON.stringify(support));
        }
    });
})();




