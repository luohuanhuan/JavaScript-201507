//分页实现的原理:
//1、通过Ajax把我们相关的数据进行请求(把所有的内容获取到) total->数据总数
//2、计算一共要显示多少页  pageNum->每页显示的条数  totalPage=Math.ceil(total/pageNum)  ->我们把页面中的分页数据绑定上
//3、默认把所有数据中第一页的数据展示在我们的页面中
//4、给实现分页的按钮绑定事件,根据当前应该展示的页数把内容区域的数据进行替换

var list = document.getElementById("list");
var page = document.getElementById("page");
var pageList = document.getElementById("pageList");

//一、首先通过Ajax把我们的数据获取到
var total = 0, totalPage = 0, pageNum = 10, curPage = 1;
list.style.height = pageNum * 30 + "px";

utils.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);

    bindData(curPage, data);
    bindPage();

    //四、利用事件委托实现我们的分页切换
    page.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.tagName.toLowerCase() === "li") {
            //我点击的是分页的页码
            var page = Number(tar.innerHTML);
            curPage = page;
        } else if (tar.id === "first") {
            curPage = 1;
        } else if (tar.id === "last") {
            curPage = totalPage;
        } else if (tar.id === "prev") {
            if (curPage === 1) {
                return;
            }
            curPage--;
        } else if (tar.id === "next") {
            if (curPage === totalPage) {
                return;
            }
            curPage++;
        } else if (tar.id === "search") {
            return;
        }
        bindData(curPage, data);
        changeBg();
    };

    //六、给我们的文本框绑定keyup事件,如果按下的是enter键,我们实现切换
    var search = document.getElementById("search");
    search.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            var val = this.value.replace(/(^ +| +$)/g, "");
            if (/^(\d|([1-9]\d+))$/.test(val)) {
                if (val < 1 || val > totalPage) {
                    this.value = totalPage;
                    val = totalPage;
                }
                curPage = val;
                bindData(curPage, data);
                changeBg();
            } else {
                this.value = "";
                this.focus();
            }
        }
    };
});

//二、动态绑定我们的分页的页码
function bindPage() {
    var str = "";
    for (var i = 1; i <= totalPage; i++) {
        var c = i === curPage ? "select" : null;
        str += "<li class='" + c + "'>" + i + "</li>";
    }
    pageList.innerHTML = str;
}

//三、实现我们主要内容的绑定
//第一页 从索引0~9
//第二页 从索引10~19
//第三页 从索引20~29
//第n页 从索引 (n-1)*pageNum ~ n*pageNum-1
function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, eIndex = page * pageNum - 1;
    var str = "";
    for (var i = sIndex; i <= eIndex; i++) {
        var cur = data[i];
        if (cur) {
            var c = i % 2 === 1 ? "even" : null;
            str += "<li class='" + c + "' num='" + cur["num"] + "'>";
            for (var key in cur) {
                var val = key === "sex" ? (cur[key] === 1 ? "男" : "女") : cur[key];
                str += "<span>" + val + "</span>"
            }
            str += "</li>";
        }
    }
    list.innerHTML = str;

    //给每一个li绑定点击事件
    var oLis = list.getElementsByTagName("li");
    for (var k = 0; k < oLis.length; k++) {
        oLis[k].onclick = function () {
            window.location.href = "detail.html?num=" + this.getAttribute("num");
        }
    }
    //window.location.href=xxxx 跳转到指定的页面 (在本窗口打开)
    //var url=window.location.href; 获取本页面的URL地址
    //window.open("地址") 跳转到指定的页面 (在新窗口打开)
}

//五、实现分页选中样式切换
function changeBg() {
    var oLis = pageList.getElementsByTagName("li");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = i === (curPage - 1) ? "select" : null;
    }
}

//从一个列表页面跳转到详细页，用的是一个详细页
//我们通过URL地址栏中的参数区分显示不一样的内容
//http://kbs.sports.qq.com/kbsweb/game.htm?mid=100000:1467992
//http://kbs.sports.qq.com/kbsweb/game.htm?mid=100000:1467993


