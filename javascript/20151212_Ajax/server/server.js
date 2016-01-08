var http = require('http');
var url = require('url');
var fs = require('fs');
var getFile = function (path, response) {
    fs.readFile(path, function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('not found');
        } else {
            response.end(data);
        }
    });
};
var server = http.createServer(function (request, response) {
    var params = url.parse(request.url, true);
    if (params.pathname == '/ajax') {
        response.write('hello world');
        response.end();
    } else {
        getFile('..' + params.pathname, response);
//        response.end('not supported');
    }
});
// 端口最大值为65535
server.listen(3000, function () {
    console.log('start at 3000');
});