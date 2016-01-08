(function () {
    var winH = document.documentElement.clientHeight;
    var inner = document.querySelector(".inner"), pageList = [].slice.call(document.querySelectorAll(".inner>div"), 0);
    var tip = document.querySelector(".tip");
    var count = pageList.length;
    var index = 0;

    //init height
    inner.style.height = count * winH + "px";
    pageList.forEach(function (cur) {
        cur.style.height = winH + "px";
    });


    //init swipe
    var body = document.body;
    $t.swipeUp(body, {
        start: function (e) {
            this["isEnd"] = false;
            this["changePos"] = 0;
            this["strTop"] = parseFloat(inner.style.top);
        },
        move: function (e) {
            if (index >= (count - 1)) {
                this["isEnd"] = true;
                return;
            }
            var changePos = this["endYswipeUp"] - this["strYswipeUp"];
            this["changePos"] = changePos;
            inner.style.top = this["strTop"] + changePos + "px";
        },
        end: function (e) {
            if (this["isEnd"]) {
                return;
            }
            setTran(true);
            var changePos = this["changePos"];
            if (Math.abs(changePos) / winH >= 0.25) {
                //->超过了四分之一的屏幕
                index++;
                tip.style.display = index >= (count - 1) ? "none" : "block";
            }
            inner.style.top = -index * winH + "px";

            //清除设置的值
            window.setTimeout(function () {
                setTran(false);
                pageList.forEach(function (cur, i) {
                    cur.className = i === index ? "move" : null;
                });
            }, 500);
        }
    });

    $t.swipeDown(body, {
        start: function (e) {
            this["isEnd"] = false;
            this["changePos"] = 0;
            this["strTop"] = parseFloat(inner.style.top);
        },
        move: function (e) {
            if (index <= 0) {
                this["isEnd"] = true;
                return;
            }
            var changePos = this["endYswipeDown"] - this["strYswipeDown"];
            this["changePos"] = changePos;
            inner.style.top = this["strTop"] + changePos + "px";
        },
        end: function (e) {
            if (this["isEnd"]) {
                return;
            }
            setTran(true);
            var changePos = this["changePos"];
            if (Math.abs(changePos) / winH >= 0.25) {
                //->超过了四分之一的屏幕
                index--;
                tip.style.display = index >= (count - 1) ? "none" : "block";
            }
            inner.style.top = -index * winH + "px";

            //清除设置的值
            window.setTimeout(function () {
                setTran(false);
                pageList.forEach(function (cur, i) {
                    cur.className = i === index ? "move" : null;
                });
            }, 500);
        }
    });

    function setTran(flag) {
        if (flag) {
            inner.style.webkitTransitionDuration = "0.5s";
            return;
        }
        inner.style.webkitTransitionDuration = "0s";
    }

    window.setTimeout(function () {
        pageList[0].className = "move";
    }, 500);
})();

window.addEventListener("load", function () {
    //init music
    var music = document.querySelector(".music");
    var musicAudio = music.querySelector("audio");

    //canplay:音频资源文件已经加载一部分,可以播放了
    //canplaythrough:音频文件已经全部加载完成,播放不会出现卡顿
    musicAudio.addEventListener("canplay", function () {
        music.style.display = "block";
        music.className = "music move";
    }, false);
    musicAudio.play();

    $t.tap(music, {
        end: function () {
            if (musicAudio.paused) {
                musicAudio.play();
                music.className = "music move";
                return;
            }
            musicAudio.pause();
            music.className = "music";
        }
    });
}, false);




