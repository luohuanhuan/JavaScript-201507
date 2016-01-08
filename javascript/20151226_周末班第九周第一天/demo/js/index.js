var page = document.querySelector(".page");
var pageList = [].slice.call(document.querySelectorAll(".pageDemo"), 0);
var winH = document.documentElement.clientHeight;
var index = 0, count = pageList.length;

//init style
pageList.forEach(function (curItem) {
    curItem.style.height = winH + "px";
});
page.style.height = count * winH + "px";

//init event
var bodyTouch = {
    setTran: function (flag) {
        if (flag) {
            page.style.webkitTransitionDuration = "0.5s";
            return;
        }
        page.style.webkitTransitionDuration = "0s";
    },
    start: function (e) {
        this["isEnd"] = false;
        this["changePos"] = 0;
        this["strTop"] = parseFloat(page.style.top);
    },
    moveUp: function (e) {
        if (index >= (count - 1)) {
            return;
        }
        var changePos = this["endYswipeUp"] - this["strYswipeUp"];
        this["changePos"] = changePos;
        page.style.top = this["strTop"] + changePos + "px";
    },
    endUp: function (e) {
        bodyTouch.setTran(true);
        if (Math.abs(this["changePos"]) >= (winH / 4)) {
            index++;
        }
        page.style.top = -index * winH + "px";
        window.setTimeout(function () {
            bodyTouch.setTran(false);
            move();
        }, 500);
    },
    moveDown: function (e) {
        if (index <= 0) {
            return;
        }
        var changePos = this["endYswipeUp"] - this["strYswipeUp"];
        this["changePos"] = changePos;
        page.style.top = this["strTop"] + changePos + "px";
    },
    endDown: function (e) {
        bodyTouch.setTran(true);
        if (Math.abs(this["changePos"]) >= (winH / 4)) {
            index--;
        }
        page.style.top = -index * winH + "px";
        window.setTimeout(function () {
            bodyTouch.setTran(false);
            move();
        }, 500);
    }
};

var body = document.body;
$t.swipeUp(body, {
    start: bodyTouch.start,
    move: bodyTouch.moveUp,
    end: bodyTouch.endUp
}).swipeDown(body, {
    start: bodyTouch.start,
    move: bodyTouch.moveDown,
    end: bodyTouch.endDown
});

//init move
function move() {
    pageList.forEach(function (item, i) {
        if (i === index) {
            item.className = "pageDemo move";
        } else {
            item.className = "pageDemo";
        }
    });
    document.querySelector(".tip").style.display = index >= (count - 1) ? "none" : "block";
}

//init music
window.addEventListener("load", function () {
    var musicAudio = document.querySelector("#musicAudio");
    var music = document.querySelector(".music");

    musicAudio.addEventListener("canplay", function () {
        music.style.display = "block";
        music.className = "music move";
    }, false);
    musicAudio.play();

    $t.tap(music, {
        end: function (e) {
            if (musicAudio.paused) {
                musicAudio.play();
                this.className = "music move";
                return;
            }
            musicAudio.pause();
            this.className = "music";
        }
    });
}, false);

//init on-page
window.setTimeout(function () {
    pageList[0].className = "pageDemo move";
}, 0);
















