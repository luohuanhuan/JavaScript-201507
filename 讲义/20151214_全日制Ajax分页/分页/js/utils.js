var utils = (function () {
    var flag = "XMLHttpRequest" in window;

    return {
        formatJSON: function (str) {
            var jsonObj = null;
            try {
                jsonObj = JSON.parse(str);
            } catch (e) {
                jsonObj = eval("(" + str + ")");
            }
            return jsonObj;
        },
        createXHR: function () {
            return flag ? new XMLHttpRequest() : new ActiveXObject("MsXML3.XMLHTTP");
        },
        ajax: function (url, callback) {
            var _this = this;
            var xhr = _this.createXHR();
            var symbol = url.indexOf("?") > -1 ? "&" : "?";
            url = url + "" + symbol + "_=" + Math.random();
            xhr.open("get", url, true);
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && /^(2|3)\d{2}$/.test(this.status)) {
                    var res = _this.formatJSON(this.responseText);
                    typeof callback === "function" ? callback(res) : null;
                }
            };
            xhr.send();
        }
    };
})();
