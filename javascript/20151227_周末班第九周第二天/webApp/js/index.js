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


var dataMatch = null;

//通过Ajax(同步编程->因为页面中所有需要展示的数据都是需要从后台获取后才会给用户展示,这样的话,我们就可以使用同步编程了)
$.ajax({
    url: "json.txt?_=" + Math.random(),
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
        if (data && data[0] === 0) {
            dataMatch = data[1];
        }
    }
});

//init video
$(".player>video").attr({
    src: dataMatch["live"],
    poster: dataMatch["matchPic"]
});


//init support
var matchInfo = dataMatch["matchInfo"];
var $supTeam = $(".sup-team");
$supTeam.html('<div><img src="' + matchInfo["leftBadge"] + '"/><span>' + matchInfo["leftGoal"] + '</span></div>' +
    '<div>' + matchInfo["startTime"].myFormatTime("{1}月{2}日{3}:{4}") + '</div>' +
    '<div><span>' + matchInfo["rightGoal"] + '</span><img src="' + matchInfo["rightBadge"] + '"/></div>');

var $supCount = $(".sup-count");
var l = parseFloat(dataMatch["leftSupport"]), r = parseFloat(dataMatch["rightSupport"]);
$supCount.html('<div><em dir="left"></em><span>' + l + '</span></div>' +
    '<div>NBA常规赛</div>' +
    '<div><span>' + r + '</span><em dir="right"></em></div>');
setProgress(l, r);

//support team
var $isSup = false;
var support = localStorage.getItem("support");
if (support) {
    support = JSON.parse(support);
    var dir = support.sup;
    var $em = $supCount.find("em");
    if (dir === "left") {
        $em[0].className = "select";
    } else {
        $em[1].className = "select";
    }
    $($em[0]).siblings().html(support.leftNum);
    $($em[1]).siblings().html(support.rightNum);
    setProgress(support.leftNum, support.rightNum);
    $isSup = true;
}
$supCount.find("em").singleTap(function () {
    if ($isSup) {
        return;
    }
    var $span = $(this).siblings();
    var $count = parseFloat($span.html());
    $(this).addClass("select");
    $span.html($count + 1);
    $isSup = true;

    //计算最新的支持比例
    var $allSpan = $supCount.find("span");
    var left = parseFloat($allSpan[0].innerHTML);
    var right = parseFloat($allSpan[1].innerHTML);
    setProgress(left, right);

    //点击完成后把数据保存到本地
    var obj = {
        sup: $(this).attr("dir"),
        leftNum: left,
        rightNum: right
    };
    localStorage.setItem("support", JSON.stringify(obj));
});

function setProgress(l, r) {
    var $supProgress = $(".sup-progress");
    $supProgress.children("span").css("width", (l / (l + r)) * 100 + "%");
}






























