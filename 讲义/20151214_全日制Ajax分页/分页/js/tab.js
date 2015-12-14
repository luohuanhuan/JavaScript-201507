var oList = document.getElementById("list");
var oLis = oList.getElementsByTagName("li");
var oPage = document.getElementById("page");
var oPageLis = oPage.getElementsByTagName("li");
var _curPage = 1;

//1、实现列表区域的隔行变色
function changeBg() {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].oldClass = oLis[i].className = i % 2 === 1 ? "bg" : null;
        oLis[i].onmouseover = function () {
            this.className = "hover";
        };
        oLis[i].onmouseout = function () {
            this.className = this.oldClass;
        };
    }
}

//2、数据绑定
//分页的原理:100条数据,每一页显示10条,一共有10页,刚开始只显示第一页的内容
//1)需要获取总内容
//2)计算一共有多少页
//3)把第一页的数据展示在我们的页面中

//totalPage一共的页数 countPage每一页显示的数目 curPage当前是第几页 data获取的总内容
//总内容条数/countPage=totalPage;
//第1页-->0-9  (1-1)*10 ~ (1*10-1)
//第2页-->10-19 (2-1)*10 ~ (2*10-1)
//第3页-->20-29  (3-1)*10 ~ (3*10-1)
//((curPage-1)*countPage)~((curPage*countPage)-1)
//var totalPage = 0, countPage = 10, curPage = 1;

function showHTML(curPage, countPage, data) {
    _curPage = curPage;

    //1)在所有的数据中把我们需要展示的数据绑定到页面上
    var str = "";
    for (var i = (curPage - 1) * countPage; i <= (curPage * countPage) - 1; i++) {
        if (i >= data.length) {//如果我们获取的索引，比总内容的索引还要大了，我们就结束继续循环
            break;
        }
        var cur = data[i];
        cur.num = cur.num || "--";
        var sex = cur.sex === 1 ? "男" : "女";
        cur.score = cur.score || "--";
        str += "<li num='" + cur.num + "'>";
        str += "<span>" + cur.num + "</span>";
        str += "<span>" + sex + "</span>";
        str += "<span>" + cur.score + "</span>";
        str += "</li>";
    }
    oList.innerHTML = str;
    changeBg();

    //4)给我们的每一个li绑定点击事件，当点击的时候跳转到对应的详细页
    for (i = 0; i < oLis.length; i++) {
        oLis[i].onclick = function () {
            //window.location.href='地址' JS实现页面跳转的方式，在当前的页面打开一个新的页面,当前的页面消失
            //window.open("地址") 在新的窗口打开一个新的页面，之前的页面还保持不变
            //window.location.href = "detail.html";
            //以后的项目中，我们为了获取到每一个li的信息，作为传递给下一个页面的参数:首先把需要的信息存储到元素的HTML结构上，用到的时候通过getAttribute来获取
            window.open("detail.html?num=" + this.getAttribute("num"));
        }
    }

    //2)让当前页有选中的样式，而其余的页码没有选中的样式
    for (i = 0; i < oPageLis.length; i++) {
        oPageLis[i].className = (i + 1) === curPage ? "select" : null;
    }

    //3)实现的我们的动画效果
    move.call(oList);
}

function move() {
    var _this = this;
    var count = 0;
    _this.style.opacity = count;
    ~function () {
        window.clearTimeout(_this.timer);
        if (count + 0.02 >= 1) {
            _this.style.opacity = 1;
            return;
        }
        count += 0.02;
        _this.style.opacity = count;
        _this.timer = window.setTimeout(arguments.callee, 13);
    }();
}

//3、绑定分页码
function showPage(countPage, data) {
    //1)显示页码
    var totalPage = Math.ceil(data.length / countPage);
    var str = "";
    for (var i = 1; i <= totalPage; i++) {
        str += "<li>" + i + "</li>";
    }
    oPage.innerHTML = str;

    //2)展示页面绑定当前的内容
    for (i = 0; i < oPageLis.length; i++) {
        oPageLis[i].index = i;
        oPageLis[i].onclick = function () {
            showHTML(this.index + 1, 10, data);
        };
    }

    //3)给其余的按钮绑定点击事件
    var pageDiv = document.getElementById("pageDiv");
    var oDivs = pageDiv.getElementsByTagName("div");
    for (i = 0; i < oDivs.length; i++) {
        oDivs[i].index = i;
        oDivs[i].onclick = function () {
            var n = this.index;
            if (n === 0) {
                if (_curPage === 1) {
                    return;
                }
                showHTML(1, 10, data);
            }
            if (n === 3) {
                if (_curPage === totalPage) {
                    return;
                }
                showHTML(totalPage, 10, data);
            }
            if (n === 1) {
                if (_curPage - 1 <= 0) {
                    return;
                }
                showHTML(_curPage - 1, 10, data);
            }
            if (n === 2) {
                if (_curPage + 1 > totalPage) {
                    return;
                }
                showHTML(_curPage + 1, 10, data);
            }
        }
    }

    var goTo = document.getElementById("goTo");
    goTo.onblur = function () {
        var val = Number(this.value), reg = /^(\d|[1-9]\d+)$/;
        if (reg.test(val)) {
            val > totalPage ? val = totalPage : null;
            val < 1 ? val = 1 : null;
            this.value = val;
            showHTML(val, 10, data);
        } else {
            this.value = "";
        }
    }
}

//4、获取数据
utils.ajax("data.txt", function (data) {
    //绑定页码
    showPage(10, data);

    //绑定第一页的数据
    showHTML(1, 10, data);
});
