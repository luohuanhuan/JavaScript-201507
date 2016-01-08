//获取需要操作的元素
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];

//1、数据绑定:把dataAry都绑定到我们的页面中->动态创建标签,先增加到文档碎片中,然后在把文档碎片添加到页面中
var initData = function () {
    if (!dataAry) {
        return;
    }
    var frg = document.createDocumentFragment();
    for (var i = 0; i < dataAry.length; i++) {
        var curItem = dataAry[i];
        curItem.name = curItem.name || "--";
        curItem.age = curItem.age || 22;
        curItem.score = curItem.score || 60;
        curItem.sex = curItem.sex || 0 ? "男" : "女";
        var oTr = document.createElement("tr");
        for (var key in curItem) {
            var oTd = document.createElement("td");
            oTd.innerHTML = curItem[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
};
initData();

//2、实现隔行变色
var changeBg = function () {
    var oRows = tBody.rows;
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "bg" : null;
    }
};
changeBg();

//3、实现表格排序,然后在给我们的具有class="cursor"绑定点击事件,实现升降序排列
var oThs = oTab.getElementsByTagName("th");
var rows = tBody.rows;
for (var i = 0; i < oThs.length; i++) {
    oThs[i].index = i;
    oThs[i].flag = -1;
    oThs[i].onclick = function () {
        var _this = this;
        for (var z = 0; z < oThs.length; z++) {
            oThs[z].flag = z === _this.index ? _this.flag * -1 : -1;
        }

        //ary.sort(function(a,b){//this->window });
        var ary = utils.listToArray(rows);
        ary.sort(function (a, b) {
            var cur = a.cells[_this.index].innerHTML, next = b.cells[_this.index].innerHTML, curNum = parseFloat(cur), nextNum = parseFloat(next);
            return isNaN(curNum) || isNaN(nextNum) ? _this.flag * (cur.localeCompare(next)) : _this.flag * (curNum - nextNum);
        });

        var frg = document.createDocumentFragment();
        for (var i = 0; i < ary.length; i++) {
            frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        changeBg();
    }
}